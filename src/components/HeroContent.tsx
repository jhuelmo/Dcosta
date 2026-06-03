import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

interface Props {
    heroH1: string;
    subtitle: string;
    ctaText: string;
    ctaUrl: string;
}

const container = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.2,
        },
    },
};

const item = {
    hidden: {},
    visible: {
        opacity: [0, 1],
        y: [80, 0],
        transition: {
            duration: 0.7,
            ease: [0.0, 0.35, 0.35, 1] as const,
        },
    },
};

export default function HeroContent({ heroH1, subtitle, ctaText, ctaUrl }: Props) {
    return (
        <motion.div
            className="flex flex-col items-start gap-3 lg:gap-4"
            variants={container}
            initial="hidden"
            animate="visible"
        >
            <motion.h1 className="main-title text-neutral" variants={item}>
                {heroH1}
            </motion.h1>

            <motion.span
                className="text-neutral-100 text-left text-shadow-2xs text-sm lg:text-base max-w-xs lg:max-w-xl"
                variants={item}
            >
                {subtitle}
            </motion.span>

            <motion.div variants={item}>
                <Button asChild className="font-semibold" variant="accent" size="lg">
                    <a href={ctaUrl}>{ctaText}</a>
                </Button>
            </motion.div>
        </motion.div>
    );
}
