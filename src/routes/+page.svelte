<script lang="ts">
	import Content from '$lib/Content.svelte';
	import Card from '$lib/toolkit/Card.svelte';
	import Text from '$lib/toolkit/Text.svelte';
	import { fly } from 'svelte/transition';
</script>

<Content>
	<div class="section">
		<!-- <div class="row" in:fly={{ duration: 500, x: 200 }} out:fly={{ duration: 500, x: 200 }}>
			<Text variant="h2" needsChange>Hi, I'm John</Text>
		</div> -->
		<div
			class="text-section"
			in:fly={{ duration: 500, x: 200 }}
			out:fly={{ duration: 500, x: 200 }}
		>
			<Text variant="h1" needsChange size={80} shrink noMargin>SCI Able</Text>
			<Text variant="small" needsChange shrink
				>A companion for your journey through life changing injury</Text
			>
		</div>
	</div>
	<div class="section2">
		<Text variant="h2" needsChange>What is this website?</Text>
		<div class="row">
			<div class="column">
				<Text variant="p" noMargin needsChange>
					Life changing injury is hard. It happens suddenly and forces you to deal with a situation
					that is impossible to prepare for, while simultaneously grieving the loss of the life you
					once knew. It is a time of great uncertainty and fear.
				</Text>
				<Text variant="p" noMargin needsChange>
					SCI Able aims to be a companion for you on this difficult journey. We provide information,
					resources, and a community of people who have been through similar experiences. We are
					here to help you navigate the challenges of life changing injury and find hope and healing
					along the way.
				</Text>
			</div>
			<div>
				<Card>Test</Card>
			</div>
		</div>
	</div>
</Content>

<style>
	.section {
		display: flex;
		height: 600px;
		box-sizing: border-box;
		background-color: var(--primary-color);
		color: white;
		justify-content: center;
		align-items: center;
	}

	.text-section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.section2 {
		display: flex;
		flex-direction: column;
		height: 600px;
		box-sizing: border-box;
		padding: 20px;
	}

	.row {
		display: flex;
		flex-direction: row;
		gap: 50px;
	}

	.column {
		display: flex;
		flex-direction: column;
		width: 50%;
		gap: 10px;
	}
</style>
