"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2, ShieldCheck, Info } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // In a real app, this would be a server-side check
    // For now, we simulate the logic the user has been using
    setTimeout(() => {
      if (email === "admin@toppixels.pro" && password === "Swat69") {
        localStorage.setItem("tp_admin_token", "active_session_" + Date.now());
        router.push("/admin/dashboard");
      } else {
        alert("Invalid email or password!");
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl md:rounded-[3rem] shadow-2xl p-10 md:p-14 border border-slate-100"
      >
        <div className="text-center mb-10">
          <div className="w-20 h-20 bg-primary/10 text-primary rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 mb-2">Agency Admin</h1>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Secure Access Only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-[10px] font-black mb-1 uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
            <div className="relative group">
               <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
               <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-50 focus:border-primary/20 focus:bg-white p-5 pl-14 rounded-2xl outline-none transition-all font-bold text-slate-900" 
                placeholder=""
                required
               />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-[10px] font-black mb-1 uppercase tracking-widest text-slate-400 ml-1">Password</label>
            <div className="relative group">
               <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
               <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border-2 border-slate-50 focus:border-primary/20 focus:bg-white p-5 pl-14 rounded-2xl outline-none transition-all font-bold text-slate-900" 
                placeholder=""
                required
               />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white p-6 rounded-[2rem] font-black flex items-center justify-center gap-3 hover:bg-primary transition-all shadow-2xl shadow-slate-200 disabled:opacity-70 group"
          >
            {loading ? <Loader2 className="animate-spin" /> : <>SIGN IN TO PANEL <Lock size={18} className="group-hover:rotate-12 transition-transform" /></>}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
