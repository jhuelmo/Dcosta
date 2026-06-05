import { projects } from "@/data/projects";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ChevronRight } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./ui/carousel";

const Works = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    return (
        <section className="bg-[#f5f5f7] py-16 overflow-hidden">
            <div ref={sectionRef} className="container-xl px-4 lg:px-8">
                {/* Header */}
                <div className="flex flex-col items-start md:flex-row md:items-end justify-between mb-8">
                    <motion.h2
                        className="text-3xl lg:text-6xl font-bold font-headings text-primary leading-tight"
                        initial={{ opacity: 0, y: 32 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        Por qué confiar en nuestro laboratorio dental.
                    </motion.h2>
                    <motion.a
                        href="/works"
                        className="text-primary-light text-base hover:underline flex items-center gap-0.5 shrink-0 mb-1"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                    >
                        Ver todos los trabajos
                        <ChevronRight className="w-4 h-4" />
                    </motion.a>
                </div>

                <Carousel
                    className="w-full"
                    opts={{
                        overflow: true,
                        align: "start",
                        containScroll: "keepSnaps",
                    }}
                >
                    <CarouselContent className="-ml-6">
                        {projects.map((project, index) => (
                            <CarouselItem
                                className="pl-6 basis-full sm:basis-[45%] lg:basis-[30%]"
                                key={index}
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 38 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{
                                        duration: 1,
                                        delay: 0.15 + index * 0.18,
                                        ease: "easeOut",
                                    }}
                                >
                                <a
                                    href={`/works/${project.slug}`}
                                    className="group relative block h-120 rounded-3xl overflow-hidden hover:scale-[1.02] transition-transform duration-800 ease-out"
                                >
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        loading="lazy"
                                        className="w-full h-full object-cover"
                                    />

                                    <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />

                                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                        <p className="text-sm text-white uppercase tracking-widest t mb-1">
                                            {project.info.campo}
                                        </p>
                                        <h3 className="text-xl font-bold font-headings leading-snug">
                                            {project.title}
                                        </h3>
                                        <p className="text-sm text-white/80 mt-1">
                                            {project.info.cliente}
                                        </p>
                                    </div>

                                    <button className="absolute bottom-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/30 group-hover:bg-white group-hover:text-primary transition-all duration-300">
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </a>
                                </motion.div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>

                    <div className="mt-6 flex justify-end gap-2">
                        <CarouselPrevious className="static! translate-x-0! translate-y-0! w-9 h-9 rounded-full border border-[#d2d2d7] bg-white text-[#1d1d1f] hover:bg-[#e8e8ed]" />
                        <CarouselNext className="static! translate-x-0! translate-y-0! w-9 h-9 rounded-full border border-[#d2d2d7] bg-white text-[#1d1d1f] hover:bg-[#e8e8ed]" />
                    </div>
                </Carousel>
            </div>
        </section>
    );
};

export default Works;
