"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, ChevronRight, ChevronLeft, Check, Calculator, 
  Palette, Megaphone, Globe, Share2, ArrowRight,
  MessageSquare, Mail, Award, Rocket, Plus, Minus, Loader2
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
    "3 Mockups": 30,
    "Premium Mockup Set (10 Mockups)": 50
  }
};

const profilePricing = {
  pricePerPage: 20,
  sourceFile: 50,
  urgentDelivery: 50
};

const websiteBannerPricing = {
  pricePerBanner: 50
};

const stationeryPricing = {
  logo: 99,
  businessCard: { without: 50, with: 70 },
  letterhead: 50,
  envelope: 50
};

const websitePricing = {
  projectTypes: {
    "Business website": { min: 3000, max: 7000 },
    "Ecommerce store": { min: 5000, max: 15000 },
    "Portfolio": { min: 2000, max: 5000 },
    "Landing page": { min: 1500, max: 3500 },
    "Web app": { min: 8000, max: 25000 },
    "Blog/news site": { min: 3000, max: 6000 }
  },
  pageCounts: {
    "1–5 pages": 0,
    "6–15 pages": 1500,
    "16–30 pages": 3500,
    "30+ pages": 7000
  },
  designLevels: {
    "Template-based": 0,
    "Semi-custom": 2000,
    "Fully custom UI/UX": 5000
  },
  features: {
    "Contact form": 200,
    "Blog": 800,
    "CMS/admin panel": 2500,
    "Booking system": 3000,
    "User login": 2500,
    "Payment gateway": 3000,
    "Ecommerce/cart": 5000,
    "Multilingual": 1500,
    "Live chat": 500,
    "API integrations": 3500,
    "SEO setup": 1000,
    "Analytics/dashboard": 800
  },
  contentStatus: {
    "I have all content ready": 0,
    "I need help with copywriting": 1500,
    "I need images/graphics too": 1500
  },
  brandingStatus: {
    "Brand already exists": 0,
    "Need light branding": 1500,
    "Need full branding package": 4500
  },
  urgency: {
    "Flexible": 0,
    "1–2 months": 0,
    "2–4 weeks": 2000,
    "Urgent / ASAP": 5000
  },
  maintenance: {
    "No maintenance": 0,
    "Basic maintenance": 1000,
    "Ongoing support & updates": 3000
  }
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

  const [orderForm, setOrderForm] = useState({ name: "", email: "", phone: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { min, max } = calculateEstimate();
    const orderData = {
      ...orderForm,
      service: selections.serviceId,
      subService: selections.subService,
      details: selections.details,
      totalEstimate: min,
    };

    try {
      await fetch('/api/orders', {
        method: 'POST',
        body: JSON.stringify(orderData)
      });
      setOrderSuccess(true);
    } catch (err) {
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const reset = () => {
    setStep(0);
    setSelections({ serviceId: null, subService: null, details: {}, addons: [] });
  };

  useEffect(() => {
    const handleOpen = (e: any) => {
      const serviceId = e.detail?.serviceId as ServiceID;
      if (serviceId) {
        setSelections(prev => ({ ...prev, serviceId }));
        setStep(1);
      }
    };

    window.addEventListener("open-calculator", handleOpen as EventListener);
    return () => window.removeEventListener("open-calculator", handleOpen as EventListener);
  }, []);

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
      const pricePerPost = d.designType === "Premium Design" ? 50 : 30;
      total += posts * pricePerPost;
      
      const platforms = selections.details.platforms || [];
      if (d.platformType === "Multi-platform Support") {
        total += platforms.length * 499;
      }
      
      if (d.captions === "Yes (Include Captions)") total += posts * smmDesignPricing.captions;
      
      // Selectable addons for SMM Design
      if (selections.addons.includes("Hashtag Research")) total += smmDesignPricing.hashtags;
      if (selections.addons.includes("Content Planning")) total += smmDesignPricing.contentPlanning;
      if (selections.addons.includes("Stock Images")) total += smmDesignPricing.stockImages;
      
      if (d.deliveryTime === "48 hours delivery") total += smmDesignPricing.urgentDelivery;
      
      return { min: total, max: total };
    }

    if (selections.subService === "Website Banner") {
      let total = 0;
      const d = selections.details;
      const banners = parseInt(d.bannerCount) || 1;
      total += banners * websiteBannerPricing.pricePerBanner;
      return { min: total, max: total };
    }

    if (selections.subService === "Product Mockup") {
      let total = 0;
      const d = selections.details;
      const count = parseInt(d.mockupDesignCount) || 1;
      total += count * 50;
      return { min: total, max: total };
    }

    if (selections.subService === "Stationery Design") {
      let total = 0;
      const d = selections.details;
      const items = d.stationeryItems || [];
      if (items.includes("Logo Design Charges")) total += stationeryPricing.logo;
      if (items.includes("Business Card")) {
        total += d.cardType === "With QR" ? stationeryPricing.businessCard.with : stationeryPricing.businessCard.without;
      }
      if (items.includes("Letterhead")) total += stationeryPricing.letterhead;
      if (items.includes("Envelope")) total += stationeryPricing.envelope;
      return { min: total, max: total };
    }

    if (selections.serviceId === "website") {
      let min = 0;
      let max = 0;
      const d = selections.details;
      
      const isBusiness = selections.subService === "Business website";
      
      if (isBusiness) {
        // Business website uses fixed base prices per page tier
        const tiers: any = {
          "1–5 pages": 599,
          "6–15 pages": 899,
          "16–20 pages": 1499,
          "20–30 pages": 2499
        };
        const base = tiers[d.pageRange as string] || 599;
        min = base;
        max = base;
      } else {
        const typePrice = websitePricing.projectTypes[selections.subService as keyof typeof websitePricing.projectTypes] || { min: 3000, max: 7000 };
        min += typePrice.min;
        max += typePrice.max;
        
        min += websitePricing.pageCounts[d.pageRange as keyof typeof websitePricing.pageCounts] || 0;
        max += websitePricing.pageCounts[d.pageRange as keyof typeof websitePricing.pageCounts] || 0;
      }
      
      min += websitePricing.designLevels[d.designLevel as keyof typeof websitePricing.designLevels] || 0;
      max += websitePricing.designLevels[d.designLevel as keyof typeof websitePricing.designLevels] || 0;
      
      const features = selections.addons || [];
      features.forEach(f => {
        const p = websitePricing.features[f as keyof typeof websitePricing.features] || 0;
        min += p;
        max += p;
      });
      
      min += websitePricing.contentStatus[d.contentStatus as keyof typeof websitePricing.contentStatus] || 0;
      max += websitePricing.contentStatus[d.contentStatus as keyof typeof websitePricing.contentStatus] || 0;
      
      min += websitePricing.brandingStatus[d.brandingStatus as keyof typeof websitePricing.brandingStatus] || 0;
      max += websitePricing.brandingStatus[d.brandingStatus as keyof typeof websitePricing.brandingStatus] || 0;
      
      min += websitePricing.urgency[d.urgency as keyof typeof websitePricing.urgency] || 0;
      max += websitePricing.urgency[d.urgency as keyof typeof websitePricing.urgency] || 0;
      
      min += websitePricing.maintenance[d.maintenance as keyof typeof websitePricing.maintenance] || 0;
      max += websitePricing.maintenance[d.maintenance as keyof typeof websitePricing.maintenance] || 0;
      
      return { min, max };
    }

    let min = 0;
    let max = 0;
    if (selections.serviceId === "graphic") { min = 500; max = 1500; }
    if (selections.serviceId === "marketing") { min = 1200; max = 5000; }
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
        className="relative w-full max-w-5xl bg-white rounded-3xl md:rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row md:min-h-[600px] lg:min-h-[700px] max-h-[95vh] md:max-h-[90vh]"
      >
        {/* Left Sidebar */}
        <div className="w-full md:w-80 bg-slate-950 p-6 md:p-10 text-white flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-900 shrink-0">
          <div>
            <div className="flex items-center gap-3 mb-6 md:mb-12">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <Calculator size={20} className="text-white md:w-6 md:h-6" />
              </div>
              <div>
                <span className="font-black tracking-tighter text-xl md:text-2xl block leading-none">Estimate</span>
                <span className="text-primary text-[10px] md:text-xs font-bold uppercase tracking-widest">by Toopixels</span>
              </div>
            </div>

            <div className="space-y-3 md:space-y-6">
              <div className="relative">
                <div className="absolute -left-6 md:-left-10 top-1/2 -translate-y-1/2 w-1 h-6 md:h-12 bg-primary rounded-full" />
                <h3 className="text-lg md:text-3xl font-bold leading-tight">Fast, Transparent <br className="hidden md:block"/>Estimation.</h3>
              </div>
              <p className="text-slate-400 text-[10px] md:text-sm leading-relaxed font-medium">
                Our tool provides an accurate agency proposal instantly.
              </p>
            </div>
          </div>

          <div className="mt-6 md:mt-12">
            {!(step === 1 || (selections.subService === "Social Media Design" && step <= 2)) && (
              <div className="p-4 md:p-6 rounded-2xl md:rounded-3xl bg-slate-900/50 border border-slate-800">
                 <p className="text-[9px] uppercase tracking-[0.2em] text-slate-500 font-black mb-2 text-center">
                   {isFixed ? "Total Investment" : "Investment Range"}
                 </p>
                 <div className="flex flex-col items-center gap-0.5">
                   <div className="flex items-center gap-1">
                     {isFixed ? (
                       <span className="text-2xl md:text-4xl font-black text-primary">{min}</span>
                     ) : (
                       <div className="flex items-center gap-1">
                         <span className="text-xl md:text-2xl font-black text-white">{min}</span>
                         <span className="text-slate-600 font-bold">-</span>
                         <span className="text-xl md:text-2xl font-black text-primary">{max}</span>
                       </div>
                     )}
                   </div>
                   <span className="text-slate-500 text-[9px] font-black uppercase tracking-widest">AED (Dirhams)</span>
                 </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-5 md:p-14 relative flex flex-col overflow-hidden">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 md:top-8 md:right-8 p-2 md:p-3 hover:bg-slate-100 rounded-full transition-all z-30 group bg-white/80 backdrop-blur-sm shadow-sm md:shadow-none"
          >
            <X size={20} className="text-slate-400 group-hover:rotate-90 transition-transform md:w-6 md:h-6" />
          </button>

          <div className="flex-1 overflow-y-auto custom-scrollbar pr-4">
            <AnimatePresence mode="wait">
              {/* START SCREEN */}
              {step === 0 && (
                <motion.div key="start" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div className="mb-6 md:mb-12">
                    <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-2 md:mb-4">Select Your Service</h2>
                    <p className="text-slate-500 text-sm md:text-lg font-medium">Get a professional cost estimate instantly.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 md:mb-8">
                    {services.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => {
                          setSelections({ ...selections, serviceId: s.id as ServiceID });
                          nextStep();
                        }}
                        className="group p-5 md:p-8 rounded-3xl md:rounded-[2.5rem] border-2 border-slate-50 hover:border-primary/20 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all text-left flex flex-col gap-4 md:gap-6 relative"
                      >
                        <div className={cn("w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-[1.5rem] flex items-center justify-center transition-all group-hover:rotate-6", s.color)}>
                           <s.icon className="text-white" size={24} />
                        </div>
                        <div>
                          <h4 className="font-black text-lg md:text-xl text-slate-900 group-hover:text-primary transition-colors">{s.title}</h4>
                          <p className="text-[11px] md:text-sm text-slate-500 font-medium group-hover:text-slate-600">{s.desc}</p>
                        </div>
                        <div className="absolute top-5 right-5 md:top-8 md:right-8 w-8 h-8 md:w-10 md:h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all">
                          <ArrowRight size={16} />
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="p-8 rounded-3xl bg-slate-50/50 border-2 border-dashed border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 transition-all hover:border-primary/30 hover:bg-white">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm text-slate-400">
                        <Plus size={24} />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900">Something else in mind?</h4>
                        <p className="text-slate-500 text-sm font-medium">For customized design or unique projects, let's talk.</p>
                      </div>
                    </div>
                    <Link 
                      href="/contact" 
                      onClick={onClose}
                      className="text-primary font-black flex items-center gap-2 hover:underline group"
                    >
                      CONTACT TEAM <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
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
                    <h2 className="text-4xl font-black text-slate-900 mb-4">
                      {selections.serviceId === 'website' ? "Calculate your website cost in 60 seconds" : "Choose Design Type"}
                    </h2>
                    <p className="text-slate-500 text-lg font-medium capitalize">
                      {selections.serviceId === 'website' ? "Answer a few quick questions to get an estimated budget and timeline." : `Refining your ${selections.serviceId} selection.`}
                    </p>
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
                         <div className="w-8 h-8 rounded-full border-2 border-white bg-white flex items-center justify-center text-primary shadow-sm" >
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                         </div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-8 p-8 rounded-3xl bg-slate-50/50 border-2 border-dashed border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6 transition-all hover:border-primary/30 hover:bg-white">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm text-primary">
                        <MessageSquare size={24} />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900">Need a fully custom design?</h4>
                        <p className="text-slate-500 text-sm font-medium">Contact our specialized team for complex projects.</p>
                      </div>
                    </div>
                    <Link 
                      href="/contact" 
                      onClick={onClose}
                      className="bg-primary text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all text-center whitespace-nowrap"
                    >
                      CONTACT US
                    </Link>
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
                      onSelect={(v: any) => { updateDetail("mockupOption", v); setStep(10); }} 
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
                       <div className="space-y-12">
                          <div>
                            <h3 className="text-2xl font-black text-slate-900 mb-1">Number of Pages</h3>
                            <p className="text-slate-500 font-medium text-sm">Each page is professionally designed for 20 AED.</p>
                          </div>
                          <div className="px-4 py-10">
                             <PremiumSlider 
                                min={1} 
                                max={50} 
                                current={parseInt(selections.details.pageCount) || 5} 
                                onChange={(val) => updateDetail("pageCount", val.toString())} 
                                unit="Page"
                             />
                          </div>
                          <button 
                            onClick={nextStep}
                            className="w-full bg-primary text-white p-6 rounded-[2rem] font-black shadow-xl shadow-primary/20 hover:scale-[1.01] transition-all"
                          >
                            CONTINUE WITH {selections.details.pageCount || 5} PAGES
                          </button>
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
                       <div className="space-y-12">
                          <div>
                            <h3 className="text-2xl font-black text-slate-900 mb-1">Number of Posts</h3>
                            <p className="text-slate-500 font-medium text-sm">Professional graphics starting at 30 AED per post.</p>
                          </div>
                          <div className="px-4 py-10">
                             <PremiumSlider 
                                min={1} 
                                max={50} 
                                current={parseInt(selections.details.postCount) || 1} 
                                onChange={(val) => updateDetail("postCount", val.toString())} 
                             />
                          </div>
                          <button 
                            onClick={nextStep}
                            className="w-full bg-primary text-white p-6 rounded-[2rem] font-black shadow-xl shadow-primary/20 hover:scale-[1.01] transition-all"
                          >
                            CONTINUE WITH {selections.details.postCount || 1} POSTS
                          </button>
                       </div>
                    )}

                    {step === 3 && (
                       <LogoQuestion 
                         label="Design Type" 
                         sub="Select the quality tier."
                         options={["Basic Design", "Premium Design"]}
                         prices={[30, 50]}
                         current={selections.details.designType}
                         onSelect={(v: any) => { updateDetail("designType", v); nextStep(); }}
                         showPerPost
                       />
                    )}

                    {step === 4 && (
                       <div className="space-y-8">
                          <div>
                            <h3 className="text-2xl font-black text-slate-900 mb-1">Platform Support</h3>
                            <p className="text-slate-500 font-medium text-sm">Choose where your brand will live.</p>
                          </div>
                          
                          <div className="flex gap-4 mb-8">
                             {["Single Platform", "Multi-platform Support"].map(t => (
                               <button 
                                 key={t}
                                 onClick={() => {
                                   updateDetail("platformType", t);
                                   updateDetail("platforms", []); // Reset selection
                                 }}
                                 className={cn(
                                   "flex-1 p-4 rounded-2xl border-2 font-bold transition-all text-sm",
                                   selections.details.platformType === t ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" : "bg-slate-50 border-slate-50 text-slate-900"
                                 )}
                               >
                                 {t}
                               </button>
                             ))}
                          </div>

                          <AnimatePresence mode="wait">
                            {selections.details.platformType === "Single Platform" && (
                              <motion.div key="single" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                <select 
                                  className="w-full p-6 rounded-3xl bg-slate-50 border-2 border-slate-50 focus:border-primary outline-none font-bold text-lg appearance-none cursor-pointer"
                                  value={selections.details.platforms?.[0] || ""}
                                  onChange={(e) => {
                                    updateDetail("platforms", [e.target.value]);
                                    nextStep();
                                  }}
                                >
                                  <option value="" disabled>Select a platform...</option>
                                  {["LinkedIn", "Facebook", "Instagram", "Pinterest", "Twitter", "TikTok"].map(p => (
                                    <option key={p} value={p}>{p}</option>
                                  ))}
                                </select>
                                <p className="text-center text-[10px] uppercase tracking-widest font-black text-slate-400 mt-4">Single platform selection is included in base price</p>
                              </motion.div>
                            )}

                            {selections.details.platformType === "Multi-platform Support" && (
                              <motion.div key="multi" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                                <div className="grid grid-cols-2 gap-3">
                                  {["LinkedIn", "Facebook", "Instagram", "Pinterest", "Twitter", "TikTok"].map(p => {
                                    const isSelected = selections.details.platforms?.includes(p);
                                    return (
                                      <button 
                                        key={p}
                                        onClick={() => {
                                          const current = selections.details.platforms || [];
                                          const next = isSelected ? current.filter((x: string) => x !== p) : [...current, p];
                                          updateDetail("platforms", next);
                                        }}
                                        className={cn(
                                          "p-4 rounded-2xl border-2 font-bold transition-all flex items-center justify-between",
                                          isSelected ? "bg-primary/5 border-primary text-primary" : "bg-slate-50 border-slate-50 text-slate-600"
                                        )}
                                      >
                                        {p} {isSelected && <Check size={16} />}
                                      </button>
                                    );
                                  })}
                                </div>
                                <div className="bg-primary/10 p-4 rounded-2xl text-center">
                                   <p className="text-xs font-black text-primary uppercase">Multi-platform Charge: 499 AED / each platform</p>
                                </div>
                                <button 
                                  disabled={(selections.details.platforms?.length || 0) === 0}
                                  onClick={nextStep}
                                  className="w-full bg-primary text-white p-6 rounded-[2rem] font-black shadow-xl shadow-primary/20 disabled:opacity-50 disabled:shadow-none transition-all"
                                >
                                  CONTINUE WITH {selections.details.platforms?.length || 0} PLATFORMS
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                       </div>
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

               {/* WEBSITE BANNER INPUTS */}
               {step === 2 && selections.subService === "Website Banner" && (
                 <motion.div key="banner-step-2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <button onClick={prevStep} className="inline-flex items-center gap-2 text-primary font-bold text-sm mb-12">
                      <ChevronLeft size={18} /> Back
                    </button>
                    <div className="space-y-12">
                       <div>
                         <h3 className="text-2xl font-black text-slate-900 mb-1">Number of Banners</h3>
                         <p className="text-slate-500 font-medium text-sm">Professional website banners for 50 AED each.</p>
                       </div>
                       <div className="px-4 py-10">
                          <PremiumSlider 
                             min={1} 
                             max={50} 
                             current={parseInt(selections.details.bannerCount) || 1} 
                             onChange={(val) => updateDetail("bannerCount", val.toString())} 
                             unit="Banner"
                          />
                       </div>
                       <button 
                         onClick={() => setStep(10)} 
                         className="w-full bg-primary text-white p-6 rounded-[2rem] font-black shadow-xl shadow-primary/20 hover:scale-[1.01] transition-all"
                       >
                         CONTINUE WITH {selections.details.bannerCount || 1} BANNERS
                       </button>
                    </div>
                 </motion.div>
               )}

               {/* PRODUCT MOCKUP INPUTS */}
               {step === 2 && selections.subService === "Product Mockup" && (
                 <motion.div key="mockup-step-2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <button onClick={prevStep} className="inline-flex items-center gap-2 text-primary font-bold text-sm mb-12">
                      <ChevronLeft size={18} /> Back
                    </button>
                    <div className="space-y-12">
                       <div>
                         <h3 className="text-2xl font-black text-slate-900 mb-1">Number of Mockup Designs</h3>
                         <p className="text-slate-500 font-medium text-sm">Professional product mockups for 50 AED each.</p>
                       </div>
                       <div className="px-4 py-10">
                          <PremiumSlider 
                             min={1} 
                             max={50} 
                             current={parseInt(selections.details.mockupDesignCount) || 1} 
                             onChange={(val) => updateDetail("mockupDesignCount", val.toString())} 
                             unit="Design"
                          />
                       </div>
                       <button 
                         onClick={() => setStep(10)} 
                         className="w-full bg-primary text-white p-6 rounded-[2rem] font-black shadow-xl shadow-primary/20 hover:scale-[1.01] transition-all"
                       >
                         CONTINUE WITH {selections.details.mockupDesignCount || 1} DESIGNS
                       </button>
                    </div>
                 </motion.div>
               )}

               {/* STATIONERY DESIGN INPUTS */}
               {step === 2 && selections.subService === "Stationery Design" && (
                 <motion.div key="stationery-step-2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <button onClick={prevStep} className="inline-flex items-center gap-2 text-primary font-bold text-sm mb-12">
                      <ChevronLeft size={18} /> Back
                    </button>
                    <div className="space-y-10">
                       <div>
                         <h3 className="text-2xl font-black text-slate-900 mb-1">Stationery Essentials</h3>
                         <p className="text-slate-500 font-medium text-sm">Select the items you need for your brand kit.</p>
                       </div>
                       
                       <div className="grid grid-cols-1 gap-3">
                         {[
                           { id: "Logo Design Charges", label: "Logo Design Charges", price: 99 },
                           { id: "Business Card", label: "Business Card", hasSub: true },
                           { id: "Letterhead", label: "Letterhead", price: 50 },
                           { id: "Envelope", label: "Envelope", price: 50 },
                         ].map(item => {
                            const isSelected = selections.details.stationeryItems?.includes(item.id);
                            return (
                               <div key={item.id} className="space-y-3">
                                  <button
                                    onClick={() => {
                                      const current = selections.details.stationeryItems || [];
                                      const next = isSelected ? current.filter((x: string) => x !== item.id) : [...current, item.id];
                                      updateDetail("stationeryItems", next);
                                      if (!isSelected && item.id === "Business Card") updateDetail("cardType", "Without QR");
                                    }}
                                    className={cn(
                                      "w-full p-6 rounded-3xl border-2 transition-all flex items-center justify-between group text-left",
                                      isSelected ? "bg-primary text-white border-primary shadow-lg shadow-primary/20 scale-[1.01]" : "bg-slate-50 border-slate-50 text-slate-900 hover:bg-white hover:border-primary/20"
                                    )}
                                  >
                                    <div className="flex items-center gap-4">
                                      <div className={cn("w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all", isSelected ? "bg-white border-white text-primary" : "border-slate-200 group-hover:border-primary")}>
                                        {isSelected && <Check size={14} />}
                                      </div>
                                      <span className="font-black text-lg">{item.label}</span>
                                    </div>
                                    {item.price && <span className={cn("text-sm font-bold", isSelected ? "text-white/80" : "text-primary")}>{item.price} AED</span>}
                                  </button>

                                  {item.id === "Business Card" && isSelected && (
                                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="pl-6 sm:pl-14 flex flex-col sm:flex-row gap-3">
                                       {["Without QR", "With QR"].map(type => (
                                         <button 
                                           key={type}
                                           onClick={() => updateDetail("cardType", type)}
                                           className={cn(
                                             "flex-1 p-4 rounded-2xl border-2 text-xs font-black transition-all flex justify-between items-center sm:block sm:text-center",
                                             selections.details.cardType === type ? "bg-slate-900 text-white border-slate-900 shadow-md scale-[1.02]" : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
                                           )}
                                         >
                                           <span>{type}</span>
                                           <span className="block sm:mt-1 opacity-70">{type === "With QR" ? "70" : "50"} AED</span>
                                         </button>
                                       ))}
                                    </motion.div>
                                  )}
                               </div>
                            )
                         })}
                       </div>

                       <button 
                         disabled={(selections.details.stationeryItems?.length || 0) === 0}
                         onClick={() => setStep(10)} 
                         className="w-full bg-primary text-white p-4 sm:p-6 rounded-[2rem] font-black shadow-xl shadow-primary/20 disabled:opacity-50 disabled:shadow-none transition-all"
                       >
                         CONTINUE WITH {selections.details.stationeryItems?.length || 0} ITEMS
                       </button>
                    </div>
                 </motion.div>
               )}

                {/* WEBSITE DESIGN DYNAMIC FLOW */}
                {selections.serviceId === "website" && step >= 2 && step <= 9 && (
                   <motion.div key={`web-step-${step}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                      <button onClick={prevStep} className="inline-flex items-center gap-2 text-primary font-bold text-sm mb-12">
                        <ChevronLeft size={18} /> Back
                      </button>

                      {step === 2 && (() => {
                        const isBusiness = selections.subService === "Business website";
                        const options = isBusiness 
                          ? ["1–5 pages", "6–15 pages", "16–20 pages", "20–30 pages"]
                          : Object.keys(websitePricing.pageCounts);
                        const prices = isBusiness 
                          ? [599, 899, 1499, 2499]
                          : Object.values(websitePricing.pageCounts);

                        return (
                          <LogoQuestion 
                            label="Number of pages" 
                            sub="Estimated size of your website."
                            options={options} 
                            prices={prices}
                            current={selections.details.pageRange} 
                            onSelect={(v: any) => { updateDetail("pageRange", v); nextStep(); }} 
                            hidePlus={isBusiness}
                          />
                        );
                      })()}
                      {step === 3 && (
                        <LogoQuestion 
                          label="Design level" 
                          sub="Choose the visual complexity."
                          options={Object.keys(websitePricing.designLevels)} 
                          prices={Object.values(websitePricing.designLevels)}
                          current={selections.details.designLevel} 
                          onSelect={(v: any) => { updateDetail("designLevel", v); nextStep(); }} 
                        />
                      )}
                      {step === 4 && (
                        <div className="space-y-8">
                           <div>
                             <h3 className="text-2xl font-black text-slate-900 mb-1">Select Features</h3>
                             <p className="text-slate-500 font-medium text-sm">Choose all technical functionalities required.</p>
                           </div>
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                             {Object.entries(websitePricing.features).map(([f, p]) => (
                               <AddonButton key={f} label={f} price={p} selections={selections.addons} toggle={toggleAddon} />
                             ))}
                           </div>
                           <button onClick={nextStep} className="w-full bg-primary text-white p-6 rounded-[2rem] font-black shadow-xl shadow-primary/20 hover:scale-[1.01] transition-all">CONTINUE</button>
                        </div>
                      )}
                      {step === 5 && (
                        <LogoQuestion 
                          label="Content readiness" 
                          sub="Do you have the text and media ready?"
                          options={Object.keys(websitePricing.contentStatus)} 
                          prices={Object.values(websitePricing.contentStatus)}
                          current={selections.details.contentStatus} 
                          onSelect={(v: any) => { updateDetail("contentStatus", v); nextStep(); }} 
                        />
                      )}
                      {step === 6 && (
                        <LogoQuestion 
                          label="Branding status" 
                          sub="Do you have an established brand identity?"
                          options={Object.keys(websitePricing.brandingStatus)} 
                          prices={Object.values(websitePricing.brandingStatus)}
                          current={selections.details.brandingStatus} 
                          onSelect={(v: any) => { updateDetail("brandingStatus", v); nextStep(); }} 
                        />
                      )}
                      {step === 7 && (
                        <LogoQuestion 
                          label="Timeline urgency" 
                          sub="When do you need the site launched?"
                          options={Object.keys(websitePricing.urgency)} 
                          prices={Object.values(websitePricing.urgency)}
                          current={selections.details.urgency} 
                          onSelect={(v: any) => { updateDetail("urgency", v); nextStep(); }} 
                        />
                      )}
                      {step === 8 && (
                        <LogoQuestion 
                          label="Maintenance" 
                          sub="How will you handle updates after launch?"
                          options={Object.keys(websitePricing.maintenance)} 
                          prices={Object.values(websitePricing.maintenance)}
                          current={selections.details.maintenance} 
                          onSelect={(v: any) => { updateDetail("maintenance", v); setStep(10); }} 
                        />
                      )}
                   </motion.div>
                )}

                {/* FALLBACK FOR OTHER SERVICES */}
               {step >= 2 && step < 10 && selections.serviceId !== "website" && !["Logo Design", "Company Profile", "Social Media Design", "Website Banner", "Product Mockup", "Stationery Design"].includes(selections.subService!) && (
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
              {step === 10 && (() => {
                const isWebsite = selections.serviceId === "website";
                
                const getWebsiteDelivery = () => {
                  let minW = 2;
                  if (selections.details.pageRange === "6–15 pages") minW += 1;
                  if (selections.details.pageRange === "16–30 pages") minW += 2;
                  if (selections.details.pageRange === "30+ pages") minW += 4;
                  if (selections.addons.length > 3) minW += 1;
                  if (selections.details.contentStatus !== "I have all content ready") minW += 1;
                  
                  if (selections.details.urgency === "Urgent / ASAP") return "2–3 weeks (Express)";
                  if (selections.details.urgency === "2–4 weeks") return "2–4 weeks (Fast)";
                  return `${minW}–${minW + 2} weeks`;
                };

                const getWebsitePackage = () => {
                  if (min > 15000) return "Enterprise Custom Solution";
                  if (min > 8000) return "Professional Business Suite";
                  if (min > 4000) return "Standard Performance Plan";
                  return "Entry-Level Startup Launch";
                };

                return (
                  <motion.div key="summary" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="pt-4">
                    <div className="text-center mb-6 md:mb-10">
                       <div className="w-12 h-12 md:w-16 md:h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Check size={24} className="text-emerald-500" />
                       </div>
                       <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-1">Your Total Estimate</h2>
                       <p className="text-slate-500 font-bold text-[10px] md:text-sm uppercase">
                         {isWebsite ? getWebsitePackage() : "Professional Digital Package"}
                       </p>
                    </div>

                    <div className="bg-slate-50 rounded-3xl md:rounded-[2.5rem] p-6 md:p-10 border border-slate-100 mb-6 md:mb-10 relative group overflow-hidden">
                      <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform"><Calculator size={100} /></div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10 pb-10 border-b border-slate-200">
                         <div>
                           <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400 mb-4">{isWebsite ? "Project Type" : "Sub-Service"}</p>
                           <h4 className="text-2xl font-black text-slate-900 leading-tight">{selections.subService}</h4>
                           <div className="mt-6 flex flex-col gap-2">
                              <div className="flex items-center gap-2">
                                <span className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                                <span className="text-sm font-black text-slate-700">{isFixed ? "Fixed Total Price" : "Calculated Range"}</span>
                              </div>
                              {isWebsite && (
                                <div className="flex items-center gap-2">
                                  <Rocket size={14} className="text-emerald-500" />
                                  <span className="text-xs font-bold text-slate-500">Delivery: {getWebsiteDelivery()}</span>
                                </div>
                              )}
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

                      <div className="space-y-6">
                         <p className="text-[10px] uppercase tracking-[0.2em] font-black text-slate-400">Selected Options Breakdown</p>
                         
                         {isWebsite ? (
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                              <ResultCategory label="Concept & Design" value={selections.details.designLevel} />
                              <ResultCategory label="Build & Scale" value={selections.details.pageRange} />
                              <ResultCategory label="Content & Assets" value={selections.details.contentStatus} />
                              <ResultCategory label="Deployment" value={selections.details.urgency} />
                              <div className="col-span-full pt-4 border-t border-white">
                                <p className="text-[9px] uppercase font-black text-slate-400 mb-2">Technical Features Included:</p>
                                <div className="flex flex-wrap gap-2">
                                  {selections.addons.length > 0 ? selections.addons.map(a => (
                                    <span key={a} className="px-3 py-1 bg-white border border-slate-100 rounded-full text-[10px] font-bold text-slate-600">{a}</span>
                                  )) : <span className="text-xs text-slate-300 italic">No additional features selected</span>}
                                </div>
                              </div>
                           </div>
                         ) : (
                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                             {Object.entries(selections.details).map(([k, v]) => (
                               <div key={k} className="flex justify-between items-center text-sm font-bold border-b border-white pb-2">
                                 <span className="text-slate-400 capitalize">{k.replace(/([A-Z])/g, ' $1')}</span>
                                 <span className="text-slate-900">{v as string}</span>
                               </div>
                             ))}
                           </div>
                         )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                      <button onClick={() => setStep(11)} className="bg-primary text-white p-5 md:p-6 rounded-2xl md:rounded-[2.5rem] font-black flex items-center justify-center gap-3 shadow-xl shadow-primary/20">
                         START PROJECT <Rocket size={20} />
                      </button>
                      <Link 
                         href="/contact"
                         onClick={onClose}
                         className="bg-slate-950 text-white p-6 rounded-[2rem] font-black flex items-center justify-center gap-3 hover:bg-slate-800 transition-colors"
                      >
                         CUSTOM QUOTE <Mail size={20} />
                      </Link>
                    </div>
                  </motion.div>
                );
              })()}

               {/* NEW STEP 11: CONTACT FORM FOR LEAD CAPTURE */}
               {step === 11 && (
                 <motion.div key="order-form" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                   <button onClick={() => setStep(10)} className="inline-flex items-center gap-2 text-primary font-bold text-sm mb-12 hover:translate-x-[-4px] transition-transform">
                     <ChevronLeft size={18} /> Back to Estimate
                   </button>

                   {orderSuccess ? (
                      <div className="text-center py-20 text-slate-900 font-bold">
                         <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Check size={48} />
                         </div>
                         <h3 className="text-3xl font-black mb-4">Request Received!</h3>
                         <p className="text-slate-500 font-medium text-lg mb-10">Our team has received your concept and estimate. We'll contact you shortly to start the project.</p>
                         <button onClick={onClose} className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold">CLOSE CALCULATOR</button>
                      </div>
                   ) : (
                      <div className="max-w-md mx-auto">
                        <div className="mb-10 text-center">
                          <h2 className="text-4xl font-black text-slate-900 mb-2">Final Step</h2>
                          <p className="text-slate-500 font-medium tracking-tight uppercase text-xs">Share your details to lock in this estimate.</p>
                        </div>
                        <form onSubmit={handleOrderSubmit} className="space-y-4">
                           <input 
                              type="text" 
                              placeholder="Your Full Name *" 
                              className="w-full p-5 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-primary outline-none font-bold text-slate-900"
                              required
                              value={orderForm.name}
                              onChange={e => setOrderForm({...orderForm, name: e.target.value})}
                           />
                           <input 
                              type="email" 
                              placeholder="Work Email Address *" 
                              className="w-full p-5 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-primary outline-none font-bold text-slate-900"
                              required
                              value={orderForm.email}
                              onChange={e => setOrderForm({...orderForm, email: e.target.value})}
                           />
                           <input 
                              type="tel" 
                              placeholder="Phone Number (WhatsApp) *" 
                              className="w-full p-5 rounded-2xl bg-slate-50 border-2 border-slate-50 focus:border-primary outline-none font-bold text-slate-900"
                              required
                              value={orderForm.phone}
                              onChange={e => setOrderForm({...orderForm, phone: e.target.value})}
                           />
                           <div className="pt-6">
                              <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full bg-primary text-white p-6 rounded-[2rem] font-black shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                              >
                                {isSubmitting ? <Loader2 className="animate-spin" /> : <>FINALIZE PROJECT REQUEST <ArrowRight size={20}/></>}
                              </button>
                           </div>
                        </form>
                      </div>
                   )}
                 </motion.div>
               )}
            </AnimatePresence>
          </div>

          {/* Footer Progress */}
          <div className="mt-4 md:mt-8 pt-4 md:pt-10 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-4">
             <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
               {[0,1,2,3,4,5,6,7,8,10].map((i) => (
                 <div key={i} className={cn("h-1.5 rounded-full transition-all duration-500", i === step ? "w-6 md:w-8 bg-primary" : i < step ? "w-3 md:w-4 bg-emerald-400" : "w-3 md:w-4 bg-slate-100")} />
               ))}
             </div>
             <p className="text-[8px] md:text-[10px] uppercase tracking-widest font-black text-slate-300">Fast Estimate • Toopixels</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function LogoQuestion({ label, sub, options, prices, current, onSelect, showPerPost, hidePlus }: any) {
  return (
    <div className="space-y-4 md:space-y-8 animate-in fade-in duration-500">
      <div>
        <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-1">{label}</h3>
        <p className="text-slate-500 font-medium text-xs md:text-sm">{sub}</p>
      </div>
      <div className="grid grid-cols-1 gap-3">
        {options.map((opt: string, i: number) => (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            className={cn(
              "p-4 md:p-6 rounded-2xl md:rounded-3xl border-2 transition-all flex items-center justify-between text-left group",
              current === opt ? "bg-primary text-white border-primary shadow-xl shadow-primary/20 scale-[1.01]" : "bg-slate-50 border-slate-50 text-slate-900 hover:bg-white hover:border-primary/20"
            )}
          >
            <div>
              <p className="font-black text-base md:text-lg">{opt}</p>
              <p className={cn("text-[10px] md:text-xs font-bold mt-1 uppercase tracking-widest", current === opt ? "text-white/80" : "text-primary")}>
                {showPerPost && (prices[i] === 30 || prices[i] === 50) 
                  ? `${prices[i]} AED / POST` 
                  : prices[i] === 0 
                    ? "Included Free" 
                    : hidePlus 
                      ? `${prices[i]} AED` 
                      : `+ ${prices[i]} AED`}
              </p>
            </div>
            <div className={cn("w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all", current === opt ? "bg-white text-primary" : "bg-white text-slate-300 group-hover:text-primary")}>
              {current === opt ? <Check size={16} /> : <Plus size={16} />}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function PremiumSlider({ min, max, current, onChange, unit = "Post" }: { min: number, max: number, current: number, onChange: (val: number) => void, unit?: string }) {
  return (
    <div className="relative w-full py-6">
      {/* Label Tooltip */}
      <div 
        className="absolute -top-6 transition-all duration-150 ease-out pointer-events-none"
        style={{ left: `${((current - min) / (max - min)) * 100}%`, transform: "translateX(-50%)" }}
      >
        <div className="bg-primary text-white px-3 py-1 rounded-lg text-sm font-black shadow-lg relative mb-2">
          {current}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-primary" />
        </div>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        value={current}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-primary"
        style={{
          background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${((current - min) / (max - min)) * 100}%, #f1f5f9 ${((current - min) / (max - min)) * 100}%, #f1f5f9 100%)`
        }}
      />
      <div className="flex justify-between mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
        <span>{min} {unit}</span>
        <span>{max} {unit}s Max</span>
      </div>

      <style jsx>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 28px;
          height: 28px;
          background: #ffffff;
          border: 4px solid #ef4444;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(239, 68, 68, 0.3);
          transition: transform 0.1s ease-in-out;
        }
        input[type='range']::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }
        input[type='range']::-moz-range-thumb {
          width: 28px;
          height: 28px;
          background: #ffffff;
          border: 4px solid #ef4444;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(239, 68, 68, 0.3);
        }
      `}</style>
    </div>
  );
}

function getSubServices(serviceId: ServiceID): string[] {
  switch (serviceId) {
    case "graphic": return ["Logo Design", "Company Profile", "Social Media Design", "Website Banner", "Product Mockup", "Stationery Design"];
    case "marketing": return ["Google Ads", "Meta Ads", "TikTok Ads", "SEO", "YouTube Ads", "Email Marketing"];
    case "website": return ["Business website", "Ecommerce store", "Portfolio", "Landing page", "Web app", "Blog/news site"];
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

function ResultCategory({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-white pb-3">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
      <span className="text-sm font-bold text-slate-900">{value || "Included/Not Selected"}</span>
    </div>
  );
}
