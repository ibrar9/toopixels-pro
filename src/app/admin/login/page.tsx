"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock Auth Logic
    setTimeout(() => {
      router.push("/admin/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 border">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Admin Login</h1>
          <p className="text-muted-foreground mt-2 font-medium">TopPixels Agency Control</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-2">Email Address</label>
            <div className="relative">
               <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
               <input 
                type="email" 
                defaultValue="admin@toppixels.pro"
                className="w-full bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white p-4 pl-12 rounded-2xl outline-none transition-all font-medium" 
                placeholder="email@example.com"
                required
               />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Password</label>
            <div className="relative">
               <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
               <input 
                type="password" 
                defaultValue="admin123"
                className="w-full bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white p-4 pl-12 rounded-2xl outline-none transition-all font-medium" 
                placeholder="••••••••"
                required
               />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white p-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Sign In to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
