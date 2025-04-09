<script lang="ts">
	import { page } from '$app/state';
	import NotificationBox from '$lib/toolkit/NotificationBox.svelte';
	import { slide } from 'svelte/transition';

	let copyBox = $state(false);
</script>

<div in:slide={{ duration: 500 }} out:slide={{ duration: 500 }} class="fullscreen column">
	<p>Do you like what we do?</p>
	<p>
		Share what we do with your friends and family, and help us reach more people who might need our
		help or can help us.
	</p>
	<p>
		We are committed to never spending any money on advertising, so we can spend any donations we
		receive on what really matters. Therefore, we rely on people like you to help us spread the
		word.
	</p>
	<div class="row gapping">
		<div class="half-width column">
			<p>If you want to share this website virtually, click below to copy the link</p>
			<button
				class="hidden-button hfl-button"
				onclick={() => {
					navigator.clipboard.writeText(page.url.origin);
					copyBox = true;
				}}
			>
				Copy Site Link
			</button>
		</div>
		<div class="half-width column">
			<p>
				If you want to share this website physically, you can try downloading and printing the
				poster below
			</p>
			<a class="hfl-a" href="/reach-out/share-what-we-do" download>Download Poster</a>
		</div>
	</div>
	<p>Thank you!</p>
</div>
{#if copyBox}
	<NotificationBox position="bottom-right" period={2000} onEnd={() => (copyBox = false)}>
		<p>Link copied to clipboard</p>
	</NotificationBox>
{/if}

<style>
	.gapping {
		gap: 20px;
	}

	.fullscreen {
		width: 100%;
		gap: 10px;
		padding: 10px 0;
	}

	.half-width {
		flex: 1;
		justify-content: space-between;
		gap: 10px;
	}

	button {
		color: var(--secondary-color);
		margin: 0;
		padding: 0;
		height: fit-content;
		width: fit-content;
		font-size: 16px;
	}
</style>
