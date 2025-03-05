<script lang="ts">
	import Content from '$lib/toolkit/Content.svelte';
	import Arrow from '$lib/Arrow.svelte';
	import { page } from '$app/state';
	import { navigationOrder, siteSections, type SiteSection } from '$lib/content/util';
	import { flyIn, flyOut, type FlyDirection } from '$lib/transition';
	import { swipe } from 'svelte-gestures';
	import { goto } from '$app/navigation';
	import type { LayoutProps } from '../routes/$types';
	import { fade } from 'svelte/transition';

	let pageState = $derived.by<{
		word: string;
		main: boolean;
	}>(() => {
		if (page.url.pathname.includes('/resources')) {
			return {
				word: 'SOURCES',
				main: page.url.pathname === '/resources'
			};
		} else if (page.url.pathname.includes('/reach-out')) {
			return {
				word: 'ACH OUT',
				main: page.url.pathname === '/reach-out'
			};
		} else if (page.url.pathname.includes('/reboot')) {
			return {
				word: 'BOOT',
				main: page.url.pathname === '/reboot'
			};
		} else if (page.url.pathname.includes('/research')) {
			return {
				word: 'SEARCH',
				main: page.url.pathname === '/research'
			};
		}
		if (page.url.pathname === '/') {
			return {
				main: true,
				word: ''
			};
		} else {
			return {
				main: false,
				word: ''
			};
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

	let currentNavSection: SiteSection = $derived.by(() => {
		const splitUrl = page.url.pathname.split('/');

		if (siteSections.includes(splitUrl[1] as SiteSection)) {
			return splitUrl[1] as SiteSection;
		} else {
			return '';
		}
	});

	let { children }: Omit<LayoutProps, 'data'> = $props();
</script>

<Content>
	<div
		class="fullscreen"
		use:swipe={() => (pageState.main ? { timeframe: 300, minSwipeDistance: 60 } : {})}
		onswipe={pageState.main
			? (event) => {
					if (event.detail.direction === 'left') {
						direction = 'right';
						goto(next);
					} else {
						direction = 'left';
						goto(previous);
					}
				}
			: undefined}
	>
		<div class="text-center">
			<div class={['relative', pageState.main ? 'minimum-height' : undefined]}>
				{#each navigationOrder.filter((order) => order) as title}
					{#if title.split('/')[1] === currentNavSection}
						<div in:flyIn={direction} out:flyOut={direction} class="full-width">
							{@render children()}
						</div>
					{/if}
				{/each}
			</div>
			<hr class="divider" />
			<div class="row first-row">
				<div class="row center">
					<a
						class={[
							'big-icon',
							'back-icon',
							'before',
							!pageState.main ? 'before-hidden' : undefined
						]}
						href={`${previous}`}
						onclick={() => (direction = 'left')}
					>
						<Arrow />
					</a>
					<h1 class="big-text">RE</h1>
					<div class="relative-2">
						{#each navigationOrder.filter((order) => order) as title}
							{#if title.split('/')[1] === currentNavSection}
								<h1 class="big-text outlined-text" in:flyIn={direction} out:flyOut={direction}>
									{pageState.word}
								</h1>
							{/if}
						{/each}
					</div>
				</div>

				{#if pageState.main}
					<a
						class="big-icon"
						href={`${next}`}
						in:fade={{
							duration: 500
						}}
						out:fade={{
							duration: 500
						}}
						onclick={() => (direction = 'right')}
					>
						<Arrow />
					</a>
				{/if}
			</div>
			<div class="row center">
				<div class="hidden big-icon">
					<Arrow />
				</div>
				<!-- {#if (page.url.pathname === '/' && pageState.main) || currentNavSection === ''}
					in:fade={{
						duration: 500
					}}
					out:fade={{
						duration: 500
					}} -->
				<h1 class="big-text">ABILITY</h1>
				<!-- {:else}
					<h1 class="hidden big-text">-</h1>
				{/if} -->
			</div>
		</div>
	</div>
</Content>

<style>
	.fullscreen {
		height: 100vh;
		width: 100vw;
		background-color: var(--primary-color);
		align-items: center;
		justify-content: center;
		padding: var(--topbar-mobile-height) 0;
	}

	.relative {
		position: relative;
		width: 100%;
		align-items: end;
		justify-content: end;
	}

	.minimum-height {
		min-height: 160px;
	}

	.relative-2 {
		position: relative;
		width: 100%;
		align-items: center;
	}

	.big-text {
		margin: 0;
		font-size: 10vw;
		font-weight: 800;
	}

	.full-width {
		width: 100%;
	}

	.text-center {
		width: 80%;
		flex-direction: column;
		max-height: 100%;
		overflow-y: auto;
		overflow-x: hidden;
	}

	::-webkit-scrollbar {
		display: none;
	}

	::-webkit-scrollbar-thumb {
		display: none;
	}

	::-webkit-scrollbar-corner {
		display: none;
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
		margin-right: 10px;
		transition: opacity 0.5s;
		opacity: 1;
	}

	.before-hidden {
		opacity: 0;
		pointer-events: none;
	}

	.hidden {
		visibility: hidden;
		margin-right: 10px;
	}

	@media screen and (min-width: 1200px) {
		.big-text {
			font-size: 6em;
		}
	}
</style>
