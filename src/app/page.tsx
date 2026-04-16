import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import ServicesPreview from "@/components/sections/ServicesPreview";
import PortfolioPreview from "@/components/sections/PortfolioPreview";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Stats />
      <ServicesPreview />
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square bg-slate-100 rounded-[3rem] overflow-hidden rotate-3 scale-95 border-8 border-white shadow-2xl">
              <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2426" alt="Agency Culture" className="w-full h-full object-cover" />
            </div>
          </div>
          <div>
            <h2 className="heading-lg mb-8 leading-tight">Working Since 2018 to Provide <span className="text-primary italic">Custom Solutions.</span></h2>
            <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
              TopPixels is a modern digital agency helping businesses grow online through design, marketing, development, and innovative digital solutions. 
              Our mission is to help brands reach their target audience with creativity and technology.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                 <h4 className="font-bold text-2xl text-slate-900 leading-none">1.8k+</h4>
                 <p className="text-muted-foreground mt-2 font-medium">Global Clients</p>
              </div>
              <div>
                 <h4 className="font-bold text-2xl text-slate-900 leading-none">99%</h4>
                 <p className="text-muted-foreground mt-2 font-medium">Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PortfolioPreview />
      
      {/* Testimonials Placeholder */}
      <section className="section-padding bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="heading-lg mb-12">Clients <span className="text-primary italic">Trust</span> Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-10 rounded-[2rem] shadow-sm border text-left">
                <div className="flex gap-1 mb-6 text-yellow-400">
                   {[1,2,3,4,5].map(s => <span key={s}>★</span>)}
                </div>
                <p className="text-slate-600 mb-8 italic">"TopPixels transformed our digital presence. Their attention to detail and design quality is unmatched. High recommended!"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-slate-200" />
                  <div>
                    <p className="font-bold">John Doe</p>
                    <p className="text-sm text-muted-foreground">CEO, TechCore</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview Area */}
      <section className="section-padding overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
           <div className="flex justify-between items-end mb-16">
              <h2 className="heading-lg">Latest from <span className="text-primary italic">Blog</span></h2>
              <button className="text-primary font-bold underline decoration-2 underline-offset-8">All Articles</button>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[1,2,3].map(i => (
               <div key={i} className="group cursor-pointer">
                  <div className="aspect-[16/10] rounded-3xl overflow-hidden mb-6 bg-slate-100">
                    <div className="w-full h-full bg-slate-200 group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Technology</p>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">How AI is shaping the future of Web Design in 2026</h3>
                  <p className="text-muted-foreground text-sm line-clamp-2">Exploring the latest trends and tools that are redefining user experience.</p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto px-6">
           <div className="bg-slate-950 rounded-[3rem] p-12 md:p-24 relative overflow-hidden text-center text-white">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-primary/20 rounded-full blur-[120px]" />
              <h2 className="text-4xl md:text-6xl font-black mb-8 relative z-10">Start Your Digital <br/> Journey <span className="text-primary italic">Today.</span></h2>
              <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto relative z-10">
                Ready to take your business to the next level? Our team is waiting to build your next big ideas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                 <button className="bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-transform shadow-xl shadow-primary/20">Book a Consultation</button>
                 <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-colors">Contact Us</button>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
