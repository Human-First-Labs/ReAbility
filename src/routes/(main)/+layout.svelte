<script lang="ts">
	import { getContent } from '$lib/text-translator/translator-state.svelte';
	import type { LayoutProps } from '../$types';
	import { page } from '$app/state';
	import Arrow from '$lib/Arrow.svelte';
	import { fade, slide } from 'svelte/transition';

	let { children }: LayoutProps = $props();
</script>

<div class="section-layout">
	{#if page.url.pathname === '/' || page.url.pathname === '/what-is'}
		<div class="row space-between" in:slide={{ duration: 500 }} out:slide={{ duration: 500 }}>
			{#if page.url.pathname === '/what-is'}
				<a
					class="back-icon small-icon basic-a"
					in:fade={{ duration: 500 }}
					out:fade={{ duration: 500 }}
					href="/"
				>
					<Arrow />
				</a>
			{:else}
				<div class="back-icon" style="visibility: hidden">
					<Arrow />
				</div>
			{/if}
			<a href="/what-is" class="menu-link basic-a">
				<h5 class="menu-item">{getContent('what-is-title')}</h5>
			</a>
		</div>
	{/if}

	{#if page.url.pathname === '/' || page.url.pathname === '/who-is'}
		<div class="row space-between" in:slide={{ duration: 500 }} out:slide={{ duration: 500 }}>
			{#if page.url.pathname === '/who-is'}
				<a
					class="back-icon small-icon basic-a"
					in:fade={{ duration: 500 }}
					out:fade={{ duration: 500 }}
					href="/"
				>
					<Arrow />
				</a>
			{:else}
				<div class="back-icon" style="visibility: hidden">
					<Arrow />
				</div>
			{/if}
			<a href="/who-is" class="menu-link basic-a">
				<h5 class="menu-item">{getContent('who-is-title')}</h5>
			</a>
		</div>
	{/if}
	{#if page.url.pathname === '/' || page.url.pathname === '/credits'}
		<div class="row space-between" in:slide={{ duration: 500 }} out:slide={{ duration: 500 }}>
			{#if page.url.pathname === '/credits'}
				<a
					class="back-icon small-icon basic-a"
					in:fade={{ duration: 500 }}
					out:fade={{ duration: 500 }}
					href="/"
				>
					<Arrow />
				</a>
			{:else}
				<div class="back-icon" style="visibility: hidden">
					<Arrow />
				</div>
			{/if}
			<a href="/credits" class="menu-link basic-a">
				<h5 class="menu-item">{getContent('credits-title')}</h5>
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
