import { useEffect, useRef, useState } from "react";
import {
    motion,
    useInView,
    useScroll,
    useTransform,
    useMotionValueEvent,
    useMotionValue,
} from "motion/react";
import { FloatingImage } from "./FloatingImage";

const Triad = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.9 });

    const { scrollY } = useScroll();

    // Transformar el scroll de 500px a 900px a valores de animación
    const scale = useTransform(scrollY, [700, 1300, 3300], [1, 0.9, 0.01]);
    const y = useTransform(scrollY, [700, 1300, 3300], [120, 500, 1800]);
    const blur = useTransform(scrollY, [700, 1200, 2000, 3300], [0, 0, 0, 350]);
    const filter = useTransform(blur, (value) => `blur(${value}px)`);

    useMotionValueEvent(scrollY, "change", (latest) => {
        console.log("Scroll Y: ", latest);
    });

    const h2Ref = useRef<HTMLHeadingElement>(null);
    const anchorX = useMotionValue(0);
    const anchorY = useMotionValue(0);

    useMotionValueEvent(scrollY, "change", () => {
        if (!h2Ref.current) return;
        const rect = h2Ref.current.getBoundingClientRect();
        anchorX.set(rect.left + rect.width / 2);
        anchorY.set(rect.top + rect.height / 2);
    });

    return (
        <section
            ref={ref}
            className="bg-white w-screen h-[230vh] overflow-hidden"
        >
            <div className="top-0 flex h-[200vh]">
                <motion.div className="container-lg sticky top-0">
                    <motion.h2
                        ref={h2Ref}
                        className="text-center leading-25 w-2xl font-bold font-body! tracking-tighter text-9xl scale-150"
                        style={{
                            scale,
                            y,
                            filter,
                        }}
                    >
                        Innovación para tu sonrisa
                    </motion.h2>
                </motion.div>
                <FloatingImage
                    anchorX={anchorX}
                    anchorY={anchorY}
                    scrollY={scrollY}
                />
                <motion.div
                    className="fixed top-0 left-0 w-3 h-3 rounded-full bg-red-500 z-50"
                    style={{
                        x: anchorX,
                        y: anchorY,
                        translateX: "-50%",
                        translateY: "-50%",
                    }}
                />
            </div>
        </section>
    );
};

export default Triad;
