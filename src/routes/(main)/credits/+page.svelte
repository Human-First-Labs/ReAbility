<script lang="ts">
	import { slide } from 'svelte/transition';
</script>

<div in:slide={{ duration: 500 }} out:slide={{ duration: 500 }} class="fullscreen column">
	<p>
		Reability.mt is nothing without the people that work hard build and expand what it can do for
		other people.
	</p>
	<p>
		Be it the information that is provided, the services that are offered, or the people that help
		make it a reality, Reability.mt is a community effort that is always looking to improve and
		expand. Therefore, we've built this small space so we can thank all the people that have
		contributed to Reability.mt in one way or another.
	</p>
	<!-- <p>{getContent('what-is-part-3')}</p>
	<p>
		{getContent('what-is-part-4')}
	</p>
	<p>
		{getContent('what-is-part-5')}
		<a class="basic-a" href="/reach-out/contact-us">{getContent('what-is-part-6')}</a>.
	</p> -->
</div>

<style>
	.fullscreen {
		width: 100%;
		gap: 10px;
		padding: 10px 0;
	}
</style>
