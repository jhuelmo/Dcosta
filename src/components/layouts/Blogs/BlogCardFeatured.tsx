import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface BlogCardFeaturedProps {
  category: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  imageAlt?: string;
  index?: number;
  href: string;
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const imageVariants = {
  hidden: { opacity: 0, x: -30, scale: 0.97 },
  visible: { opacity: 1, x: 0, scale: 1 },
};

const contentVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0 },
};

const tagVariants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0 },
};

export default function BlogCardFeatured({
  category,
  title,
  excerpt,
  imageUrl,
  imageAlt = "",
  index = 0,
  href,
}: BlogCardFeaturedProps) {
  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col md:flex-row gap-8 items-stretch"
    >
      <motion.div
        variants={imageVariants}
        transition={{ duration: 0.7, delay: index * 0.1 + 0.05, ease: [0.22, 1, 0.36, 1] }}
        className="w-full md:w-[55%] aspect-[4/3] rounded-2xl overflow-hidden shrink-0"
      >
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </motion.div>

      <motion.div
        variants={contentVariants}
        transition={{ duration: 0.6, delay: index * 0.1 + 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col justify-around gap-6 py-2"
      >
        <div className="flex flex-col gap-4">
          <motion.span
            variants={tagVariants}
            transition={{ duration: 0.4, delay: index * 0.1 + 0.2, ease: "easeOut" }}
            className="w-fit border border-gray-200 rounded-full px-4 py-1.5 text-sm text-gray-600"
          >
            {category}
          </motion.span>

          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-snug">
            {title}
          </h2>

          <p className="text-base text-gray-500 leading-relaxed">
            {excerpt}
          </p>
        </div>

        <motion.a
          href={href}
          className="flex items-center gap-4 w-fit rounded-full bg-accent px-2 py-2 pr-6 font-medium text-white hover:brightness-110 transition-all"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white">
            <ArrowRight className="w-4 h-4 text-accent" />
          </span>
          Read More
        </motion.a>
      </motion.div>
    </motion.article>
  );
}