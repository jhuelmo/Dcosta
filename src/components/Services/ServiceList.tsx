import { getServices } from "@/lib/strapi/strapi.ts";
import ServicePageCard from "./ServicePageCard";

import { useEffect, useState } from "react";
import type { Service } from "@/lib/strapi/types.ts";


const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL;

export default function ServiceList() {

    const [services, setServices] = useState<Service[]>([]);

     useEffect(() => {
        getServices().then(setServices);
    }, []);
  
    return (
        <section className="flex flex-col gap-4  min-h-screen" >
        <div 
            className="flex flex-col gap-8"
        >
            {services.map((service, index) => (
            <ServicePageCard
                key={service.documentId}
                index={index}
                title={service.title}
                icon={service.icon}
                description={service.description}
                imageUrl={`${STRAPI_URL}${service.heroImage?.url}`}
                imageAlt={service.heroImage?.alternativeText ?? service.title}
                slug={service.slug}
            />
            ))}
        </div>
        </section>
  );
}