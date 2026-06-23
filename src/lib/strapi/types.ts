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

// WORKS

export interface Work {
  documentId: string;
  slug: string;
  title: string;
  category: string;
  client: string;
  technologies: string[];
  description: string;
  heroImage: StrapiImage;
  gallery: StrapiImage[];
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

export interface WorksSectionData {
  title: string;
  ctaText: string;
  ctaUrl: string;
}

export interface HomeData {
  hero: HeroData;
  seo: SeoData;
  triad: TriadData;
  works: WorksSectionData;
}


export interface GlobalData {
  seo: SeoData;
}

/////////////////

// DOC PAGES (legal, faq, cookies)

export interface DocSectionData {
  sectionID: string;
  title: string;
  /** Texto plano; los párrafos se separan con una línea en blanco */
  content: string;
}

export interface DocPageData {
  title: string;
  intro: string;
  heading: string;
  sections: DocSectionData[];
}

