<script lang="ts">
	import { getCurrentLanguage, toggleCurrentLanguage } from './translator-state.svelte';
	import type { Language } from './types';

	export interface LanguageToggleProps {
		setLanguageCookie: (lang: Language) => void;
	}

	let { setLanguageCookie }: LanguageToggleProps = $props();

	let currentLanguage = $derived.by(getCurrentLanguage);
</script>

<button
	onclick={() => {
		const current = toggleCurrentLanguage();
		setLanguageCookie(current);
	}}
	class="hidden-button basic-button"
	style="gap: 2px"
>
	<span class={currentLanguage === 'mt' ? 'selected-lang' : undefined}>MT</span>|
	<span class={currentLanguage === 'en' ? 'selected-lang' : undefined}>EN</span>
</button>

<style>
	.basic-button {
		color: var(--text-color);
	}

	.selected-lang {
		text-decoration: underline;
	}
</style>
