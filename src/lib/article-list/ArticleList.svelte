<script lang="ts">
	import { articles, type ArticleType } from '$lib/content/articles';
	import { chooseLanguage } from '$lib/text-translator/translator-state.svelte';
	import ArticleBox from './ArticleBox.svelte';
	import markdownit from 'markdown-it';

	export interface ArticleListProps {
		type: ArticleType;
	}

	let { type }: ArticleListProps = $props();

	const currentArticles = $derived.by(() => {
		const limited = articles
			.filter((article) => article.type === type)
			.sort((a, b) => {
				return new Date(b.date).getTime() - new Date(a.date).getTime();
			});

		return limited.map((l) => {
			const parsed = md.parse(chooseLanguage(l.markdownContent), {});

			const text = parsed.reduce((acc, token) => {
				if (token.type === 'inline') {
					return acc + token.content;
				}
				return acc;
			}, '');

			return {
				...l,
				excerpt: text.length > 100 ? text.slice(0, 100) + '...' : text
			};
		});
	});

	const md = markdownit();
</script>

<div class="article-list">
	{#each currentArticles as article (article.id)}
		<ArticleBox
			title={article.name}
			excerpt={article.excerpt}
			imageUrl={article.previewImageUrl}
			id={article.id}
		/>
	{/each}
</div>
