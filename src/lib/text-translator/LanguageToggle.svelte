<script lang="ts">
	import { onMount } from 'svelte';
	import {
		getCurrentLanguage,
		setInitialLanguage,
		toggleCurrentLanguage
	} from './translator-state.svelte';
	import type { Language } from './types';

	let {
		setLanguageCookie,
		loadedLanguage
	}: {
		setLanguageCookie: (lang: Language) => void;
		loadedLanguage?: Language;
	} = $props();

	let currentLangauge = $derived.by(getCurrentLanguage);

	onMount(() => {
		if (!currentLangauge) {
			setInitialLanguage(loadedLanguage);
		}
	});
</script>

<button
	onclick={() => {
		const current = toggleCurrentLanguage();
		setLanguageCookie(current);
	}}
	class="hidden-button"
>
	<span class={currentLangauge === 'mt' ? 'selected-lang' : undefined}>MT</span>
	<span class={currentLangauge === 'en' ? 'selected-lang' : undefined}>EN</span>
</button>

<style>
	.selected-lang {
		text-decoration: underline;
	}
</style>
