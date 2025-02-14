<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** This is just the text */
		children: Snippet;
		/** Optionally do something onclick, usually dismiss*/
		onClick?: () => void;
	}

	const { children, onClick }: Props = $props();
</script>

<button class="cover" onclick={onClick} aria-roledescription="dismissal" aria-label="dismiss">
	{@render children()}
</button>

<style>
	.cover {
		display: flex;
		flex-direction: column;
		height: 100vh;
		width: 100vw;
		justify-content: center;
		align-items: center;
		position: absolute;
		z-index: 5;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
		border: none;
	}
</style>
