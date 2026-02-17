import { useEffect, useRef } from "react";
import { motion, useInView, useScroll } from "motion/react";

const Triad = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.5 });

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"], // empieza cuando entra, termina cuando sale
    });

    useEffect(() => {
        console.log("scrollYProgress:", scrollYProgress);
    }, [scrollYProgress]);

    return (
        <section
            ref={ref}
            className=" bg-white w-screen h-screen flex items-center justify-center overflow-hidden"
        >
            <motion.div
                className="container-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            >
                <h1 className="text-center w-2xl font-bold font-body! tracking-tighter text-9xl scale-150 leading-none">
                    Innovación para tu sonrisa
                </h1>
            </motion.div>
        </section>
    );
};

export default Triad;
