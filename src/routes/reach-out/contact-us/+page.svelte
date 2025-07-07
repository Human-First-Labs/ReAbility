<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { PageProps } from './$types';
	import { getContent } from '$lib/text-translator/translator-state.svelte';

	let { form }: PageProps = $props();

	let emailError = $state('');
	let nameError = $state('');
	let subjectError = $state('');
	let messageError = $state('');

	let emailAddress = $state('');
	let name = $state('');
	let subject = $state('');
	let message = $state('');

	const checkForm = (e: Event) => {
		let skip = false;

		if (!emailAddress) {
			emailError = getContent('contact-required');
			skip = true;
		} else {
			emailError = '';
		}

		if (!name) {
			nameError = getContent('contact-required');
			skip = true;
		} else {
			nameError = '';
		}

		if (!subject) {
			subjectError = getContent('contact-required');
			skip = true;
		} else {
			subjectError = '';
		}

		if (!message) {
			messageError = getContent('contact-required');
			skip = true;
		} else {
			messageError = '';
		}

		if (skip) {
			e.preventDefault();
			return false;
		}
		return true;
	};
</script>

<div in:slide={{ duration: 500 }} out:slide={{ duration: 500 }} class="fullscreen column">
	<p>{getContent('contact-part-1')}</p>
	<p>
		{getContent('contact-part-2')}
	</p>
	<p>{getContent('contact-part-3')}</p>
	{#if form?.success}
		<p class="success">{getContent('contact-part-4')}</p>
	{:else}
		<form method="POST" action="?/sendEmail" onsubmit={checkForm}>
			<div class="form-div column">
				<div class="column" style="gap: 10px;">
					<input
						class="basic-field"
						type="text"
						placeholder={getContent('contact-name')}
						name="name"
						bind:value={name}
					/>
					{#if nameError}
						<small class="error">{getContent('contact-required')}</small>
					{/if}
				</div>
				<div class="column" style="gap: 10px;">
					<input
						class="basic-field"
						type="email"
						placeholder={getContent('contact-email')}
						name="emailAddress"
						bind:value={emailAddress}
					/>
					{#if emailError}
						<small class="error">{getContent('contact-required')}</small>
					{/if}
				</div>
				<div class="column" style="gap: 10px;">
					<input
						class="basic-field"
						type="text"
						placeholder={getContent('contact-subject')}
						name="subject"
						bind:value={subject}
					/>
					{#if subjectError}
						<small class="error">{getContent('contact-required')}</small>
					{/if}
				</div>
				<div class="column" style="gap: 10px;">
					<textarea
						class="basic-field"
						placeholder={getContent('contact-message')}
						name="message"
						rows={10}
						bind:value={message}
					></textarea>
					{#if messageError}
						<small class="error">{getContent('contact-required')}</small>
					{/if}
				</div>
				<div class="row action-row">
					<button type="reset" class="basic-button normal-button">
						{getContent('contact-clear')}
					</button>
					<button type="submit" class="basic-button normal-button">
						{getContent('contact-submit')}
					</button>
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
