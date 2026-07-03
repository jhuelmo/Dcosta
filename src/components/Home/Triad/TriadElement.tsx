import { motion, useTransform, type MotionValue } from "motion/react";

interface TriadElementProps {
    children: React.ReactNode;
    scrollYProgress: MotionValue<number>;
    frameStart?: number;
    className?: string;
    style?: React.CSSProperties;
}
export const TriadElement = ({
    children,
    scrollYProgress,
    frameStart = 0.50,
    className,
    style,
}: TriadElementProps) => {
    const window = 0.07;

    const y = useTransform(
        scrollYProgress,
        [
            frameStart,
            frameStart + window * 0.27,
            frameStart + window * 0.55,
            frameStart + window * 0.91,
            frameStart + window,
        ],
        [500, 250, 100, 5, 0],
    );

    return (
        <motion.li
            className={`text-8xl font-bold ${className}`}
            style={{ y, ...style }}
        >
            <h3>{children}</h3>
        </motion.li>
    );
};
