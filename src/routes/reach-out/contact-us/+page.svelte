<script lang="ts">
	import { slide } from 'svelte/transition';
	import type { PageProps } from './$types';
	import { getContent } from '$lib/text-translator/translator-state.svelte';
	import { get } from 'svelte/store';

	let { form }: PageProps = $props();
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
		<form method="POST" action="?/sendEmail">
			<div class="form-div column">
				<input
					class="basic-field"
					type="text"
					placeholder={getContent('contact-name')}
					name="name"
					required
				/>
				{#if form?.missing?.includes('name')}
					<p class="error">{getContent('contact-required')}</p>
				{/if}
				<input
					class="basic-field"
					type="email"
					placeholder={getContent('contact-email')}
					name="emailAddress"
					required
				/>
				{#if form?.missing?.includes('emailAddress')}
					<p class="error">{getContent('contact-required')}</p>
				{/if}
				<input
					class="basic-field"
					type="text"
					placeholder={getContent('contact-subject')}
					name="subject"
					required
				/>
				{#if form?.missing?.includes('subject')}
					<p class="error">{getContent('contact-required')}</p>
				{/if}
				<textarea
					class="basic-field"
					placeholder={getContent('contact-message')}
					name="message"
					rows={10}
					required
				></textarea>
				{#if form?.missing?.includes('message')}
					<p class="error">{getContent('contact-required')}</p>
				{/if}
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
