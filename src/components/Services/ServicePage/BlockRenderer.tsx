// components/blocks/BlockRenderer.tsx
import ImageBlock from "./ImageBlock";
import Gallery from "./Gallery";
import type { Block } from "@/lib/strapi/types";
import RichText from "./RichText";

interface Props {
  blocks: Block[];
  className?: string;
}

const map = {
  "sections.rich-text": RichText,
  "sections.image": ImageBlock,
  "sections.gallery": Gallery,
};

export default function BlockRenderer({ blocks, className = "container-text" }: Props) {
  return (
    <div className={`${className} flex flex-col gap-12 p-6`}>
      {blocks.map((block, i) => {
        const Component = map[block.__component] as any;
        return Component ? <Component key={i} {...block} /> : null;
      })}
    </div>
  );
}