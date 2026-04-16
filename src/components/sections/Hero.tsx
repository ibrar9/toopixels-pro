"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-height-screen flex items-center pt-32 pb-20 px-6 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-400/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-8">
            <Star size={16} fill="currentColor" />
            Leading Digital Agency Since 2018
          </div>
          
          <h1 className="heading-xl mb-8">
            We Build Creative <span className="text-primary italic">Digital Experiences</span> That Grow Brands
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-lg leading-relaxed">
            TopPixels is your partner for high-end web development, creative design, and result-driven digital marketing. 
            We transform vision into professional digital reality.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/portfolio"
              className="bg-primary text-white px-8 py-4 rounded-2xl text-lg font-bold flex items-center justify-center gap-2 hover:translate-y-[-4px] transition-all shadow-xl shadow-primary/20"
            >
              View Our Work <ArrowRight size={20} />
            </Link>
            <Link
              href="/contact"
              className="bg-white border-2 border-muted px-8 py-4 rounded-2xl text-lg font-bold flex items-center justify-center gap-2 hover:bg-muted transition-all"
            >
              Get Started
            </Link>
          </div>

          <div className="mt-16 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200" />
              ))}
            </div>
            <div>
              <p className="font-bold text-lg">1,800+ Customers</p>
              <p className="text-sm text-muted-foreground text-nowrap">Served globally since we started</p>
            </div>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, delay: 0.2 }}
           className="relative"
        >
          <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
            <div className="aspect-video bg-slate-100 flex items-center justify-center text-slate-400">
               {/* Visual Placeholder - I'll generate a real image later if needed */}
               <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426" alt="Digital Agency" className="w-full h-full object-cover" />
            </div>
          </div>
          {/* Decorative Card */}
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl z-20 flex items-center gap-4 border max-w-xs animate-bounce-slow">
             <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white">
                <Star fill="white" size={24} />
             </div>
             <div>
                <p className="font-bold">Result Driven</p>
                <p className="text-xs text-muted-foreground">99% Client Satisfaction</p>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
