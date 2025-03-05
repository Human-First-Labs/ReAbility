<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** This is just the text */
		children: Snippet;
		/** What the button does*/
		onClick: () => void;
	}

	const { children, onClick }: Props = $props();
</script>

<button onclick={onClick}>{@render children()}</button>

<style>
	button {
		display: flex;
		cursor: pointer;
		border: 0;
		background-color: transparent;
		color: var(--color-tex);
	}
</style>
