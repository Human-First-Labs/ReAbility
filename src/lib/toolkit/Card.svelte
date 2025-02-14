<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** This is just the text */
		children: Snippet;
	}

	const { children }: Props = $props();
</script>

<div class="card">
	{@render children()}
</div>

<style>
	.card {
		display: flex;
		flex-direction: column;
		background-color: var(--background-color);
		box-shadow: -8px 12px 20px 0 rgba(25, 42, 70, 0.13);
		border-radius: 16px;
		padding: 10px;
	}
</style>
