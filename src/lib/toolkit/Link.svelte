<script lang="ts">
	import type { Snippet } from "svelte";


  interface Props {
    /** The link to point towards*/
    to: string
    /** This is just the text */
    children: Snippet
  }
  
  const { children, to }: Props = $props();
</script>

<a href={to} class={[
    'basic-link',
]}>{@render children()}</a>

<style>
  .basic-link {
    line-height: 1;
    text-decoration: none;
    color: var(--primary-color);
    cursor: pointer;
  }
</style>