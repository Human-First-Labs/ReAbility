<script lang="ts">
	import { slide } from 'svelte/transition';
</script>

<div in:slide={{ duration: 500 }} out:slide={{ duration: 500 }} class="fullscreen column"></div>

<style>
	.fullscreen {
		width: 100%;
		gap: 10px;
		padding: 10px 0;
	}
</style>
