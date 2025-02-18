<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** This is the text tag to be used here*/
		variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'small' | 'p' | 'span';
		/** This is just the text */
		children: Snippet;
		/** If needs to be switched before launch*/
		needsChange?: boolean;
		/** Shrink to content*/
		shrink?: boolean;
		/** Font size*/
		size?: number;
		/** Clear margin*/
		noMargin?: boolean;
	}

	const { variant = 'p', needsChange, children, size, shrink, noMargin }: Props = $props();
</script>

<svelte:element
	this={variant}
	class={['basic-text', `${needsChange ? 'text-to-be-switched' : ''}`]}
	style={`${size ? `font-size: ${size}px;` : ''} ${shrink ? 'width: fit-content;' : ''} ${noMargin ? 'margin: 0;' : ''}`}
>
	{@render children()}</svelte:element
>

<style>
	.basic-text {
		display: flex;
		line-height: 1;
		font-family: var(--general-font);
	}

	.text-to-be-switched {
		font-style: italic;
	}
</style>
