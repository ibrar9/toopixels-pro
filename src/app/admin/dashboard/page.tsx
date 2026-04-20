"use client";

import { useState, useEffect } from "react";
import { LayoutDashboard, FileText, Image, MessageSquare, Plus, CheckCircle, X, Home, Info, PhoneCall, Save, Loader2, Settings, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { SiteConfig } from "@/lib/siteConfig";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Home");
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(false);
  const [newSubcatName, setNewSubcatName] = useState("");
  const [newCatName, setNewCatName] = useState("");
  
  // Project Form State
  const [projectData, setProjectData] = useState({ 
    title: "", 
    category: "", 
    subCategory: "",
    description: "",
    image: "https://images.unsplash.com/photo-1541462608141-ad4d0b942085?auto=format",
    gallery: [] as string[]
  });

  // Blog Form State
  const [blogData, setBlogData] = useState({ title: "", category: "Technology", excerpt: "", image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format" });

  // Inquiries State
  const [inquiries, setInquiries] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/config').then(res => res.json()).then(data => {
      setConfig(data);
      if (data.portfolioCategories) {
        const firstCat = Object.keys(data.portfolioCategories)[0];
        setProjectData(prev => ({
          ...prev, 
          category: firstCat, 
          subCategory: data.portfolioCategories[firstCat][0]
        }));
      }
    });
    fetch('/api/inquiries').then(res => res.json()).then(data => setInquiries(data));
  }, []);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/projects', { method: 'POST', body: JSON.stringify(projectData) });
    setShowProjectForm(false);
    alert("Project Added!");
    setLoading(false);
  };

  const handleUpdateConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/config', { method: 'POST', body: JSON.stringify(config) });
    alert("Website Updated!");
    setLoading(false);
  };

  const addCategory = () => {
    if (!newCatName || !config) return;
    const updated = { ...config, portfolioCategories: { ...config.portfolioCategories, [newCatName]: ["General"] } };
    setConfig(updated);
    setNewCatName("");
  };

  const removeCategory = (cat: string) => {
    if (!config) return;
    const updated = { ...config.portfolioCategories };
    delete updated[cat];
    setConfig({ ...config, portfolioCategories: updated });
  };

  const addSubcategory = (cat: string) => {
    if (!newSubcatName || !config) return;
    const updated = { ...config.portfolioCategories };
    updated[cat] = [...updated[cat], newSubcatName];
    setConfig({ ...config, portfolioCategories: updated });
    setNewSubcatName("");
  };

  const removeSubcategory = (cat: string, sub: string) => {
    if (!config) return;
    const updated = { ...config.portfolioCategories };
    updated[cat] = updated[cat].filter(s => s !== sub);
    setConfig({ ...config, portfolioCategories: updated });
  };

  if (!config) return <div className="p-20 text-center font-bold">Loading toopixels Engine...</div>;

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-72 bg-white border-r p-8 flex flex-col hidden lg:flex fixed h-full shadow-sm">
        <div className="mb-12">
           <h2 className="text-2xl font-black tracking-tighter text-primary">toopixels<span className="text-slate-900">.</span></h2>
           <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 space-y-2">
           {[ 
             { name: "Home", icon: Home }, 
             { name: "About", icon: Info }, 
             { name: "Portfolio", icon: Image }, 
             { name: "Categories", icon: Settings },
             { name: "Blogs", icon: FileText },
             { name: "Inquiries", icon: MessageSquare }
           ].map((tab) => (
             <button 
               key={tab.name}
               onClick={() => setActiveTab(tab.name)}
               className={`w-full flex items-center gap-4 p-4 rounded-xl font-bold transition-all relative ${activeTab === tab.name ? 'bg-primary text-white' : 'text-slate-500 hover:bg-slate-50'}`}
             >
               <tab.icon size={20} /> {tab.name}
               {tab.name === "Inquiries" && inquiries.length > 0 && (
                 <span className="absolute right-4 bg-red-500 text-white text-[10px] px-2 py-1 rounded-full animate-pulse">{inquiries.length}</span>
               )}
             </button>
           ))}
        </nav>
      </aside>

      <main className="flex-1 ml-0 lg:ml-72 p-8 md:p-12">
        <header className="flex justify-between items-center mb-12">
           <div>
             <h1 className="text-4xl font-black text-slate-900">{activeTab}</h1>
             <p className="text-muted-foreground font-medium">Manage your agency content</p>
           </div>
           {activeTab !== "Portfolio" && activeTab !== "Blogs" && activeTab !== "Inquiries" && (
             <button onClick={handleUpdateConfig} disabled={loading} className="bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 shadow-xl disabled:opacity-50">
               {loading ? <Loader2 className="animate-spin" /> : <><Save size={20} /> Save Changes</>}
             </button>
           )}
        </header>

        <div className="bg-white rounded-[3rem] p-12 shadow-sm border">
           {activeTab === "Home" && (
              <div className="space-y-8">
                 <div><label className="block text-sm font-bold mb-3">Hero Title</label><textarea value={config.home.heroTitle} onChange={(e) => setConfig({...config, home: {...config.home, heroTitle: e.target.value}})} className="w-full bg-slate-50 p-6 rounded-2xl border-none outline-none focus:ring-2 ring-primary font-bold text-xl" rows={3} /></div>
                 <div><label className="block text-sm font-bold mb-3">Hero Subtitle</label><textarea value={config.home.heroSubtitle} onChange={(e) => setConfig({...config, home: {...config.home, heroSubtitle: e.target.value}})} className="w-full bg-slate-50 p-6 rounded-2xl border-none outline-none focus:ring-2 ring-primary" rows={3} /></div>
              </div>
           )}

           {activeTab === "Portfolio" && (
              <div className="text-center py-20">
                 <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                    <Image size={40} />
                 </div>
                 <h3 className="text-2xl font-black text-slate-900 mb-2">Portfolio Projects</h3>
                 <p className="text-slate-500 mb-10">Upload high-quality images of your work.</p>
                 <button onClick={() => setShowProjectForm(true)} className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl">Add New Project</button>
              </div>
           )}

           {activeTab === "Categories" && (
             <div className="space-y-12">
               <div className="flex gap-4">
                  <input value={newCatName} onChange={(e) => setNewCatName(e.target.value)} className="flex-1 bg-slate-50 p-5 rounded-2xl border-none outline-none focus:ring-2 ring-primary font-bold" placeholder="New Category Name (e.g. 3D Design)" />
                  <button onClick={addCategory} className="bg-primary text-white px-8 rounded-2xl font-bold flex items-center gap-2"><Plus /> Add</button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {Object.entries(config.portfolioCategories || {}).map(([cat, subs]) => (
                    <div key={cat} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 relative group">
                       <button onClick={() => removeCategory(cat)} className="absolute top-6 right-6 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={20} /></button>
                       <h4 className="text-xl font-black text-slate-900 mb-6">{cat}</h4>
                       <div className="space-y-3 mb-6">
                          {subs.map(sub => (
                            <div key={sub} className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-100">
                               <span className="text-sm font-bold text-slate-600">{sub}</span>
                               <button onClick={() => removeSubcategory(cat, sub)} className="text-slate-300 hover:text-red-500"><X size={16} /></button>
                            </div>
                          ))}
                       </div>
                       <div className="flex gap-2">
                          <input 
                            value={newSubcatName} 
                            onChange={(e) => setNewSubcatName(e.target.value)} 
                            className="flex-1 bg-white p-3 rounded-xl border outline-none text-xs" 
                            placeholder="Add Subcategory..." 
                          />
                          <button onClick={() => addSubcategory(cat)} className="bg-slate-900 text-white px-4 rounded-xl text-xs font-bold"><Plus size={14} /></button>
                       </div>
                    </div>
                  ))}
               </div>
             </div>
           )}

           {activeTab === "Inquiries" && (
              <div className="space-y-6">
                {inquiries.length === 0 ? (
                  <div className="text-center py-20 text-slate-400 font-bold">No leads found. Keep marketing! 🚀</div>
                ) : (
                  inquiries.reverse().map((inq, idx) => (
                    <div key={idx} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-primary transition-all">
                       <div className="flex justify-between items-start mb-6">
                          <div>
                             <h4 className="text-xl font-black text-slate-900 mb-1">{inq.name}</h4>
                             <p className="text-sm font-bold text-slate-500">{inq.email} • {inq.phone}</p>
                          </div>
                          <span className="text-[10px] font-black uppercase text-primary bg-primary/10 px-3 py-1 rounded-full">{inq.date}</span>
                       </div>
                       <p className="text-slate-600 font-medium leading-relaxed bg-white p-6 rounded-2xl border border-slate-100 italic">
                         "{inq.message}"
                       </p>
                    </div>
                  ))
                )}
              </div>
            )}
        </div>
      </main>

      {showProjectForm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-6">
           <div className="bg-white w-full max-w-xl rounded-[3rem] p-12 relative shadow-2xl">
              <button onClick={() => setShowProjectForm(false)} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900"><X size={24} /></button>
              <h2 className="text-3xl font-black mb-8">Add Project</h2>
               <form onSubmit={handleCreateProject} className="space-y-4 max-h-[70vh] overflow-y-auto px-2">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400 ml-1">Project Name</label>
                    <input onChange={(e) => setProjectData({...projectData, title: e.target.value})} className="w-full bg-slate-50 p-5 rounded-2xl outline-none focus:ring-2 ring-primary" placeholder="Project Name" required />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-400 ml-1">Category</label>
                      <select 
                        value={projectData.category}
                        onChange={(e) => {
                          const cat = e.target.value;
                          setProjectData({...projectData, category: cat, subCategory: (config.portfolioCategories || {})[cat][0]});
                        }} 
                        className="w-full bg-slate-50 p-5 rounded-2xl outline-none focus:ring-2 ring-primary appearance-none font-bold"
                      >
                        {Object.keys(config.portfolioCategories || {}).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-400 ml-1">Subcategory</label>
                      <select 
                        onChange={(e) => setProjectData({...projectData, subCategory: e.target.value})} 
                        value={projectData.subCategory}
                        className="w-full bg-slate-50 p-5 rounded-2xl outline-none focus:ring-2 ring-primary appearance-none font-bold"
                      >
                        {(config.portfolioCategories?.[projectData.category] || []).map(sub => <option key={sub} value={sub}>{sub}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400 ml-1">Description</label>
                    <textarea 
                      onChange={(e) => setProjectData({...projectData, description: e.target.value})} 
                      className="w-full bg-slate-50 p-5 rounded-2xl outline-none focus:ring-2 ring-primary" 
                      placeholder="Project details..."
                      rows={4}
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400 ml-1">Featured Image URL</label>
                    <input onChange={(e) => setProjectData({...projectData, image: e.target.value})} className="w-full bg-slate-50 p-5 rounded-2xl outline-none focus:ring-2 ring-primary" placeholder="https://..." required />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400 ml-1">Gallery Image URLs (Comma separated)</label>
                    <textarea 
                      onChange={(e) => setProjectData({...projectData, gallery: e.target.value.split(',').map(s => s.trim())})} 
                      className="w-full bg-slate-50 p-5 rounded-2xl outline-none focus:ring-2 ring-primary" 
                      placeholder="URL1, URL2..."
                      rows={2}
                    />
                  </div>

                  <button type="submit" disabled={loading} className="w-full bg-slate-900 text-white p-6 rounded-2xl font-black mt-4">
                    {loading ? "Uploading..." : "Publish to Portfolio"}
                  </button>
               </form>
           </div>
        </div>
      )}
    </div>
  );
}
