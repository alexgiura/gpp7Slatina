export interface Article {
  slug: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  image: string;
  /** Rich, trusted, author-authored HTML (no user input) rendered via v-html. */
  contentHtml: string;
}

/**
 * Same fields as `Article`, as stored in `src/data/news.json`. `image` holds only the
 * filename inside `src/assets/` — resolved to the bundled asset URL by the content service.
 */
export interface ArticleRecord extends Omit<Article, "image"> {
  image: string;
}
