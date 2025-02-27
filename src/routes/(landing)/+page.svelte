<script lang="ts">
	import { fly } from 'svelte/transition';
</script>

<div class="absolute" in:fly={{ x: 50, duration: 500 }} out:fly={{ x: -50, duration: 500 }}>
	<a href="/about-us">
		<h5 class="menu-item">About us</h5>
	</a>
</div>

<style>
	.absolute {
		position: absolute;
		flex-direction: column;
		gap: 10px;
	}
</style>
