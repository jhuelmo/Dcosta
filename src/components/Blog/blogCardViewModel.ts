import type { Post } from "@/lib/strapi/types";

const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL;

export interface BlogCardViewModel {
  id: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  href: string;
}

export function toCardViewModel(post: Post): BlogCardViewModel {
  return {
    id: post.documentId,
    category: post.category,
    date: new Date(post.publishedAt).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    title: post.title,
    excerpt: post.excerpt,
    imageUrl: `${STRAPI_URL}${post.heroImage?.url}`,
    href: `/blog/${post.slug}`,
  };
}
