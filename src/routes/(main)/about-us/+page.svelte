<script lang="ts">
	import { slide } from 'svelte/transition';
</script>

<div in:slide={{ duration: 500 }} out:slide={{ duration: 500 }} class="fullscreen">
	<p>Hi this is the about us content</p>
</div>

<style>
	.fullscreen {
		height: 40vh;
		width: 100%;
	}
</style>
