"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Snappier Mock Auth Logic
    setTimeout(() => {
      router.push("/admin/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl md:rounded-[2.5rem] shadow-2xl p-8 md:p-12 border border-slate-100"
      >
        <div className="text-center mb-8 md:mb-10">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock size={28} />
          </div>
          <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">Admin Login</h1>
          <p className="text-muted-foreground mt-2 text-sm md:text-base font-medium">TopPixels Agency Control</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5 md:space-y-6">
          <div>
            <label className="block text-xs md:text-sm font-bold mb-2 uppercase tracking-wider text-slate-500">Email Address</label>
            <div className="relative">
               <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
               <input 
                type="email" 
                defaultValue="admin@toppixels.pro"
                className="w-full bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white p-3 md:p-4 pl-12 rounded-xl md:rounded-2xl outline-none transition-all font-medium text-slate-900" 
                placeholder="email@example.com"
                required
               />
            </div>
          </div>

          <div>
            <label className="block text-xs md:text-sm font-bold mb-2 uppercase tracking-wider text-slate-500">Password</label>
            <div className="relative">
               <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
               <input 
                type="password" 
                defaultValue="Swat69"
                className="w-full bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white p-3 md:p-4 pl-12 rounded-xl md:rounded-2xl outline-none transition-all font-medium text-slate-900" 
                placeholder="••••••••"
                required
               />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white p-4 md:p-5 rounded-xl md:rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 disabled:opacity-70 mt-4"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Sign In to Dashboard"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
