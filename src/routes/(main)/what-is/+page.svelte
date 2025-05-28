<script lang="ts">
	import { getContent } from '$lib/text-translator/translator-state.svelte';
	import { slide } from 'svelte/transition';
</script>

<div in:slide={{ duration: 500 }} out:slide={{ duration: 500 }} class="fullscreen column">
	<p>{getContent('what-is-part-1')}</p>
	<p>
		{getContent('what-is-part-2')}
	</p>
	<p>{getContent('what-is-part-3')}</p>
	<p>
		{getContent('what-is-part-4')}
	</p>
	<p>
		{getContent('what-is-part-5')}
		<a class="basic-a" href="/reach-out/contact-us">{getContent('what-is-part-6')}</a>.
	</p>
</div>

<style>
	.fullscreen {
		width: 100%;
		gap: 10px;
		padding: 10px 0;
	}
</style>
