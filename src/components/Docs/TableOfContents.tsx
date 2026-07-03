import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";

export interface TocItem {
    id: string;
    label: string;
}

interface TableOfContentsProps {
    items: TocItem[];
    /** Offset en px para que el header flotante no tape el título de destino */
    offset?: number;
}

function TableOfContents({ items, offset = -110 }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState(items[0]?.id ?? "");
    const lenis = useLenis();
    const itemsRef = useRef(items);
    itemsRef.current = items;

    useEffect(() => {
        const sections = itemsRef.current
            .map((item) => document.getElementById(item.id))
            .filter((el): el is HTMLElement => el !== null);

        if (!sections.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

                if (visible[0]) {
                    setActiveId(visible[0].target.id);
                }
            },
            { rootMargin: "-15% 0px -65% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    const handleClick = (event: React.MouseEvent, id: string) => {
        event.preventDefault();
        const target = document.getElementById(id);
        if (!target) return;

        if (lenis) {
            lenis.scrollTo(target, { offset, duration: 1.2 });
        } else {
            target.scrollIntoView({ behavior: "smooth" });
        }
        setActiveId(id);
    };

    return (
        <nav className="rounded-2xl">
            <ul className="space-y-3 text-xs font-semibold">
                {items.map((item) => {
                    const isActive = item.id === activeId;
                    return (
                        <li
                            key={item.id}
                            className={`m-0 px-2 py-1 border-l-2 transition-colors duration-300 ${
                                isActive ? "border-primary" : "border-primary/30"
                            }`}
                        >
                            <a
                                href={`#${item.id}`}
                                onClick={(event) => handleClick(event, item.id)}
                                className={`transition-colors duration-300 hover:text-primary ${
                                    isActive ? "text-primary" : "text-primary/30"
                                }`}
                            >
                                {item.label}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export { TableOfContents };
