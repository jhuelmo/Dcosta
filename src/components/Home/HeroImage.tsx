import { motion } from "motion/react";

interface Props {
    src: string;
    alt: string;
}

export default function HeroImage({ src, alt }: Props) {
    return (
        <motion.div
            className="w-full h-full"
            initial={{ opacity: 0.06, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 4.8,
                delay: 0.2,
                ease: [0.07, 0.78, 0.18, 1],
            }}
        >
            <img
                className="hero-img w-full h-full object-cover"
                src={src}
                alt={alt}
                loading="eager"
            />
        </motion.div>
    );
}
