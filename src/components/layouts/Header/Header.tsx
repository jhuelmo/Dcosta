import React, { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { HeaderLink } from "./HeaderLink";
import { Button } from "@/components/ui/button";
import logoUrl from "@/assets/logo-placeholder.png";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Servicios", href: "/" },
    { label: "Galeria", href: "/" },
    { label: "Tecnología", href: "/" },
    { label: "Equipo", href: "/" },
];

export function Header() {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [collapsed, setCollapsed] = useState(false);

    const variants = {
        hidden: { opacity: 0, display: "none" },
        visible: {
            opacity: 1,
            display: "flex",
            transition: {
                staggerChildren: 0.05,
            },
        },
        collapsed: {
            opacity: 1,
            display: "flex",
            transition: {
                staggerChildren: 0.05,
            },
        },
    };

    const headerVariants = {
        hidden: { opacity: 0, scale: 0.95, width: "auto", y: -100, x: "-50%" },
        visible: {
            opacity: 1,
            scale: 1,
            width: "72rem",
            y: 0,
            x: "-50%",
            transition: {
                opacity: { duration: 1, ease: "easeOut" },
                scale: { duration: 1, ease: "easeOut" },
                width: {
                    duration: 0.6,
                    ease: "easeOut",
                    delay: hasLoaded ? 0 : 0.6, // delay solo en la animación inicial
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

    const { scrollY } = useScroll();

    useEffect(() => {
        const timeout = setTimeout(() => setHasLoaded(true), 1800); // después de que termina la animación inicial
        return () => clearTimeout(timeout);
    }, []);
    useMotionValueEvent(scrollY, "change", (latest) => {
        setCollapsed(latest >= 800);
    });

    return (
        <motion.header
            initial="hidden"
            animate={collapsed ? "collapsed" : "visible"}
            variants={headerVariants}
            className="header fixed left-1/2 top-6 z-999 flex h-16 items-center justify-between rounded-full bg-neutral p-2 shadow-md shadow-black/10"
        >
            <motion.a className="logo ml-2 h-auto w-32" href="/">
                <img
                    className="h-auto w-32 object-cover"
                    src={typeof logoUrl === "string" ? logoUrl : logoUrl.src}
                    alt="Logo"
                />
            </motion.a>
            <motion.nav
                className="flex flex-row items-center gap-6"
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
                        transition={{ duration: 0.5, ease: "easeOut" }}
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
            <motion.div variants={variants}>
                <Button
                    asChild
                    className="buttonBubble cursor-pointer letter-spacing-animation"
                    size="lg"
                >
                    <a href="/contact">Concreta una cita</a>
                </Button>
            </motion.div>
        </motion.header>
    );
}
