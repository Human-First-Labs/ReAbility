<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import LanguageToggle from './text-translator/LanguageToggle.svelte';
	import type { LanguageToggleProps } from './text-translator/LanguageToggle.svelte';

	export interface SimpleTopbarProps extends LanguageToggleProps {}

	let { setLanguageCookie }: SimpleTopbarProps = $props();

	let ready = $state(false);

	onMount(() => (ready = true));
</script>

{#if ready}
	<header
		in:slide={{
			axis: 'y'
		}}
	>
		<LanguageToggle {setLanguageCookie} />
	</header>
{/if}

<style>
	header {
		display: flex;
		top: 0;
		position: fixed;
		height: var(--topbar-mobile-height);
		background-color: var(--primary-color);
		width: 100%;
		align-items: center;
		justify-content: flex-end;
		padding: 1rem;
		z-index: 5;
	}
</style>
