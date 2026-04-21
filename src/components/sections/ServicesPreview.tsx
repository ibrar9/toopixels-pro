import { Palette, Rocket, Globe, Share2, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Graphics Design",
    icon: Palette,
    desc: "Logo design, branding, and visual identity that establishes authority.",
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    title: "Digital Marketing",
    icon: Rocket,
    desc: "SEO, PPC, and ads that drive conversion and brand awareness.",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    title: "Website Development",
    icon: Globe,
    desc: "Fast, responsive corporate websites and e-commerce solutions.",
    color: "bg-green-500/10 text-green-600",
  },
  {
    title: "Social Media",
    icon: Share2,
    desc: "Content planning, account growth, and engagement strategy.",
    color: "bg-purple-500/10 text-purple-600",
  },
];

export default function ServicesPreview() {
  return (
    <section className="section-padding bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="heading-lg mb-6">Innovative Solutions for <span className="text-primary italic">Modern Brands</span></h2>
            <p className="text-lg text-muted-foreground">
              We provide complete creative and technical solutions to help your business grow online. 
              Our result-driven strategies ensure long-term success.
            </p>
          </div>
          <Link href="/services" className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all">
            Explore All Services <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-xl transition-all border group"
            >
              <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <service.icon size={28} />
              </div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed text-sm">{service.desc}</p>
              <Link href="/services" className="text-primary text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                Learn More <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
