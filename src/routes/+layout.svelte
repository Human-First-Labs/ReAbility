<script lang="ts">
	import SupabaseLayout from '$lib/supabase/SupabaseLayout.svelte';
	import type { LayoutProps } from './$types';
	import '../lib/toolkit/default-hfl.css';
	import '../lib/project.css';
	import Topbar from '$lib/Topbar.svelte';
	import Footer from '$lib/Footer.svelte';

	const appName = 'SCI-Able';

	let { children, ...restOfProps }: LayoutProps = $props();
</script>

<svelte:head>
	<title>{appName}</title>
	<meta name="description" content={`The ${appName} website`} />
</svelte:head>

<main>
	<SupabaseLayout {...restOfProps}>
		<Topbar />
		{@render children()}
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
