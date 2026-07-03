import { GalleryRow } from "./GalleryRow";

interface GalleryProps {
    rows: string[][];
	className?: string;
}

export function Gallery({ rows, className }: GalleryProps) {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {rows.map((images, index) => (
                <GalleryRow key={index} images={images} />
            ))}
        </div>
    );
}
