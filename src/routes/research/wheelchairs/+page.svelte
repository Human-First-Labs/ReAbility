<script lang="ts">
	import { slide } from 'svelte/transition';
</script>

<div in:slide={{ duration: 500 }} out:slide={{ duration: 500 }} class="fullscreen column">
	<p>Coming Soon!</p>
</div>

<style>
	.fullscreen {
		width: 100%;
	}
</style>
