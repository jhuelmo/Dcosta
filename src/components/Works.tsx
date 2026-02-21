import heroPlaceholder from "src/assets/hero-placeholder.png";
import logoPlaceholder from "../assets/logo-placeholder.png";
import service1 from "../assets/Services/Service-1.jpg";
import service2 from "../assets/Services/Service-2.jpg";
import service3 from "../assets/Services/Service-3.jpg";
import { motion } from "motion/react";

const Works = () => {
    const workImages = [
        { src: service1.src, alt: "Trabajo 1" },
        { src: service2.src, alt: "Trabajo 2" },
        { src: service3.src, alt: "Trabajo 3" },
        { src: heroPlaceholder.src, alt: "Trabajo 4" },
        { src: service2.src, alt: "Trabajo 5" },
    ];

    const duplicatedWorkImages = [...workImages, ...workImages];

    return (
        <section id="works" className="w-full relative py-16">
            <div className="text-center space-y-6">
                <span className="block text-xl font-medium tracking-wider">
                    Nuestra experiencia
                </span>
                <h2 className="text-7xl font-bold">QUE DICE DE NOSOTROS</h2>
            </div>
            <div className="mt-20 w-full">
                <motion.ul
                    className="flex w-full gap-16"
                    animate={{
                        x: ["0%", "-100%"],
                        transition: {
                            ease: "linear",
                            duration: 40,
                            repeat: Infinity,
                        },
                    }}
                >
                    {duplicatedWorkImages.map((image, index) => (
                        <li
                            key={`work-image-${index}`}
                            className={`w-80 h-80 shrink-0 overflow-hidden rounded-3xl transition-transform duration-300
                                ${index % 2 === 0 ? "rotate-6 hover:rotate-0" : "-rotate-6 hover:rotate-0"}
                            `}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className={`h-full w-full object-cover rounded-3xl`}
                                loading="lazy"
                            />
                        </li>
                    ))}
                </motion.ul>
            </div>
        </section>
    );
};

export default Works;
