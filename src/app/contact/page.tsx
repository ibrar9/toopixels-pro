"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: "Project Inquiry",
          message: formData.message
        })
      });
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
       <section className="bg-slate-50 pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
           <h1 className="heading-xl mb-8">Let's Create <br/>Something <span className="text-primary italic">Extraordinary</span></h1>
           <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
             Ready to scale your brand? Our expert team is here to help you turn your digital vision into reality.
           </p>
        </div>
      </section>

      <section className="section-padding bg-white">
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
               <h2 className="heading-lg mb-10 text-slate-900 leading-tight">Visit our Office <br/> or <span className="text-primary italic">Contact us.</span></h2>
               <div className="space-y-12">
                  <div className="flex gap-8 group">
                    <div className="w-16 h-16 bg-blue-50 text-primary rounded-3xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                       <Mail size={32} />
                    </div>
                    <div>
                       <h4 className="text-2xl font-black mb-2">Email Us</h4>
                       <p className="text-slate-500 font-medium text-lg">hello@toppixels.pro</p>
                    </div>
                  </div>
                  <div className="flex gap-8 group">
                    <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-3xl flex items-center justify-center flex-shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-500">
                       <Phone size={32} />
                    </div>
                    <div>
                       <h4 className="text-2xl font-black mb-2">Call Us</h4>
                       <p className="text-slate-500 font-medium text-lg">+1 (555) 000-0000</p>
                    </div>
                  </div>
                  <div className="flex gap-8 group">
                    <div className="w-16 h-16 bg-green-50 text-green-600 rounded-3xl flex items-center justify-center flex-shrink-0 group-hover:bg-green-600 group-hover:text-white transition-colors duration-500">
                       <MapPin size={32} />
                    </div>
                    <div>
                       <h4 className="text-2xl font-black mb-2">Location</h4>
                       <p className="text-slate-500 font-medium text-lg leading-relaxed">TopPixels HQ, Business Bay,<br/> Dubai, UAE</p>
                    </div>
                  </div>
               </div>
            </div>

            <motion.div 
               initial={{ opacity: 0, x: 30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="bg-slate-50 p-12 rounded-[3.5rem] border"
            >
               {success ? (
                 <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                       <CheckCircle2 size={48} />
                    </div>
                    <h3 className="text-3xl font-black text-slate-900 mb-4">Message Sent!</h3>
                    <p className="text-slate-500 font-medium text-lg mb-10">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                    <button onClick={() => setSuccess(false)} className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold">Send Another Message</button>
                 </motion.div>
               ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label className="text-sm font-bold ml-2">Full Name</label>
                         <input 
                           type="text" 
                           placeholder="John Doe" 
                           value={formData.name}
                           onChange={(e) => setFormData({...formData, name: e.target.value})}
                           className="w-full p-5 rounded-2xl border-none outline-none focus:ring-2 ring-primary bg-white shadow-sm font-medium" 
                           required
                         />
                      </div>
                      <div className="space-y-2">
                         <label className="text-sm font-bold ml-2">Email Address</label>
                         <input 
                           type="email" 
                           placeholder="john@example.com" 
                           value={formData.email}
                           onChange={(e) => setFormData({...formData, email: e.target.value})}
                           className="w-full p-5 rounded-2xl border-none outline-none focus:ring-2 ring-primary bg-white shadow-sm font-medium" 
                           required
                         />
                      </div>
                   </div>
                   <div className="space-y-2">
                       <label className="text-sm font-bold ml-2">Phone Number</label>
                       <input 
                         type="tel" 
                         placeholder="+971 00 000 0000" 
                         value={formData.phone}
                         onChange={(e) => setFormData({...formData, phone: e.target.value})}
                         className="w-full p-5 rounded-2xl border-none outline-none focus:ring-2 ring-primary bg-white shadow-sm font-medium" 
                         required
                       />
                   </div>
                   <div className="space-y-2">
                       <label className="text-sm font-bold ml-2">Message</label>
                       <textarea 
                         placeholder="Tell us about your project..." 
                         rows={6} 
                         value={formData.message}
                         onChange={(e) => setFormData({...formData, message: e.target.value})}
                         className="w-full p-5 rounded-3xl border-none outline-none focus:ring-2 ring-primary bg-white shadow-sm font-medium resize-none"
                         required
                       ></textarea>
                   </div>
                   <button type="submit" disabled={loading} className="w-full bg-slate-900 text-white p-6 rounded-3xl font-bold flex items-center justify-center gap-3 hover:bg-primary transition-all shadow-xl shadow-slate-100 disabled:opacity-50">
                      {loading ? <Loader2 className="animate-spin" /> : <>Track Project Request <Send size={20} /></>}
                   </button>
                </form>
               )}
            </motion.div>
         </div>
      </section>
    </div>
  );
}
