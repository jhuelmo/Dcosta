import React, { useEffect, useState } from "react";
import {
    motion,
    useMotionValueEvent,
    useScroll,
    AnimatePresence,
} from "motion/react";
import { HeaderLink } from "./HeaderLink";
import { Button } from "@/components/ui/button";
import logoUrl from "@/assets/logo-placeholder.png";
import { useBreakpoint } from "@/hooks/useBreakpoint";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Servicios", href: "/services" },
    { label: "Galeria", href: "/gallery" },
    { label: "Tecnología", href: "/tecnology" },
    { label: "Equipo", href: "/team" },
];

export function Header({
    variant = "default",
}: {
    variant?: "default" | "variant2";
}) {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const isDesktop = useBreakpoint(1024);

    const variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 },
        },
        collapsed: {
            opacity: 1,
            transition: { staggerChildren: 0.05 },
        },
    };

    const headerVariants = {
        hidden: { opacity: 0, scale: 0.95, width: "180px", y: -100, x: "-50%" },
        visible: {
            opacity: 1,
            scale: 1,
            width: "72%",
            y: 0,
            x: "-50%",
            transition: {
                opacity: { duration: 1, ease: "easeOut" },
                scale: { duration: 1, ease: "easeOut" },
                width: {
                    duration: 0.6,
                    ease: "easeOut",
                    delay: hasLoaded ? 0 : 0.6,
                },
                y: { duration: 0.5, ease: "easeInOut" },
                delayChildren: 1,
            },
        },
        collapsed: {
            opacity: 1,
            scale: 1,
            width: "50vw",
            y: 0,
            x: "-50%",
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            backdropFilter: "blur(12px)",
            transition: { duration: 0.45, ease: "easeOut" },
        },
    };

    const mobileMenuVariants = {
        hidden: {
            opacity: 0,
            y: -8,
            scale: 0.97,
            transition: { duration: 0.2, ease: "easeIn" },
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.25,
                ease: "easeOut",
                staggerChildren: 0.06,
                delayChildren: 0.05,
            },
        },
    };

    const menuItemVariants = {
        hidden: { opacity: 0, x: -12 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.2, ease: "easeOut" },
        },
    };

    const { scrollY } = useScroll();

    useEffect(() => {
        const timeout = setTimeout(() => setHasLoaded(true), 1800);
        return () => clearTimeout(timeout);
    }, []);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setCollapsed(latest >= 800);
    });

    // Cierra el menú al hacer scroll
    useEffect(() => {
        if (collapsed) setMenuOpen(false);
    }, [collapsed]);

    return (
        <>
            {variant === "default" && (
                <>
                    <motion.header
                        initial="hidden"
                        animate={collapsed ? "collapsed" : "visible"}
                        variants={headerVariants}
                        className="header fixed left-1/2 top-6 z-999 flex h-16 items-center justify-between rounded-full bg-neutral p-2 shadow-md shadow-black/10"
                    >
                        <motion.a
                            className="logo ml-2 h-auto w-32 shrink-0"
                            href="/"
                        >
                            <img
                                className="h-auto w-32 object-cover"
                                src={
                                    typeof logoUrl === "string"
                                        ? logoUrl
                                        : logoUrl.src
                                }
                                alt="Logo"
                            />
                        </motion.a>

                        {/* Nav desktop — oculto en tablet/móvil */}
                        <motion.nav
                            className="hidden lg:flex flex-row items-center gap-6"
                            variants={variants}
                        >
                            {navLinks.map((link) => (
                                <motion.div
                                    key={link.label}
                                    variants={{
                                        hidden: { opacity: 0, x: -20 },
                                        visible: { opacity: 1, x: 0 },
                                        collapsed: { opacity: 1, x: 0 },
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        ease: "easeOut",
                                    }}
                                >
                                    <HeaderLink
                                        className="text-base letter-spacing-animation"
                                        href={link.href}
                                    >
                                        {link.label}
                                    </HeaderLink>
                                </motion.div>
                            ))}
                        </motion.nav>

                        {/* CTA desktop — oculto en tablet/móvil */}
                        <motion.div
                            className="hidden lg:block"
                            variants={variants}
                        >
                            <Button
                                asChild
                                className="buttonBubble cursor-pointer letter-spacing-animation"
                                size="lg"
                            >
                                <a href="/contact">Concreta una cita</a>
                            </Button>
                        </motion.div>

                        {/* Botón hamburguesa — visible solo en tablet/móvil */}
                        <motion.button
                            className="lg:hidden mr-2 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full"
                            onClick={() => setMenuOpen((prev) => !prev)}
                            aria-label="Abrir menú"
                            whileTap={{ scale: 0.92 }}
                        >
                            <motion.span
                                className="block h-0.5 w-5 rounded-full bg-current origin-center"
                                animate={
                                    menuOpen
                                        ? { rotate: 45, y: 8 }
                                        : { rotate: 0, y: 0 }
                                }
                                transition={{ duration: 0.25 }}
                            />
                            <motion.span
                                className="block h-0.5 w-5 rounded-full bg-current"
                                animate={
                                    menuOpen
                                        ? { opacity: 0, scaleX: 0 }
                                        : { opacity: 1, scaleX: 1 }
                                }
                                transition={{ duration: 0.2 }}
                            />
                            <motion.span
                                className="block h-0.5 w-5 rounded-full bg-current origin-center"
                                animate={
                                    menuOpen
                                        ? { rotate: -45, y: -8 }
                                        : { rotate: 0, y: 0 }
                                }
                                transition={{ duration: 0.25 }}
                            />
                        </motion.button>
                    </motion.header>

                    {/* Menú desplegable móvil */}
                    <AnimatePresence>
                        {menuOpen && (
                            <motion.div
                                key="mobile-menu"
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={mobileMenuVariants}
                                className="fixed left-1/2 top-24 z-998 w-[calc(100vw-2rem)] max-w-sm -translate-x-1/2 rounded-2xl bg-neutral/95 backdrop-blur-md p-4 shadow-lg shadow-black/10 lg:hidden"
                            >
                                <nav className="flex flex-col gap-1">
                                    {navLinks.map((link) => (
                                        <motion.div
                                            key={link.label}
                                            variants={menuItemVariants}
                                        >
                                            <a
                                                href={link.href}
                                                className="flex w-full items-center rounded-xl px-4 py-3 text-base font-medium transition-colors hover:bg-black/5"
                                                onClick={() =>
                                                    setMenuOpen(false)
                                                }
                                            >
                                                {link.label}
                                            </a>
                                        </motion.div>
                                    ))}
                                </nav>

                                <motion.div
                                    variants={menuItemVariants}
                                    className="mt-3 pt-3 border-t border-black/10"
                                >
                                    <Button
                                        asChild
                                        className="buttonBubble w-full cursor-pointer letter-spacing-animation"
                                        size="lg"
                                    >
                                        <a
                                            href="/contact"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            Concreta una cita
                                        </a>
                                    </Button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            )}

            {variant === "variant2" && (
                <header className="absolute w-full z-20 flex items-center justify-center  px-24 py-8">
                    <div className="flex w-full justify-between">
                        <div className="relative h-auto w-100 overflow-visible">
                            <img
                                className="absolute -top-1/4 left-0 scale-[0.5] origin-top-left grayscale-100 brightness-2000"
                                src={
                                    typeof logoUrl === "string"
                                        ? logoUrl
                                        : logoUrl.src
                                }
                                alt="Logo"
                            />
                        </div>
                        <div className="flex items-center gap-4  font-semibold">
                            <Button
                                asChild
                                variant="ghost"
                                className="cursor-pointer rounded-xl text-md text-primary-foreground bg-primary/1 border border-primary/10 backdrop-blur-sm"
                                size="lg"
                            >
                                <a href="/signup">Log in</a>
                            </Button>

                            <Button
                                asChild
                                variant="inverse"
                                className="cursor-pointer letter-spacing-animation rounded-xl text-md"
                                size="lg"
                            >
                                <a href="/signup">Concreta una cita</a>
                            </Button>
                        </div>
                    </div>
                </header>
            )}
        </>
    );
}
