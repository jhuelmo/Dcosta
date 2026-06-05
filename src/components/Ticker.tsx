import { Asterisk } from "lucide-react";
import { motion } from "motion/react";

const words = [
    "COMPROMISO DE CALIDAD",
    "SERIVICIO PREMIUM"
];

const separator = (
    <span className="text-accent mx-8 lg:mx-12 select-none"><Asterisk size="340" strokeWidth={0.5} /></span>
);

const TickerRow = ({ reverse = false }: { reverse?: boolean }) => {
    const items = [...words, ...words];

    return (
        <div className="flex overflow-hidden">
            <motion.div
                className="flex shrink-0 items-center"
                animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
                {items.map((word, i) => (
                    <span key={i} className="flex items-center shrink-0">
                        <span className="text-5xl lg:text-[200px] font-bold font-headings tracking-tight text-primary/90 whitespace-nowrap">
                            {word}
                        </span>
                        {separator}
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

const Ticker = () => {
    return (
        <section className=" py-2 overflow-hidden flex flex-col gap-4">
            <TickerRow />
        </section>
    );
};

export default Ticker;
