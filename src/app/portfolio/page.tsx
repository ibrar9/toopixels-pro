"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const categories = ["All", "Graphics Design", "Digital Marketing", "Social Media", "Website Development"];

const portfolio = [
  { title: "EcoBrand Identity", category: "Graphics Design", image: "https://images.unsplash.com/photo-1541462608141-ad4d0b942085?auto=format&fit=crop&q=80&w=2426" },
  { title: "FinTech Platform", category: "Website Development", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426" },
  { title: "Lead Engine Ads", category: "Digital Marketing", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2426" },
  { title: "Social Pulse", category: "Social Media", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=2426" },
  { title: "Neon App UX", category: "Website Development", image: "https://images.unsplash.com/photo-1547027072-330f0936ad0c?auto=format&fit=crop&q=80&w=2426" },
  { title: "Market Growth", category: "Digital Marketing", image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=2426" },
];

export default function Portfolio() {
  const [filter, setFilter] = useState("All");

  const filteredItems = portfolio.filter(item => 
    filter === "All" || item.category === filter
  );

  return (
    <div className="flex flex-col">
       <section className="bg-slate-50 pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
           <h1 className="heading-xl mb-8">Our Creative <span className="text-primary italic">Success</span></h1>
           <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
             Transforming ideas into professional digital platforms since 2018. Explore our curated selection of projects.
           </p>
        </div>
      </section>

      <section className="section-padding bg-white min-h-screen">
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-4 mb-20">
               {categories.map((cat, i) => (
                 <button
                   key={i}
                   onClick={() => setFilter(cat)}
                   className={`px-8 py-3 rounded-full font-bold text-sm transition-all ${filter === cat ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
                 >
                   {cat}
                 </button>
               ))}
            </div>

            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               <AnimatePresence mode="popLayout">
                 {filteredItems.map((item, i) => (
                   <motion.div
                     key={item.title}
                     layout
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.9 }}
                     transition={{ duration: 0.3 }}
                     className="group relative"
                   >
                      <div className="aspect-[4/3] rounded-[2rem] overflow-hidden bg-slate-100 mb-6">
                         <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      </div>
                      <div className="flex items-center justify-between">
                         <div>
                            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-1">{item.category}</p>
                            <h3 className="text-2xl font-black text-slate-900">{item.title}</h3>
                         </div>
                         <div className="w-12 h-12 bg-slate-950 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowUpRight size={20} />
                         </div>
                      </div>
                   </motion.div>
                 ))}
               </AnimatePresence>
            </motion.div>
         </div>
      </section>
    </div>
  );
}
