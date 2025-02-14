<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import Link from './toolkit/Link.svelte';
	import Text from './toolkit/Text.svelte';

	let ready = $state(false);

	let innerHeight = $state(0);

	onMount(() => (ready = true));
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
			<Text variant="small">Proudly built with <Link to="/">Human First Labs (HFL)</Link></Text>
		</div>
	</footer>
{/if}

<style>
	footer {
		display: flex;
		bottom: 0;
		position: absolute;
		background-color: white;
		height: var(--footer-mobile-height);
		width: 100%;
		align-items: center;
		justify-content: space-between;
	}

	:global(main) {
		padding-bottom: var(--footer-mobile-height);
	}

	.right-stuff {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 20px;
	}

	@media (min-width: 720px) {
		footer {
			height: var(--footer-desktop-height);
		}

		:global(main) {
			padding-bottom: var(--footer-desktop-height);
		}
	}
</style>
