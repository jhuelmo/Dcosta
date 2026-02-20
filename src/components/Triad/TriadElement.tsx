import { motion, useTransform, type MotionValue } from "motion/react";

interface TriadElementProps {
    children: React.ReactNode;
    scrollY: MotionValue<number>;
    frameStart?: number;
    className?: string;
    style?: React.CSSProperties;
}
export const TriadElement = ({
    children,
    scrollY,
    frameStart = 2350,
    className,
    style,
}: TriadElementProps) => {
    const y = useTransform(
        scrollY,
        [
            frameStart,
            frameStart + 150,
            frameStart + 300,
            frameStart + 500,
            frameStart + 550,
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
