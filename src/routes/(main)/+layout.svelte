<script lang="ts">
	import type { LayoutProps } from '../$types';

	let { children }: LayoutProps = $props();
</script>

<div class="normal">
	<a href="/about-us" class="menu-link">
		<h5 class="menu-item">About us</h5>
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
