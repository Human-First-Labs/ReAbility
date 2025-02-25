<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import Link from './toolkit/Link.svelte';

	let ready = $state(false);
	onMount(() => (ready = true));

	let innerHeight = $state(0);
</script>

<svelte:window bind:innerHeight />

{#if ready}
	<footer
		in:slide={{
			axis: 'y'
		}}
	>
		<div></div>
		<div class="right-stuff">
			<small>Built with the aid of <Link to="/">Human First Labs (HFL)</Link></small>
		</div>
	</footer>
{/if}

<style>
	footer {
		display: flex;
		background-color: white;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		padding: 20px 0;
	}

	.right-stuff {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 20px;
	}
</style>
