import { useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, useMotionValueEvent } from "motion/react";

const Triad = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.9 });

    const { scrollY } = useScroll();

    // Transformar el scroll de 500px a 900px a valores de animación
    const scale = useTransform(scrollY, [650, 1500], [1, 0.1]);
    const y = useTransform(scrollY, [650, 1200, 1500], [120, 200, 250]);
    const blur = useTransform(scrollY, [650, 1200,1350, 1500], [0, 0 ,50,350]);
    const filter = useTransform(blur, (value) => `blur(${value}px)`);

    useMotionValueEvent(scrollY, "change", (latest) => {
        console.log("Scroll Y: ", latest)
    })

    return (
        <section
            ref={ref}
            className="bg-white w-screen h-[200vh] overflow-hidden"
        >
            <div className="top-0 flex h-[200vh]">
                <motion.div
                    className="container-lg sticky top-0"
                    style={{ 
                        scale,
                        y,
                        filter
                    }}
                >
                    <h2 className="text-center leading-25 w-2xl font-bold font-body! tracking-tighter text-9xl scale-150">
                        Innovación para tu sonrisa
                    </h2>
                </motion.div>
            </div>
        </section>
    );
};

export default Triad;
