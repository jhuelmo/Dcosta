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
            staggerChildren: 0.4,
            delayChildren: 0.4,
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

// Tiempo total que tarda el titulo en revelarse letra a letra, sea cual sea su longitud.
const TITLE_REVEAL_DURATION = 0.9;
const TITLE_LETTER_DURATION = 0.4;
const TITLE_START_DELAY = 0.4;

const letterVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: TITLE_LETTER_DURATION,
            ease: [0.0, 0.35, 0.35, 1] as const,
        },
    },
};

export default function HeroContent({ heroH1, subtitle, ctaText, ctaUrl }: Props) {
    const words = heroH1.split(" ");
    const letterCount = heroH1.replace(/\s/g, "").length;
    const letterStagger =
        letterCount > 1
            ? (TITLE_REVEAL_DURATION - TITLE_LETTER_DURATION) / (letterCount - 1)
            : 0;

    const titleContainer = {
        hidden: {},
        visible: {
            transition: {
                delayChildren: TITLE_START_DELAY,
                staggerChildren: letterStagger,
            },
        },
    };

    return (
        <motion.div
            className="flex flex-col items-start gap-3 lg:gap-4"
            variants={container}
            initial="hidden"
            animate="visible"
        >
            <motion.h1
                className="main-title text-neutral"
                initial="hidden"
                animate="visible"
                variants={titleContainer}
                aria-label={heroH1}
            >
                {words.flatMap((word, wordIndex) => {
                    const wordSpan = (
                        <span
                            key={`word-${wordIndex}`}
                            className="inline-block whitespace-nowrap"
                            aria-hidden="true"
                        >
                            {word.split("").map((char, charIndex) => (
                                <motion.span
                                    key={`char-${wordIndex}-${charIndex}`}
                                    variants={letterVariants}
                                    className="inline-block"
                                >
                                    {char}
                                </motion.span>
                            ))}
                        </span>
                    );
                    return wordIndex < words.length - 1 ? [wordSpan, " "] : [wordSpan];
                })}
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
