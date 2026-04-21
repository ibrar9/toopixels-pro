"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Calculator, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "bot" | "user";
  content: string;
  type?: "text" | "options";
  options?: { label: string; action: string }[];
}

export default function AIChatbot() {
  const handleClick = () => {
    window.dispatchEvent(new CustomEvent("open-calculator"));
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000] flex flex-col items-end gap-3 translate-y-[-10px] md:translate-y-0">
      <div className="bg-white px-4 py-2 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-2 animate-in fade-in slide-in-from-right-4 duration-500">
         <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
         <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest whitespace-nowrap">Instant Cost Estimate</p>
      </div>

      <button
        onClick={handleClick}
        className="w-16 h-16 rounded-[2rem] bg-primary flex items-center justify-center text-white shadow-2xl transition-all hover:scale-110 active:scale-95 group relative overflow-hidden"
      >
         <Calculator size={28} />
         <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      </button>
    </div>
  );
}
