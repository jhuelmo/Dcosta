import { motion } from "motion/react";
import type { TeamMember } from "./team.data";

interface Props {
    member: TeamMember;
    index: number;
}

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            delay: i * 0.08,
            ease: [0.0, 0.35, 0.35, 1] as const,
        },
    }),
};

const initialsOf = (name: string) =>
    name
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("");

export const TeamMemberCard = ({ member, index }: Props) => {
    return (
        <motion.article
            className="group flex flex-col gap-5"
            variants={cardVariants}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
        >
            {/* Foto / placeholder de iniciales */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br from-surface to-primary/10">
                {member.image ? (
                    <img
                        src={member.image}
                        alt={member.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center transition-transform duration-500 group-hover:scale-105">
                        <span className="font-headings text-7xl font-semibold text-primary/15">
                            {initialsOf(member.name)}
                        </span>
                    </div>
                )}

                {/* Chips de especialidad sobre la foto */}
                <div className="absolute inset-x-4 bottom-4 flex flex-wrap gap-2">
                    {member.specialties.map((s) => (
                        <span
                            key={s}
                            className="rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm"
                        >
                            {s}
                        </span>
                    ))}
                </div>
            </div>

            {/* Info */}
            <div className="flex flex-col gap-1 px-1">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-dark">
                    {member.role}
                </span>
                <h3 className="font-headings text-2xl font-semibold text-primary">
                    {member.name}
                </h3>
                <p className="text-sm leading-relaxed text-textColor/70">
                    {member.credentials}
                </p>
            </div>
        </motion.article>
    );
};
