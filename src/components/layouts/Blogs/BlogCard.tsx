import { motion } from "motion/react";

interface BlogCardProps {
  category: string;
  date: string;
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
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1 },
};

const contentVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function BlogCard({
  category,
  date,
  title,
  excerpt,
  imageUrl,
  imageAlt = "",
  index = 0,
  href,
}: BlogCardProps) {
  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-4 w-full"
    >
      <motion.div
        variants={imageVariants}
        transition={{ duration: 0.7, delay: index * 0.1 + 0.05, ease: [0.22, 1, 0.36, 1] }}
        className="w-full aspect-[4/3] rounded-2xl overflow-hidden"
      >
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </motion.div>

      <motion.div
        variants={contentVariants}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-3"
      >
        <div className="flex items-center gap-2 text-sm text-textColor/60">
          <span className="font-medium">{category}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
          <span>{date}</span>
        </div>

        <h3 className="text-xl font-semibold text-textColor leading-snug">
          {title}
        </h3>

        <p className="text-sm text-textColor/70 leading-relaxed line-clamp-3">
            {excerpt}
        </p>

        <a
            href={href}
            className="w-fit font-bold text-primary hover:text-accent transition-colors relative group"
        >
            Read More
            <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
        </a>
      </motion.div>
    </motion.article>
  );
}