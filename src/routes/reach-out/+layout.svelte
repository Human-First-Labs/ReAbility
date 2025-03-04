<script lang="ts">
	import { page } from '$app/state';
	import type { LayoutProps } from '../$types';

	let { children }: LayoutProps = $props();
</script>

<div class="normal">
	<a href="/reach-out/buy-merch" class="menu-link">
		<h5 class="menu-item">Buy Merch</h5>
	</a>
	<a href="/reach-out/contact-us" class="menu-link">
		<h5 class="menu-item">Contact Us</h5>
	</a>
	<a href="/reach-out/share-what-we-do" class="menu-link">
		<h5 class="menu-item">Share What We Do</h5>
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
