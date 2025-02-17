<script lang="ts">
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import IconCaret from '~icons/mdi/caret';
	import IconMenu from '~icons/mdi/menu';
	import IconButton from './toolkit/IconButton.svelte';
	import Link from './toolkit/Link.svelte';
	import Text from './toolkit/Text.svelte';
	import TargetDiv from './toolkit/TargetDiv.svelte';
	import Cover from './toolkit/Cover.svelte';
	import { browser } from '$app/environment';
	import { clickOutside } from './toolkit/actions.svelte';
	import { afterNavigate } from '$app/navigation';

	let ready = $state(false);
	let open = $state<number | null>(null);
	let sidebar = $state(false);
	let innerWidth = $state(browser ? window.innerWidth : 0);

	onMount(() => (ready = true));

	interface NavItem {
		title: string;
		url: string;
		subItems?: Omit<NavItem, 'subItems'>[];
	}

	const topbarItems: NavItem[] = [
		{
			title: 'Gov. Services',
			url: '/gov-services'
		},
		{
			title: 'Therapies',
			url: '/therapies',
			subItems: [
				{
					title: 'Physical Therapy (PT)',
					url: '/therapies/physical-therapy'
				},
				{
					title: 'Occupational Therapy (OT)',
					url: '/therapies/occupational-therapy'
				},
				{
					title: 'Psychotherapy',
					url: '/therapies/psychotherapy'
				}
			]
		},
		{
			title: 'Physical Changes',
			url: '/physical-changes',
			subItems: [
				{
					title: 'Autonomic Dysreflexia (AD)',
					url: '/physical-changes/autonomic-dysreflexia'
				},
				{
					title: 'Bowels & Bladder',
					url: '/physical-changes/bowels-bladder'
				},
				{
					title: 'Medical Procedures',
					url: '/physical-changes/medical-procedures'
				}
			]
		},
		{
			title: 'Tools',
			url: '/tools',
			subItems: [
				{
					title: 'Wheelchairs',
					url: '/tools/wheelchairs'
				},
				{
					title: 'Adaptive Equipment',
					url: '/tools/adaptive-equipment'
				}
			]
		},
		{
			title: 'PAs & Caregivers',
			url: '/pas-caregivers'
		},
		{
			title: 'How we can help',
			url: '/how-we-help',
			subItems: [
				{
					title: 'Custom Equipment Design',
					url: '/how-we-help/custom-equipment-design'
				},
				{
					title: 'Accessibility Map',
					url: '/how-we-help/accessibility-map'
				},
				{
					title: 'Accessibility Transport',
					url: '/how-we-help/accessibility-transport'
				},
				{
					title: 'Support Groups',
					url: '/how-we-help/support-groups'
				}
			]
		},
		{
			title: 'How you can help',
			url: '/how-you-help',
			subItems: [
				{
					title: 'Feedback',
					url: '/how-you-help/feedback'
				},
				{
					title: 'Donate',
					url: '/how-you-help/donate'
				},
				{
					title: 'Volunteer',
					url: '/how-you-help/volunteer'
				}
			]
		}
	];

	const getRefById = (id: string) => {
		const ref = document.getElementById(id);

		if (!ref) {
			throw new Error('Could not find Id!');
		}

		return ref;
	};

	$effect(() => {
		if (innerWidth > 1000) {
			sidebar = false;
		}
	});

	afterNavigate(() => {
		open = null;
		sidebar = false;
	});
</script>

<svelte:window bind:innerWidth />

{#if ready}
	<header
		in:slide={{
			axis: 'y'
		}}
		use:clickOutside={{
			callbackFunction: () => {
				open = null;
			}
		}}
	>
		<div class="header-items">
			<div class="left-items">
				<Link to="/">
					<Text variant="h3">SCI Able</Text>
				</Link>
				<div class={['nav-items', 'hide-on-mobile']}>
					{#each topbarItems as item, index}
						<div
							class={['nav-item', `${index === open ? 'selected' : ''}`]}
							id={`nav-item-${index}`}
						>
							<Link to={item.url}>
								<Text variant="small">{item.title}</Text>
							</Link>
							{#if item.subItems}
								<IconButton onClick={() => (open = index)}>
									<IconCaret
										style={`transform: rotate(${index !== open ? '90' : '180'}deg); transition: transform 0.5s;`}
									/>
								</IconButton>
							{/if}
						</div>
					{/each}
				</div>
			</div>
			<div class={['right-items', 'show-on-mobile']}>
				<IconButton onClick={() => (sidebar = !sidebar)}>
					<IconMenu style="color: var(--primary-color)" />
				</IconButton>
			</div>
		</div>
		{#if sidebar}
			<Cover>
				<div
					class={['show-on-mobile', 'sidenav']}
					in:slide={{ axis: 'x' }}
					out:slide={{ axis: 'x' }}
					use:clickOutside={{
						callbackFunction: () => {
							sidebar = false;
						},
						skipFirst: true
					}}
				>
					{#each topbarItems as item, index}
						<div class="sidenav-button">
							<Link to={item.url}>
								<Text>{item.title}</Text>
							</Link>
							{#if item.subItems}
								<IconButton onClick={() => (open = index)}>
									<IconCaret
										style={`transform: rotate(${index !== open ? '90' : '180'}deg); transition: transform 0.5s;`}
									/>
								</IconButton>
							{/if}
						</div>
						{#if open === index && item.subItems}
							<div class="sidenav-subitems" in:slide={{ axis: 'y' }} out:slide={{ axis: 'y' }}>
								{#each item.subItems as subItem}
									<Link to={subItem.url}>
										<Text variant="small">{subItem.title}</Text>
									</Link>
								{/each}
							</div>
						{/if}
					{/each}
				</div>
			</Cover>
		{:else}
			{#each topbarItems as item, index}
				{#if item.subItems && index === open}
					<TargetDiv anchor={getRefById(`nav-item-${index}`)}>
						<!-- svelte-ignore event_directive_deprecated -->
						<div
							class="specific-card"
							in:slide={{ axis: 'y', duration: 800 }}
							out:slide={{ axis: 'y', duration: 800 }}
						>
							{#each item.subItems as subItem}
								<Link to={subItem.url}>
									<Text variant="small">{subItem.title}</Text>
								</Link>
							{/each}
						</div>
					</TargetDiv>
				{/if}
			{/each}
		{/if}
	</header>
{/if}

<style>
	header {
		display: flex;
		top: 0;
		position: absolute;
		background-color: white;
		height: var(--topbar-mobile-height);
		width: 100%;
		align-items: center;
		transition: all 0.5s;
	}

	:global(main) {
		padding-top: var(--topbar-mobile-height);
	}

	.nav-item {
		display: flex;
		align-items: center;
		height: '100%';
		padding: 5px;
	}

	.header-items {
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 0 2rem;
	}

	.left-items {
		display: flex;
		align-items: center;
	}

	.right-items {
		align-items: center;
	}

	.nav-items {
		padding: 0 30px;
		gap: 25px;
	}
	.selected {
		background-color: var(--background-color);
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		/* box-shadow: -8px 12px 20px 0 rgba(25, 42, 70, 0.13); */
	}

	.specific-card {
		display: flex;
		flex-direction: column;
		background-color: var(--background-color);
		/* box-shadow: -8px 12px 20px 0 rgba(25, 42, 70, 0.13); */
		border-top-right-radius: 10px;
		border-bottom-right-radius: 10px;
		border-bottom-left-radius: 10px;
		padding: 10px;
		display: flex;
		gap: 15px;
		flex-direction: column;
	}

	.sidenav {
		box-sizing: border-box;
		position: absolute;
		top: 0;
		right: 0;
		width: 300px;
		height: 100vh;
		background-color: white;
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;
		padding: 20px;
		display: flex;
		flex-direction: column;
		-webkit-box-shadow: -24px 0px 28px -4px rgba(0, 0, 0, 0.2);
		-moz-box-shadow: -24px 0px 28px -4px rgba(0, 0, 0, 0.2);
		box-shadow: -24px 0px 28px -4px rgba(0, 0, 0, 0.2);
	}

	.sidenav-button {
		width: 100%;
		display: flex;
		align-items: center;
		padding: 10px;
		justify-content: space-between;
	}

	.sidenav-subitems {
		width: 100%;
		display: flex;
		padding: 10px;
		flex-direction: column;
		gap: 5px;
	}

	.hide-on-mobile {
		display: none;
	}
	.show-on-mobile {
		display: flex;
	}

	@media (min-width: 1000px) {
		.hide-on-mobile {
			display: flex;
		}

		.show-on-mobile {
			display: none;
		}

		header {
			height: var(--topbar-desktop-height);
		}

		:global(main) {
			padding-top: var(--topbar-desktop-height);
		}
	}
</style>
