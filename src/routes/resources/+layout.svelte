<script lang="ts">
	import { getContent } from '$lib/text-translator/translator-state.svelte';
	import type { LayoutProps } from '../$types';
	import { page } from '$app/state';
	import { fade, slide } from 'svelte/transition';
	import Arrow from '$lib/Arrow.svelte';

	let { children }: LayoutProps = $props();
</script>

<div class="section-layout">
	{#if page.url.pathname === '/resources' || page.url.pathname === '/resources/accessibility-map'}
		<div class="row space-between" in:slide={{ duration: 500 }} out:slide={{ duration: 500 }}>
			{#if page.url.pathname === '/resources/accessibility-map'}
				<a
					class="back-icon small-icon hfl-a"
					in:fade={{ duration: 500 }}
					out:fade={{ duration: 500 }}
					href="/resources"
				>
					<Arrow />
				</a>
			{:else}
				<div class="hidden back-icon">
					<Arrow />
				</div>
			{/if}
			<a href="/resources/accessibility-map" class="menu-link hfl-a">
				<h5 class="menu-item">{getContent('accessibility-map-title')}</h5>
			</a>
		</div>
	{/if}
	{#if page.url.pathname === '/resources' || page.url.pathname === '/resources/tools'}
		<div class="row space-between" in:slide={{ duration: 500 }} out:slide={{ duration: 500 }}>
			{#if page.url.pathname === '/resources/tools'}
				<a
					class="back-icon small-icon hfl-a"
					in:fade={{ duration: 500 }}
					out:fade={{ duration: 500 }}
					href="/resources"
				>
					<Arrow />
				</a>
			{:else}
				<div class="hidden back-icon">
					<Arrow />
				</div>
			{/if}
			<a href="/resources/tools" class="menu-link hfl-a">
				<h5 class="menu-item">{getContent('tools-title')}</h5>
			</a>
		</div>
	{/if}
	{@render children()}
</div>

<style>
	.menu-link {
		width: fit-content;
	}

	.space-between {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}
</style>
