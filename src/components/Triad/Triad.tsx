import { useRef } from "react";
import {
    motion,
    useScroll,
    useTransform,
} from "motion/react";
import { TriadElement } from "./TriadElement";
import { TriadIntro } from "./TriadIntro";
import { StickyBlock } from "../ui/stickyBlock";
import type { TriadData } from "@/lib/strapi/strapi";

const Triad = ({slogan, triad1, triad2, triad3}: TriadData) => {
    const ref = useRef(null);

    console.log("TRIAD: ", {slogan, triad1, triad2, triad3});


    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 35%", "end start"],
    });

    const top = useTransform(
        scrollYProgress,
        [0.45, 0.52, 0.80, 1],
        ["100%", "0%", "0%", "-100%"],
    );
    
    const textColor = useTransform(
        scrollYProgress,
        [0.50, 0.52],
        ["var(--color-textColor)", "var(--color-primary-contrast)"],
    );

    return (
        <section ref={ref} className="bg-white">
            <TriadIntro text={slogan} scrollYProgress={scrollYProgress} />

            {/* 2800 appear */}
            <main className="relative h-[160vh] mb-[30vh]">
                <StickyBlock className="pt-[35vh]">
                    <ul className="flex flex-col gap-5 items-center text-white">
                        <TriadElement
                            className="font-light z-100"
                            scrollYProgress={scrollYProgress}
                            frameStart={0.50}
                            style={{ color: textColor as any }}
                        >
                            {triad1}
                        </TriadElement>
                        <TriadElement
                            className="font-medium z-100 !color-primary-foreground"
                            scrollYProgress={scrollYProgress}
                            frameStart={0.58}
                        >
                            {triad2}
                        </TriadElement>
                        <TriadElement
                            className="font-black z-100 !color-primary-foreground"
                            scrollYProgress={scrollYProgress}
                            frameStart={0.66}
                        >
                            {triad3}
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
