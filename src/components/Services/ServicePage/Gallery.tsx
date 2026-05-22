import type { StrapiImage } from "@/lib/strapi/types";

interface Props {
  images: StrapiImage[];
}

const STRAPI_URL = import.meta.env.STRAPI_URL;

export default function Gallery({ images }: Props) {
    
  return (
    <div className="grid grid-cols-2 gap-4">
      {images.map((img, i) => (
        console.log(STRAPI_URL),
        <img
          key={i}
          src={`${STRAPI_URL}${img.url}`}
          alt={img.alternativeText ?? ""}
          className="w-full rounded-2xl object-cover aspect-video"
        />
      ))}
    </div>
  );
}