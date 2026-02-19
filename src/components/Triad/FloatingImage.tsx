import {
    motion,
    MotionValue,
    useMotionValueEvent,
    useTransform,
} from "motion/react";
import Triad1 from "../../assets/Services/Service-1.jpg";

interface Props {
    anchorX: MotionValue<number>;
    anchorY: MotionValue<number>;
    scrollY: MotionValue<number>;
}

export const FloatingImage = ({ anchorX, anchorY, scrollY }: Props) => {
    const progress = useTransform(scrollY, [700, 2300], [0, 1]);
    const finalX = useTransform(
        [progress, anchorX],
        ([p, ax]) => (p as number) * (ax as number),
    );
    const finalY = useTransform(
        [progress, anchorY],
        ([p, ay]) => (p as number) * (ay as number),
    );
    const left = useTransform(scrollY, [0, 1300], [-500, 1]);
    const top = useTransform(scrollY, [0, 2300], [300, 1]);

    const scale = useTransform(scrollY, [700, 1000], [0.8, 0.7]);

    useMotionValueEvent(anchorX, "change", (v) => console.log("anchorX:", v));
    useMotionValueEvent(anchorY, "change", (v) => console.log("anchorY:", v));
    useMotionValueEvent(progress, "change", (v) => console.log("progress:", v));

    return (
        <motion.div
            className="fixed top-0 left-0"
            style={{
                x: finalX,
                y: finalY,
                left: left,
                top: top,
                scale: scale,
                translateX: "-50%",
                translateY: "-50%",
            }}
        >
            <div className="w-96 h-96 rounded-3xl overflow-hidden">
                <img
                    src={Triad1.src}
                    alt="Triad"
                    className="w-full h-full object-cover"
                />
            </div>
        </motion.div>
    );
};
