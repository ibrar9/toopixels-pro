"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
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
               <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-sm font-bold ml-2">Full Name</label>
                        <input type="text" placeholder="John Doe" className="w-full p-5 rounded-2xl border-none outline-none focus:ring-2 ring-primary bg-white shadow-sm font-medium" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold ml-2">Email Address</label>
                        <input type="email" placeholder="john@example.com" className="w-full p-5 rounded-2xl border-none outline-none focus:ring-2 ring-primary bg-white shadow-sm font-medium" />
                     </div>
                  </div>
                  <div className="space-y-2">
                      <label className="text-sm font-bold ml-2">Subject</label>
                      <input type="text" placeholder="Project Inquiry" className="w-full p-5 rounded-2xl border-none outline-none focus:ring-2 ring-primary bg-white shadow-sm font-medium" />
                  </div>
                  <div className="space-y-2">
                      <label className="text-sm font-bold ml-2">Message</label>
                      <textarea placeholder="Tell us about your project..." rows={6} className="w-full p-5 rounded-3xl border-none outline-none focus:ring-2 ring-primary bg-white shadow-sm font-medium resize-none"></textarea>
                  </div>
                  <button className="w-full bg-slate-900 text-white p-6 rounded-3xl font-bold flex items-center justify-center gap-3 hover:bg-primary transition-all shadow-xl shadow-slate-100">
                     Track Project Request <Send size={20} />
                  </button>
               </form>
            </motion.div>
         </div>
      </section>
    </div>
  );
}
