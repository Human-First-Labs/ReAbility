<script lang="ts">
	export interface ArticleBoxProps {
		title: string;
		excerpt: string;
		imageUrl: string;
		id: string;
	}

	let { title, excerpt, imageUrl, id }: ArticleBoxProps = $props();
</script>

<div class="article-box">
	<img src={imageUrl} alt={title} class="article-image" />
	<div class="article-content">
		<h3 class="article-title">{title}</h3>
		<p class="article-excerpt">{excerpt}</p>
		<a href={`/articles/${id}`} class="read-more">Read More</a>
	</div>
</div>

<style>
	.article-box {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--border-color);
		border-radius: 8px;
		overflow: hidden;
		background-color: var(--background-color);
		transition: transform 0.2s ease;
	}

	.article-box:hover {
		transform: scale(1.02);
	}

	.article-image {
		width: 100%;
		height: auto;
	}

	.article-content {
		padding: 16px;
	}

	.article-title {
		font-size: 1.5rem;
		margin-bottom: 8px;
	}

	.article-excerpt {
		font-size: 1rem;
		color: var(--text-color);
	}

	.read-more {
		margin-top: 12px;
		color: var(--link-color);
		text-decoration: none;
	}
</style>
