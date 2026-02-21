import { useEffect, useState } from "react";

export function useBreakpoint(breakpoint: number) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia(`(min-width: ${breakpoint}px)`);
        setMatches(mq.matches);
        const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, [breakpoint]);

    return matches;
}
