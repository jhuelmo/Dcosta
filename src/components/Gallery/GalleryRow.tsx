interface GalleryRowProps {
    images: string[];
}

// En móvil todo colapsa a 1 columna; el grid solo se abre a partir de sm
const colsClass: Record<number, string> = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-3",
};

export function GalleryRow({ images }: GalleryRowProps) {
    const cols = colsClass[images.length] ?? "grid-cols-1 sm:grid-cols-3";

    return (
        <div className={`grid gap-2 ${cols}`}>
            {images.map((src, index) => (
                <div
                    key={index}
                    className="h-64 sm:h-96 lg:h-150 overflow-hidden rounded-3xl"
                >
                    <img
                        src={src}
                        alt={`Imagen ${index + 1} de la galería`}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                </div>
            ))}
        </div>
    );
}
