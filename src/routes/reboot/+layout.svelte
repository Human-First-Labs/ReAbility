<script lang="ts">
	import { page } from '$app/state';
	import type { LayoutProps } from '../$types';

	let { children }: LayoutProps = $props();
</script>

<div class="normal">
	<a href="/reboot/physical-changes" class="menu-link">
		<h5 class="menu-item">Physical Changes</h5>
	</a>
	<a href="/reboot/adaptations" class="menu-link">
		<h5 class="menu-item">Adaptations</h5>
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
