<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, slide } from 'svelte/transition';
	import IconCaret from '~icons/mdi/caret';
	import IconButton from './toolkit/IconButton.svelte';
	import Link from './toolkit/Link.svelte';
	import Text from './toolkit/Text.svelte';
	import TargetDiv from './toolkit/TargetDiv.svelte';

	let ready = $state(false);
	let open = $state<number | null>(null);

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
			title: 'Your Body',
			url: '/your-body',
			subItems: [
				{
					title: 'Autonomic Dysreflexia (AD)',
					url: '/your-body/autonomic-dysreflexia'
				},
				{
					title: 'Bowels & Bladder',
					url: '/your-body/bowels-bladder'
				},
				{
					title: 'Medical Procedures',
					url: '/your-body/medical-procedures'
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
			title: 'Services',
			url: '/services',
			subItems: [
				// {
				//     title: 'Custom Equipment Toolbox',
				//     url: '/services/custom-equipment-toolbox'
				// },
				{
					title: 'Custom Equipment Design',
					url: '/services/custom-equipment-design'
				},
				{
					title: 'Accessibility Map',
					url: '/services/accessibility-map'
				}
			]
		},
		{
			title: 'How to help',
			url: '/how-to-help',
			subItems: [
				{
					title: 'Feedback',
					url: '/how-to-help/feedback'
				},
				{
					title: 'Donate',
					url: '/how-to-help/donate'
				},
				{
					title: 'Volunteer',
					url: '/how-to-help/volunteer'
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
</script>

{#if ready}
	<header
		in:slide={{
			axis: 'y'
		}}
	>
		<div class="header-items">
			<div class="left-items">
				<Link to="/">
					<Text variant="h3">Adapt-Able</Text>
				</Link>
				<div class="nav-items">
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
		</div>
		<hr />
		{#each topbarItems as item, index}
			{#if item.subItems && index === open}
				<TargetDiv anchor={getRefById(`nav-item-${index}`)}>
					<div class="specific-card" in:slide={{ axis: 'y', duration: 800 }}>
						{#each item.subItems as subItem}
							<Link to={subItem.url}>
								<Text variant="small">{subItem.title}</Text>
							</Link>
						{/each}
					</div>
				</TargetDiv>
			{/if}
		{/each}
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
	}

	:global(main) {
		padding-top: var(--topbar-mobile-height);
	}

	.nav-item {
		display: flex;
		align-items: end;
		gap: 5px;
		height: '100%';
		padding: 10px;
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

	.nav-items {
		display: flex;
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
		gap: 5px;
		flex-direction: column;
	}

	@media (min-width: 720px) {
		header {
			height: var(--topbar-desktop-height);
		}

		:global(main) {
			padding-top: var(--topbar-desktop-height);
		}
	}
</style>
