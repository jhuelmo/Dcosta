import { motion } from "motion/react";

interface ServiceHeroProps {
  category: string;
  title: string;
  imageHero: string;
  imageAlt: string;
  description: string;
  extraText?: string;
  onBack?: () => void;
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 80 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: "easeOut" } as any,
});

const scaleInImage = {
  initial: { scale: 1.1, opacity: 0.5},
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 3, ease: "easeOut" } as any,
};

export default function ServiceHero({
  category,
  title,
  description,
  extraText,
  imageHero,
  imageAlt,
  onBack,
}: ServiceHeroProps) {
  return (
    <section className="container-lg ">
        <div className="p-6 font-sans">
        {/* Back Button */}
        <button
            onClick={onBack}
            className="flex items-center gap-2 mb-5 text-primary-light font-medium text-sm hover:opacity-70 transition-opacity"
        >
            <span className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center text-white text-base leading-none">
            ←
            </span>
            Back to Services
        </button>

        {/* Hero Card */}
        <div className="relative rounded-2xl overflow-hidden h-[420px] ">
            {/* Background Image */}
            <div className="absolute inset-0 bg-cover bg-center" >
                <motion.img {...scaleInImage} src={imageHero} alt={title} className="w-full h-full object-cover" />
            </div>
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-dark/75 via-neutral-dark/40 to-neutral-dark-900/10" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end px-9 pb-8">


                {/* Badge */}
                <motion.span
                    {...fadeUp(0.1)}
                    className="inline-block w-fit border border-white/70 rounded-full px-4 py-1 text-white text-xs font-medium tracking-wide mb-3"
                >
                    {category}
                </motion.span>

                {/* Title */}
                <motion.h1 
                    {...fadeUp(0.3)}
                    className="text-white text-5xl font-bold leading-tight tracking-tight mb-3">
                    {title}
                </motion.h1>

                {/* Description */}
                <motion.p
                    {...fadeUp(0.5)}
                    className="text-white/80  leading-relaxed max-w-xl mb-2"
                >
                    {description}
                </motion.p>

                {/* Extra Text */}
                <motion.p
                    {...fadeUp(0.7)}
                    className="text-white/90  font-semibold tracking-wide"
                >
                    {extraText}
                </motion.p>
                </div>
            </div>
        </div>
    </section>
  );
}