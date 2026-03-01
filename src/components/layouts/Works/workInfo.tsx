import type { ProjectInfo } from "@/pages/works/[slug].astro";

interface WorkInfoProps {
    info: ProjectInfo;
}

const InfoRow = ({
    label,
    value,
}: {
    label: string;
    value: string | string[];
}) => {
    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-xl font-medium tracking-widest text-primary/50">
                {label}
            </h2>
            <span className="text-2xl font-medium">
                {Array.isArray(value) ? value.join(", ") : value}
            </span>
        </div>
    );
};

export function WorkInfo({ info }: WorkInfoProps) {
    return (
        <div className="flex-1 flex flex-col gap-6 justify-end h-full">
            {Object.keys(info).map((key) => (
                <InfoRow
                    key={key}
                    label={key}
                    value={info[key as keyof ProjectInfo]}
                />
            ))}
        </div>
    );
}
