import { motion } from "motion/react";
import { companyInfo } from "./team.data";

const EASE = [0.0, 0.35, 0.35, 1] as const;

const leftColumn = {
    hidden: { opacity: 0, x: -40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, ease: EASE, staggerChildren: 0.12 },
    },
};

const rightColumn = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.14, delayChildren: 0.25 } },
};

const highlightItem = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
};

const textItem = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export const CompanyIntro = () => {
    return (
        <section className="grid grid-cols-1 gap-14 rounded-3xl bg-white border border-primary/10 px-6 py-10 lg:grid-cols-[1.4fr_1fr] lg:gap-24 lg:px-16 lg:py-16">
            {/* Historia */}
            <motion.div
                className="flex flex-col gap-6"
                variants={leftColumn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                <motion.span
                    className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-dark"
                    variants={textItem}
                >
                    {companyInfo.label}
                </motion.span>

                <motion.h3
                    className="max-w-xl font-headings text-3xl font-semibold leading-tight text-primary lg:text-4xl"
                    variants={textItem}
                >
                    {companyInfo.title}
                </motion.h3>

                {companyInfo.paragraphs.map((paragraph) => (
                    <motion.p
                        key={paragraph.slice(0, 24)}
                        className="max-w-xl text-base leading-relaxed text-textColor/75"
                        variants={textItem}
                    >
                        {paragraph}
                    </motion.p>
                ))}
            </motion.div>

            {/* Datos clave */}
            <motion.ul
                className="flex flex-col justify-center gap-10"
                variants={rightColumn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {companyInfo.highlights.map((highlight) => (
                    <motion.li
                        key={highlight.label}
                        className="flex flex-col gap-1 border-l-2 border-accent pl-6"
                        variants={highlightItem}
                    >
                        <span className="font-headings text-4xl font-semibold text-primary">
                            {highlight.value}
                        </span>
                        <span className="text-sm text-textColor/60">
                            {highlight.label}
                        </span>
                    </motion.li>
                ))}
            </motion.ul>
        </section>
    );
};
