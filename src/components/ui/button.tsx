import * as React from "react";
import { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
    {
        variants: {
            variant: {
                default:
                    "bg-primary text-primary-foreground hover:bg-primary/90",
                accent: "bg-accent text-accent-foreground hover:bg-accent/90",
                inverse:
                    "bg-primary-foreground text-inverse-foreground hover:bg-inverse/90",
                destructive:
                    "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
                outline:
                    "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
                secondary:
                    "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
                link: "text-primary underline-offset-4 hover:underline",
            },
            size: {
                default: "h-9 px-4 py-2 has-[>svg]:px-3",
                xs: "h-6 gap-1 px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
                sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
                lg: "h-12 px-6 has-[>svg]:px-4",
                xl: "h-12 px-10",
                icon: "size-9",
                "icon-xs": "size-6 [&_svg:not([class*='size-'])]:size-3",
                "icon-sm": "size-8",
                "icon-lg": "size-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    },
);

function Button({
    className,
    variant = "default",
    size = "default",
    asChild = false,
    ...props
}: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    }) {
    const Comp = asChild ? Slot.Root : "button";

    return (
        <Comp
            data-slot="button"
            data-variant={variant}
            data-size={size}
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
}

/* ── LetterButton ────────────────────────────────────────────────────
 * En hover cada letra sale hacia arriba y vuelve desde abajo.
 * clip-path: inset(0) garantiza el recorte aunque overflow-hidden
 * no clipee CSS transforms en algunos navegadores.
 * ------------------------------------------------------------------ */
interface LetterButtonProps
    extends Omit<React.ComponentProps<"button">, "children">,
        VariantProps<typeof buttonVariants> {
    children: string;
    isHovered?: boolean;
}

function LetterButton({
    children,
    className,
    variant = "default",
    size = "default",
    isHovered: externalHovered,
    ...props
}: LetterButtonProps) {
    const [internalHovered, setInternalHovered] = useState(false);
    const hovered = externalHovered ?? internalHovered;
    const letters = children.split("");

    const transition = (i: number) => ({
        duration: 0.38,
        delay: i * 0.028,
        ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
    });

    const layerStyle: React.CSSProperties = {
        clipPath: "inset(0)",
        height: "1em",
        marginBlock: "auto",
    };

    return (
        <button
            data-slot="button"
            className={cn(
                buttonVariants({ variant, size }),
                "relative overflow-hidden",
                className,
            )}
            onMouseEnter={() => setInternalHovered(true)}
            onMouseLeave={() => setInternalHovered(false)}
            {...props}
        >
            {/* Spacer: mantiene el tamaño natural del botón */}
            <span className="invisible flex" aria-hidden>
                {children}
            </span>

            {/* Capa 1: sale hacia arriba en hover */}
            <span
                className="absolute inset-0 flex items-center justify-center"
                style={layerStyle}
            >
                {letters.map((char, i) => (
                    <motion.span
                        key={i}
                        className="inline-block"
                        animate={{ y: hovered ? "-110%" : "0%" }}
                        transition={transition(i)}
                    >
                        {char === " " ? " " : char}
                    </motion.span>
                ))}
            </span>

            {/* Capa 2: entra desde abajo en hover */}
            <span
                className="absolute inset-0 flex items-center justify-center"
                style={layerStyle}
                aria-label={children}
            >
                {letters.map((char, i) => (
                    <motion.span
                        key={i}
                        className="inline-block"
                        animate={{ y: hovered ? "0%" : "110%" }}
                        transition={transition(i)}
                    >
                        {char === " " ? " " : char}
                    </motion.span>
                ))}
            </span>
        </button>
    );
}

export { Button, buttonVariants, LetterButton };
