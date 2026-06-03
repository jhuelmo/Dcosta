import React, { useEffect, useState } from "react";
import {
    motion,
    useMotionValueEvent,
    useScroll,
    AnimatePresence,
    type Variants,
} from "motion/react";
import { HeaderLink } from "./HeaderLink";
import { Button } from "@/components/ui/button";
import logoUrl from "@/assets/logo-placeholder.png";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Servicios", href: "/services" },
    { label: "Tecnología", href: "/tecnology" },
    { label: "Equipo", href: "/team" },
    { label: "Galeria", href: "/gallery" },
    { label: "Galeria2", href: "/gallery2" },
];

export function Header(_: { variant?: "default" }) {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 1024);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const headerVariants: Variants = {
        hidden: {
            opacity: 0,
            scale: isMobile ? 1 : 0.88,
            width: isMobile ? "calc(100vw - 2rem)" : "160px",
            y: -80,
            x: "-50%",
        },
        visible: {
            opacity: 1,
            scale: 1,
            width: isMobile ? "calc(100vw - 2rem)" : "1280px",
            y: 0,
            x: "-50%",
            transition: {
                opacity: { duration: 0.5, ease: "easeOut" },
                scale: isMobile ? { duration: 0 } : { type: "spring", stiffness: 180, damping: 22 },
                width: isMobile
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 100, damping: 18, delay: hasLoaded ? 0 : 0.5 },
                y: { type: "spring", stiffness: 280, damping: 28 },
                delayChildren: 0.9,
            },
        },
        collapsed: {
            opacity: 1,
            scale: 1,
            width: isMobile ? "calc(100vw - 2rem)" : "46vw",
            y: 0,
            x: "-50%",
            backgroundColor: "rgba(255, 255, 255, 0.72)",
            backdropFilter: "blur(20px)",
            transition: {
                type: "spring",
                stiffness: 220,
                damping: 30,
            },
        },
    };

    const navVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.07, delayChildren: 0.15 },
        },
        collapsed: {
            opacity: 1,
            transition: { staggerChildren: 0.04 },
        },
    };

    const navItemVariants: Variants = {
        hidden: { opacity: 0, y: -14 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 320, damping: 26 },
        },
        collapsed: { opacity: 1, y: 0 },
    };

    const mobileMenuVariants: Variants = {
        hidden: {
            opacity: 0,
            y: -16,
            scale: 0.94,
            transition: { duration: 0.18, ease: "easeIn" },
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 320,
                damping: 28,
                staggerChildren: 0.06,
                delayChildren: 0.04,
            },
        },
    };

    const menuItemVariants: Variants = {
        hidden: { opacity: 0, x: -18 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { type: "spring", stiffness: 320, damping: 26 },
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

    useEffect(() => {
        if (collapsed) setMenuOpen(false);
    }, [collapsed]);

    return (
        <>
            <motion.header
                initial="hidden"
                animate={collapsed ? "collapsed" : "visible"}
                variants={headerVariants}
                className="header fixed left-1/2 top-6 z-999 flex h-16 items-center justify-between rounded-full bg-neutral p-2 shadow-md shadow-black/10 max-w-[calc(100vw-5rem)]"
            >
                <motion.a className="logo ml-2 h-auto w-32 shrink-0" href="/">
                    <img
                        className="h-auto w-32 object-cover"
                        src={typeof logoUrl === "string" ? logoUrl : logoUrl.src}
                        alt="Logo"
                    />
                </motion.a>

                {/* Nav desktop */}
                <motion.nav
                    className="hidden lg:flex flex-row items-center gap-6"
                    variants={navVariants}
                >
                    {navLinks.map((link) => (
                        <motion.div key={link.label} variants={navItemVariants}>
                            <HeaderLink
                                className="text-base letter-spacing-animation"
                                href={link.href}
                            >
                                {link.label}
                            </HeaderLink>
                        </motion.div>
                    ))}
                </motion.nav>

                {/* CTA desktop */}
                <motion.div className="hidden lg:block" variants={navItemVariants}>
                    <Button
                        asChild
                        className="buttonBubble cursor-pointer letter-spacing-animation"
                        size="lg"
                    >
                        <a href="/contact">Concreta una cita</a>
                    </Button>
                </motion.div>

                {/* Hamburger — solo móvil/tablet */}
                <motion.button
                    className="lg:hidden mr-2 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full"
                    onClick={() => setMenuOpen((prev) => !prev)}
                    aria-label="Abrir menú"
                    whileTap={{ scale: 0.86 }}
                >
                    <motion.span
                        className="block h-0.5 w-5 rounded-full bg-current origin-center"
                        animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                        transition={{ type: "spring", stiffness: 420, damping: 30 }}
                    />
                    <motion.span
                        className="block h-0.5 w-5 rounded-full bg-current"
                        animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                        transition={{ duration: 0.16 }}
                    />
                    <motion.span
                        className="block h-0.5 w-5 rounded-full bg-current origin-center"
                        animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                        transition={{ type: "spring", stiffness: 420, damping: 30 }}
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
                                <motion.div key={link.label} variants={menuItemVariants}>
                                    <a
                                        href={link.href}
                                        className="flex w-full items-center rounded-xl px-4 py-3 text-base font-medium transition-colors hover:bg-black/5"
                                        onClick={() => setMenuOpen(false)}
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
                                <a href="/contact" onClick={() => setMenuOpen(false)}>
                                    Concreta una cita
                                </a>
                            </Button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}