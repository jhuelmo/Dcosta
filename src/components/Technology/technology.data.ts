import {
    ScanLine,
    Cpu,
    Printer,
    Flame,
    Microscope,
    Layers,
    type LucideIcon,
} from "lucide-react";

export interface TechFeature {
    icon: LucideIcon;
    title: string;
    description: string;
    tags: string[];
    /** La card destacada ocupa 2 columnas en el bento grid */
    featured?: boolean;
}

export interface WorkflowStep {
    step: string;
    title: string;
    description: string;
}

export const techFeatures: TechFeature[] = [
    {
        icon: ScanLine,
        title: "Flujo 100% digital",
        description:
            "Recibimos archivos de cualquier escáner intraoral del mercado (STL, PLY, DCM) y diseñamos cada restauración en exocad. Sin impresiones físicas, sin transporte, sin pérdida de precisión: del sillón de tu clínica a nuestro CAD en minutos.",
        tags: ["exocad", "STL · PLY · DCM", "3Shape / iTero / Medit"],
        featured: true,
    },
    {
        icon: Cpu,
        title: "Fresado de 5 ejes",
        description:
            "Fresadoras de 5 ejes simultáneos para zirconio, disilicato, PMMA y titanio con tolerancias por debajo de 20 micras.",
        tags: ["Zirconio", "Titanio"],
    },
    {
        icon: Printer,
        title: "Impresión 3D",
        description:
            "Modelos de trabajo, férulas quirúrgicas, provisionales y cubetas individuales impresos en resinas biocompatibles.",
        tags: ["Resinas clase IIa"],
    },
    {
        icon: Flame,
        title: "Sinterización controlada",
        description:
            "Hornos de sinterización y maquillaje con curvas certificadas para cada material, garantizando resistencia y estabilidad de color.",
        tags: ["Curvas certificadas"],
    },
    {
        icon: Microscope,
        title: "Control bajo microscopio",
        description:
            "Cada trabajo pasa una verificación de ajuste marginal y oclusión bajo microscopio antes de salir del laboratorio.",
        tags: ["Ajuste marginal"],
    },
    {
        icon: Layers,
        title: "Materiales premium",
        description:
            "Trabajamos exclusivamente con materiales de primeras marcas, con trazabilidad completa por lote en cada restauración.",
        tags: ["Zirconio multicapa", "e.max", "PMMA"],
    },
];

export const workflowSteps: WorkflowStep[] = [
    {
        step: "01",
        title: "Recepción digital",
        description:
            "Tu escaneado intraoral llega al laboratorio al instante a través de nuestra plataforma.",
    },
    {
        step: "02",
        title: "Diseño CAD",
        description:
            "Diseñamos la restauración en exocad y te enviamos una previsualización para validar.",
    },
    {
        step: "03",
        title: "Fabricación CAM",
        description:
            "Fresado o impresión 3D del diseño aprobado con maquinaria de última generación.",
    },
    {
        step: "04",
        title: "Acabado y control",
        description:
            "Caracterización a mano, glaseado y control de calidad bajo microscopio antes del envío.",
    },
];
