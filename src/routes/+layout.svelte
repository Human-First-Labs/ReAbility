<script lang="ts">
	import SupabaseLayout from "$lib/supabase/SupabaseLayout.svelte";
	import type { LayoutProps } from "./$types";
	import '../lib/default-hfl.css';
	import Topbar from "$lib/Topbar.svelte";
	// import { page } from "$app/state";

	const appName = "Adapt-Able";
	// const { url } = page

	// const title = $derived([appName, ...url.pathname.split("/").slice(1)].filter(Boolean).join(" - "))

    let { children, ...restOfProps }: LayoutProps = $props()
</script>

<svelte:head>
	<title>{appName}</title>
	<meta name="description" content="The Adapt-Able Web App" />
</svelte:head>

<SupabaseLayout {...restOfProps}>
	<Topbar/>
	{@render children()}
</SupabaseLayout>