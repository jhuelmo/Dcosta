import { motion, MotionValue, useTransform } from "motion/react";
import { useState, useEffect } from "react";
import Triad1 from "../../assets/Services/Service-1.jpg";

interface Props {
    anchor: {
        anchorX: MotionValue<number>;
        anchorY: MotionValue<number>;
    };
    startPoint?: { x: number; y: number };
    scrollY: MotionValue<number>;
    className?: string;
}

export const FloatingImage = ({
    anchor: { anchorX, anchorY },
    startPoint = { x: 0, y: 0 },
    scrollY,
    className,
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

    const normalizedStartPoint = {
        x: (startPoint.x / 100) * viewportDims.width,
        y: (startPoint.y / 100) * viewportDims.height,
    };

    const progress = useTransform(scrollY, [950, 1900], [0, 1]);

    const finalX = useTransform(
        [progress, anchorX],
        ([p, ax]) =>
            normalizedStartPoint.x +
            (p as number) * ((ax as number) - normalizedStartPoint.x),
    );
    const finalY = useTransform(
        [progress, anchorY],
        ([p, ay]) =>
            normalizedStartPoint.y +
            (p as number) * ((ay as number) - normalizedStartPoint.y),
    );

    return (
        <motion.div
            className="fixed top-0 left-0"
            style={{
                x: finalX,
                y: finalY,
                translateX: "-50%",
                translateY: "-50%",
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
