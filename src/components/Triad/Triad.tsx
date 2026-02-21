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
import { TriadIntro } from "./TriadIntro";
import { StickyBlock } from "../ui/stickyBlock";

const Triad = () => {
    const ref = useRef(null);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        console.log("Scroll Y: ", latest);
    });

    const top = useTransform(
        scrollY,
        [2290, 2520, 3500, 4250],
        ["100%", "0%", "0%", "-100%"],
    );
    const textColor = useTransform(
        scrollY,
        [2420, 2430],
        ["var(--color-textColor)", "var(--color-primary-contrast)"],
    );

    return (
        <section ref={ref} className="bg-white">
            <TriadIntro scrollY={scrollY} />

            {/* 2800 appear */}
            <main className="relative h-[220vh] ">
                <StickyBlock className="pt-[35vh]">
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
                            className="fixed w-screen h-screen z-90 p-4  overflow-hidden"
                            style={{ top: top }}
                        >
                            <div className="bg-primary rounded-3xl w-full h-full"></div>
                        </motion.div>
                    </ul>
                </StickyBlock>
            </main>
        </section>
    );
};

export default Triad;
