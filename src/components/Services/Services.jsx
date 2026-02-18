import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import ServiceCard from './ServiceCard';
import { services } from './servicesData';

const Services = () => {
  return (
    <section className="py-20 lg:py-32 bg-neutral-50">
      <div className="container-xl px-4 lg:px-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-16">
          <h2 className="text-5xl lg:text-7xl font-bold font-headings text-primary">
            Our Services
          </h2>
          
          <motion.button
            className="flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-full font-medium hover:bg-accent-dark transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            See All Services
            <ArrowUpRight className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Services Grid */}
        <div className="flex flex-col gap-6">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
