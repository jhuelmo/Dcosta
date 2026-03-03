import type { Project } from "@/types/project";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

interface ProjectProps{
	projects: Project[];
}

export function Projects({projects} :  ProjectProps){

	if (!projects) return <div>No projects found.</div>;
	return (
	<>
        {projects.map((project) => (
          <article className="flex flex-row relative" key={project.slug}>
            <a href={`/works/${project.slug}`} className="flex flex-col justify-center gap-12 md:block w-full rounded-3xl">

				<div className="relative md:sticky flex flex-col gap-1 md:flex-row md:justify-between items-center top-0 md:top-[50%] w-full mb-2 md:mb-0">
					<span className="text-sm md:text-md lg:text-lg leading-none h-auto md:h-[0.7vw] uppercase font-bold">
						{project.title}
					</span>
					<span className="text-sm md:text-md lg:text-lg leading-none h-auto md:h-[0.7vw] uppercase font-bold">
						{project.info.campo}
					</span>
				</div>
			  
              <ProjectCard project={project} />
            </a>
          </article>
        ))}
    </>
	);
}
function ProjectCard({ project }: { project: Project }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const width = useTransform(scrollYProgress, [0, 0.8], ["60%", "70%"]);

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
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="w-[70vw] max-w-[70vw] h-full object-cover"
          style={{ marginLeft: "50%", transform: "translateX(-50%)" }}
          sizes="70vw"
        />
      </motion.div>
    </div>
  );
}