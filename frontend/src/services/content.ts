import announcementsData from "@/data/announcements.json";
import educationalOfferData from "@/data/educational-offer.json";
import newsData from "@/data/news.json";
import type { Announcement, AnnouncementRecord } from "@/types/announcement";
import type { Article, ArticleRecord } from "@/types/article";
import type { EducationalOfferItem } from "@/types/educational-offer";
import type { GalleryImage } from "@/types/gallery";

// Eagerly resolves every image in src/assets to its bundled (hashed) URL, keyed by filename,
// so JSON content files can reference images by plain filename without importing them.
const assetsByFilename = import.meta.glob<string>("../assets/*.{jpg,jpeg,png,webp,svg,gif}", {
  eager: true,
  import: "default",
});

// Everything dropped into src/assets/gallery/ is shown on /galerie automatically.
const galleryAssets = import.meta.glob<string>("../assets/gallery/*.{jpg,jpeg,png,webp,gif}", {
  eager: true,
  import: "default",
});

function resolveAssetUrl(filename: string): string {
  const match = Object.entries(assetsByFilename).find(([path]) => path.endsWith(`/${filename}`));
  if (!match) {
    throw new Error(`content service: asset "${filename}" not found in src/assets`);
  }
  return match[1];
}

function toArticle(record: ArticleRecord): Article {
  return {
    ...record,
    image: resolveAssetUrl(record.image),
    images: record.images?.map(resolveAssetUrl),
  };
}

function toAnnouncement(record: AnnouncementRecord): Announcement {
  return {
    ...record,
    images: record.images?.map(resolveAssetUrl),
  };
}

export function getAnnouncements(): Announcement[] {
  return (announcementsData as AnnouncementRecord[]).map(toAnnouncement);
}

export function getAnnouncementBySlug(slug: string): Announcement | undefined {
  return getAnnouncements().find((announcement) => announcement.slug === slug);
}

export function getEducationalOffer(): EducationalOfferItem[] {
  return educationalOfferData as EducationalOfferItem[];
}

export function getNews(): Article[] {
  return (newsData as ArticleRecord[]).map(toArticle);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getNews().find((article) => article.slug === slug);
}

export function getGalleryImages(): GalleryImage[] {
  return Object.entries(galleryAssets)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([path, src], index) => {
      const filename = path.split("/").pop() ?? `imagine-${index + 1}`;
      return {
        src,
        alt: `Galerie — ${filename.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ")}`,
      };
    });
}
