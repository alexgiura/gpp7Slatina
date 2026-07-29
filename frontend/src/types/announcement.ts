export interface Announcement {
  slug?: string;
  date: string;
  title: string;
  pdf: string;
  /** Filenames inside `src/assets/`, resolved to bundled URLs by the content service. */
  images?: string[];
  /** Rich, trusted, author-authored HTML (no user input) rendered via v-html. */
  contentHtml?: string;
}

/**
 * Same fields as `Announcement`, as stored in `src/data/announcements.json`.
 * `images` holds only filenames inside `src/assets/` — resolved by the content service.
 */
export interface AnnouncementRecord extends Omit<Announcement, "images"> {
  images?: string[];
}
