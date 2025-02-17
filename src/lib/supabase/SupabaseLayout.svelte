<script lang="ts">
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';
	import { Turnstile } from 'svelte-turnstile';
	import type { LayoutProps } from '../../routes/$types';
	import Text from '$lib/toolkit/Text.svelte';
	import Cover from '$lib/toolkit/Cover.svelte';

	let { data, children }: LayoutProps = $props();
	let { session, supabase } = $derived(data);

	const VITE_TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

	const getCurrentSession = (captchaToken: string | undefined, controller?: AbortController) => {
		if (controller?.signal.aborted) {
			return Promise.reject(new DOMException('Aborted', 'AbortError'));
		}

		return new Promise((resolve, reject) => {
			const abortHandler = () => {
				reject(new DOMException('Aborted', 'AbortError'));
			};

			supabase.auth
				.getSession()
				.then(async (response) => {
					if (!captchaToken) {
						return reject(new Error('captcha token is missing'));
					}
					const result = await supabase.auth.signInAnonymously({
						options: {
							captchaToken
						}
					});
					controller?.signal.removeEventListener('abort', abortHandler);
					if (result.error) {
						console.error(result.data);
						reject(result.error);
					} else {
						resolve(response.data);
					}
				})
				.catch((error) => {
					controller?.signal.removeEventListener('abort', abortHandler);
					reject(error);
				});
			controller?.signal.addEventListener('abort', abortHandler);
		});
	};

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});

	const tokenGetter = (e: CustomEvent<{ token: string; preClearanceObtained: boolean }>) => {
		getCurrentSession(e.detail.token);
	};
</script>

{#if !session}
	<Cover>
		<div class="popup">
			<Text variant="h2">Sorry about this!</Text>
			<Text variant="h4">Just making sure you're not a bot</Text>
			<Text variant="small">You know how it is these days :(</Text>
			<Turnstile siteKey={VITE_TURNSTILE_SITE_KEY} on:callback={tokenGetter} />
		</div>
	</Cover>
{:else}
	{@render children()}
{/if}

<style>
	.popup {
		display: flex;
		background-color: white;
		align-items: center;
		flex-direction: column;
		border-radius: 16px;
		max-width: 60%;
		padding: 20px;
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
		text-align: center;
		gap: 20px;
	}
</style>
