import {
    motion,
    MotionValue,
    useMotionValue,
    useMotionValueEvent,
    useTransform,
} from "motion/react";
import { FloatingImage } from "./FloatingImage";
import { useRef } from "react";
import { StickyBlock } from "../ui/stickyBlock";

interface TriadIntroProps {
    scrollY: MotionValue<number>;
}

export const TriadIntro = ({ scrollY }: TriadIntroProps) => {
    const h2Ref = useRef<HTMLHeadingElement>(null);
    const anchorX = useMotionValue(0);
    const anchorY = useMotionValue(0);
    const floatingImages = [
        {
            className: "w-52 h-52",
            startPoint: { x: -9, y: 50 },
            offset: { x: -10, y: -30 },
        },
        {
            className: "w-52 h-40",
            startPoint: { x: 12, y: -39 },
            offset: { x: 30, y: -25 },
        },
        {
            className: "w-55 h-58",
            startPoint: { x: 90, y: -17 },
            offset: { x: 20, y: 20 },
        },
        {
            className: "w-60 h-60",
            startPoint: { x: 17, y: 119 },
            offset: { x: 0, y: 5 },
        },
        {
            className: "w-55 h-55",
            startPoint: { x: 109, y: 80 },
            offset: { x: 0, y: 6 },
        },
    ];

    const scale = useTransform(scrollY, [700, 2300], [2, 0.01]);

    useMotionValueEvent(scrollY, "change", () => {
        if (!h2Ref.current) return;
        const rect = h2Ref.current.getBoundingClientRect();
        anchorX.set(rect.left + rect.width / 2);
        anchorY.set(rect.top + rect.height / 2);
    });

    return (
        <header className="relative h-[200vh] mb-[-40vh]">
            <StickyBlock>
                <div className="h-full flex justify-center items-center text-center overflow-hidden">
                    <motion.h2
                        ref={h2Ref}
                        className="relative leading-25 font-medium font-body! tracking-tighter text-9xl max-w-3xl"
                        style={{
                            scale,
                        }}
                    >
                        Calidad que sonríe
                    </motion.h2>
                </div>
            </StickyBlock>
            {floatingImages.map((image, index) => (
                <FloatingImage
                    key={`floating-image-${index}`}
                    className={image.className}
                    anchor={{ anchorX, anchorY }}
                    startPoint={image.startPoint}
                    scrollY={scrollY}
                    offset={image.offset}
                />
            ))}
        </header>
    );
};
