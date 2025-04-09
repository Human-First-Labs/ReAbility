<script lang="ts">
	import { getCurrentLanguage, toggleCurrentLanguage } from './translator-state.svelte';
	import type { Language } from './types';

	let {
		setLanguageCookie
	}: {
		setLanguageCookie: (lang: Language) => void;
	} = $props();

	let currentLanguage = $derived.by(getCurrentLanguage);
</script>

<button
	onclick={() => {
		const current = toggleCurrentLanguage();
		setLanguageCookie(current);
	}}
	class="hidden-button hfl-button"
	style="gap: 2px"
>
	<span class={currentLanguage === 'mt' ? 'selected-lang' : undefined}>MT</span>|
	<span class={currentLanguage === 'en' ? 'selected-lang' : undefined}>EN</span>
</button>

<style>
	.selected-lang {
		text-decoration: underline;
	}
</style>
