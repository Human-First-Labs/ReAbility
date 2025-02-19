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

<button onclick={onClick} class="icon-button">{@render children()}</button>

<style>
	.icon-button {
		display: flex;
		cursor: pointer;
		border: 0;
		background-color: transparent;
		line-height: 1;
		color: var(--color-tex);
	}
</style>
