"use client";

import { useState, useEffect } from "react";
import { LayoutDashboard, FileText, Image, MessageSquare, Plus, LogOut, TrendingUp, CheckCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: "",
    category: "Graphics Design",
    description: "",
    image: "https://images.unsplash.com/photo-1541462608141-ad4d0b942085?auto=format&fit=crop&q=80&w=2426"
  });

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setShowForm(false);
      alert("Project Added Successfully!");
      router.refresh();
    } catch (err) {
      alert("Failed to add project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 relative">
      {/* Sidebar (Same as before) */}
      <aside className="w-72 bg-white border-r p-8 flex flex-col hidden lg:flex">
        <div className="mb-12">
           <h2 className="text-2xl font-black tracking-tighter text-primary">toopixels<span className="text-slate-900">.</span></h2>
           <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 space-y-2">
           <button className="w-full flex items-center gap-4 p-4 rounded-xl font-bold bg-primary text-white shadow-lg shadow-primary/20"><LayoutDashboard size={20} /> Dashboard</button>
           <button className="w-full flex items-center gap-4 p-4 rounded-xl font-bold text-slate-500 hover:bg-slate-50"><FileText size={20} /> Manage Blogs</button>
           <button className="w-full flex items-center gap-4 p-4 rounded-xl font-bold text-slate-500 hover:bg-slate-50"><Image size={20} /> Portfolio</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900">Direct Command Center</h1>
            <p className="text-muted-foreground font-medium mt-1">Ready to update toopixels?</p>
          </div>
          <button 
             onClick={() => setShowForm(true)}
             className="bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-xl shadow-primary/20"
          >
            <Plus size={20} /> Add New Project
          </button>
        </header>

        {/* Dashboard Placeholder Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-3xl border text-center">
                <h4 className="text-sm font-bold text-muted-foreground mb-1 uppercase tracking-widest">Active Projects</h4>
                <p className="text-4xl font-black">48</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border text-center">
                <h4 className="text-sm font-bold text-muted-foreground mb-1 uppercase tracking-widest">Client Requests</h4>
                <p className="text-4xl font-black">12</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border text-center">
                <h4 className="text-sm font-bold text-muted-foreground mb-1 uppercase tracking-widest">Views Today</h4>
                <p className="text-4xl font-black">1.2k</p>
            </div>
        </div>

        {/* Recent Activity List */}
        <div className="bg-white rounded-[2.5rem] border p-12">
           <h3 className="text-2xl font-black mb-8">System Sync Status</h3>
           <div className="flex items-center gap-4 text-green-600 font-bold bg-green-50 p-6 rounded-2xl border border-green-100">
              <CheckCircle size={24} /> 
              Everything is running smoothly on toopixels.pro
           </div>
        </div>
      </main>

      {/* Pop-up Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-6">
           <div className="bg-white w-full max-w-xl rounded-[3rem] p-12 relative shadow-2xl">
              <button 
                onClick={() => setShowForm(false)}
                className="absolute top-8 right-8 text-slate-400 hover:text-slate-900"
              >
                <X size={24} />
              </button>
              <h2 className="text-3xl font-black mb-10 text-slate-900">Upload Project</h2>
              <form onSubmit={handleCreateProject} className="space-y-6">
                 <div>
                    <label className="block text-sm font-bold mb-2">Project Title</label>
                    <input 
                       onChange={(e) => setFormData({...formData, title: e.target.value})}
                       className="w-full bg-slate-50 p-5 rounded-2xl border-none outline-none focus:ring-2 ring-primary"
                       placeholder="e.g. EcoBrand Website"
                       required
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-bold mb-2">Category</label>
                    <select 
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-slate-50 p-5 rounded-2xl border-none outline-none focus:ring-2 ring-primary"
                    >
                       <option>Graphics Design</option>
                       <option>Website Development</option>
                       <option>Digital Marketing</option>
                       <option>Social Media</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm font-bold mb-2">Image URL</label>
                    <input 
                       onChange={(e) => setFormData({...formData, image: e.target.value})}
                       className="w-full bg-slate-50 p-5 rounded-2xl border-none outline-none focus:ring-2 ring-primary text-sm"
                       placeholder="https://images.unsplash.com/..."
                       defaultValue={formData.image}
                    />
                 </div>
                 <button 
                   type="submit" 
                   disabled={loading}
                   className="w-full bg-primary text-white p-6 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-primary/20 disabled:opacity-50"
                 >
                   {loading ? "Syncing..." : "Launch Project to Frontend"}
                 </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}
