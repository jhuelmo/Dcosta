import { motion } from "motion/react";

function Title({ title }: { title: string }) {
  return (
    <motion.h1
        className="text-5xl md:text-8xl font-medium text-primary/70"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <strong className="text-primary">{title.charAt(0)}</strong>
        {title.slice(1)}
      </motion.h1>
  );
}
export default Title;