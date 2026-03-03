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
            <a href={`/works/${project.slug}`} className="block w-full rounded-3xl">

              <div className="sticky flex justify-between items-center top-[50%] w-full">
                <span className="text-lg md:text-lg lg:text-lg leading-none h-[0.7vw] uppercase font-bold">
                  {project.title}
                </span>
                <span className="text-lg md:text-lg lg:text-lg leading-none h-[0.7vw] uppercase font-bold">
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

  const width = useTransform(scrollYProgress, [0, 0.9], ["60%", "70%"]);

  return (
    <div
      ref={ref}
      className="h-[35vw] max-w-full mx-auto mt-[-0.7vw] relative"
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