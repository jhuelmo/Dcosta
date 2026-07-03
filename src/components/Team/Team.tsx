import { motion } from "motion/react";
import { TeamMemberCard } from "./TeamMemberCard";
import { CompanyIntro } from "./CompanyIntro";
import { teamMembers, teamStats, teamPhilosophy } from "./team.data";
import { LetterButton } from "../ui/button";

const EASE = [0.0, 0.35, 0.35, 1] as const;

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const statItem = {
    hidden: { opacity: 0, y: 24, scale: 0.92 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.55, ease: EASE },
    },
};

const Team = () => {
    return (
        <div className="flex flex-col gap-24">
            {/* Intro + stats */}
            <motion.div
                className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                <motion.p
                    className="max-w-xl text-lg leading-relaxed text-textColor/80"
                    variants={fadeUp}
                >
                    Un equipo técnico estable, formado en las últimas tecnologías
                    de prótesis dental y con un objetivo común: que cada clínica
                    reciba un trabajo que pueda colocar con total confianza.
                </motion.p>

                <motion.dl
                    className="grid grid-cols-2 gap-x-12 gap-y-8 lg:grid-cols-4 lg:gap-x-14"
                    variants={staggerContainer}
                >
                    {teamStats.map((stat) => (
                        <motion.div
                            key={stat.label}
                            className="flex flex-col"
                            variants={statItem}
                        >
                            <dt className="order-2 text-xs uppercase tracking-widest text-textColor/60">
                                {stat.label}
                            </dt>
                            <dd className="order-1 font-headings text-4xl font-semibold text-primary">
                                {stat.value}
                            </dd>
                        </motion.div>
                    ))}
                </motion.dl>
            </motion.div>

            {/* Sobre la compañía */}
            <CompanyIntro />

            {/* Grid de miembros — el destacado ocupa 2 columnas en desktop */}
            <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {teamMembers.map((member, index) => (
                    <div
                        key={member.name}
                        className={member.featured ? "sm:col-span-2 lg:col-span-1" : ""}
                    >
                        <TeamMemberCard member={member} index={index} />
                    </div>
                ))}
            </div>

            {/* Banda de filosofía */}
            <motion.aside
                className="flex flex-col items-start gap-8 rounded-3xl bg-primary px-6 py-12 lg:px-20 lg:py-20"
                variants={{
                    hidden: { opacity: 0, y: 48 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 0.7,
                            ease: EASE,
                            staggerChildren: 0.15,
                            delayChildren: 0.2,
                        },
                    },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                <motion.span
                    className="text-xs font-semibold uppercase tracking-[0.2em] text-accent"
                    variants={fadeUp}
                >
                    Nuestra filosofía
                </motion.span>
                <motion.blockquote
                    className="max-w-3xl font-headings text-2xl font-medium leading-snug text-white lg:text-4xl"
                    variants={fadeUp}
                >
                    “{teamPhilosophy.quote}”
                </motion.blockquote>
                <motion.a href={teamPhilosophy.ctaUrl} variants={fadeUp}>
                    <LetterButton variant="accent" size="lg">
                        {teamPhilosophy.ctaText}
                    </LetterButton>
                </motion.a>
            </motion.aside>
        </div>
    );
};

export default Team;
