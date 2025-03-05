<script lang="ts">
	import { getContent } from '$lib/text-translator/translator-state.svelte';
	import type { LayoutProps } from '../$types';
	import { page } from '$app/state';
	import Arrow from '$lib/Arrow.svelte';
	import { fade } from 'svelte/transition';

	let { children }: LayoutProps = $props();
</script>

<div class="section-layout">
	<div class="row space-between">
		{#if page.url.pathname === '/about-us'}
			<a
				class="back-icon small-icon"
				in:fade={{ duration: 500 }}
				out:fade={{ duration: 500 }}
				href="/"
			>
				<Arrow />
			</a>
		{:else}
			<div class="hidden back-icon">
				<Arrow />
			</div>
		{/if}
		<a href="/about-us" class="menu-link">
			<h5 class="menu-item">{getContent('about-us-title')}</h5>
		</a>
	</div>
	{@render children()}
</div>

<style>
	.menu-link {
		width: fit-content;
	}

	.hidden {
		visibility: hidden;
	}

	.space-between {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}
</style>
