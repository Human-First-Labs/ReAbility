<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		download?: boolean;
		/** The link to point towards*/
		to: string;
		/** This is just the text */
		children: Snippet;
	}

	const { children, to, download }: Props = $props();
</script>

<a href={to} download>{@render children()}</a>

<style>
	a {
		text-decoration: none;
		color: var(--primary-color);
		cursor: pointer;
	}
</style>
