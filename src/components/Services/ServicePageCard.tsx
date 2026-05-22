import { getIcon } from "@/lib/strapi/icons";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { motion } from "motion/react";

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0 },
};
const iconVariants = {
  hidden: { opacity: 0, scale: 0.7, rotate: -10 },
  visible: { opacity: 1, scale: 1, rotate: 0 },
};

const titleVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const buttonVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const descVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.85, x: 30 },
  visible: { opacity: 1, scale: 1, x: 0 },
};

interface ServicePageCardProps {
  title: string;
  icon: string;
  description: string;
  imageUrl: string;
  index: number;
  slug: string;
  imageAlt?: string;
  
}

export default function ServicePageCard({
  title,
  icon,
  description,
  imageUrl,
  index,
  imageAlt = "",
  slug,
}: ServicePageCardProps) {
  const Icon = getIcon(icon);
  
  return (
    <motion.div
      className="flex items-center gap-6 bg-white rounded-2xl p-6 shadow-xs"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-1 flex-col min-w-[180px] gap-10">
        <div className="flex items-start gap-3">
          <motion.div 
            variants={iconVariants}
            transition={{
              duration: 0.5, 
              delay: 0.15, 
              ease: [0.22, 1, 0.36, 1] 
            }}
          >
            <Icon className="w-12 h-12 text-gray-700 shrink-0" strokeWidth={1.5} />
          </motion.div>
          <div className="flex flex-col gap-10">
            <motion.h3
              className="text-4xl text-gray-900 whitespace-nowrap"
              variants={titleVariants}
              transition={{
                duration: 0.5, 
                delay: 0.25, 
                ease: [0.22, 1, 0.36, 1] 
              }}
            >
              {title}
            </motion.h3>
            <motion.a
              href={`/services/${slug}`}
              className="flex items-center gap-4 w-fit border border-gray-200 rounded-full p-2 pr-5 font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              variants={buttonVariants}
              transition={{
                duration: 0.4, 
                delay: 0.35, 
                ease: "easeOut"
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent">
                <ArrowRight className="w-4 h-4 text-white" />
              </span>
              Ver Detalles
            </motion.a>
          </div>
        </div>
      </div>
      <div className="flex flex-1 gap-4 items-center flex-row justify-between">
        <motion.p
          className="flex-1 text-xl text-gray-500 max-w-[50%] leading-relaxed"
          variants={descVariants}
          transition={{
            duration: 0.6, 
            delay: 0.3, 
            ease: "easeOut" 
          }}
        >
          {description}
        </motion.p>
        <motion.div
          className="w-48 h-48 rounded-xl overflow-hidden shrink-0"
          variants={imageVariants}
          transition={{
            duration: 0.6,
            delay: 0.25,
            ease: [0.22, 1, 0.36, 1]
          }}
        >
          <img src={imageUrl} alt={imageAlt} className="w-full h-full object-cover" />
        </motion.div>
      </div>
    </motion.div>
  );
}