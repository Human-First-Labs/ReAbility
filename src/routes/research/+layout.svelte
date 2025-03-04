<script lang="ts">
	import { page } from '$app/state';
	import type { LayoutProps } from '../$types';

	let { children }: LayoutProps = $props();
</script>

<div class="normal">
	<a href="/research/wheelchairs" class="menu-link">
		<h5 class="menu-item">Wheelchairs</h5>
	</a>
	<a href="/research/wav" class="menu-link">
		<h5 class="menu-item">Wheelchair Accessible Vehicles (WAV)</h5>
	</a>
	{@render children()}
</div>

<style>
	.menu-link {
		width: fit-content;
	}

	.normal {
		flex-direction: column;
		align-items: flex-end;
		gap: 10px;
		width: 100%;
	}
</style>
