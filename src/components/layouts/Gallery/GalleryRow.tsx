import { useEffect } from "react";

interface GalleryRowProps {
    images: string[];
}

export function GalleryRow({ images }: GalleryRowProps) {
	const colsClass = {
		1: "grid-cols-1",
		2: "grid-cols-2",
		3: "grid-cols-3",
		}[images.length] || "grid-cols-3";

	console.log("Grid class:", colsClass);
    return (
        <div className={`grid gap-2 ${colsClass}`}>
            {images.map((src, index) => (
                <div key={index} className="h-150 overflow-hidden rounded-3xl">
                    <img
                        src={src}
                        alt={`Imagen ${index + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover  transition-transform duration-300 hover:scale-105"
                    />
                </div>
            ))}
        </div>
    );
}
