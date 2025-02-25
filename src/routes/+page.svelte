<script lang="ts">
	import Content from '$lib/toolkit/Content.svelte';
	import Card from '$lib/toolkit/Card.svelte';

	import { fly } from 'svelte/transition';
</script>

<Content>
	<div class="section">
		<div
			class="text-section"
			in:fly={{ duration: 500, x: 200 }}
			out:fly={{ duration: 500, x: 200 }}
		>
			<h1 class="main-title">ReAbility</h1>
			<small class="main-subtitle">through Adaptability</small>
		</div>
	</div>
	<div class="section2">
		<h2 class="section-title">What is this website?</h2>
		<div class="row">
			<div class="column">
				<p>
					Life changing injury is hard. It happens suddenly and forces you to deal with a situation
					that is impossible to prepare for, while simultaneously grieving the loss of the life you
					once knew. It is a time of great uncertainty and fear.
				</p>
				<p>
					ReAbility aims to be a companion for you on this difficult journey. We provide
					information, resources, and a community of people who have been through similar
					experiences. We are here to help you navigate the challenges of life changing injury and
					find hope and healing along the way.
				</p>
			</div>
			<div>
				<Card>Test</Card>
			</div>
		</div>
	</div>
</Content>

<style>
	.main-title {
		font-style: italic;
		width: fit-content;
		margin: 0;
		font-size: 80px;
	}

	.main-subtitle {
		width: fit-content;
		font-style: italic;
	}

	.section-title {
		font-style: italic;
	}

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
