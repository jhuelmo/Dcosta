import React from "react";
import { motion } from "motion/react";
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
    const variants = {
        hidden: { opacity: 0, display: "none" },
        visible: {
            opacity: 1,
            display: "flex",
            transition: {
                staggerChildren: 0.05,
            },
        },
    };
    const headerVariants = {
        hidden: { opacity: 0, scale: 0.95, width: "auto", y: -100 },
        visible: {
            opacity: 1,
            scale: 1,
            width: "72rem",
            y: 0,
            transition: {
                opacity: {
                    duration: 1,
                    ease: "easeOut",
                    delay: 0,
                },
                scale: {
                    duration: 1,
                    ease: "easeOut",
                    delay: 0,
                },
                width: {
                    duration: 0.6,
                    ease: "easeOut",
                    delay: 0.6,
                },
                y: {
                    duration: 0.5,
                    ease: "easeInOut",
                },
                delayChildren: 1,
            },
        },
    };

    return (
        <motion.header
            initial="hidden"
            animate="visible"
            variants={headerVariants}
            className="header fixed left-1/2 top-6 z-999 flex h-16 w-300 -translate-x-1/2 items-center justify-between rounded-full bg-neutral p-2"
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
                    className="cursor-pointer letter-spacing-animation"
                    size="lg"
                >
                    Concreta una cita
                </Button>
            </motion.div>
        </motion.header>
    );
}
