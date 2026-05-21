import ServicePageCard from "./ServicePageCard";
import { services } from "./servicesData.ts";
import { useRef } from "react";

export default function ServiceList() {
    const scrollRef = useRef(null);
    return (
        <section className="flex flex-col gap-4  min-h-screen" >
        <div 
            className="flex flex-col gap-8"
        >
            {services.map((service, index) => (
            <ServicePageCard
                key={service.id}
                index={index}
                title={service.title}
                icon={service.icon}
                description={service.description}
                imageUrl={service.image}
                slug={service.slug}
            />
            ))}
        </div>
        </section>
  );
}