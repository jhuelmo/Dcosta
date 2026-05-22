import type { StrapiImage } from "@/lib/strapi/types";

interface Props {
  image: StrapiImage;
  caption?: string;
}

const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL;

export default function ImageBlock({ image, caption }: Props) {
  return (
    <figure>
      <img
        src={`${STRAPI_URL}${image.url}`}
        alt={image.alternativeText ?? caption ?? ""}
        className="w-full rounded-2xl object-cover"
      />
      {caption && (
        <figcaption className="text-sm text-center mt-2 text-neutral-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}