<script lang="ts">
	import { getCurrentLanguage, toggleCurrentLanguage } from './translator-state.svelte';

	let currentLangauge = $derived.by(getCurrentLanguage);
</script>

<button onclick={toggleCurrentLanguage} class="hidden-button">
	<span class={currentLangauge === 'mt' ? 'selected-lang' : undefined}>MT</span>
	<span class={currentLangauge === 'en' ? 'selected-lang' : undefined}>EN</span>
</button>

<style>
	.selected-lang {
		text-decoration: underline;
	}
</style>
