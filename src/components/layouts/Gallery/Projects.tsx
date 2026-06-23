import type { Work } from "@/lib/strapi/types";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL;

interface ProjectsProps {
	works: Work[];
}

export function Projects({ works }: ProjectsProps) {

	if (!works?.length) return <div>No projects found.</div>;
	return (
	<>
        {works.map((work) => (
          <article className="flex flex-row relative" key={work.slug}>
            <a href={`/works/${work.slug}`} className="flex flex-col justify-center gap-12 md:block w-full rounded-3xl">

				<div className="relative md:sticky flex flex-col gap-1 md:flex-row md:justify-between items-center top-0 md:top-[50%] w-full mb-2 md:mb-0">
					<span className="text-sm md:text-md lg:text-lg leading-none h-auto md:h-[0.7vw] uppercase font-bold">
						{work.title}
					</span>
					<span className="text-sm md:text-md lg:text-lg leading-none h-auto md:h-[0.7vw] uppercase font-bold">
						{work.category}
					</span>
				</div>

              <ProjectCard work={work} />
            </a>
          </article>
        ))}
    </>
	);
}
function ProjectCard({ work }: { work: Work }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const width = useTransform(scrollYProgress, [0, 0.8], ["60%", "70%"]);
  const imgUrl = work.heroImage?.url ? `${STRAPI_URL}${work.heroImage.url}` : "";

  return (
    <div
      ref={ref}
      className="h-[70vw] lg:h-[40vw] max-w-full md:mx-auto md:mt-[-0.7vw] relative"
    >
      {/* Wrapper máscara — crece con el scroll */}
      <motion.div
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 rounded-3xl overflow-hidden"
        style={{ width }}
      >
        {/* Imagen al tamaño final siempre, el wrapper la va descubriendo */}
        {imgUrl && (
          <img
            src={imgUrl}
            alt={work.title}
            loading="lazy"
            className="w-[70vw] max-w-[70vw] h-full object-cover"
            style={{ marginLeft: "50%", transform: "translateX(-50%)" }}
            sizes="70vw"
          />
        )}
      </motion.div>
    </div>
  );
}
