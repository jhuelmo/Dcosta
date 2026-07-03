import { motion } from "motion/react";
import { TechCard } from "./TechCard";
import { techFeatures, workflowSteps } from "./technology.data";
import { LetterButton } from "../ui/button";

const EASE = [0.0, 0.35, 0.35, 1] as const;

const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const stepVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.12, ease: EASE },
    }),
};

const stepRule = {
    hidden: { scaleX: 0 },
    visible: (i: number) => ({
        scaleX: 1,
        transition: { duration: 0.6, delay: i * 0.12 + 0.25, ease: EASE },
    }),
};

const Technology = () => {
    return (
        <div className="flex flex-col gap-28">
            {/* Intro */}
            <motion.p
                className="max-w-2xl text-lg leading-relaxed text-textColor/80"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                Combinamos la precisión del flujo digital con el criterio de un
                equipo técnico artesano. La tecnología acelera los plazos y
                elimina errores; nuestras manos ponen el acabado que ninguna
                máquina consigue.
            </motion.p>

            {/* Bento grid de tecnologías */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {techFeatures.map((feature, index) => (
                    <TechCard key={feature.title} feature={feature} index={index} />
                ))}
            </div>

            {/* Flujo de trabajo */}
            <section className="flex flex-col gap-14">
                <motion.header
                    className="flex flex-col gap-3"
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.12 } },
                    }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.span
                        className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-dark"
                        variants={fadeUp}
                    >
                        De tu clínica al paciente
                    </motion.span>
                    <motion.h3
                        className="max-w-lg font-headings text-3xl font-semibold text-primary lg:text-4xl"
                        variants={fadeUp}
                    >
                        Un flujo de trabajo pensado para tu clínica.
                    </motion.h3>
                </motion.header>

                <ol className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
                    {workflowSteps.map((step, index) => (
                        <motion.li
                            key={step.step}
                            className="relative flex flex-col gap-4 border-t-2 border-primary/10 pt-6"
                            variants={stepVariants}
                            custom={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-60px" }}
                        >
                            <motion.span
                                aria-hidden
                                className="absolute -top-0.5 left-0 h-0.5 w-10 origin-left bg-accent"
                                variants={stepRule}
                                custom={index}
                            />
                            <span className="font-headings text-sm font-semibold tracking-widest text-accent-dark">
                                {step.step}
                            </span>
                            <h4 className="font-headings text-xl font-semibold text-primary">
                                {step.title}
                            </h4>
                            <p className="text-sm leading-relaxed text-textColor/70">
                                {step.description}
                            </p>
                        </motion.li>
                    ))}
                </ol>
            </section>

            {/* CTA final */}
            <motion.aside
                className="flex flex-col items-start gap-6 rounded-3xl bg-surface px-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-20"
                variants={{
                    hidden: { opacity: 0, y: 48 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 0.7,
                            ease: EASE,
                            staggerChildren: 0.15,
                            delayChildren: 0.15,
                        },
                    },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                <motion.div className="flex flex-col gap-2" variants={fadeUp}>
                    <h3 className="font-headings text-2xl font-semibold text-primary lg:text-3xl">
                        ¿Trabajas con escáner intraoral?
                    </h3>
                    <p className="max-w-xl text-sm leading-relaxed text-textColor/70 lg:text-base">
                        Conecta tu clínica con nuestro laboratorio y empieza a
                        enviar casos digitales hoy mismo.
                    </p>
                </motion.div>
                <motion.a href="/contact" className="shrink-0" variants={fadeUp}>
                    <LetterButton variant="default" size="lg">
                        Concreta una cita
                    </LetterButton>
                </motion.a>
            </motion.aside>
        </div>
    );
};

export default Technology;
