import type { LucideIcon } from "lucide-react";

// SERVICES

export interface StrapiImage {
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
}

export interface RichTextBlock {
  __component: "sections.rich-text";
  content: string;
}

export interface ImageBlock {
  __component: "sections.image";
  image: StrapiImage;
  caption?: string;
}

export interface GalleryBlock {
  __component: "sections.gallery";
  images: StrapiImage[];
}

export type Block = RichTextBlock | ImageBlock | GalleryBlock;

export interface Service {
  documentId: string;
  slug: string;
  category: string;
  title: string;
  icon: string;
  description: string;
  extraText: string;
  heroImage: StrapiImage;
  body: Block[];
}

/////////////////

export interface SeoData {
  metaTitle: string;
  metaDescription: string;
  shareImage?: { data: { attributes: { url: string } } };
}

export interface HeroData {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaUrl: string;
  image: {
    url: string;
    alternativeText?: string;
  };
}

export interface TriadData{
  slogan: string;
  triad1: string;
  triad2: string;
  triad3: string;
}

export interface HomeData {
  hero: HeroData;
  seo: SeoData;
  triad: TriadData;
}


export interface GlobalData {
  seo: SeoData;
}

