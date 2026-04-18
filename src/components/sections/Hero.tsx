"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, Loader2, Calculator } from "lucide-react";
import Link from "next/link";
import { SiteConfig } from "@/lib/siteConfig";
import CalculatorModal from "../calculator/CalculatorModal";

export default function Hero() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  useEffect(() => {
    fetch('/api/config').then(res => res.json()).then(data => setConfig(data));
  }, []);

  if (!config) return (
    <div className="min-h-screen flex items-center justify-center">
       <Loader2 className="animate-spin text-primary" size={48} />
    </div>
  );

  return (
    <>
    <section className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden bg-white">
      {/* Background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[100px]" />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 border rounded-full text-sm font-bold text-slate-600 mb-8">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            Leading Digital Agency in Dubai
          </div>
          
          <h1 className="heading-xl mb-8 text-slate-900">
            {config?.home?.heroTitle?.split(' ').map((word, i) => (
               <span key={i} className={i === (config?.home?.heroTitle?.split(' ').length || 0) - 1 ? "text-primary italic" : ""}>{word} </span>
            ))}
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-lg leading-relaxed font-medium">
            {config?.home?.heroSubtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <Link href="/contact" className="bg-primary text-white px-8 py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-xl shadow-primary/20">
              Start a Project <ArrowRight size={20} />
            </Link>
            <button 
              onClick={() => setIsCalculatorOpen(true)}
              className="px-8 py-5 rounded-2xl font-bold flex items-center justify-center gap-2 border-2 text-slate-900 hover:bg-slate-50 transition-all"
            >
              <Calculator size={20} /> Cost Calculator
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="aspect-[4/5] rounded-[4rem] overflow-hidden bg-slate-100 shadow-2xl relative z-10 border-8 border-white">
            <img 
               src={config.home.heroImage} 
               alt="Digital Innovation" 
               className="w-full h-full object-cover" 
            />
          </div>
          {/* Floating cards */}
          <div className="absolute top-1/4 -left-12 bg-white p-6 rounded-3xl shadow-xl z-20 hidden md:block border animate-bounce">
             <p className="font-bold text-2xl">99%</p>
             <p className="text-sm text-muted-foreground">Satisfaction</p>
          </div>
        </motion.div>
      </div>
    </section>
    <AnimatePresence>
      {isCalculatorOpen && (
        <CalculatorModal isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />
      )}
    </AnimatePresence>
    </>
  );
}
