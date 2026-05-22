// components/blocks/BlockRenderer.tsx
import ImageBlock from "./ImageBlock";
import Gallery from "./Gallery";
import type { Block } from "@/lib/strapi/types";
import RichText from "./RickText";

interface Props {
  blocks: Block[];
}

const map = {
  "sections.rich-text": RichText,
  "sections.image": ImageBlock,
  "sections.gallery": Gallery,
};

export default function BlockRenderer({ blocks }: Props) {
  return (
    <div className="container-text flex flex-col gap-12 p-6">
      {blocks.map((block, i) => {
        const Component = map[block.__component] as any;
        return Component ? <Component key={i} {...block} /> : null;
      })}
    </div>
  );
}