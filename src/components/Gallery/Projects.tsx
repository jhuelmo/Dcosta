import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import type { Work } from "@/lib/strapi/types";

const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL;
const EASE = [0.0, 0.35, 0.35, 1] as const;

interface ProjectsProps {
	works: Work[];
}

export function Projects({ works }: ProjectsProps) {
	const categories = useMemo(
		() => [
			"Todos",
			...Array.from(new Set(works.map((w) => w.category).filter(Boolean))),
		],
		[works]
	);
	const [active, setActive] = useState("Todos");

	const filtered =
		active === "Todos" ? works : works.filter((w) => w.category === active);

	if (!works?.length) {
		return (
			<p className="py-24 text-center text-muted">
				Todavía no hay proyectos publicados. Vuelve pronto.
			</p>
		);
	}

	return (
		<div className="flex flex-col gap-16 lg:gap-24">
			{/* Filtro por categoría — solo si hay más de una */}
			{categories.length > 2 && (
				<div className="flex flex-wrap justify-center gap-2">
					{categories.map((cat) => {
						const isActive = cat === active;
						return (
							<button
								key={cat}
								onClick={() => setActive(cat)}
								className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer ${
									isActive
										? "bg-primary text-primary-foreground"
										: "border border-primary/20 text-primary hover:bg-primary/5"
								}`}
								aria-pressed={isActive}
							>
								{cat}
							</button>
						);
					})}
				</div>
			)}

			<AnimatePresence mode="popLayout">
				{filtered.map((work, index) => (
					<motion.article
						key={work.slug}
						layout
						initial={{ opacity: 0, y: 48 }}
						whileInView={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.96 }}
						viewport={{ once: true, margin: "-60px" }}
						transition={{ duration: 0.6, ease: EASE }}
					>
						<a
							href={`/works/${work.slug}`}
							className="group flex w-full flex-col gap-4"
						>
							{/* Cabecera del proyecto */}
							<div className="flex items-baseline justify-between gap-4">
								<div className="flex items-baseline gap-4 min-w-0">
									<span className="font-headings text-sm font-semibold text-accent-dark">
										{String(index + 1).padStart(2, "0")}
									</span>
									<h2 className="truncate text-lg lg:text-2xl font-semibold uppercase tracking-wide text-primary">
										{work.title}
									</h2>
								</div>
								{work.category && (
									<span className="shrink-0 rounded-full border border-primary/15 px-3 py-1 text-xs font-medium uppercase tracking-widest text-primary/70">
										{work.category}
									</span>
								)}
							</div>

							<ProjectCard work={work} />
						</a>
					</motion.article>
				))}
			</AnimatePresence>
		</div>
	);
}

function ProjectCard({ work }: { work: Work }) {
	const ref = useRef(null);

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start end", "end start"],
	});

	// Desktop: la máscara se ensancha del 60% al 70% mientras cruza el viewport
	const width = useTransform(scrollYProgress, [0, 0.8], ["60%", "70%"]);
	const imgUrl = work.heroImage?.url ? `${STRAPI_URL}${work.heroImage.url}` : "";

	if (!imgUrl) return null;

	return (
		<div ref={ref} className="relative h-[60vw] md:h-[40vw] max-w-full">
			{/* Móvil: imagen a ancho completo, sin máscara */}
			<div className="md:hidden h-full overflow-hidden rounded-3xl">
				<img
					src={imgUrl}
					alt={work.title}
					loading="lazy"
					className="h-full w-full object-cover"
					sizes="100vw"
				/>
			</div>

			{/* Desktop: máscara centrada que crece con el scroll */}
			<motion.div
				className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 overflow-hidden rounded-3xl"
				style={{ width }}
			>
				{/* La imagen mantiene su tamaño final; la máscara la descubre */}
				<div
					className="h-full w-[70vw] max-w-[70vw]"
					style={{ marginLeft: "50%", transform: "translateX(-50%)" }}
				>
					<img
						src={imgUrl}
						alt={work.title}
						loading="lazy"
						className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
						sizes="70vw"
					/>
				</div>
			</motion.div>
		</div>
	);
}
