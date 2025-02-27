<script lang="ts">
	import { fly } from 'svelte/transition';
</script>

<div class="absolute" in:fly={{ x: 50, duration: 500 }} out:fly={{ x: -50, duration: 500 }}>
	<a href="/reboot/physical-changes">
		<h5 class="menu-item">Physical Changes</h5>
	</a>
	<a href="/reboot/adaptations">
		<h5 class="menu-item">Adaptations</h5>
	</a>
</div>

<style>
	.absolute {
		position: absolute;
		flex-direction: column;
		gap: 10px;
	}
</style>
