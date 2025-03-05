<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import LanguageToggle from './text-translator/LanguageToggle.svelte';

	let ready = $state(false);

	onMount(() => (ready = true));
</script>

{#if ready}
	<header
		in:slide={{
			axis: 'y'
		}}
	>
		<LanguageToggle />
	</header>
{/if}

<style>
	header {
		display: flex;
		top: 0;
		position: fixed;
		/* height: var(--topbar-mobile-height); */
		width: 100%;
		align-items: center;
		justify-content: flex-end;
		padding: 1rem;
	}
</style>
