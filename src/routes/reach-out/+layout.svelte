<script lang="ts">
	import { getContent } from '$lib/text-translator/translator-state.svelte';
	import type { LayoutProps } from '../$types';
	import { page } from '$app/state';
	import Arrow from '$lib/Arrow.svelte';
	import { fade, slide } from 'svelte/transition';

	let { children }: LayoutProps = $props();
</script>

<div class="section-layout">
	{#if page.url.pathname === '/reach-out' || page.url.pathname === '/reach-out/buy-merch'}
		<div class="row space-between" in:slide={{ duration: 500 }} out:slide={{ duration: 500 }}>
			{#if page.url.pathname === '/reach-out/buy-merch'}
				<a
					class="back-icon small-icon"
					in:fade={{ duration: 500 }}
					out:fade={{ duration: 500 }}
					href="/reach-out"
				>
					<Arrow />
				</a>
			{:else}
				<div class="hidden back-icon">
					<Arrow />
				</div>
			{/if}
			<a href="/reach-out/buy-merch" class="menu-link">
				<h5 class="menu-item">{getContent('merch-title')}</h5>
			</a>
		</div>
	{/if}
	{#if page.url.pathname === '/reach-out' || page.url.pathname === '/reach-out/contact-us'}
		<div class="row space-between" in:slide={{ duration: 500 }} out:slide={{ duration: 500 }}>
			{#if page.url.pathname === '/reach-out/contact-us'}
				<a
					class="back-icon small-icon"
					in:fade={{ duration: 500 }}
					out:fade={{ duration: 500 }}
					href="/reach-out"
				>
					<Arrow />
				</a>
			{:else}
				<div class="hidden back-icon">
					<Arrow />
				</div>
			{/if}
			<a href="/reach-out/contact-us" class="menu-link">
				<h5 class="menu-item">{getContent('contact-title')}</h5>
			</a>
		</div>
	{/if}
	{#if page.url.pathname === '/reach-out' || page.url.pathname === '/reach-out/share-what-we-do'}
		<div class="row space-between" in:slide={{ duration: 500 }} out:slide={{ duration: 500 }}>
			{#if page.url.pathname === '/reach-out/share-what-we-do'}
				<a
					class="back-icon small-icon"
					in:fade={{ duration: 500 }}
					out:fade={{ duration: 500 }}
					href="/reach-out"
				>
					<Arrow />
				</a>
			{:else}
				<div class="hidden back-icon">
					<Arrow />
				</div>
			{/if}
			<a href="/reach-out/share-what-we-do" class="menu-link">
				<h5 class="menu-item">{getContent('share-with-us-title')}</h5>
			</a>
		</div>
	{/if}
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
