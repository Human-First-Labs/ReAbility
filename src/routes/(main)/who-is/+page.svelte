<script lang="ts">
	import { credits } from '$lib/content/credits';
	import { chooseLanguage, getContent } from '$lib/text-translator/translator-state.svelte';
	import { slide } from 'svelte/transition';
</script>

<div in:slide={{ duration: 500 }} out:slide={{ duration: 500 }} class="fullscreen column">
	<p>{getContent('who-is-part-1')}</p>
	{#each credits as credit}
		{#snippet markdown()}
			{@html chooseLanguage(credit.bioHTML)}
		{/snippet}

		<div class="credit">
			<h4>
				{credit.name} / {chooseLanguage(credit.excerpt)}
			</h4>
			{@render markdown()}
		</div>
	{/each}
	<p>
		{getContent('who-is-part-2')}
		<a class="basic-a" href="/reach-out/contact-us">
			{getContent('who-is-part-3')}
		</a>
	</p>
</div>

<style>
	.fullscreen {
		width: 100%;
		gap: 10px;
		padding: 10px 0;
	}

	.credit {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 10px;
		border-radius: 5px;
		border: 1px solid var(--secondary-color);
		/* background-color: var(--secondary-color);
		color: var(--primary-color); */
	}

	.basic-a {
		color: var(--secondary-color);
	}
</style>
