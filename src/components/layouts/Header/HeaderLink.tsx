import React from "react";

interface HeaderLinkProps {
    href: string;
    className?: string;
    children: React.ReactNode;
}

export function HeaderLink({
    href,
    className = "",
    children,
}: HeaderLinkProps) {
    const pathname =
        typeof window !== "undefined" ? window.location.pathname : "";
    const isActive =
        href === pathname ||
        href === "/" + (pathname.match(/[^\/]+/g)?.[0] || "");

    return (
        <a
            href={href}
            className={`link-hover ${isActive ? "active" : ""} ${className}`.trim()}
        >
            {children}
        </a>
    );
}
