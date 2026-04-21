"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { Project } from "@/lib/db";



export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [subFilter, setSubFilter] = useState("All");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    const init = async () => {
      try {
        const [projRes, confRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/config')
        ]);
        setProjects(await projRes.json());
        setConfig(await confRes.json());
      } catch (err) {
        console.error("Sync failed");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const primaryCategories = config?.portfolioCategories ? ["All", ...Object.keys(config.portfolioCategories)] : ["All"];
  const subCategories = config?.portfolioCategories || {};

  const filteredItems = useMemo(() => {
    return projects.filter(item => {
      const matchesPrimary = filter === "All" || item.category === filter;
      const matchesSub = subFilter === "All" || item.subCategory === subFilter;
      return matchesPrimary && matchesSub;
    });
  }, [projects, filter, subFilter]);

  const activeSubcats = filter !== "All" ? subCategories[filter as keyof typeof subCategories] || [] : [];

  return (
    <div className="flex flex-col">
       <section className="bg-slate-50 pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
           <h1 className="heading-xl mb-8 text-slate-900">Expert <span className="text-primary italic">Portfolio</span></h1>
           <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
             Transforming ideas into professional digital platforms. Explore our curated selection of projects.
           </p>
        </div>
      </section>

      <section className="section-padding bg-white min-h-screen">
         <div className="max-w-7xl mx-auto px-6">
             {/* Primary Categories - Premium Pill Navigation */}
             <div className="flex flex-wrap justify-center gap-4 mb-12">
                {primaryCategories.map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => {
                       setFilter(cat);
                       setSubFilter("All");
                    }}
                    className={`relative px-10 py-4 rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden ${filter === cat ? 'bg-primary text-white shadow-2xl shadow-primary/40 -translate-y-1' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                  >
                    <span className="relative z-10">{cat}</span>
                    {filter === cat && (
                      <motion.div layoutId="activeCat" className="absolute inset-0 bg-primary z-0" />
                    )}
                  </button>
                ))}
             </div>

             {/* Sub Categories - Animated Glass Bar */}
             <AnimatePresence mode="wait">
               {activeSubcats.length > 0 && (
                 <motion.div 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   className="flex flex-wrap justify-center items-center gap-3 mb-20 p-2 bg-slate-50/50 backdrop-blur rounded-[2rem] border border-slate-100 max-w-fit mx-auto"
                 >
                    <button 
                      onClick={() => setSubFilter("All")} 
                      className={`px-8 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${subFilter === "All" ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-900'}`}
                    >
                      All Works
                    </button>
                    <div className="w-px h-6 bg-slate-200 mx-2 hidden sm:block" />
                    {activeSubcats.map((sub: string) => (
                      <button
                        key={sub}
                        onClick={() => setSubFilter(sub)}
                        className={`px-8 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${subFilter === sub ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400 hover:text-slate-900'}`}
                      >
                        {sub}
                      </button>
                    ))}
                 </motion.div>
               )}
             </AnimatePresence>

            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-primary" size={48} />
              </div>
            ) : (
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                  {filteredItems.map((item, i) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                       className="group relative cursor-pointer"
                       onClick={() => setSelectedProject(item)}
                    >
                        <div className="aspect-[4/3] rounded-[2rem] overflow-hidden bg-slate-100 mb-6 border border-slate-50 shadow-sm relative">
                          <Image 
                            src={item.image} 
                            alt={item.title} 
                            fill 
                            className="object-cover transition-transform duration-700 group-hover:scale-110" 
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        <div className="flex items-center justify-between px-2">
                          <div>
                              <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-2">{item.subCategory || item.category}</p>
                              <h3 className="text-2xl font-black text-slate-900 leading-tight">{item.title}</h3>
                          </div>
                        </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
         </div>
      </section>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[1000] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl">
            <motion.div initial={{ y: 50, scale: 0.95 }} animate={{ y: 0, scale: 1 }} exit={{ y: 50, scale: 0.95 }} className="bg-white w-full max-w-6xl max-h-[90vh] rounded-[3rem] overflow-hidden flex flex-col md:flex-row relative">
               <button onClick={() => setSelectedProject(null)} className="absolute top-8 right-8 z-50 bg-white/80 backdrop-blur px-6 py-3 rounded-full font-black text-xs shadow-xl border hover:bg-white transition-all">CLOSE VIEW</button>
               
               <div className="w-full md:w-3/5 bg-slate-50 overflow-y-auto p-8 custom-scrollbar">
                  <div className="relative w-full aspect-video rounded-2xl mb-6 shadow-2xl overflow-hidden">
                    <Image src={selectedProject.image} fill className="object-cover" alt={selectedProject.title} />
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    {selectedProject.gallery?.map((img, i) => (
                      <div key={i} className="relative w-full aspect-video rounded-2xl shadow-lg overflow-hidden">
                        <Image src={img} fill className="object-cover" alt={`View ${i + 1}`} />
                      </div>
                    ))}
                  </div>
               </div>

               <div className="w-full md:w-2/5 p-12 md:p-16 flex flex-col justify-center overflow-y-auto border-l">
                  <span className="text-primary font-black uppercase tracking-[0.3em] text-[10px] mb-4">{selectedProject.subCategory}</span>
                  <h2 className="text-5xl font-black text-slate-900 mb-8 tracking-tighter leading-none">{selectedProject.title}</h2>
                  <div className="h-1 w-20 bg-primary mb-10 rounded-full" />
                  <p className="text-slate-600 text-lg leading-relaxed font-medium mb-12 whitespace-pre-wrap">
                    {selectedProject.description}
                  </p>
                  
                  <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
                    <p className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">Project Details</p>
                    <div className="space-y-4">
                       <div className="flex justify-between border-b pb-2"><span className="text-xs font-bold text-slate-500">Industry</span><span className="text-xs font-black">Digital Tech</span></div>
                       <div className="flex justify-between border-b pb-2"><span className="text-xs font-bold text-slate-500">Service</span><span className="text-xs font-black">{selectedProject.category}</span></div>
                    </div>
                  </div>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
