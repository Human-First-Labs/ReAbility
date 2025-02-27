<script lang="ts">
	import Content from '$lib/toolkit/Content.svelte';
	import type { LayoutProps } from '../$types';
	import Arrow from '$lib/Arrow.svelte';
	import { page } from '$app/state';
	import { fly } from 'svelte/transition';

	const order = ['', 'research', 'reboot', 'resources', 'reach-out'];

	let landingPage = $derived.by<{
		word: string;
		hidden: boolean;
	}>(() => {
		if (page.url.pathname === '/') {
			return { word: '', hidden: false };
		} else if (page.url.pathname === '/resources') {
			return { word: 'SOURCES', hidden: false };
		} else if (page.url.pathname === '/reach-out') {
			return { word: 'ACH OUT', hidden: false };
		} else if (page.url.pathname === '/reboot') {
			return { word: 'BOOT', hidden: false };
		} else if (page.url.pathname === '/research') {
			return { word: 'SEARCH', hidden: false };
		} else {
			return { word: '', hidden: true };
		}
	});

	let previous = $derived.by(() => {
		let index = order.indexOf(page.url.pathname.replace('/', ''));
		if (index === 0) {
			return order[order.length - 1];
		} else {
			return order[index - 1];
		}
	});

	let next = $derived.by(() => {
		let index = order.indexOf(page.url.pathname.replace('/', ''));
		if (index === order.length - 1) {
			return order[0];
		} else {
			return order[index + 1];
		}
	});

	let { children }: LayoutProps = $props();
</script>

<Content>
	{#if !landingPage.hidden}
		<div class="fullscreen">
			<div class="text-center">
				<div class="column menu-items">
					<div class="relative">
						{@render children()}
					</div>
					<hr class="divider" />
				</div>
				<div class="row first-row">
					<div class="row center">
						<a class="big-icon before" href={`/${previous}`}>
							<Arrow />
						</a>
						<h1 class="big-text">RE</h1>
						<div class="relative-2">
							{#each order.filter((order) => order) as title}
								{#if title === page.url.pathname.replace('/', '')}
									<h1
										class="big-text outlined-text absolute"
										in:fly={{ x: 50, duration: 500 }}
										out:fly={{ x: -50, duration: 500 }}
									>
										{landingPage.word}
									</h1>
								{/if}
							{/each}
						</div>
					</div>

					<a class="big-icon" href={`/${next}`}>
						<Arrow />
					</a>
				</div>
				<div class="row">
					<div class="hidden big-icon">
						<Arrow />
					</div>
					<h1 class="big-text">ABILITY</h1>
				</div>
			</div>
		</div>
	{:else}
		{@render children()}
	{/if}
</Content>

<style>
	.fullscreen {
		height: 100vh;
		width: 100vw;
		background-color: var(--primary-color);
		justify-content: center;
		align-items: center;
	}

	.menu-items {
		width: 95%;
		margin: auto;
	}

	.relative {
		position: relative;
		width: 100%;
		margin: auto;
		align-items: end;
		justify-content: end;
		text-align: right;
	}

	.relative-2 {
		position: relative;
		width: 100%;
		align-items: center;
	}

	/* .big-title {
		padding: 0 5%;
	} */

	.big-icon {
		font-size: 10vw;
		overflow: hidden;
		height: fit-content;
		display: flex;
	}

	.big-text {
		margin: 0;
		font-size: 8vw;
		font-weight: 800;
	}

	.text-center {
		width: 80%;
		flex-direction: column;
	}

	.divider {
		width: 100%;
		border: 0.2px solid var(--text-color);
		margin: 15px 0 15px 0;
	}

	.first-row {
		justify-content: space-between;
		align-items: center;
	}

	.center {
		align-items: center;
		width: 100%;
	}

	.before {
		rotate: 180deg;
	}

	.hidden {
		visibility: hidden;
	}

	.absolute {
		position: absolute;
	}

	@media screen and (min-width: 1200px) {
		.big-text {
			font-size: 8em;
		}

		.big-icon {
			font-size: 10em;
		}
	}
</style>
