<script lang="ts">
	import Spinner from './svgs/Spinner.svelte';

	interface Props {
		/** Is this the principal call to action on the page? */
		variant?: 'primary' | 'secondary' | 'outlined';
		/** How large should the button be? */
		size?: 'small' | 'medium' | 'large';
		/** Button contents */
		label: string;
		/** The onClick event handler */
		onClick: {
			func?: () => void;
			href?: string;
		};
		/** This will make the onClick event handler not work*/
		disabled?: boolean;
		/** this will block onClick and run onLoadClick if given*/
		loading?: boolean;
		/** The onLoadClick event handler */
		onLoadClick?: () => void;
	}

	const {
		variant = 'primary',
		size = 'medium',
		label,
		onClick,
		disabled,
		loading,
		onLoadClick
	}: Props = $props();

	const onClickHandler = () => {
		if (disabled) {
			return;
		}

		if (loading) {
			onLoadClick && onLoadClick();
		} else {
			onClick.func && onClick.func();
		}
	};
</script>

{#snippet button()}
	<button
		class={[
			`${variant}`,
			`${size}`,
			{
				disabled
			}
		]}
		onclick={onClickHandler}
	>
		{#if loading}
			<Spinner />
		{:else}
			{label}
		{/if}
	</button>
{/snippet}

{#if onClick.href}
	<a href={onClick.href}>
		{@render button()}
	</a>
{:else}
	{@render button()}
{/if}

<style>
	button {
		cursor: pointer;
		border: 0;
		border-radius: 2em;
		font-weight: 700;
		font-family: var(--general-font);
	}
	.primary {
		background-color: var(--primary-color);
		color: var(--primary-contrast-color);
		fill: var(--primary-contrast-color);
		stroke: var(--primary-contrast-color);
	}
	.secondary {
		background-color: var(--secondary-color);
		color: var(--secondary-contrast-color);
		fill: var(--secondary-contrast-color);
		stroke: var(--secondary-contrast-color);
	}

	.outlined {
		box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
		background-color: transparent;
		border: var(--accent-color) 1px solid;
		color: var(--text-color);
		fill: var(--text-color);
		stroke: var(--text-color);
	}
	.small {
		padding: 10px 16px;
		font-size: 12px;
	}
	.medium {
		padding: 11px 20px;
		font-size: 14px;
	}
	.large {
		padding: 12px 24px;
		font-size: 16px;
	}

	.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
