<script lang="ts">
	import { page } from '$app/state';
	import { getContent } from '$lib/text-translator/translator-state.svelte';
	import NotificationBox from '$lib/toolkit/NotificationBox.svelte';
	import { slide } from 'svelte/transition';

	let copyBox = $state(false);
</script>

<div in:slide={{ duration: 500 }} out:slide={{ duration: 500 }} class="fullscreen column">
	<p>{getContent('share-us-part-1')}</p>
	<p>{getContent('share-us-part-2')}</p>
	<p>{getContent('share-us-part-3')}</p>
	<div class="row gapping">
		<div class="half-width column">
			<p>{getContent('share-us-virtual')}</p>
			<button
				class="hidden-button basic-button"
				onclick={() => {
					navigator.clipboard.writeText(page.url.origin);
					copyBox = true;
				}}
			>
				{getContent('copy-link')}
			</button>
		</div>
		<div class="half-width column">
			<p>
				{getContent('share-us-physical')}
			</p>
			<a class="basic-a" href="/reach-out/share-what-we-do" download>{getContent('download')}</a>
		</div>
	</div>
	<p>{getContent('thank-you')}</p>
</div>
{#if copyBox}
	<NotificationBox position="bottom-right" period={2000} onEnd={() => (copyBox = false)}>
		<p>Link copied to clipboard</p>
	</NotificationBox>
{/if}

<style>
	.gapping {
		gap: 20px;
	}

	.fullscreen {
		width: 100%;
		gap: 10px;
		padding: 10px 0;
	}

	.half-width {
		flex: 1;
		justify-content: space-between;
		gap: 10px;
	}

	.basic-a {
		color: var(--secondary-color);
	}

	button {
		color: var(--secondary-color);
		margin: 0;
		padding: 0;
		height: fit-content;
		width: fit-content;
		font-size: 16px;
	}
</style>
