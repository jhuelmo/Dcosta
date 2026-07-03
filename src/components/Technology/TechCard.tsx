import { motion } from "motion/react";
import type { TechFeature } from "./technology.data";

interface Props {
    feature: TechFeature;
    index: number;
}

const cardVariants = {
    hidden: { opacity: 0, y: 36 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.55,
            delay: i * 0.07,
            ease: [0.0, 0.35, 0.35, 1] as const,
        },
    }),
};

export const TechCard = ({ feature, index }: Props) => {
    const { icon: Icon, title, description, tags, featured } = feature;

    return (
        <motion.article
            className={`group flex flex-col justify-between gap-8 rounded-3xl p-8 lg:p-10 transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/5 ${
                featured
                    ? "bg-primary text-white md:col-span-2"
                    : "bg-white border border-primary/10"
            }`}
            variants={cardVariants}
            custom={index}
            initial="hidden"
            whileInView="visible"
            whileHover={{ y: -6 }}
            viewport={{ once: true, margin: "-60px" }}
        >
            <div className="flex flex-col gap-5">
                <span
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                        featured ? "bg-accent/20 text-accent" : "bg-primary/5 text-primary"
                    }`}
                >
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                </span>

                <h3
                    className={`font-headings text-2xl font-semibold ${
                        featured ? "text-white" : "text-primary"
                    } ${featured ? "lg:text-3xl" : ""}`}
                >
                    {title}
                </h3>

                <p
                    className={`text-sm leading-relaxed ${
                        featured ? "text-white/75 max-w-2xl lg:text-base" : "text-textColor/70"
                    }`}
                >
                    {description}
                </p>
            </div>

            <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                            featured
                                ? "bg-white/10 text-white/90"
                                : "bg-surface text-primary/80"
                        }`}
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </motion.article>
    );
};
