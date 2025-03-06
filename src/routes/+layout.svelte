<script lang="ts">
	import SupabaseLayout from '$lib/supabase/SupabaseLayout.svelte';
	import type { LayoutProps } from './$types';
	import '../lib/toolkit/default-hfl.css';
	import '../lib/project.css';
	import Footer from '$lib/Footer.svelte';
	import MainLayout from '$lib/MainLayout.svelte';
	import SimpleTopbar from '$lib/SimpleTopbar.svelte';

	const appName = 'Reability';

	let { children, ...restOfProps }: LayoutProps = $props();
</script>

<svelte:head>
	<title>{appName}</title>
	<meta name="description" content="through Adaptability" />
</svelte:head>

<SupabaseLayout {...restOfProps}>
	<div class="fullscreen">
		<SimpleTopbar />
		<MainLayout>
			{@render children()}
		</MainLayout>
		<Footer />
	</div>
</SupabaseLayout>

<style>
	.fullscreen {
		height: 100vh;
		width: 100vw;
	}
</style>
