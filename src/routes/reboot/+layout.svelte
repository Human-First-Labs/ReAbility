<script lang="ts">
	import type { LayoutProps } from '../$types';

	let { children }: LayoutProps = $props();
</script>

<div class="absolute">
	<a href="/reboot/physical-changes">
		<h5 class="menu-item">Physical Changes</h5>
	</a>
	<a href="/reboot/adaptations">
		<h5 class="menu-item">Adaptations</h5>
	</a>
</div>

{@render children()}

<style>
	.absolute {
		position: absolute;
		flex-direction: column;
		gap: 10px;
	}
</style>
