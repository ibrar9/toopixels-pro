import { Target, Eye, ShieldCheck, Heart } from "lucide-react";

export default function About() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <section className="bg-slate-50 pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
           <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4 italic">About TopPixels</p>
           <h1 className="heading-xl mb-8">Building Digital Futures <br/> Since <span className="text-primary italic">2018</span></h1>
           <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
             TopPixels has been helping brands scale with custom design, innovative technology, and result-driven digital strategies.
           </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white px-6">
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="aspect-square rounded-[3rem] bg-slate-100 overflow-hidden shadow-2xl">
               <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2426" alt="Our Team" className="w-full h-full object-cover" />
            </div>
            <div>
               <h2 className="heading-lg mb-8 leading-tight text-slate-900">1,800+ Customers Trust <br/> Our <span className="text-primary italic">Precision.</span></h2>
               <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="w-14 h-14 bg-blue-50 text-primary rounded-2xl flex items-center justify-center flex-shrink-0">
                       <Target size={28} />
                    </div>
                    <div>
                       <h4 className="text-xl font-bold mb-2">Our Mission</h4>
                       <p className="text-muted-foreground text-sm font-medium">To help businesses grow with creative design, innovative technology, and result-driven strategies.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                       <Eye size={28} />
                    </div>
                    <div>
                       <h4 className="text-xl font-bold mb-2">Our Vision</h4>
                       <p className="text-muted-foreground text-sm font-medium">To become a leading creative digital agency known for innovation, trust, quality, and client success.</p>
                    </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-slate-950 text-white">
         <div className="max-w-7xl mx-auto px-6">
            <h2 className="heading-lg mb-20 text-center">Core <span className="text-primary italic">Values</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {[
                 { title: "Trust & Quality", icon: ShieldCheck, desc: "Building long-term successful partnerships through exceptional work quality." },
                 { title: "Innovation", icon: Rocket, desc: "Staying ahead of trends to provide the most advanced solutions." },
                 { title: "Client First", icon: Heart, desc: "Your growth is our priority. We measure our success by your results." }
               ].map((val, i) => (
                 <div key={i} className="bg-slate-900 p-12 rounded-[2.5rem] border border-white/5 hover:border-primary/50 transition-all group">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-primary mb-8 group-hover:scale-110 transition-transform">
                       <val.icon size={32} />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{val.title}</h3>
                    <p className="text-slate-400 font-medium leading-relaxed">{val.desc}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
}

// Simple fallback for Rocket icon since I didn't import it correctly in this file
const Rocket = ({ size }: { size: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.49 1.26-1.12 1.63-1.87h5.18c.37.75.92 1.38 1.63 1.87 1.26 1.5 5 2 5 2s-.5-3.74-2-5c-.49-.71-1.12-1.26-1.87-1.63V9.69c.75-.37 1.38-.92 1.87-1.63 1.5-1.26 2-5 2-5s-3.74.5-5 2c-.49.71-1.12 1.26-1.63 1.87h-5.18c-.37-.75-.92-1.38-1.63-1.87-1.26-1.5-5-2-5-2s.5 3.74 2 5c.49.71 1.12 1.26 1.87 1.63v5.19c-.75.37-1.38.92-1.87 1.63z"/><path d="m12 15 3-3"/><path d="m15 12-3-3"/><path d="M12 9 9 12"/><path d="m9 12 3 3"/></svg>;
