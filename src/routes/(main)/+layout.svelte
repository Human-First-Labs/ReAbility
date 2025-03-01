<script lang="ts">
	import type { LayoutProps } from '../(landing)/$types';

	let { children }: LayoutProps = $props();
</script>

<div class="absolute">
	<a href="/about-us">
		<h5 class="menu-item">About us</h5>
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
