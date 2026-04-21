"use client";

import { Palette, Rocket, Globe, Share2, Code2, ArrowRight, CheckCircle2 } from "lucide-react";

const allServices = [
  {
    id: "graphic",
    title: "Graphics Design",
    icon: Palette,
    desc: "We create stunning logos, brochures, business cards, and social media posts that establish your authority.",
    benefits: ["Unique Brand Voice", "Modern Aesthetics", "Market-Ready Assets"],
    color: "bg-orange-50",
    iconColor: "text-orange-600"
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    icon: Rocket,
    desc: "Dominate search results and lead generation through performance campaigns and SEO.",
    benefits: ["Increased Visibility", "Higher ROI", "Targeted Traffic"],
    color: "bg-blue-50",
    iconColor: "text-blue-600"
  },
  {
    id: "website",
    title: "Website Development",
    icon: Globe,
    desc: "Fast, responsive websites with modern CMS like Next.js and Headless solutions.",
    benefits: ["Mobile First", "SEO Optimized", "Blazing Speed"],
    color: "bg-green-50",
    iconColor: "text-green-600"
  },
  {
    id: "smm",
    title: "Social Media Management",
    icon: Share2,
    desc: "Complete account growth, scheduling, and community management for maximum reach.",
    benefits: ["Active Community", "Consistent Branding", "Real Engagement"],
    color: "bg-purple-50",
    iconColor: "text-purple-600"
  },
  {
    id: "software",
    title: "Software Development",
    icon: Code2,
    desc: "Custom business software, admin tools, and workflow automation tailored to your needs.",
    benefits: ["Workflow Efficiency", "Custom Features", "Scalable Tech"],
    color: "bg-slate-50",
    iconColor: "text-slate-900"
  }
];

export default function Services() {
  const handleOpenCalculator = (id: string) => {
    // We map 'software' to 'website' since custom software usually follows web app logic in our calculator
    const serviceId = id === "software" ? "website" : id;
    window.dispatchEvent(new CustomEvent("open-calculator", { 
      detail: { serviceId } 
    }));
  };

  return (
    <div className="flex flex-col">
       <section className="bg-slate-50 pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
           <h1 className="heading-xl mb-8">Expert Solutions <br/>For Your <span className="text-primary italic">Digital Brand</span></h1>
           <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
             From creative design to complex software development, we provide the technical and creative spine your business needs.
           </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-32">
           {allServices.map((service, i) => (
             <div 
               key={i} 
               className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-16 items-center`}
             >
                <div className={`flex-1 aspect-square md:aspect-video rounded-[3rem] ${service.color} flex items-center justify-center p-20`}>
                   <service.icon size={120} className={service.iconColor} />
                </div>
                <div className="flex-1">
                   <h2 className="text-4xl font-black mb-6">{service.title}</h2>
                   <p className="text-xl text-slate-600 mb-8 leading-relaxed font-medium">{service.desc}</p>
                   <ul className="space-y-4 mb-10">
                      {service.benefits.map((benefit, b) => (
                        <li key={b} className="flex items-center gap-3 font-bold text-slate-700">
                           <CheckCircle2 className="text-primary" size={20} /> {benefit}
                        </li>
                      ))}
                   </ul>
                   <button 
                     onClick={() => handleOpenCalculator(service.id)}
                     className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:translate-x-2 transition-all"
                   >
                      Get This Service <ArrowRight size={20} />
                   </button>
                </div>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
}
