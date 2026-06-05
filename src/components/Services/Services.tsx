import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionTemplate, type MotionValue } from "motion/react";
import { ChevronRight } from "lucide-react";
import { getServices } from "@/lib/strapi/strapi.ts";
import type { Service } from "@/lib/strapi/types.ts";
import { LetterButton } from "../ui/button";

const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL;

const HEADER_H = 96; // px — espacio reservado para el header dentro del viewport

interface CardProps {
    service: Service;
    index: number;
    total: number;
    scrollYProgress: MotionValue<number>;
}

const AnimatedCard = ({ service, index, total, scrollYProgress }: CardProps) => {
    // t(i) = posición en el scroll donde la card i queda asentada.
    // Con (total-1) como divisor, las N-1 transiciones reparten el scroll
    // completo sin huecos: t(0)=0, t(1)=1/(N-1), …, t(N-1)=1.
    const slots = Math.max(total - 1, 1);
    const t = (n: number) => Math.min(Math.max(n / slots, 0), 1);

    const isLast = index >= total - 1;

    // Card 0: ya visible desde el inicio.
    // Card i>0: entra desde abajo (100% → 0%) durante [t(i-1), t(i)].
    const y = useTransform(
        scrollYProgress,
        index === 0 ? [0, 1] : [t(index - 1), t(index)],
        index === 0 ? ["0%", "0%"] : ["100%", "0%"]
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
            className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[70%]"
            style={{
                y,
                scale,
                opacity,
                filter,
                zIndex: index + 1,
                transformOrigin: "top center",
                top: `${HEADER_H}px`,
            }}
        >
            <a
                href={`/services/${service.slug}`}
                className="group flex h-full w-full overflow-hidden rounded-3xl bg-white"
            >
                {/* Texto */}
                <div className="flex flex-col justify-between px-10 py-12 lg:px-16 lg:py-16 w-full lg:w-[42%] shrink-0">
                    <span className="text-xs font-semibold text-[#6e6e73] uppercase tracking-[0.2em]">
                        {String(index + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(total).padStart(2, "0")}
                    </span>

                    <div className="flex flex-col gap-6">
                        {service.category && (
                            <span className="text-sm text-accent font-medium uppercase tracking-widest">
                                {service.category}
                            </span>
                        )}
                        <h3 className="text-4xl lg:text-5xl font-bold font-headings text-primary leading-tight">
                            {service.title}
                        </h3>
                        <p className="text-base text-[#6e6e73] leading-relaxed line-clamp-5">
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
                <div className="hidden lg:block flex-1 relative overflow-hidden p-8 rounded-3xl">
                    {imgUrl ? (
                        <img
                            src={imgUrl}
                            alt={service.title}
                            className="w-full h-full rounded-3xl object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-surface" />
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

                    {/* Imagen de fondo con blur */}
                    <div className="absolute inset-0 z-0 scale-110">
                        <img
                            src="/src/assets/labBg.png"
                            alt=""
                            className="w-full h-full object-cover blur-lg"
                        />
                        <div className="absolute inset-0 bg-primary/40" />
                    </div>

                    {/*
                     * Header: position absolute con z-index sobre TODAS las cards.
                     * Las cards tienen z-index 1…N, el header va a z-[200].
                     */}
                    <div className="absolute top-0 left-0 right-0 z-200"
                        style={{ height: `${HEADER_H}px` }}
                    >
                        <div className="container-xl h-full px-4 lg:px-8 flex items-center justify-between">
                            <h2 className="text-2xl lg:text-4xl font-bold font-headings text-white leading-tight">
                                Nuestros servicios.
                            </h2>
                            <a
                                href="/services"
                                className="text-white/80 text-base hover:text-white flex items-center gap-0.5 shrink-0"
                            >
                                Ver todos los servicios
                                <ChevronRight className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Cards — empiezan en HEADER_H px y llegan casi al fondo */}
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
