"use client";

import { useState, useEffect } from "react";
import { LayoutDashboard, FileText, Image, MessageSquare, Plus, CheckCircle, X, Home, Info, PhoneCall, Save, Loader2, Settings, Trash2, Upload, Mail, Reply, Circle, CheckCheck, Eye, EyeOff, Rocket } from "lucide-react";
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
  const [newBlogCat, setNewBlogCat] = useState("");
  const [orderFilter, setOrderFilter] = useState("all");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
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

  // Blogs State
  const [blogs, setBlogs] = useState<any[]>([]);
  // Inquiries State
  const [inquiries, setInquiries] = useState<any[]>([]);
  // Orders State
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    setIsMobileMenuOpen(false); // Close menu on tab change
  }, [activeTab]);

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
    fetch('/api/blogs').then(res => res.json()).then(data => setBlogs(data));
    fetch('/api/orders').then(res => res.json()).then(data => setOrders(data));
  }, []);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/projects', { method: 'POST', body: JSON.stringify(projectData) });
    setShowProjectForm(false);
    alert("Project Added!");
    setLoading(false);
  };

  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/blogs', { method: 'POST', body: JSON.stringify(blogData) });
    setShowBlogForm(false);
    alert("Blog Post Published!");
    // Refresh blogs
    fetch('/api/blogs').then(res => res.json()).then(data => setBlogs(data));
    setLoading(false);
  };

  const handleUpdateConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/config', { method: 'POST', body: JSON.stringify(config) });
    alert("Website Updated!");
    setLoading(false);
  };

  const handleUpdateInquiry = async (id: string, read: boolean) => {
    await fetch('/api/inquiries', {
      method: 'PATCH',
      body: JSON.stringify({ id, read })
    });
    // Refresh
    fetch('/api/inquiries').then(res => res.json()).then(data => setInquiries(data));
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

  const addBlogCategory = () => {
    if (!newBlogCat || !config) return;
    const updated = [...(config.blogCategories || [])];
    if (!updated.includes(newBlogCat)) {
      updated.push(newBlogCat);
      setConfig({ ...config, blogCategories: updated });
      setNewBlogCat("");
    }
  };

  const removeBlogCategory = (cat: string) => {
    if (!config) return;
    const updated = (config.blogCategories || []).filter(c => c !== cat);
    setConfig({ ...config, blogCategories: updated });
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

  const handleUpdateOrderStatus = async (id: string, status: string) => {
    await fetch('/api/orders', {
      method: 'PATCH',
      body: JSON.stringify({ id, status })
    });
    fetch('/api/orders').then(res => res.json()).then(data => setOrders(data));
  };

  const handleDeleteOrder = async (id: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    await fetch(`/api/orders?id=${id}`, { method: 'DELETE' });
    fetch('/api/orders').then(res => res.json()).then(data => setOrders(data));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'image' | 'gallery') => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setLoading(true);
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.urls) {
        if (field === 'image') {
          setProjectData(prev => ({ ...prev, image: data.urls[0] }));
        } else {
          setProjectData(prev => ({ ...prev, gallery: [...prev.gallery, ...data.urls] }));
        }
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleConfigImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, section: 'home' | 'about') => {
    const files = e.target.files;
    if (!files || files.length === 0 || !config) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('files', files[0]);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.urls) {
        if (section === 'home') {
          setConfig({ ...config, home: { ...config.home, heroImage: data.urls[0] } });
        } else {
          setConfig({ ...config, about: { ...config.about, image: data.urls[0] } });
        }
      }
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setLoading(false);
    }
  };

  if (!config) return <div className="p-20 text-center font-bold">Loading toopixels Engine...</div>;

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Aside */}
      <aside className={`w-72 bg-white border-r p-8 flex flex-col fixed h-full shadow-sm z-[110] transition-transform duration-300 lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center mb-12">
            <div>
               <h2 className="text-2xl font-black tracking-tighter text-primary">toopixels<span className="text-slate-900">.</span></h2>
               <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">Admin Panel</p>
            </div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden p-2 text-slate-400 hover:text-slate-900 transition-colors"><X size={24} /></button>
        </div>
        <nav className="flex-1 space-y-2">
           {[ 
             { name: "Home", icon: Home }, 
             { name: "About", icon: Info }, 
             { name: "Portfolio", icon: Image }, 
             { name: "Categories", icon: Settings },
             { name: "Blogs", icon: FileText },
             { name: "Inquiries", icon: MessageSquare },
             { name: "Orders", icon: Rocket }
           ].map((tab) => (
             <button 
               key={tab.name}
               onClick={() => setActiveTab(tab.name)}
               className={`w-full flex items-center gap-4 p-4 rounded-xl font-bold transition-all relative ${activeTab === tab.name ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]' : 'text-slate-500 hover:bg-slate-50'}`}
             >
               <tab.icon size={20} /> {tab.name}
               {tab.name === "Inquiries" && inquiries.length > 0 && (
                 <span className="absolute right-4 bg-red-500 text-white text-[10px] px-2 py-1 rounded-full animate-pulse">{inquiries.length}</span>
               )}
                {tab.name === "Orders" && orders.filter(o => o.status === 'pending').length > 0 && (
                 <span className="absolute right-4 bg-primary text-white text-[10px] px-2 py-1 rounded-full shadow-lg">{orders.filter(o => o.status === 'pending').length}</span>
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
           {activeTab !== "Portfolio" && activeTab !== "Blogs" && activeTab !== "Inquiries" && activeTab !== "Orders" && (
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
                 
                 <div className="space-y-4">
                    <label className="block text-sm font-bold">Hero Image</label>
                    <div className="relative aspect-video max-w-2xl rounded-3xl overflow-hidden border bg-slate-50 flex flex-col items-center justify-center group cursor-pointer">
                      {config.home.heroImage ? (
                        <img src={config.home.heroImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <Image className="text-slate-300" size={48} />
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center flex-col text-white">
                        <Upload size={32} className="mb-2" />
                        <p className="font-bold">Change Hero Image</p>
                      </div>
                      <input type="file" onChange={(e) => handleConfigImageUpload(e, 'home')} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                    </div>
                  </div>
              </div>
           )}

           {activeTab === "About" && (
              <div className="space-y-8">
                <div><label className="block text-sm font-bold mb-3">About Title</label><input value={config.about.title} onChange={(e) => setConfig({...config, about: {...config.about, title: e.target.value}})} className="w-full bg-slate-50 p-6 rounded-2xl border-none outline-none focus:ring-2 ring-primary font-bold" /></div>
                <div><label className="block text-sm font-bold mb-3">About Description</label><textarea value={config.about.description} onChange={(e) => setConfig({...config, about: {...config.about, description: e.target.value}})} className="w-full bg-slate-50 p-6 rounded-2xl border-none outline-none focus:ring-2 ring-primary" rows={4} /></div>
                
                <div className="grid grid-cols-2 gap-8">
                  <div><label className="block text-sm font-bold mb-3">Our Mission</label><textarea value={config.about.mission} onChange={(e) => setConfig({...config, about: {...config.about, mission: e.target.value}})} className="w-full bg-slate-50 p-6 rounded-2xl border-none outline-none focus:ring-2 ring-primary" rows={3} /></div>
                  <div><label className="block text-sm font-bold mb-3">Our Vision</label><textarea value={config.about.vision} onChange={(e) => setConfig({...config, about: {...config.about, vision: e.target.value}})} className="w-full bg-slate-50 p-6 rounded-2xl border-none outline-none focus:ring-2 ring-primary" rows={3} /></div>
                </div>

                <div className="space-y-4">
                    <label className="block text-sm font-bold">About Image</label>
                    <div className="relative aspect-video max-w-2xl rounded-3xl overflow-hidden border bg-slate-50 flex flex-col items-center justify-center group cursor-pointer">
                      {config.about.image ? (
                        <img src={config.about.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <Image className="text-slate-300" size={48} />
                      )}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center flex-col text-white">
                        <Upload size={32} className="mb-2" />
                        <p className="font-bold">Change Image</p>
                      </div>
                      <input type="file" onChange={(e) => handleConfigImageUpload(e, 'about')} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
                    </div>
                  </div>
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
              <div className="space-y-16">
                 <div>
                    <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                       <div className="w-2 h-8 bg-primary rounded-full" />
                       Portfolio Categories
                    </h3>
                    <div className="flex gap-4 mb-8">
                       <input value={newCatName} onChange={(e) => setNewCatName(e.target.value)} className="flex-1 bg-slate-50 p-5 rounded-2xl border-none outline-none focus:ring-2 ring-primary font-bold" placeholder="New Project Category (e.g. 3D Design)" />
                       <button onClick={addCategory} className="bg-primary text-white px-8 rounded-2xl font-bold flex items-center gap-2 shadow-lg"><Plus /> Add</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                       {Object.entries(config?.portfolioCategories || {}).map(([cat, subs]: [string, string[]]) => (
                         <div key={cat} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 relative group">
                            <button onClick={() => removeCategory(cat)} className="absolute top-6 right-6 text-slate-300 group-hover:text-red-500 transition-colors"><Trash2 size={20} /></button>
                            <h4 className="text-xl font-black text-slate-900 mb-6">{cat}</h4>
                            <div className="space-y-3 mb-6">
                               {subs.map((sub: string) => (
                                 <div key={sub} className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-100">
                                    <span className="text-sm font-bold text-slate-600">{sub}</span>
                                    <button onClick={() => removeSubcategory(cat, sub)} className="text-slate-300 hover:text-red-500"><X size={16} /></button>
                                 </div>
                               ))}
                            </div>
                            <div className="flex gap-2">
                               <input value={newSubcatName} onChange={(e) => setNewSubcatName(e.target.value)} className="flex-1 bg-white p-3 rounded-xl border outline-none text-xs" placeholder="Add Subcategory..." />
                               <button onClick={() => addSubcategory(cat)} className="bg-slate-900 text-white px-4 rounded-xl text-xs font-bold"><Plus size={14} /></button>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="border-t pt-16">
                    <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                       <div className="w-2 h-8 bg-slate-900 rounded-full" />
                       Blog Post Categories
                    </h3>
                    <div className="flex gap-4 mb-8">
                       <input value={newBlogCat} onChange={(e) => setNewBlogCat(e.target.value)} className="flex-1 bg-slate-50 p-5 rounded-2xl border-none outline-none focus:ring-2 ring-primary font-bold" placeholder="New Blog Category (e.g. Business)" />
                       <button onClick={addBlogCategory} className="bg-slate-900 text-white px-8 rounded-2xl font-bold flex items-center gap-2 shadow-lg"><Plus /> Add</button>
                    </div>

                    <div className="flex flex-wrap gap-4">
                       {(config?.blogCategories || []).map((cat) => (
                         <div key={cat} className="group bg-slate-50 pl-6 pr-4 py-4 rounded-2xl border flex items-center gap-4 hover:border-slate-300 transition-all">
                            <span className="font-bold text-slate-700">{cat}</span>
                            <button onClick={() => removeBlogCategory(cat)} className="text-slate-300 hover:text-red-500"><Trash2 size={16} /></button>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
            )}

           {activeTab === "Blogs" && (
              <div className="space-y-12">
                 <div className="flex justify-between items-center">
                    <div>
                       <h3 className="text-2xl font-black text-slate-900">Manage Articles</h3>
                       <p className="text-slate-500">Share your agency insights and news.</p>
                    </div>
                    <button onClick={() => setShowBlogForm(true)} className="bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-xl hover:scale-105 transition-all"><Plus size={20}/> New Post</button>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.length === 0 ? (
                       <div className="col-span-full text-center py-20 text-slate-400 font-bold border-2 border-dashed rounded-[3rem]">No blog posts found. Start writing! ✍️</div>
                    ) : (
                       blogs.slice().reverse().map((blog, idx) => (
                         <div key={idx} className="bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-100 group">
                            <div className="aspect-video relative overflow-hidden bg-slate-200">
                               <img src={blog.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                               <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase text-primary">{blog.category}</div>
                            </div>
                            <div className="p-8">
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{blog.date}</p>
                               <h4 className="text-lg font-black text-slate-900 mb-4 line-clamp-2">{blog.title}</h4>
                               <p className="text-sm text-slate-500 line-clamp-2 italic mb-6">"{blog.excerpt}"</p>
                               <button className="text-primary font-bold text-xs flex items-center gap-2 group-hover:gap-3 transition-all underline decoration-2 underline-offset-4">Edit Article <Plus size={14} /></button>
                            </div>
                         </div>
                       ))
                    )}
                 </div>
              </div>
           )}

           {activeTab === "Inquiries" && (
               <div className="space-y-6">
                 {inquiries.length === 0 ? (
                   <div className="text-center py-20 text-slate-400 font-bold border-2 border-dashed rounded-[3rem]">No leads found. Keep marketing! 🚀</div>
                 ) : (
                   inquiries.slice().reverse().map((inq, idx) => (
                     <div key={idx} className={`p-8 rounded-[2.5rem] border transition-all ${inq.read ? 'bg-white border-slate-100 opacity-60' : 'bg-slate-50 border-primary/20 shadow-md ring-1 ring-primary/5'}`}>
                        <div className="flex justify-between items-start mb-6">
                           <div className="flex items-start gap-4">
                              <div className={`mt-1.5 w-3 h-3 rounded-full ${inq.read ? 'bg-slate-200' : 'bg-primary animate-pulse'}`} />
                              <div>
                                 <h4 className={`text-xl font-black mb-1 ${inq.read ? 'text-slate-600' : 'text-slate-900'}`}>{inq.name}</h4>
                                 <p className="text-sm font-bold text-slate-500">{inq.email} • {inq.phone}</p>
                              </div>
                           </div>
                           <div className="flex flex-col items-end gap-2">
                              <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${inq.read ? 'bg-slate-100 text-slate-400' : 'bg-primary text-white'}`}>
                                 {inq.read ? 'Read' : 'New Lead'}
                              </span>
                              <span className="text-[10px] font-bold text-slate-400">{inq.date}</span>
                           </div>
                        </div>

                        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 italic text-slate-600 font-medium leading-relaxed mb-6">
                           "{inq.message}"
                        </div>

                        <div className="flex items-center justify-end gap-4">
                           {inq.read ? (
                              <button onClick={() => handleUpdateInquiry(inq.id, false)} className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-primary transition-colors">
                                 <EyeOff size={16} /> Mark Unread
                              </button>
                           ) : (
                              <button onClick={() => handleUpdateInquiry(inq.id, true)} className="flex items-center gap-2 text-xs font-bold text-primary hover:text-slate-900 transition-colors">
                                 <CheckCheck size={16} /> Mark as Read
                              </button>
                           )}
                           <a href={`mailto:${inq.email}?subject=Reply to your inquiry - TopPixels&body=Hi ${inq.name},%0D%0A%0D%0AThank you for reaching out to TopPixels...`} className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl text-xs font-bold hover:scale-105 transition-all">
                              <Reply size={16} /> Reply to {inq.name.split(' ')[0]}
                           </a>
                        </div>
                     </div>
                   ))
                 )}
               </div>
             )}

            {activeTab === "Orders" && (
                <div className="space-y-8">
                  <div className="flex gap-3 bg-slate-50 p-2 rounded-2xl w-fit border border-slate-100">
                     {["all", "pending", "completed"].map(f => (
                       <button 
                        key={f}
                        onClick={() => setOrderFilter(f)}
                        className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${orderFilter === f ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
                       >
                        {f}
                       </button>
                     ))}
                  </div>

                  <div className="space-y-6">
                    {orders.length === 0 ? (
                      <div className="text-center py-20 text-slate-400 font-bold border-2 border-dashed rounded-[3rem]">No project orders yet. Tools are working! 🛠️</div>
                    ) : (
                      orders
                        .slice()
                        .reverse()
                        .filter(o => orderFilter === "all" || o.status === orderFilter)
                        .map((order, idx) => (
                        <div key={idx} className={`p-8 rounded-[2.5rem] border bg-white transition-all ${order.status === 'completed' ? 'border-emerald-100 opacity-70 bg-emerald-50/10' : 'border-slate-100 shadow-sm'}`}>
                           <div className="flex flex-wrap justify-between items-start gap-4 mb-8">
                              <div className="flex items-start gap-4">
                                  <div className={`mt-2 w-3 h-3 rounded-full ${order.status === 'completed' ? 'bg-emerald-500' : 'bg-primary animate-pulse'}`} />
                                  <div>
                                     <div className="flex items-center gap-3 mb-1">
                                        <h4 className="text-2xl font-black text-slate-900">{order.name}</h4>
                                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${order.status === 'completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-primary/10 text-primary'}`}>
                                          {order.status}
                                        </span>
                                     </div>
                                     <p className="text-sm font-bold text-slate-500">{order.email} • {order.phone}</p>
                                  </div>
                              </div>
                              <div className="bg-slate-900 text-white px-6 py-3 rounded-full text-lg font-black">
                                 {order.totalEstimate} AED
                              </div>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                 <p className="text-[10px] uppercase font-black text-slate-400 mb-4">Core Service</p>
                                 <h5 className="text-xl font-black text-slate-900 mb-1 capitalize">{order.service}</h5>
                                 <p className="text-sm font-bold text-primary">{order.subService}</p>
                              </div>
                              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                 <p className="text-[10px] uppercase font-black text-slate-400 mb-4">Selections</p>
                                 <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-600">
                                    {Object.entries(order.details).map(([k, v]: [string, any]) => (
                                      <span key={k} className="bg-white px-3 py-1.5 rounded-lg border">{k.replace(/([A-Z])/g, ' $1')}: {v as string}</span>
                                    ))}
                                 </div>
                              </div>
                           </div>

                           <div className="flex justify-between items-center pt-8 border-t border-slate-50">
                              <div className="flex items-center gap-4">
                                <span className="text-[10px] font-bold text-slate-400">{order.date}</span>
                                <button onClick={() => handleDeleteOrder(order.id)} className="text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                              </div>
                              <div className="flex gap-4">
                                 {order.status === 'pending' && (
                                   <button onClick={() => handleUpdateOrderStatus(order.id, 'completed')} className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-bold text-xs mr-4">
                                      <CheckCheck size={18} /> Mark Complete
                                   </button>
                                 )}
                                 <a href={`mailto:${order.email}?subject=Project Quote Reply - TopPixels&body=Hi ${order.name},%0D%0A%0D%0AWe received your project request for ${order.subService}...`} className="bg-slate-900 text-white px-6 py-3 rounded-xl text-xs font-bold hover:scale-105 transition-all">Reply via Email</a>
                                 <a href={`https://wa.me/${order.phone.replace(/[^0-9]/g, '')}`} target="_blank" className="bg-emerald-500 text-white px-6 py-3 rounded-xl text-xs font-bold hover:scale-105 transition-all">WhatsApp Client</a>
                              </div>
                           </div>
                        </div>
                      ))
                    )}
                  </div>
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

                  <div className="space-y-6">
                     <div className="space-y-3">
                       <label className="text-xs font-bold uppercase text-slate-400 ml-1">Project Category</label>
                       <div className="flex flex-wrap gap-2">
                         {Object.keys(config.portfolioCategories || {}).map((cat: string) => (
                           <button 
                            type="button"
                            key={cat}
                            onClick={() => setProjectData({...projectData, category: cat, subCategory: (config.portfolioCategories || {})[cat][0]})}
                            className={`px-6 py-3 rounded-xl text-xs font-bold transition-all ${projectData.category === cat ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                           >
                            {cat}
                           </button>
                         ))}
                       </div>
                     </div>

                     <div className="space-y-3">
                       <label className="text-xs font-bold uppercase text-slate-400 ml-1">Subcategory</label>
                       <div className="flex flex-wrap gap-2">
                         {(config.portfolioCategories?.[projectData.category] || []).map((sub: string) => (
                           <button 
                            type="button"
                            key={sub}
                            onClick={() => setProjectData({...projectData, subCategory: sub})}
                            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${projectData.subCategory === sub ? 'bg-slate-900 text-white shadow-lg scale-105' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                           >
                            {sub}
                           </button>
                         ))}
                       </div>
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

                  <div className="space-y-4">
                    <label className="text-xs font-bold uppercase text-slate-400 ml-1">Featured Image</label>
                    <div className="grid grid-cols-1 gap-4">
                       {projectData.image && (
                         <div className="relative aspect-video rounded-2xl overflow-hidden border">
                            <img src={projectData.image} className="w-full h-full object-cover" />
                            <button onClick={() => setProjectData({...projectData, image: ""})} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"><X size={14}/></button>
                         </div>
                       )}
                       <div className="relative">
                          <input type="file" onChange={(e) => handleFileUpload(e, 'image')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" accept="image/*" />
                          <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center bg-slate-50 hover:bg-slate-100 transition-colors">
                             <Upload size={24} className="mx-auto mb-2 text-slate-400" />
                             <p className="text-sm font-bold text-slate-600">Click or Drag to Upload Featured Image</p>
                          </div>
                       </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-xs font-bold uppercase text-slate-400 ml-1">Gallery Images</label>
                    <div className="grid grid-cols-3 gap-3">
                       {projectData.gallery.map((url, i) => (
                         <div key={i} className="relative aspect-square rounded-xl overflow-hidden border">
                            <img src={url} className="w-full h-full object-cover" />
                            <button onClick={() => setProjectData({...projectData, gallery: projectData.gallery.filter((_, idx) => idx !== i)})} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"><X size={12}/></button>
                         </div>
                       ))}
                       <div className="relative aspect-square">
                          <input type="file" multiple onChange={(e) => handleFileUpload(e, 'gallery')} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" accept="image/*" />
                          <div className="w-full h-full border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors">
                             <Plus className="text-slate-400" />
                          </div>
                       </div>
                    </div>
                  </div>

                  <button type="submit" disabled={loading} className="w-full bg-slate-900 text-white p-6 rounded-2xl font-black mt-4">
                    {loading ? "Uploading..." : "Publish to Portfolio"}
                  </button>
               </form>
           </div>
        </div>
      )}
      {showBlogForm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[2000] flex items-center justify-center p-6">
           <div className="bg-white w-full max-w-xl rounded-[3rem] p-12 relative shadow-2xl">
              <button onClick={() => setShowBlogForm(false)} className="absolute top-8 right-8 text-slate-400 hover:text-slate-900"><X size={24} /></button>
              <h2 className="text-3xl font-black mb-8">New Blog Post</h2>
               <form onSubmit={handleCreateBlog} className="space-y-6 max-h-[70vh] overflow-y-auto px-2">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400 ml-1">Post Title</label>
                    <input onChange={(e) => setBlogData({...blogData, title: e.target.value})} className="w-full bg-slate-50 p-5 rounded-2xl outline-none focus:ring-2 ring-primary font-bold" placeholder="e.g. The Future of AI in Design" required />
                  </div>

                  <div className="space-y-3">
                     <label className="text-xs font-bold uppercase text-slate-400 ml-1">Post Category</label>
                     <div className="flex flex-wrap gap-2">
                       {(config.blogCategories || []).map((cat) => (
                         <button 
                          type="button"
                          key={cat}
                          onClick={() => setBlogData({...blogData, category: cat})}
                          className={`px-6 py-3 rounded-xl text-xs font-bold transition-all ${blogData.category === cat ? 'bg-primary text-white shadow-lg' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
                         >
                          {cat}
                         </button>
                       ))}
                     </div>
                   </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400 ml-1">Short Excerpt</label>
                    <textarea 
                      onChange={(e) => setBlogData({...blogData, excerpt: e.target.value})} 
                      className="w-full bg-slate-50 p-5 rounded-2xl outline-none focus:ring-2 ring-primary" 
                      placeholder="Catchy summary for the preview..."
                      rows={2}
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400 ml-1">Post Content (Markdown supported)</label>
                    <textarea 
                      onChange={(e) => setBlogData({...blogData, content: e.target.value})} 
                      className="w-full bg-slate-50 p-5 rounded-2xl outline-none focus:ring-2 ring-primary" 
                      placeholder="Write your article here..."
                      rows={6}
                      required 
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-xs font-bold uppercase text-slate-400 ml-1">Featured Image</label>
                    <div className="grid grid-cols-1 gap-4">
                       {blogData.image && (
                         <div className="relative aspect-video rounded-2xl overflow-hidden border">
                            <img src={blogData.image} className="w-full h-full object-cover" />
                            <button onClick={() => setBlogData({...blogData, image: ""})} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"><X size={14}/></button>
                         </div>
                       )}
                       <div className="relative">
                          <input type="file" onChange={async (e) => {
                             const files = e.target.files;
                             if (!files || files.length === 0) return;
                             setLoading(true);
                             const formData = new FormData();
                             formData.append('files', files[0]);
                             const res = await fetch('/api/upload', { method: 'POST', body: formData });
                             const data = await res.json();
                             if (data.urls) setBlogData({...blogData, image: data.urls[0]});
                             setLoading(false);
                          }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" accept="image/*" />
                          <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center bg-slate-50 hover:bg-slate-100 transition-colors">
                             <Upload size={24} className="mx-auto mb-2 text-slate-400" />
                             <p className="text-sm font-bold text-slate-600">Click to Upload Cover Image</p>
                          </div>
                       </div>
                    </div>
                  </div>

                  <button type="submit" disabled={loading} className="w-full bg-slate-900 text-white p-6 rounded-2xl font-black mt-4">
                    {loading ? "Publishing..." : "Publish Article"}
                  </button>
               </form>
           </div>
        </div>
      )}
    </div>
  );
}
