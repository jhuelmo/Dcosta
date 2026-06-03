import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Wrench, Settings, Zap, Heart, Star, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import ServiceCard from "./ServiceCard";
import { getServices } from "@/lib/strapi/strapi.ts";
import type { Service } from "@/lib/strapi/types.ts";

const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL;

const iconMap: Record<string, LucideIcon> = {
    wrench: Wrench,
    settings: Settings,
    zap: Zap,
    heart: Heart,
    star: Star,
    shield: Shield,
};

const Services = () => {
    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        getServices().then(setServices);
    }, []);

    return (
        <section className="py-20 lg:py-32 bg-neutral-50">
            <div className="container-xl px-4 lg:px-8">
                <div className="flex items-start justify-between mb-16">
                    <h2 className="text-5xl lg:text-7xl font-bold font-headings text-primary">
                        SERVICIOS
                    </h2>

                    <motion.a
                        href="/services"
                        className="flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-full font-medium hover:bg-accent-dark transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Ver Todos los Servicios
                        <ArrowUpRight className="w-5 h-5" />
                    </motion.a>
                </div>

                <div className="flex flex-col gap-6">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={service.documentId}
                            service={{
                                id: String(index + 1).padStart(2, "0"),
                                slug: service.slug,
                                icon: iconMap[service.icon] ?? Wrench,
                                title: service.title,
                                description: service.description,
                                items: [],
                                image: `${STRAPI_URL}${service.heroImage?.url}`,
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
