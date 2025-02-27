<script lang="ts">
	import Link from './toolkit/Link.svelte';
	import { version } from '$app/environment';
</script>

<footer>
	<div>
		<small>{version}</small>
	</div>
	<div class="right-stuff">
		<small>Built with the aid of <Link to="/">Human First Labs (HFL)</Link></small>
	</div>
</footer>

<style>
	footer {
		position: absolute;
		bottom: 0;
		display: flex;
		background-color: var(--primary-color);
		width: 100%;
		align-items: center;
		justify-content: space-between;
		padding: 20px;
	}

	.right-stuff {
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
