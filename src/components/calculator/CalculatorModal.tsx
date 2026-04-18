"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, ChevronRight, ChevronLeft, Check, Calculator, 
  Palette, Megaphone, Globe, Share2, ArrowRight,
  MessageSquare, Mail, Award, Rocket, Plus, Minus
} from "lucide-react";
import { cn } from "@/lib/utils";

type ServiceID = "graphic" | "marketing" | "website" | "smm";

interface SelectionState {
  serviceId: ServiceID | null;
  subService: string | null;
  details: any;
  addons: string[];
}

const logoPricing = {
  // ... existing logo pricing ...
  types: {
    "Basic Logo (Text / Minimal)": 99,
    "Standard Logo (Icon + Text)": 149,
    "Premium Logo (Custom Illustration)": 299
  },
  colors: {
    "1 Color Version": 0,
    "2–3 Color Options": 30,
    "Full Brand Color Palette": 99
  },
  revisions: {
    "2 Revisions": 0,
    "5 Revisions": 20,
    "Unlimited Revisions": 50
  },
  delivery: {
    "2–3 Days": 0,
    "48 Hours": 30,
    "24 Hours Express": 50
  },
  formats: {
    "PNG + JPG": 0,
    "Transparent PNG + Vector": 20,
    "Full Package (AI, PSD, etc.)": 50
  },
  mockups: {
    "1 Mockup": 0,
    "3 Mockups": 5,
    "Premium Mockup Set": 10
  },
  sourceFile: {
    "Not Included": 0,
    "Included (Editable File)": 20
  }
};

const profilePricing = {
  pricePerPage: 20,
  sourceFile: 50,
  urgentDelivery: 50
};

const smmDesignPricing = {
  basePerPost: 30,
  premiumUpgrade: 50,
  multiPlatform: 10,
  captions: 10,
  hashtags: 30,
  contentPlanning: 100,
  stockImages: 50,
  urgentDelivery: 50
};

export default function CalculatorModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<SelectionState>({
    serviceId: null,
    subService: null,
    details: {},
    addons: []
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const reset = () => {
    setStep(0);
    setSelections({ serviceId: null, subService: null, details: {}, addons: [] });
  };

  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen]);

  if (!isOpen) return null;

  const services = [
    { id: "graphic", title: "Graphic Design", icon: Palette, color: "bg-blue-500", desc: "Logos, Branding & Print" },
    { id: "marketing", title: "Digital Marketing", icon: Megaphone, color: "bg-purple-500", desc: "Ads, SEO & Campaigns" },
    { id: "website", title: "Website Design", icon: Globe, color: "bg-emerald-500", desc: "E-commerce & Corporate" },
    { id: "smm", title: "Social Media Management", icon: Share2, color: "bg-pink-500", desc: "Organic Growth & Content" },
  ];

  const updateDetail = (key: string, value: any) => {
    setSelections(prev => ({
      ...prev,
      details: { ...prev.details, [key]: value }
    }));
  };

  const toggleAddon = (addon: string) => {
    setSelections(prev => {
      const exists = prev.addons.includes(addon);
      return {
        ...prev,
        addons: exists ? prev.addons.filter(a => a !== addon) : [...prev.addons, addon]
      };
    });
  };

  const calculateEstimate = () => {
    if (selections.subService === "Logo Design") {
      let total = 0;
      const d = selections.details;
      total += logoPricing.types[d.logoType as keyof typeof logoPricing.types] || 0;
      total += logoPricing.colors[d.colorOption as keyof typeof logoPricing.colors] || 0;
      total += logoPricing.revisions[d.revisionCount as keyof typeof logoPricing.revisions] || 0;
      total += logoPricing.delivery[d.deliveryTime as keyof typeof logoPricing.delivery] || 0;
      total += logoPricing.formats[d.fileFormat as keyof typeof logoPricing.formats] || 0;
      total += logoPricing.mockups[d.mockupOption as keyof typeof logoPricing.mockups] || 0;
      total += logoPricing.sourceFile[d.sourceFileOption as keyof typeof logoPricing.sourceFile] || 0;
      return { min: total, max: total };
    }

    if (selections.subService === "Company Profile") {
      let total = 0;
      const d = selections.details;
      const pages = parseInt(d.pageCount) || 5;
      total += pages * profilePricing.pricePerPage;
      if (d.fileOption === "Source file included") total += profilePricing.sourceFile;
      if (d.deliveryOption === "48 hours delivery") total += profilePricing.urgentDelivery;
      return { min: total, max: total };
    }

    if (selections.subService === "Social Media Design") {
      let total = 0;
      const d = selections.details;
      const posts = parseInt(d.postCount) || 1;
      total += posts * smmDesignPricing.basePerPost;
      if (d.designType === "Premium Design") total += posts * smmDesignPricing.premiumUpgrade;
      if (d.platformType === "Multi-platform Support") total += posts * smmDesignPricing.multiPlatform;
      if (d.captions === "Yes (Include Captions)") total += posts * smmDesignPricing.captions;
      
      // Selectable addons for SMM Design
      if (selections.addons.includes("Hashtag Research")) total += smmDesignPricing.hashtags;
      if (selections.addons.includes("Content Planning")) total += smmDesignPricing.contentPlanning;
      if (selections.addons.includes("Stock Images")) total += smmDesignPricing.stockImages;
      
      if (d.deliveryTime === "48 hours delivery") total += smmDesignPricing.urgentDelivery;
      
      return { min: total, max: total };
    }

    let min = 0;
    let max = 0;
    if (selections.serviceId === "graphic") { min = 500; max = 1500; }
    if (selections.serviceId === "marketing") { min = 1200; max = 5000; }
    if (selections.serviceId === "website") { min = 2500; max = 12000; }
    if (selections.serviceId === "smm") { min = 800; max = 3500; }
    const addonCost = selections.addons.length * 200;
    return { min: min + addonCost, max: max + addonCost };
  };

  const { min, max } = calculateEstimate();
  const isFixed = min === max;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-xl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 30 }}
        className="relative w-full max-w-5xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[700px] max-h-[90vh]"
      >
        {/* Left Sidebar */}
        <div className="w-full md:w-80 bg-slate-950 p-10 text-white flex flex-col justify-between border-r border-slate-900">
          <div>
            <div className="flex items-center gap-3 mb-16">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <Calculator size={24} className="text-white" />
              </div>
              <div>
                <span className="font-black tracking-tighter text-2xl block leading-none">Estimate</span>
                <span className="text-primary text-xs font-bold uppercase tracking-widest">by Toopixels</span>
              </div>
            </div>

            <div className="space-y-8">
              <div className="relative">
                <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-1 h-12 bg-primary rounded-full" />
                <h3 className="text-3xl font-bold leading-tight">Fast, Transparent <br/>Estimation.</h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                Our dynamic tool analyzes your specific needs to provide an accurate agency proposal in AED instantly.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <div className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800">
               <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-black mb-3 text-center">
                 {isFixed ? "Total Investment" : "Investment Range"}
               </p>
               <div className="flex flex-col items-center gap-1">
                 <div className="flex items-center gap-1">
                   {isFixed ? (
                     <span className="text-4xl font-black text-primary">{min}</span>
                   ) : (
                     <div className="flex items-center gap-1">
                       <span className="text-2xl font-black text-white">{min}</span>
                       <span className="text-slate-600 font-bold px-1">-</span>
                       <span className="text-2xl font-black text-primary">{max}</span>
                     </div>
                   )}
                 </div>
                 <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1">AED (Dirhams)</span>
               </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8 md:p-14 relative flex flex-col overflow-hidden">
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 p-3 hover:bg-slate-100 rounded-full transition-all z-20 group"
          >
            <X size={24} className="text-slate-400 group-hover:rotate-90 transition-transform" />
          </button>

          <div className="flex-1 overflow-y-auto custom-scrollbar pr-4">
            <AnimatePresence mode="wait">
              {/* START SCREEN */}
              {step === 0 && (
                <motion.div key="start" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="mb-12">
                    <h2 className="text-4xl font-black text-slate-900 mb-4">Select Your Service</h2>
                    <p className="text-slate-500 text-lg font-medium">Get a professional cost estimate for your project.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {services.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          setSelections({ ...selections, serviceId: s.id as ServiceID });
                          nextStep();
                        }}
                        className="group p-8 rounded-[2.5rem] border-2 border-slate-50 hover:border-primary/20 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all text-left flex flex-col gap-6 relative"
                      >
                        <div className={cn("w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all group-hover:rotate-6", s.color)}>
                           <s.icon className="text-white" size={32} />
                        </div>
                        <div>
                          <h4 className="font-black text-xl text-slate-900 group-hover:text-primary transition-colors">{s.title}</h4>
                          <p className="text-sm text-slate-500 font-medium group-hover:text-slate-600">{s.desc}</p>
                        </div>
                        <div className="absolute top-8 right-8 w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all">
                          <ArrowRight size={20} />
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* SUB-SERVICE SELECTION */}
              {step === 1 && (
                <motion.div key="sub-service" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <button onClick={prevStep} className="inline-flex items-center gap-2 text-primary font-bold text-sm mb-12 hover:translate-x-[-4px] transition-transform">
                    <ChevronLeft size={18} /> Back to Services
                  </button>
                  <div className="mb-12">
                    <h2 className="text-4xl font-black text-slate-900 mb-4">Choose Design Type</h2>
                    <p className="text-slate-500 text-lg font-medium capitalize">Refining your {selections.serviceId} selection.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {getSubServices(selections.serviceId!).map((sub) => (
                      <button
                        key={sub}
                        onClick={() => {
                          setSelections({ ...selections, subService: sub });
                          nextStep();
                        }}
                        className={cn(
                          "group p-6 rounded-3xl border-2 transition-all flex items-center justify-between text-left",
                          selections.subService === sub ? "border-primary bg-primary/5 shadow-inner" : "border-slate-50 bg-slate-50/50 hover:border-primary/20 hover:bg-white"
                        )}
                      >
                         <span className="font-bold text-slate-800 text-lg">{sub}</span>
                         <div className="w-8 h-8 rounded-full border-2 border-white bg-white flex items-center justify-center text-primary shadow-sm">
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                         </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* DETAILED INPUTS */}
              {step >= 2 && step <= 8 && selections.subService === "Logo Design" && (
                <motion.div key={`logo-step-${step}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <button onClick={prevStep} className="inline-flex items-center gap-2 text-primary font-bold text-sm mb-12">
                    <ChevronLeft size={18} /> Back
                  </button>
                  
                  {step === 2 && (
                    <LogoQuestion 
                      label="1. Select Logo Type" 
                      sub="The foundation of your brand identity."
                      options={Object.keys(logoPricing.types)} 
                      prices={Object.values(logoPricing.types)}
                      current={selections.details.logoType} 
                      onSelect={(v: any) => { updateDetail("logoType", v); nextStep(); }} 
                    />
                  )}
                  {step === 3 && (
                    <LogoQuestion 
                      label="2. Color Variations" 
                      sub="How many colors will your brand use?"
                      options={Object.keys(logoPricing.colors)} 
                      prices={Object.values(logoPricing.colors)}
                      current={selections.details.colorOption} 
                      onSelect={(v: any) => { updateDetail("colorOption", v); nextStep(); }} 
                    />
                  )}
                  {step === 4 && (
                    <LogoQuestion 
                      label="3. Revisions" 
                      sub="Number of adjustments included."
                      options={Object.keys(logoPricing.revisions)} 
                      prices={Object.values(logoPricing.revisions)}
                      current={selections.details.revisionCount} 
                      onSelect={(v: any) => { updateDetail("revisionCount", v); nextStep(); }} 
                    />
                  )}
                   {step === 5 && (
                    <LogoQuestion 
                      label="4. Delivery Time" 
                      sub="How soon do you need the first draft?"
                      options={Object.keys(logoPricing.delivery)} 
                      prices={Object.values(logoPricing.delivery)}
                      current={selections.details.deliveryTime} 
                      onSelect={(v: any) => { updateDetail("deliveryTime", v); nextStep(); }} 
                    />
                  )}
                   {step === 6 && (
                    <LogoQuestion 
                      label="5. File Formats" 
                      sub="What formats do you need for delivery?"
                      options={Object.keys(logoPricing.formats)} 
                      prices={Object.values(logoPricing.formats)}
                      current={selections.details.fileFormat} 
                      onSelect={(v: any) => { updateDetail("fileFormat", v); nextStep(); }} 
                    />
                  )}
                   {step === 7 && (
                    <LogoQuestion 
                      label="6. Mockups" 
                      sub="Visualize your brand on physical items."
                      options={Object.keys(logoPricing.mockups)} 
                      prices={Object.values(logoPricing.mockups)}
                      current={selections.details.mockupOption} 
                      onSelect={(v: any) => { updateDetail("mockupOption", v); nextStep(); }} 
                    />
                  )}
                   {step === 8 && (
                    <LogoQuestion 
                      label="7. Source File (Editable)" 
                      sub="Include the original AI/PSD source files?"
                      options={Object.keys(logoPricing.sourceFile)} 
                      prices={Object.values(logoPricing.sourceFile)}
                      current={selections.details.sourceFileOption} 
                      onSelect={(v: any) => { updateDetail("sourceFileOption", v); setStep(10); }} 
                    />
                  )}
                </motion.div>
              )}

              {/* COMPANY PROFILE INPUTS */}
              {step >= 2 && step <= 4 && selections.subService === "Company Profile" && (
                 <motion.div key={`profile-step-${step}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <button onClick={prevStep} className="inline-flex items-center gap-2 text-primary font-bold text-sm mb-12">
                      <ChevronLeft size={18} /> Back
                    </button>

                    {step === 2 && (
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-2xl font-black text-slate-900 mb-1">Number of Pages</h3>
                          <p className="text-slate-500 font-medium text-sm">Each page is professionally designed for 20 AED.</p>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                           {["5", "10", "15", "20", "25", "30", "40", "50"].map(num => (
                             <button 
                                key={num}
                                onClick={() => { updateDetail("pageCount", num); nextStep(); }}
                                className={cn(
                                  "p-6 rounded-[2rem] border-2 font-black transition-all",
                                  selections.details.pageCount === num ? "bg-primary border-primary text-white shadow-xl shadow-primary/20 scale-[1.02]" : "bg-slate-50 border-slate-50 text-slate-900 hover:bg-white hover:border-primary/20"
                                )}
                             >
                               {num} Pages
                             </button>
                           ))}
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                       <LogoQuestion 
                         label="File Options" 
                         sub="Choose your delivery format."
                         options={["PDF only", "Source file included"]}
                         prices={[0, 50]}
                         current={selections.details.fileOption}
                         onSelect={(v: any) => { updateDetail("fileOption", v); nextStep(); }}
                       />
                    )}

                    {step === 4 && (
                       <LogoQuestion 
                         label="Delivery Time" 
                         sub="How fast do you need it?"
                         options={["3–5 days delivery", "48 hours delivery"]}
                         prices={[0, 50]}
                         current={selections.details.deliveryOption}
                         onSelect={(v: any) => { updateDetail("deliveryOption", v); setStep(10); }}
                       />
                    )}
                 </motion.div>
              )}

              {/* SOCIAL MEDIA DESIGN INPUTS */}
              {step >= 2 && step <= 7 && selections.subService === "Social Media Design" && (
                 <motion.div key={`smm-design-step-${step}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <button onClick={prevStep} className="inline-flex items-center gap-2 text-primary font-bold text-sm mb-12">
                      <ChevronLeft size={18} /> Back
                    </button>

                    {step === 2 && (
                       <div className="space-y-8">
                          <div>
                            <h3 className="text-2xl font-black text-slate-900 mb-1">Number of Posts</h3>
                            <p className="text-slate-500 font-medium text-sm">Professional graphics starting at 30 AED per post.</p>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                             {["1", "3", "5", "10", "15", "20", "30", "50"].map(num => (
                               <button 
                                  key={num}
                                  onClick={() => { updateDetail("postCount", num); nextStep(); }}
                                  className={cn(
                                    "p-6 rounded-[2rem] border-2 font-black transition-all",
                                    selections.details.postCount === num ? "bg-primary border-primary text-white shadow-xl shadow-primary/20 scale-[1.02]" : "bg-slate-50 border-slate-50 text-slate-900 hover:bg-white hover:border-primary/20"
                                  )}
                               >
                                 {num} Posts
                               </button>
                             ))}
                          </div>
                       </div>
                    )}

                    {step === 3 && (
                       <LogoQuestion 
                         label="Design Type" 
                         sub="Select the quality tier."
                         options={["Basic Design", "Premium Design"]}
                         prices={[0, 50]}
                         current={selections.details.designType}
                         onSelect={(v: any) => { updateDetail("designType", v); nextStep(); }}
                       />
                    )}

                    {step === 4 && (
                       <LogoQuestion 
                         label="Platform Support" 
                         sub="Single vs Multi-platform optimization."
                         options={["Single Platform", "Multi-platform Support"]}
                         prices={[0, 10]}
                         current={selections.details.platformType}
                         onSelect={(v: any) => { updateDetail("platformType", v); nextStep(); }}
                       />
                    )}

                    {step === 5 && (
                       <LogoQuestion 
                         label="Caption Writing" 
                         sub="Include copy for each post?"
                         options={["No Captions", "Yes (Include Captions)"]}
                         prices={[0, 10]}
                         current={selections.details.captions}
                         onSelect={(v: any) => { updateDetail("captions", v); nextStep(); }}
                       />
                    )}

                    {step === 6 && (
                       <div className="space-y-8">
                          <div>
                            <h3 className="text-2xl font-black text-slate-900 mb-1">Additional Extras</h3>
                            <p className="text-slate-500 font-medium text-sm">Select any premium add-ons for your campaign.</p>
                          </div>
                          <div className="grid grid-cols-1 gap-3">
                            <AddonButton label="Hashtag Research" price={30} selections={selections.addons} toggle={toggleAddon} />
                            <AddonButton label="Content Planning" price={100} selections={selections.addons} toggle={toggleAddon} />
                            <AddonButton label="Stock Images" price={50} selections={selections.addons} toggle={toggleAddon} />
                          </div>
                          <button onClick={nextStep} className="w-full bg-primary text-white p-6 rounded-[2rem] font-black shadow-xl shadow-primary/20 hover:scale-[1.01] transition-all">CONTINUE</button>
                       </div>
                    )}

                    {step === 7 && (() => {
                       const posts = parseInt(selections.details.postCount) || 1;
                       let standard = "3–5 days delivery";
                       if (posts === 10) standard = "4–5 days delivery";
                       else if (posts === 20) standard = "10 days delivery";
                       else if (posts === 30) standard = "15 days delivery";
                       else if (posts === 50) standard = "30 days delivery";
                       else if (posts > 10) standard = `${Math.ceil(posts / 2)} days delivery`;

                       const deliveryOptions = [standard];
                       if (posts <= 10) deliveryOptions.push("48 hours delivery");

                       return (
                         <LogoQuestion 
                           label="Delivery Time" 
                           sub={posts > 10 ? "Express delivery is unavailable for large orders." : "Standard vs Express turnaround."}
                           options={deliveryOptions}
                           prices={[0, 50]}
                           current={selections.details.deliveryTime}
                           onSelect={(v: any) => { updateDetail("deliveryTime", v); setStep(10); }} 
                         />
                       );
                    })()}
                 </motion.div>
              )}

              {/* FALLBACK FOR OTHER SERVICES */}
              {step >= 2 && step < 10 && !["Logo Design", "Company Profile", "Social Media Design"].includes(selections.subService!) && (
                 <motion.div key="other-details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <button onClick={prevStep} className="inline-flex items-center gap-2 text-primary font-bold text-sm mb-12"><ChevronLeft size={18} /> Back</button>
                    <div className="text-center py-20">
                       <h3 className="text-2xl font-bold mb-4">Configuring {selections.subService}...</h3>
                       <p className="text-slate-500 mb-10">Tailoring the technical requirements for your project.</p>
                       <button onClick={() => setStep(10)} className="bg-primary text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-primary/20">VIEW ESTIMATE</button>
                    </div>
                 </motion.div>
              )}

              {/* SUMMARY SCREEN */}
              {step === 10 && (
                <motion.div key="summary" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="pt-4">
                  <div className="text-center mb-10">
                     <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check size={32} className="text-emerald-500" />
                     </div>
                     <h2 className="text-3xl font-black text-slate-900 mb-1">Your Total Estimate</h2>
                     <p className="text-slate-500 font-bold text-sm">Professional Digital Package</p>
                  </div>

                  <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100 mb-10 relative group overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform"><Calculator size={100} /></div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10 pb-10 border-b border-slate-200">
                       <div>
                         <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-4">{isFixed ? "Final Selection" : "Sub-Service"}</p>
                         <h4 className="text-2xl font-black text-slate-900 leading-tight">{selections.subService}</h4>
                         <div className="mt-6 flex items-center gap-2">
                            <span className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                            <span className="text-sm font-black text-slate-700">{isFixed ? "Fixed Total Price" : "Calculated Range"}</span>
                         </div>
                       </div>
                       <div className="md:text-right">
                         <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-4">{isFixed ? "Total Investment" : "Estimated Investment"}</p>
                         <h4 className="text-5xl font-black text-primary leading-none">
                            {min} <span className="text-lg">AED</span>
                         </h4>
                         <p className="text-[10px] text-slate-400 font-bold mt-4">Transparent and comprehensive pricing*</p>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-4">Selected Options Breakdown</p>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                         {Object.entries(selections.details).map(([k, v]) => (
                           <div key={k} className="flex justify-between items-center text-sm font-bold border-b border-white pb-2">
                             <span className="text-slate-400 capitalize">{k.replace(/([A-Z])/g, ' $1')}</span>
                             <span className="text-slate-900">{v as string}</span>
                           </div>
                         ))}
                       </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button className="bg-primary text-white p-6 rounded-[2rem] font-black flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-primary/20">
                       START PROJECT <Rocket size={20} />
                    </button>
                    <button className="bg-slate-950 text-white p-6 rounded-[2rem] font-black flex items-center justify-center gap-3 hover:bg-slate-800 transition-colors">
                       CUSTOM QUOTE <Mail size={20} />
                    </button>
                    <button className="bg-emerald-500 text-white p-6 rounded-[2rem] font-black flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all col-span-full shadow-emerald-500/20 shadow-xl">
                       CHAT ON WHATSAPP <MessageSquare size={20} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer Progress */}
          <div className="mt-8 pt-10 border-t border-slate-50 flex items-center justify-between">
             <div className="flex gap-2">
               {[0,1,2,3,4,5,6,7,8,10].map((i) => (
                 <div key={i} className={cn("h-1.5 rounded-full transition-all duration-500", i === step ? "w-8 bg-primary" : i < step ? "w-4 bg-emerald-400" : "w-4 bg-slate-100")} />
               ))}
             </div>
             <p className="text-[10px] uppercase tracking-widest font-black text-slate-300">Confidential Estimate • All Rights Reserved</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function LogoQuestion({ label, sub, options, prices, current, onSelect }: any) {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h3 className="text-2xl font-black text-slate-900 mb-1">{label}</h3>
        <p className="text-slate-500 font-medium text-sm">{sub}</p>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {options.map((opt: string, i: number) => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className={cn(
              "p-6 rounded-3xl border-2 transition-all flex items-center justify-between text-left group",
              current === opt ? "bg-primary text-white border-primary shadow-xl shadow-primary/20 scale-[1.01]" : "bg-slate-50 border-slate-50 text-slate-900 hover:bg-white hover:border-primary/20"
            )}
          >
            <div>
              <p className="font-black text-lg">{opt}</p>
              <p className={cn("text-xs font-bold mt-1 uppercase tracking-widest", current === opt ? "text-white/80" : "text-primary")}>
                {prices[i] === 0 ? "Included Free" : `+ ${prices[i]} AED`}
              </p>
            </div>
            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center transition-all", current === opt ? "bg-white text-primary" : "bg-white text-slate-300 group-hover:text-primary")}>
              {current === opt ? <Check size={20} /> : <Plus size={20} />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function getSubServices(serviceId: ServiceID): string[] {
  switch (serviceId) {
    case "graphic": return ["Logo Design", "Company Profile", "Social Media Design", "Website Banner", "Product Mockup", "Packaging Design", "Stationery Design"];
    case "marketing": return ["Google Ads", "Meta Ads", "TikTok Ads", "SEO", "YouTube Ads", "Email Marketing"];
    case "website": return ["Restaurant", "Real Estate", "E-commerce", "Corporate", "Clinic", "Salon", "Education", "Travel", "Portfolio", "Other"];
    case "smm": return ["Instagram", "Facebook", "LinkedIn", "TikTok", "YouTube"];
    default: return [];
  }
}

function AddonButton({ label, price, selections, toggle }: any) {
  const isSelected = selections.includes(label);
  return (
    <button
      onClick={() => toggle(label)}
      className={cn(
        "p-6 rounded-3xl border-2 transition-all flex items-center justify-between text-left group",
        isSelected ? "bg-emerald-500 text-white border-emerald-500 shadow-xl shadow-emerald-500/20 scale-[1.01]" : "bg-slate-50 border-slate-50 text-slate-900 hover:bg-white hover:border-primary/20"
      )}
    >
      <div>
        <p className="font-black text-lg">{label}</p>
        <p className={cn("text-xs font-bold mt-1 uppercase tracking-widest", isSelected ? "text-white/80" : "text-primary")}>
          + {price} AED
        </p>
      </div>
      <div className={cn("w-10 h-10 rounded-full flex items-center justify-center transition-all", isSelected ? "bg-white text-emerald-500" : "bg-white text-slate-300 group-hover:text-primary")}>
        {isSelected ? <Check size={20} /> : <Plus size={20} />}
      </div>
    </button>
  );
}
