import service1 from "@/assets/Services/Service-1.png";
import service2 from "@/assets/Services/Service-2.jpg";
import service3 from "@/assets/Services/Service-3.jpg";
import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "corona-zirconio-1",
    title: "Corona de Zirconio",
    info: {
      campo: "Prostodoncia",
      cliente: "Clínica Dental Montserrat",
      tecnologia: ["Zirconio", "CAD/CAM"],
    },
    image: service1.src,
  },
  {
    slug: "implante-titanio-1",
    title: "Implante de Titanio",
    info: {
      campo: "Implantología",
      cliente: "Centro Odontológico Sur",
      tecnologia: ["Titanio", "Implantología"],
    },
    image: service2.src,
  },
  {
    slug: "protesis-total",
    title: "Prótesis Total",
    info: {
      campo: "Prótesis Removible",
      cliente: "Consultorio Privado",
      tecnologia: ["Acrílico", "Termoplástico"],
    },
    image: service3.src,
  },
  {
    slug: "puente-ceramico",
    title: "Puente Cerámico",
    info: {
      campo: "Prostodoncia Fija",
      cliente: "Clínica Premium Dental",
      tecnologia: ["Cerámica", "CAD/CAM"],
    },
    image: service1.src,
  },
  {
    slug: "incrustacion-onlay",
    title: "Incrustación Onlay",
    info: {
      campo: "Odontología Conservadora",
      cliente: "Centro Dental Norte",
      tecnologia: ["Disilicato de Litio"],
    },
    image: service2.src,
  },
  {
    slug: "veneer-ceramico",
    title: "Veneer Cerámico",
    info: {
      campo: "Estética Dental",
      cliente: "Smile Studio",
      tecnologia: ["Cerámica", "E.max"],
    },
    image: service3.src,
  },
  {
    slug: "corona-pfm",
    title: "Corona Metal-Cerámica",
    info: {
      campo: "Prostodoncia",
      cliente: "Clínica Dental Buen Retiro",
      tecnologia: ["Metal-Cerámica", "PFM"],
    },
    image: service1.src,
  },
  {
    slug: "protesis-parcial",
    title: "Prótesis Parcial Removible",
    info: {
      campo: "Prótesis Removible",
      cliente: "Centro Odontológico Este",
      tecnologia: ["Cromo-Cobalto", "Acrílico"],
    },
    image: service2.src,
  },
  {
    slug: "ferula-oclusal",
    title: "Férula Oclusal",
    info: {
      campo: "Oclusión",
      cliente: "Clínica ATM Especialistas",
      tecnologia: ["Acrílico Duro", "CAD/CAM"],
    },
    image: service3.src,
  },
  {
    slug: "implante-zirconio-2",
    title: "Corona sobre Implante",
    info: {
      campo: "Implantología",
      cliente: "Instituto Dental Avanzado",
      tecnologia: ["Zirconio", "Implantología"],
    },
    image: service1.src,
  },
];
