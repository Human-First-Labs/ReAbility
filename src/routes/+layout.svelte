<script lang="ts">
	import SupabaseLayout from '$lib/supabase/SupabaseLayout.svelte';
	import type { LayoutProps } from './$types';
	import '../lib/toolkit/default-hfl.css';
	import '../lib/project.css';
	import Footer from '$lib/Footer.svelte';
	import MainLayout from '$lib/MainLayout.svelte';

	const appName = 'Reability';

	let { children, ...restOfProps }: LayoutProps = $props();
</script>

<svelte:head>
	<title>{appName}</title>
	<meta name="description" content="through Adaptability" />
</svelte:head>

<main>
	<SupabaseLayout {...restOfProps}>
		<!-- <Topbar /> -->
		<MainLayout>
			{@render children()}
		</MainLayout>
		<Footer />
	</SupabaseLayout>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		margin: 0;
		box-sizing: border-box;
		height: 100vh;
		overflow: auto;
	}
</style>
