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
import { TriadElement } from "./TriadElement";

const Triad = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.9 });

    const { scrollY } = useScroll();
    const scale = useTransform(scrollY, [700, 2300], [2, 0.01]);

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

    const top = useTransform(
        scrollY,
        [2340, 2390, 3450, 4450],
        ["100%", "0%", "0%", "-100%"],
    );
    const textColor = useTransform(
        scrollY,
        [2380, 2390],
        ["var(--color-textColor)", "var(--color-primary-contrast)"],
    );

    return (
        <section ref={ref} className="bg-white">
            <header className="relative h-[200vh] mb-[-40vh]">
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
                    offset={{ x: -10, y: -30 }}
                />
                <FloatingImage
                    className="w-52 h-40"
                    anchor={{ anchorX, anchorY }}
                    startPoint={{ x: 12, y: -39 }}
                    scrollY={scrollY}
                    offset={{ x: 30, y: -25 }}
                />
                <FloatingImage
                    className="w-55 h-58"
                    anchor={{ anchorX, anchorY }}
                    startPoint={{ x: 90, y: -17 }}
                    scrollY={scrollY}
                    offset={{ x: 20, y: 20 }}
                />
                <FloatingImage
                    className="w-60 h-60"
                    anchor={{ anchorX, anchorY }}
                    startPoint={{ x: 17, y: 119 }}
                    scrollY={scrollY}
                    offset={{ x: 0, y: 5 }}
                />
                <FloatingImage
                    className="w-55 h-55"
                    anchor={{ anchorX, anchorY }}
                    startPoint={{ x: 109, y: 80 }}
                    scrollY={scrollY}
                    offset={{ x: 0, y: 6 }}
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
            </header>

            {/* 2800 appear */}
            <main className="relative h-[220vh] ">
                <div className="sticky h-screen top-0 pt-[35vh]">
                    <ul className="flex flex-col gap-5 items-center text-white">
                        <TriadElement
                            className="font-light z-100"
                            scrollY={scrollY}
                            frameStart={1500}
                            style={{ color: textColor as any }}
                        >
                            Innovación
                        </TriadElement>
                        <TriadElement
                            className="font-medium z-100 !color-primary-foreground"
                            scrollY={scrollY}
                            frameStart={2350}
                        >
                            Trato humano
                        </TriadElement>
                        <TriadElement
                            className="font-black z-100 !color-primary-foreground"
                            scrollY={scrollY}
                            frameStart={2800}
                        >
                            Capacidad resolutiva
                        </TriadElement>
                        <motion.div
                            className="fixed w-screen h-screen z-90 bg-primary"
                            style={{ top: top }}
                        />
                    </ul>
                </div>
            </main>
        </section>
    );
};

export default Triad;
