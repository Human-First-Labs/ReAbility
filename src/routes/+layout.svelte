<script lang="ts">
	import SupabaseLayout from '$lib/supabase/SupabaseLayout.svelte';
	import type { LayoutProps } from './$types';
	import '../lib/toolkit/default-hfl.css';
	import '../lib/project.css';
	import Topbar from '$lib/Topbar.svelte';
	import Footer from '$lib/Footer.svelte';

	const appName = 'Adapt-Able';

	let { children, ...restOfProps }: LayoutProps = $props();
</script>

<svelte:head>
	<title>{appName}</title>
	<meta name="description" content="The Adapt-Able Web App" />
</svelte:head>

<SupabaseLayout {...restOfProps}>
	<Topbar />
	{@render children()}
	<Footer />
</SupabaseLayout>
