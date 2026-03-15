import { useState } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";

const ServiceCard = ({ service }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="relative rounded-3xl o cursor-pointer border border-gray-200"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
        >
            <motion.div
                className="absolute inset-0 bg-primary rounded-3xl"
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.4 }}
            />

            {/* Image on hover */}
            <motion.div
                className="absolute right-10 top-[-10%] aspect-square z-100 w-85 rounded-3xl overflow-hidden"
                animate={{
                    opacity: isHovered ? 1 : 0,
                    x: isHovered ? 25 : -25,
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                <img
                    src={service.image}
                    alt={service.title}
                    className="h-full w-full object-cover"
                />
            </motion.div>

            {/* Content */}
            <div className="relative p-8 lg:p-12 flex flex-col justify-between">
                <div className="grid grid-cols-3 gap-8">
                    {/* Number and Title */}
                    <div className="flex items-start justify-center gap-8">
                        <motion.span
                            className="text-md font-light"
                            animate={{
                                color: isHovered ? "#ffffff" : "#2d4453",
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            {service.id}
                        </motion.span>

                        <motion.h3
                            className="text-xl lg:text-2xl font-bold font-headings"
                            animate={{
                                color: isHovered ? "#ffffff" : "#072957",
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            {service.title}
                        </motion.h3>
                    </div>

                    {/* Items List */}
                    <div className="space-y-3 max-w-md">
                        {/* Description */}
                        <motion.p
                            className="text-md overflow-hidden [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical]"
                            animate={{
                                color: isHovered ? "#e5e5e5" : "#2d4453",
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            {service.description}
                        </motion.p>
                        {service.items.map((item, index) => (
                            <motion.div
                                key={index}
                                className="flex items-center gap-3"
                                animate={{
                                    color: isHovered ? "#ffffff" : "#2d4453",
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div
                                    animate={{
                                        backgroundColor: isHovered
                                            ? "#c9b27c"
                                            : "#2d4453",
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className="rounded-full p-1"
                                >
                                    <Check className="w-4 h-4 text-white" />
                                </motion.div>
                                <span className="text-base">{item}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ServiceCard;
