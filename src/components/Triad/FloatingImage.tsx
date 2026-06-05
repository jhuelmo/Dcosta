import { motion, MotionValue, useTransform } from "motion/react";
import { useState, useEffect } from "react";
import Triad1 from "../../assets/Services/Service-1.png";

interface Props {
    anchor: {
        anchorX: MotionValue<number>;
        anchorY: MotionValue<number>;
    };
    startPoint?: { x: number; y: number };
    scrollYProgress: MotionValue<number>;
    className?: string;
    offset?: { x: number; y: number };
}

export const FloatingImage = ({
    anchor: { anchorX, anchorY },
    startPoint = { x: 0, y: 0 },
    scrollYProgress,
    className,
    offset = { x: 0, y: 0 },
}: Props) => {
    const [viewportDims, setViewportDims] = useState({
        width: typeof window !== "undefined" ? window.innerWidth : 0,
        height: typeof window !== "undefined" ? window.innerHeight : 0,
    });

    useEffect(() => {
        const handleResize = () => {
            setViewportDims({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        setViewportDims({
            width: window.innerWidth,
            height: window.innerHeight,
        });

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isMobile = viewportDims.width < 1024;

    // En móvil los startPoints son más extremos para garantizar que salgan de fuera de pantalla
    const startMultiplier = isMobile ? 1.8 : 1;
    const normalizedStartPoint = {
        x: (startPoint.x / 100) * viewportDims.width * startMultiplier,
        y: (startPoint.y / 100) * viewportDims.height * startMultiplier,
    };

    const progress = useTransform(
        scrollYProgress,
        [0.05, 0.30, 0.35, 0.45],
        [0, 0.7, 0.9, 1],
    );

    const opacity = useTransform(scrollYProgress, [0, 0.04, 0.06], [0, 0, 1]);

    const finalX = useTransform(
        [progress, anchorX],
        ([p, ax]) =>
            normalizedStartPoint.x +
            (p as number) *
                ((ax as number) + offset.x - normalizedStartPoint.x),
    );
    const finalY = useTransform(
        [progress, anchorY],
        ([p, ay]) =>
            normalizedStartPoint.y +
            (p as number) *
                ((ay as number) + offset.y - normalizedStartPoint.y),
    );

    return (
        <motion.div
            className="fixed top-0 left-0"
            style={{
                x: finalX,
                y: finalY,
                translateX: "-50%",
                translateY: "-50%",
                opacity,
                scale: isMobile ? 0.5 : 1,
            }}
        >
            <div className={`${className} rounded-3xl overflow-hidden`}>
                <img
                    src={Triad1.src}
                    alt="Triad"
                    className="w-full h-full object-cover"
                />
            </div>
        </motion.div>
    );
};
