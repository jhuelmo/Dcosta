import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, type MotionValue } from "motion/react";
import { getServices } from "@/lib/strapi/strapi.ts";
import type { Service } from "@/lib/strapi/types.ts";
import { LetterButton } from "../ui/button";

const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL;

// Las cards entran cuando el hero ya ha salido de pantalla
const ANIM_DELAY = 0.35;

interface CardProps {
    service: Service;
    index: number;
    total: number;
    scrollYProgress: MotionValue<number>;
}

const AnimatedCard = ({ service, index, total, scrollYProgress }: CardProps) => {
    const slots = Math.max(total - 1, 1);
    // Mapea al rango [ANIM_DELAY, 1]: t(0)=ANIM_DELAY, t(slots)=1
    const t = (n: number) => ANIM_DELAY + Math.min(Math.max(n / slots, 0), 1) * (1 - ANIM_DELAY);

    const isLast = index >= total - 1;

    // Todas las cards empiezan fuera de pantalla (abajo) y suben como una página.
    // Card 0 entra mientras el hero sale [0 → ANIM_DELAY].
    // Card i>0 entra en [t(i-1) → t(i)].
    const yStart = index === 0 ? 0 : t(index - 1);
    const yEnd   = index === 0 ? ANIM_DELAY : t(index);

    const y = useTransform(
        scrollYProgress,
        [yStart, yEnd, 1],
        ["100%", "0%", "0%"]
    );

    const scale = useTransform(
        scrollYProgress,
        isLast ? [0, 1] : [0, t(index + 0.2), t(index + 0.9), 1],
        isLast ? [1, 1] : [1, 1, 0.85, 0.85]
    );

    const opacity = useTransform(
        scrollYProgress,
        isLast ? [0, 1] : [0, t(index + 0.5), t(index + 1.9), 1],
        isLast ? [1, 1] : [1, 1, 0.7, 0]
    );

    const blurPx = useTransform(
        scrollYProgress,
        isLast ? [0, 1] : [0, t(index + 0.2), t(index + 1), 1],
        isLast ? [0, 0] : [0, 0, 6, 6]
    );
    const filter = useMotionTemplate`blur(${blurPx}px)`;

    const imgUrl = service.heroImage?.url
        ? `${STRAPI_URL}${service.heroImage.url}`
        : "";

    return (
        <motion.div
            className="absolute top-4 bottom-4 left-1/2 -translate-x-1/2 w-[80%] lg:w-[70%]"
            style={{
                y,
                scale,
                opacity,
                filter,
                zIndex: 20 + index,
                transformOrigin: "top center",
            }}
        >
            <a
                href={`/services/${service.slug}`}
                className="group flex h-full w-full overflow-hidden rounded-3xl bg-white"
            >
                {/* Texto */}
                <div className="flex flex-col justify-between px-10 py-10 lg:px-16 lg:py-14 w-full lg:w-[42%] shrink-0">
                    <span className="text-xs font-semibold text-[#6e6e73] uppercase tracking-[0.2em]">
                        {String(index + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(total).padStart(2, "0")}
                    </span>

                    <div className="flex flex-col gap-5">
                        {service.category && (
                            <span className="text-sm text-accent font-medium uppercase tracking-widest">
                                {service.category}
                            </span>
                        )}
                        <h3 className="text-3xl lg:text-4xl font-bold font-headings text-primary leading-tight">
                            {service.title}
                        </h3>
                        <p className="text-sm text-[#6e6e73] leading-relaxed line-clamp-4">
                            {service.description}
                        </p>
                    </div>

                    <LetterButton
                        variant="default"
                        size="lg"
                        className="self-start"
                    >
                        Ver servicio
                    </LetterButton>
                </div>

                {/* Imagen */}
                <div className="hidden lg:block flex-1 relative overflow-hidden p-6 rounded-3xl">
                    {imgUrl ? (
                        <img
                            src={imgUrl}
                            alt={service.title}
                            className="w-full h-full rounded-2xl object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-surface rounded-2xl" />
                    )}
                </div>
            </a>
        </motion.div>
    );
};

const Services = () => {
    const [services, setServices] = useState<Service[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // El hero text sube y desaparece antes de que lleguen las cards
    const heroY = useTransform(scrollYProgress, [0, 0.25], ["0%", "-100%"]);

    useEffect(() => {
        getServices().then(setServices);
    }, []);

    const total = services.length;

    return (
        <section>
            <div
                ref={containerRef}
                style={{ height: total > 0 ? `${total * 150}vh` : "100vh" }}
            >
                <div className="sticky top-0 h-screen overflow-hidden">

                    {/* Fondo con blur */}
                    <div className="absolute inset-0 scale-110">
                        <img
                            src="/src/assets/labBg.png"
                            alt=""
                            className="w-full h-full object-cover blur-lg"
                        />
                        <div className="absolute inset-0 bg-primary/50" />
                    </div>

                    {/* Hero text — z-10, sale hacia arriba al scrollear */}
                    <motion.div
                        className="absolute inset-x-0 top-0 z-10 flex flex-col items-center justify-center text-center px-6 pt-70 pb-8 gap-4 "
                        style={{ y: heroY }}
                    >
                        <h2 className="text-5xl lg:text-7xl font-headings text-white leading-tight">
                            Tu laboratorio de confianza
                        </h2>
                        <p className="text-white/80 text-sm lg:text-base max-w-md">
                            Tratamientos diseñados con precisión para transformar tu sonrisa con resultados naturales y duraderos.
                        </p>
                        <a
                            href="/services"
                            className="mt-1 px-6 py-2.5 rounded-full border border-white/70 text-white text-xs font-semibold uppercase tracking-widest hover:bg-white/10 transition-colors"
                        >
                            Ver todos los servicios
                        </a>
                    </motion.div>

                    {/* Cards — z-20+, entran desde abajo como scroll de página */}
                    {services.map((service, index) => (
                        <AnimatedCard
                            key={service.documentId}
                            service={service}
                            index={index}
                            total={total}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
