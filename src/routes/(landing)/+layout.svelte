<script lang="ts">
	import Content from '$lib/toolkit/Content.svelte';
	import type { LayoutProps } from '../$types';
	import Arrow from '$lib/Arrow.svelte';
	import { page } from '$app/state';
	import { navigationOrder } from '$lib/content/util';
	import { flyIn, flyOut, type FlyDirection } from '$lib/transition';
	import { swipe } from 'svelte-gestures';
	import { goto } from '$app/navigation';

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
		let index = navigationOrder.indexOf(page.url.pathname);
		if (index === 0) {
			return navigationOrder[navigationOrder.length - 1];
		} else {
			return navigationOrder[index - 1];
		}
	});

	let next = $derived.by(() => {
		let index = navigationOrder.indexOf(page.url.pathname);
		if (index === navigationOrder.length - 1) {
			return navigationOrder[0];
		} else {
			return navigationOrder[index + 1];
		}
	});

	let direction = $state<FlyDirection>('right');

	let { children }: LayoutProps = $props();
</script>

<Content>
	<div
		class="fullscreen"
		use:swipe={() => ({ timeframe: 300, minSwipeDistance: 60 })}
		onswipe={(event) => {
			if (event.detail.direction === 'left') {
				direction = 'right';
				goto(next);
			} else {
				direction = 'left';
				goto(previous);
			}
		}}
	>
		{#if !landingPage.hidden}
			<div class="text-center">
				<div class="column menu-items">
					{#each navigationOrder.filter((order) => order) as title}
						{#if title === page.url.pathname}
							<div class="relative" in:flyIn={direction} out:flyOut={direction}>
								{@render children()}
							</div>
						{/if}
					{/each}
					<hr class="divider" />
				</div>
				<div class="row first-row">
					<div class="row center">
						<a class="big-icon before" href={`${previous}`} onclick={() => (direction = 'left')}>
							<Arrow />
						</a>
						<h1 class="big-text">RE</h1>
						<div class="relative-2">
							{#each navigationOrder.filter((order) => order) as title}
								{#if title === page.url.pathname}
									<h1
										class="big-text outlined-text absolute"
										in:flyIn={direction}
										out:flyOut={direction}
									>
										{landingPage.word}
									</h1>
								{/if}
							{/each}
						</div>
					</div>

					<a class="big-icon" href={`${next}`} onclick={() => (direction = 'right')}>
						<Arrow />
					</a>
				</div>
				<div class="row center">
					<div class="hidden big-icon">
						<Arrow />
					</div>
					<h1 class="big-text">ABILITY</h1>
				</div>
			</div>
		{:else}
			{@render children()}
		{/if}
	</div>
</Content>

<style>
	.fullscreen {
		height: 100vh;
		width: 100vw;
		background-color: var(--primary-color);
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
		height: fit-content;
	}

	.big-text {
		margin: 0;
		font-size: 10vw;
		font-weight: 800;
	}

	.text-center {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
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
		margin-right: 10px;
	}

	.hidden {
		visibility: hidden;
		margin-right: 10px;
	}

	.absolute {
		position: absolute;
	}

	@media screen and (min-width: 1200px) {
		.big-text {
			font-size: 10em;
		}

		.big-icon {
			font-size: 10em;
		}
	}
</style>
