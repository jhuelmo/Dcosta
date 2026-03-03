import React, { useState, useEffect } from "react";

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
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const pathname = window.location.pathname;
        const active =
            href === pathname ||
            href === "/" + (pathname.match(/[^\/]+/g)?.[0] || "");
        setIsActive(active);
    }, [href]);

    return (
        <a
            href={href}
            className={`link-hover ${isActive ? "active" : ""} ${className}`.trim()}
        >
            {children}
        </a>
    );
}
