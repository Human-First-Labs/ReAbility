<script lang="ts">
	import { getContent } from '$lib/text-translator/translator-state.svelte';
	import type { LayoutProps } from '../$types';
	import { page } from '$app/state';
	import { fade, slide } from 'svelte/transition';
	import Arrow from '$lib/Arrow.svelte';

	let { children }: LayoutProps = $props();
</script>

<div class="section-layout">
	{#if page.url.pathname === '/reboot' || page.url.pathname === '/reboot/physical-changes'}
		<div class="row space-between" in:slide={{ duration: 500 }} out:slide={{ duration: 500 }}>
			{#if page.url.pathname === '/reboot/physical-changes'}
				<a
					class="back-icon small-icon"
					in:fade={{ duration: 500 }}
					out:fade={{ duration: 500 }}
					href="/reboot"
				>
					<Arrow />
				</a>
			{:else}
				<div class="hidden back-icon">
					<Arrow />
				</div>
			{/if}
			<a href="/reboot/physical-changes" class="menu-link">
				<h5 class="menu-item">{getContent('physical-changes-title')}</h5>
			</a>
		</div>
	{/if}
	{#if page.url.pathname === '/reboot' || page.url.pathname === '/reboot/adaptations'}
		<div class="row space-between" in:slide={{ duration: 500 }} out:slide={{ duration: 500 }}>
			{#if page.url.pathname === '/reboot/adaptations'}
				<a
					class="back-icon small-icon"
					in:fade={{ duration: 500 }}
					out:fade={{ duration: 500 }}
					href="/reboot"
				>
					<Arrow />
				</a>
			{:else}
				<div class="hidden back-icon">
					<Arrow />
				</div>
			{/if}
			<a href="/reboot/adaptations" class="menu-link">
				<h5 class="menu-item">{getContent('adaptations-title')}</h5>
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
