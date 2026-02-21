interface StickyBlockProps {
    children: React.ReactNode;
    className?: string;
}

export const StickyBlock = ({ children, className }: StickyBlockProps) => {
    return (
        <div className={`sticky h-screen top-0 ${className}`}>{children}</div>
    );
};
