"use client";

import { useState, useEffect } from "react";
import { LayoutDashboard, FileText, Image, MessageSquare, Plus, CheckCircle, X, Home, Info, PhoneCall, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { SiteConfig } from "@/lib/siteConfig";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Home");
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/config').then(res => res.json()).then(data => setConfig(data));
  }, []);

  const handleUpdateConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      alert("Website Updated Successfully!");
      router.refresh();
    } catch (err) {
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!config) return <div className="p-20 text-center font-bold">Loading toopixels Engine...</div>;

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r p-8 flex flex-col hidden lg:flex fixed h-full">
        <div className="mb-12">
           <h2 className="text-2xl font-black tracking-tighter text-primary">toopixels<span className="text-slate-900">.</span></h2>
           <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 space-y-2">
           {[
             { name: "Home", icon: Home },
             { name: "About", icon: Info },
             { name: "Contact", icon: PhoneCall },
             { name: "Portfolio", icon: Image },
             { name: "Blogs", icon: FileText }
           ].map((tab) => (
             <button 
               key={tab.name}
               onClick={() => setActiveTab(tab.name)}
               className={`w-full flex items-center gap-4 p-4 rounded-xl font-bold transition-all ${activeTab === tab.name ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-50'}`}
             >
               <tab.icon size={20} /> {tab.name}
             </button>
           ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-0 lg:ml-72 p-8 md:p-12">
        <header className="flex justify-between items-center mb-12">
           <div>
             <h1 className="text-4xl font-black text-slate-900">{activeTab} Management</h1>
             <p className="text-muted-foreground font-medium">Updating your live website content.</p>
           </div>
           {activeTab !== "Portfolio" && activeTab !== "Blogs" && (
             <button 
               onClick={handleUpdateConfig}
               disabled={loading}
               className="bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 shadow-xl disabled:opacity-50"
             >
               {loading ? "Saving..." : <><Save size={20} /> Save Changes</>}
             </button>
           )}
        </header>

        <div className="bg-white rounded-[3rem] p-12 shadow-sm border">
           {activeTab === "Home" && (
              <div className="space-y-8">
                 <div>
                    <label className="block text-sm font-bold mb-3">Hero Title</label>
                    <textarea 
                      value={config.home.heroTitle}
                      onChange={(e) => setConfig({...config, home: {...config.home, heroTitle: e.target.value}})}
                      className="w-full bg-slate-50 p-6 rounded-2xl border-none outline-none focus:ring-2 ring-primary font-bold text-xl"
                      rows={3}
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-bold mb-3">Hero Subtitle</label>
                    <textarea 
                      value={config.home.heroSubtitle}
                      onChange={(e) => setConfig({...config, home: {...config.home, heroSubtitle: e.target.value}})}
                      className="w-full bg-slate-50 p-6 rounded-2xl border-none outline-none focus:ring-2 ring-primary"
                      rows={3}
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-bold mb-3">Hero Image URL</label>
                    <input 
                      value={config.home.heroImage}
                      onChange={(e) => setConfig({...config, home: {...config.home, heroImage: e.target.value}})}
                      className="w-full bg-slate-50 p-6 rounded-2xl border-none outline-none focus:ring-2 ring-primary"
                    />
                 </div>
              </div>
           )}

           {activeTab === "About" && (
              <div className="space-y-8">
                 <div>
                    <label className="block text-sm font-bold mb-3">About Title</label>
                    <input 
                      value={config.about.title}
                      onChange={(e) => setConfig({...config, about: {...config.about, title: e.target.value}})}
                      className="w-full bg-slate-50 p-6 rounded-2xl border-none outline-none focus:ring-2 ring-primary font-bold"
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-bold mb-3">Mission Statement</label>
                    <textarea 
                      value={config.about.mission}
                      onChange={(e) => setConfig({...config, about: {...config.about, mission: e.target.value}})}
                      className="w-full bg-slate-50 p-6 rounded-2xl border-none outline-none focus:ring-2 ring-primary"
                      rows={3}
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-bold mb-3">Vision Statement</label>
                    <textarea 
                      value={config.about.vision}
                      onChange={(e) => setConfig({...config, about: {...config.about, vision: e.target.value}})}
                      className="w-full bg-slate-50 p-6 rounded-2xl border-none outline-none focus:ring-2 ring-primary"
                      rows={3}
                    />
                 </div>
              </div>
           )}

           {activeTab === "Contact" && (
              <div className="space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-bold mb-3">Email Address</label>
                      <input 
                        value={config.contact.email}
                        onChange={(e) => setConfig({...config, contact: {...config.contact, email: e.target.value}})}
                        className="w-full bg-slate-50 p-6 rounded-2xl border-none outline-none focus:ring-2 ring-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold mb-3">Phone Number</label>
                      <input 
                        value={config.contact.phone}
                        onChange={(e) => setConfig({...config, contact: {...config.contact, phone: e.target.value}})}
                        className="w-full bg-slate-50 p-6 rounded-2xl border-none outline-none focus:ring-2 ring-primary"
                      />
                    </div>
                 </div>
                 <div>
                    <label className="block text-sm font-bold mb-3">Office Address</label>
                    <input 
                      value={config.contact.address}
                      onChange={(e) => setConfig({...config, contact: {...config.contact, address: e.target.value}})}
                      className="w-full bg-slate-50 p-6 rounded-2xl border-none outline-none focus:ring-2 ring-primary"
                    />
                 </div>
              </div>
           )}

           {(activeTab === "Portfolio" || activeTab === "Blogs") && (
              <div className="text-center py-20">
                 <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 text-primary">
                    <Plus size={48} />
                 </div>
                 <h3 className="text-2xl font-bold mb-4">Manage {activeTab} Items</h3>
                 <p className="text-muted-foreground mb-10">Upload and edit your agency's work and articles.</p>
                 <button className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold hover:scale-105 transition-all">
                    Add New {activeTab.slice(0, -1)}
                 </button>
              </div>
           )}
        </div>
      </main>
    </div>
  );
}
