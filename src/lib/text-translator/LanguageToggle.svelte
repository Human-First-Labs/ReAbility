<script lang="ts">
	import { getCurrentLanguage, toggleCurrentLanguage } from './translator-state.svelte';

	let currentLangauge = $derived.by(getCurrentLanguage);
</script>

<button onclick={toggleCurrentLanguage}>
	<span class={currentLangauge === 'mt' ? 'selected-lang' : undefined}>MT</span>
	<span class={currentLangauge === 'en' ? 'selected-lang' : undefined}>EN</span>
</button>

<style>
	button {
		background-color: transparent;
		cursor: pointer;
		border: 0;
		border-radius: 2em;
		font-weight: 700;
	}

	.selected-lang {
		text-decoration: underline;
	}
</style>
