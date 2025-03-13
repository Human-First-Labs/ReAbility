<script lang="ts">
	import SupabaseLayout from '$lib/supabase/SupabaseLayout.svelte';
	import type { LayoutProps } from './$types';
	import '../lib/toolkit/default-hfl.css';
	import '../lib/project.css';
	import Footer from '$lib/Footer.svelte';
	import MainLayout from '$lib/MainLayout.svelte';
	import SimpleTopbar from '$lib/SimpleTopbar.svelte';
	import type { Language } from '$lib/text-translator/types';
	import {
		getCurrentLanguage,
		setInitialLanguage
	} from '$lib/text-translator/translator-state.svelte';
	import { onMount } from 'svelte';

	const appName = 'Reability';

	let { children, data }: LayoutProps = $props();

	const { supabaseData, savedLanguage } = $derived(data);
	const { session, supabase } = $derived(supabaseData);

	let currentLanguage = $derived.by(getCurrentLanguage);

	onMount(() => {
		if (!currentLanguage) {
			setInitialLanguage(savedLanguage);
		}
	});

	const setLanguageCookie = async (lang: Language) => {
		try {
			await fetch('../?/setLanguageCookie', {
				method: 'POST',
				body: JSON.stringify({ lang })
			});
		} catch (e) {
			console.error(e);
		}
	};
</script>

<svelte:head>
	<title>{appName}</title>
	<meta name="description" content="through Adaptability" />
</svelte:head>

{#if currentLanguage}
	<SupabaseLayout {session} {supabase}>
		<div class="fullscreen">
			<SimpleTopbar {setLanguageCookie} />
			<MainLayout>
				{@render children()}
			</MainLayout>
			<Footer />
		</div>
	</SupabaseLayout>
{/if}

<style>
	.fullscreen {
		height: 100vh;
		width: 100vw;
	}
</style>
