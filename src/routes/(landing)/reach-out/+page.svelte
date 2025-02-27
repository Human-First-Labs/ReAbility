<script lang="ts">
	import { fly } from 'svelte/transition';
</script>

<div class="absolute" in:fly={{ x: 50, duration: 500 }} out:fly={{ x: -50, duration: 500 }}>
	<a href="/reach-out/buy-merch">
		<h5 class="menu-item">Buy Merch</h5>
	</a>
	<a href="/reach-out/contact-us">
		<h5 class="menu-item">Contact Us</h5>
	</a>
	<a href="/reach-out/share-what-we-do">
		<h5 class="menu-item">Share What We Do</h5>
	</a>
</div>

<style>
	.absolute {
		position: absolute;
		flex-direction: column;
		gap: 10px;
	}
</style>
