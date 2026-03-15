import heroPlaceholder from "src/assets/hero-placeholder.png";
import logoPlaceholder from "../assets/logo-placeholder.png";
import service1 from "../assets/Services/Service-1.jpg";
import service2 from "../assets/Services/Service-2.jpg";
import service3 from "../assets/Services/Service-3.jpg";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";

const Works = () => {
    const workImages = [
        { src: service1.src, alt: "Trabajo 1" },
        { src: service2.src, alt: "Trabajo 2" },
        { src: service3.src, alt: "Trabajo 3" },
        { src: heroPlaceholder.src, alt: "Trabajo 4" },
        { src: service2.src, alt: "Trabajo 5" },
    ];

    return (
        <section className=" bg-neutral-50">
            <div className="container-xl px-4 lg:px-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-16">
                    <h2 className="text-5xl lg:text-7xl font-bold font-headings text-primary">
                        TRABAJOS
                    </h2>

                    <motion.button
                        className="flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-full font-medium hover:bg-accent-dark transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Ver Todos los Servicios
                        <ArrowUpRight className="w-5 h-5" />
                    </motion.button>
                </div>

                <div className="mt-20 w-full">
                    <Carousel
                        className="w-full"
                        opts={{ overflow: true, align: "start" }}
                    >
                        <CarouselContent>
                            {workImages.map((image, index) => (
                                <CarouselItem
                                    className="md:basis-1/2 lg:basis-1/3"
                                    key={index}
                                >
                                    <div className="p-1">
                                        <Card>
                                            <CardContent className="flex aspect-square items-center justify-center p-6">
                                                <span className="text-4xl font-semibold">
                                                    {image.alt}
                                                </span>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="mt-6 flex justify-end gap-3">
                            <CarouselPrevious className="static! translate-x-0! translate-y-0!" />
                            <CarouselNext className="static! translate-x-0! translate-y-0!" />
                        </div>
                    </Carousel>
                </div>
            </div>
        </section>
    );
};

export default Works;
