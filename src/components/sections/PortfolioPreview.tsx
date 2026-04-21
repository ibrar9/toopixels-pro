import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const projects = [
  { title: "Brand Identity", category: "Graphic Design", image: "https://images.unsplash.com/photo-1541462608141-ad4d0b942085?auto=format&fit=crop&q=80&w=2426" },
  { title: "Corporate Platform", category: "Web Development", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426" },
  { title: "Marketing Strategy", category: "Digital Marketing", image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=2426" },
];

export default function PortfolioPreview() {
  return (
    <section id="portfolio" className="section-padding overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="heading-lg mb-6 text-slate-900">Our <span className="text-primary italic">Success Stories</span></h2>
          <p className="text-lg text-muted-foreground">
            A glimpse into the digital transformations we&apos;ve delivered for our global clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div
              key={i}
              className="relative group cursor-pointer"
            >
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-slate-100 relative">
                <Image 
                  src={project.image} 
                  alt={project.title} 
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent p-10 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                 <p className="text-primary font-bold text-sm uppercase tracking-widest mb-2">{project.category}</p>
                 <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
                 <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary">
                    <Plus size={24} />
                 </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
            <Link 
              href="/portfolio" 
              className="inline-flex items-center gap-2 font-bold text-lg group text-slate-700"
            >
              View Full Portfolio 
              <span className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all ml-4">
                <ArrowRight size={20} />
              </span>
            </Link>
        </div>
      </div>
    </section>
  );
}
