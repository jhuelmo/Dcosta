import { useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, useMotionValueEvent } from "motion/react";

const Triad = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.9 });

    const { scrollY } = useScroll();

    // Transformar el scroll de 500px a 900px a valores de animación
    const scale = useTransform(scrollY, [650, 1200], [1, 0.5]);
    const y = useTransform(scrollY, [650, 1200], [250, -150]);

    useMotionValueEvent(scrollY, "change", (latest) => {
        console.log("Scroll Y: ", latest)
    })

    return (
        <section
            ref={ref}
            className="sticky top-0 bg-white w-screen h-[200vh] overflow-hidden"
        >
            <div className="h-full top-0 flex">
                <motion.div
                className="container-lg"
                style={{ 
                    scale,
                    y
                }}
            >
                <h1 className="text-center w-2xl font-bold font-body! tracking-tighter text-9xl scale-150 leading-none">
                    Innovación para tu sonrisa
                </h1>
            </motion.div>
            </div>
        </section>
    );
};

export default Triad;
