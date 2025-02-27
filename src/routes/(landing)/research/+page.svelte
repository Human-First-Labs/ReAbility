<script lang="ts">
	import { fly } from 'svelte/transition';
</script>

<div class="absolute" in:fly={{ x: 50, duration: 500 }} out:fly={{ x: -50, duration: 500 }}>
	<a href="/research/wheelchairs">
		<h5 class="menu-item">Wheelchairs</h5>
	</a>
	<a href="/research/wav">
		<h5 class="menu-item">Wheelchair Accessible Vehicles (WAV)</h5>
	</a>
</div>

<style>
	.absolute {
		position: absolute;
		flex-direction: column;
		gap: 10px;
	}
</style>
