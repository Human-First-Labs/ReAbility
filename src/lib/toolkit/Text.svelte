<script lang="ts">
	import type { Snippet } from "svelte";


  interface Props {
    /** This is the text tag to be used here*/
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'small' | 'p' | 'span'
    /** This is just the text */
    children: Snippet
  }
  
  const { variant ="p", children }: Props = $props();
</script>

<svelte:element this={variant} class={[
    'basic-text',
]}>{@render children()}</svelte:element>

<style>
  .basic-text {
    line-height: 1;
    font-family: var(--general-font);
  }
</style>