interface GalleryRowProps {
    images: string[];
}

export function GalleryRow({ images }: GalleryRowProps) {
	const imageCount = images.length;
    return (
        <div className={`grid grid-cols-${imageCount} gap-2`}>
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
