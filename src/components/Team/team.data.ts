export interface TeamMember {
    name: string;
    role: string;
    credentials: string;
    specialties: string[];
    /** Ruta a la foto; si no hay, la card muestra iniciales sobre gradiente */
    image?: string;
    featured?: boolean;
}

export interface TeamStat {
    value: string;
    label: string;
}

export interface CompanyHighlight {
    value: string;
    label: string;
}

export const companyInfo = {
    label: "El laboratorio",
    title: "Más de dos décadas fabricando sonrisas.",
    paragraphs: [
        "Dcosta nació en 1998 como un pequeño taller de prótesis fija y hoy es un laboratorio digital integral. Lo que no ha cambiado es la manera de entender el oficio: cada restauración es un producto sanitario a medida que alguien va a llevar en la boca todos los días.",
        "Trabajamos codo a codo con las clínicas — validando diseños antes de fabricar, resolviendo dudas de oclusión por teléfono y cumpliendo los plazos que le prometes a tu paciente.",
    ],
    highlights: [
        { value: "1998", label: "Año de fundación" },
        { value: "CE · MDR", label: "Producto sanitario a medida certificado" },
        { value: "40+", label: "Clínicas confían en nosotros" },
    ] as CompanyHighlight[],
};

export const teamStats: TeamStat[] = [
    { value: "25+", label: "Años de experiencia" },
    { value: "12.000", label: "Restauraciones al año" },
    { value: "98%", label: "Ajuste a la primera" },
    { value: "100%", label: "Producción propia" },
];

export const teamMembers: TeamMember[] = [
    {
        name: "David Costa",
        role: "Director técnico",
        credentials: "Protésico dental colegiado · 25 años de experiencia",
        specialties: ["Rehabilitación sobre implantes", "Oclusión", "CAD/CAM"],
        featured: true,
    },
    {
        name: "Marta Vidal",
        role: "Responsable CAD/CAM",
        credentials: "Especialista en diseño digital · exocad certified",
        specialties: ["Diseño digital", "Flujo intraoral"],
    },
    {
        name: "Jordi Ferrer",
        role: "Ceramista",
        credentials: "Maestro ceramista · estratificación anterior",
        specialties: ["Estética anterior", "Disilicato de litio"],
    },
    {
        name: "Laura Benet",
        role: "Técnica en prótesis fija",
        credentials: "TSPD · especialización en zirconio monolítico",
        specialties: ["Zirconio", "Coronas y puentes"],
    },
    {
        name: "Pau Roca",
        role: "Técnico en prótesis removible",
        credentials: "TSPD · esqueléticos y combinadas",
        specialties: ["Removible", "Combinadas"],
    },
    {
        name: "Anna Serra",
        role: "Atención a clínicas",
        credentials: "Coordinación de casos y plazos de entrega",
        specialties: ["Gestión de casos", "Soporte a clínicas"],
    },
];

export const teamPhilosophy = {
    quote: "Cada trabajo que sale del laboratorio lleva detrás un equipo que lo ha tratado como si fuese para su propia boca.",
    ctaText: "Conoce cómo trabajamos",
    ctaUrl: "/tecnology",
};
