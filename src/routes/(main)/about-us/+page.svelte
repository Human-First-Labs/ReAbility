<script lang="ts">
	import { slide } from 'svelte/transition';
</script>

<div in:slide={{ duration: 500 }} out:slide={{ duration: 500 }} class="fullscreen column">
	<p>Life changing injury is hard.</p>
	<p>
		It comes without warning, and it forces you to learn and adapt, while simultaneously grieving
		what was lost.
	</p>
	<p>It can be isolating and overwhelming, but it can be overcome.</p>
	<p>
		ReAbility.mt is a place where people who are going through life changing injury can find
		information, resources and hopefully also community. We also want ReAbility.mt to be a place
		where everyone can learn and understand more about different types of injuries and how they can
		affect people, so that we can all be more understanding and supportive.
	</p>
	<p>
		Not all life changing injury is equal, and not all people are affected in the same way.
		Currently ReAbility.mt is focused on SCI (Spinal Chord Injury), but if you have a different type
		of injury and would like to share your story, please <a
			class="basic-a"
			href="/reach-out/contact-us">get in touch</a
		>.
	</p>
</div>

<style>
	.fullscreen {
		width: 100%;
		gap: 10px;
		padding: 10px 0;
	}
</style>
