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

    // // Transformar el scroll de 500px a 900px a valores de animación
    const scale = useTransform(scrollY, [700, 2300], [2, 0.01]);
    const marginBottom = useTransform(
        scrollY,
        [1600, 1800, 1900, 2000],
        ["0vh", "-10vh", "-50vh", "-108vh"],
    );

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
        <section ref={ref} className="block bg-white">
            <motion.header
                className="relative h-[180vh]"
                style={{ marginBottom }}
            >
                <div className="sticky h-screen top-0">
                    <div className="h-full flex justify-center items-center text-center overflow-hidden">
                        <motion.h2
                            ref={h2Ref}
                            className="relative leading-25 font-medium font-body! tracking-tighter text-9xl max-w-3xl"
                            style={{
                                scale,
                            }}
                        >
                            Innovación para tu sonrisa
                        </motion.h2>
                    </div>
                </div>
                <FloatingImage
                    className="w-52 h-52"
                    anchor={{ anchorX, anchorY }}
                    startPoint={{ x: -9, y: 50 }}
                    scrollY={scrollY}
                />
                <FloatingImage
                    className="w-52 h-40"
                    anchor={{ anchorX, anchorY }}
                    startPoint={{ x: 12, y: -39 }}
                    scrollY={scrollY}
                />
                <FloatingImage
                    className="w-55 h-58"
                    anchor={{ anchorX, anchorY }}
                    startPoint={{ x: 90, y: -17 }}
                    scrollY={scrollY}
                />
                <FloatingImage
                    className="w-60 h-60"
                    anchor={{ anchorX, anchorY }}
                    startPoint={{ x: 17, y: 119 }}
                    scrollY={scrollY}
                />
                <FloatingImage
                    className="w-55 h-55"
                    anchor={{ anchorX, anchorY }}
                    startPoint={{ x: 109, y: 80 }}
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
            </motion.header>
        </section>
    );
};

export default Triad;
