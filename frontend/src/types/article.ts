export interface Article {
  slug: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  image: string;
  /** Optional gallery filenames resolved to bundled URLs by the content service. */
  images?: string[];
  /** Rich, trusted, author-authored HTML (no user input) rendered via v-html. */
  contentHtml: string;
}

/**
 * Same fields as `Article`, as stored in `src/data/news.json`. `image` / `images` hold only
 * filenames inside `src/assets/` — resolved to bundled asset URLs by the content service.
 */
export interface ArticleRecord extends Omit<Article, "image" | "images"> {
  image: string;
  images?: string[];
}
