<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { PageProps } from './$types';

	let { form }: PageProps = $props();
</script>

<div in:slide={{ duration: 500 }} out:slide={{ duration: 500 }} class="fullscreen column">
	<p>Get in touch!</p>
	<p>
		We're always trying to do better, and there we believe there is no better way to improve than
		receiving feedback. Please feel free to reach out to us with any questions, comments, or
		concerns you may have. We will do our best to respond to you as soon as possible.
	</p>
	<p>We wouldn't mind a pat on the back either!</p>
	{#if form?.success}
		<p class="success">Email Sent! Thanks for reaching out!</p>
	{:else}
		<form method="POST" action="?/sendEmail">
			<div class="form-div column">
				<input class="hfl-field" type="text" placeholder="Name" name="name" required />
				{#if form?.missing?.includes('name')}
					<p class="error">Name is required</p>
				{/if}
				<input
					class="hfl-field"
					type="email"
					placeholder="Email Address"
					name="emailAddress"
					required
				/>
				{#if form?.missing?.includes('emailAddress')}
					<p class="error">Email Address is required</p>
				{/if}
				<input class="hfl-field" type="text" placeholder="Subject" name="subject" required />
				{#if form?.missing?.includes('subject')}
					<p class="error">Subject is required</p>
				{/if}
				<textarea class="hfl-field" placeholder="Message" name="message" rows={10} required
				></textarea>
				{#if form?.missing?.includes('message')}
					<p class="error">Message is required</p>
				{/if}
				<div class="row action-row">
					<button type="reset" class="hfl-button normal-button"> Clear </button>
					<button type="submit" class="hfl-button normal-button"> Send </button>
				</div>
				{#if form?.fullError}
					<p class="error">{form.message}</p>
				{/if}
			</div>
		</form>
	{/if}
</div>

<style>
	input,
	textarea {
		width: 100%;
	}

	.fullscreen {
		width: 100%;
		gap: 10px;
		padding: 10px 0;
	}

	.form-div {
		gap: 15px;
	}

	.action-row {
		gap: 15px;
	}

	.error {
		color: red;
		font-size: 0.8rem;
	}

	.success {
		color: green;
		font-size: 1.2rem;
		text-align: center;
	}
</style>
