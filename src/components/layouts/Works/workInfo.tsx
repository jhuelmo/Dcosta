import type { Work } from "@/lib/strapi/types";

interface WorkInfoProps {
    work: Work;
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
            <h2 className="text-md font-medium tracking-widest text-primary/50">
                {label}
            </h2>
            <span className="text-xl font-medium">
                {Array.isArray(value) ? value.join(", ") : value}
            </span>
        </div>
    );
};

export function WorkInfo({ work }: WorkInfoProps) {
    return (
        <div className="flex-1 flex flex-col gap-6 h-full relative">
			<div className="flex flex-col gap-6 sticky top-0 pt-[50vh]">
				<InfoRow label="campo" value={work.category} />
				<InfoRow label="cliente" value={work.client} />
				<InfoRow label="tecnologia" value={work.technologies ?? []} />
			</div>
        </div>
    );
}
