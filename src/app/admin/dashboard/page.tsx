"use client";

import { LayoutDashboard, FileText, Image, MessageSquare, Plus, LogOut, TrendingUp, Users, CheckCircle } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Total Blogs", value: "24", icon: FileText, color: "text-blue-600 bg-blue-50" },
  { label: "Projects", value: "48", icon: Image, color: "text-purple-600 bg-purple-50" },
  { label: "New Inquiries", value: "12", icon: MessageSquare, color: "text-orange-600 bg-orange-50" },
  { label: "Clients", value: "1.8k", icon: Users, color: "text-green-600 bg-green-50" },
];

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r p-8 flex flex-col hidden lg:flex">
        <div className="mb-12">
           <h2 className="text-2xl font-black tracking-tighter text-primary">TOPPIXELS<span className="text-slate-900">.</span></h2>
           <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Admin Panel</p>
        </div>

        <nav className="flex-1 space-y-2">
           {[
             { name: "Dashboard", icon: LayoutDashboard, active: true },
             { name: "Manage Blogs", icon: FileText },
             { name: "Portfolio", icon: Image },
             { name: "Inquiries", icon: MessageSquare },
           ].map((item, i) => (
             <button 
               key={i}
               className={`w-full flex items-center gap-4 p-4 rounded-xl font-bold transition-all ${item.active ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-slate-500 hover:bg-slate-50'}`}
             >
               <item.icon size={20} /> {item.name}
             </button>
           ))}
        </nav>

        <button className="flex items-center gap-4 p-4 text-red-500 font-bold hover:bg-red-50 rounded-xl transition-all">
           <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900">Welcome Back, Ali!</h1>
            <p className="text-muted-foreground font-medium mt-1">Here is what happening with TopPixels today.</p>
          </div>
          <div className="flex gap-4">
             <button className="bg-white border-2 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50">
                View Site
             </button>
             <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-primary/20">
                <Plus size={20} /> New Content
             </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 group hover:border-primary transition-all">
               <div className={`w-14 h-14 rounded-2xl ${stat.color} flex items-center justify-center mb-6`}>
                  <stat.icon size={26} />
               </div>
               <p className="text-muted-foreground font-bold text-sm uppercase mb-1">{stat.label}</p>
               <h3 className="text-3xl font-black text-slate-900">{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Bottom Panel */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
           <div className="xl:col-span-2 bg-white rounded-[2.5rem] shadow-sm border p-8">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                    <TrendingUp className="text-primary" /> Recent Inquiries
                 </h3>
                 <button className="text-primary font-bold text-sm underline">View All</button>
              </div>
              <div className="space-y-4">
                 {[1, 2, 3].map(i => (
                   <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-200 transition-all">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 font-bold">JD</div>
                         <div>
                            <p className="font-bold text-slate-900">John Doe <span className="text-xs text-muted-foreground font-medium ml-2">2h ago</span></p>
                            <p className="text-sm text-muted-foreground">"Looking for a modern corporate website..."</p>
                         </div>
                      </div>
                      <button className="p-3 text-primary hover:bg-white rounded-xl transition-all"><CheckCircle size={20}/></button>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-slate-900 rounded-[2.5rem] shadow-sm p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
              <h3 className="text-2xl font-black mb-6">Quick Actions</h3>
              <div className="space-y-4">
                 <button className="w-full bg-white/10 hover:bg-white/20 p-5 rounded-2xl flex items-center gap-4 transition-all text-left">
                    <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white"><FileText size={20}/></div>
                    <div>
                       <p className="font-bold">Post a Blog</p>
                       <p className="text-xs text-slate-400">Add latest agency news</p>
                    </div>
                 </button>
                 <button className="w-full bg-white/10 hover:bg-white/20 p-5 rounded-2xl flex items-center gap-4 transition-all text-left">
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white"><Image size={20}/></div>
                    <div>
                       <p className="font-bold">Add Project</p>
                       <p className="text-xs text-slate-400">Update your portfolio</p>
                    </div>
                 </button>
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}
