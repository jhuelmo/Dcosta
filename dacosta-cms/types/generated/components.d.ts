import type { Schema, Struct } from '@strapi/strapi';

export interface SectionsGallery extends Struct.ComponentSchema {
  collectionName: 'components_sections_galleries';
  info: {
    displayName: 'Gallery';
  };
  attributes: {
    images: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    ctaText: Schema.Attribute.String;
    ctaUrl: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsImage extends Struct.ComponentSchema {
  collectionName: 'components_sections_images';
  info: {
    displayName: 'Image';
  };
  attributes: {
    caption: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface SectionsRichText extends Struct.ComponentSchema {
  collectionName: 'components_sections_rich_texts';
  info: {
    displayName: 'RichText';
  };
  attributes: {
    content: Schema.Attribute.Text;
  };
}

export interface SectionsTriad extends Struct.ComponentSchema {
  collectionName: 'components_sections_triads';
  info: {
    displayName: 'Triad';
  };
  attributes: {
    slogan: Schema.Attribute.String;
    triad1: Schema.Attribute.String;
    triad2: Schema.Attribute.String;
    triad3: Schema.Attribute.String;
  };
}

export interface SectionsWorks extends Struct.ComponentSchema {
  collectionName: 'components_sections_works';
  info: {
    displayName: 'Works';
  };
  attributes: {
    ctaText: Schema.Attribute.String;
    ctaUrl: Schema.Attribute.String;
    title: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SharedDocSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_doc_sections';
  info: {
    displayName: 'Doc Section';
  };
  attributes: {
    content: Schema.Attribute.Text & Schema.Attribute.Required;
    sectionID: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'SEO';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text;
    metaTitle: Schema.Attribute.String;
    sharedImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'sections.gallery': SectionsGallery;
      'sections.hero': SectionsHero;
      'sections.image': SectionsImage;
      'sections.rich-text': SectionsRichText;
      'sections.triad': SectionsTriad;
      'sections.works': SectionsWorks;
      'shared.doc-section': SharedDocSection;
      'shared.seo': SharedSeo;
    }
  }
}
