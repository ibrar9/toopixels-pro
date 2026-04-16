"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, Calendar, User, ArrowRight } from "lucide-react";
import { BlogPost } from "@/lib/db";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => setBlogs(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col">
       <section className="bg-slate-50 pt-40 pb-20 px-6 text-center">
        <div className="max-w-7xl mx-auto">
           <h1 className="heading-xl mb-8">Agency <span className="text-primary italic">Insights</span></h1>
           <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
             Latest news, trends, and stories from the creative world of toopixels.
           </p>
        </div>
      </section>

      <section className="section-padding bg-white min-h-screen">
         <div className="max-w-7xl mx-auto px-6">
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-primary" size={48} />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                 {blogs.map((post, i) => (
                   <motion.div 
                     key={post.id}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     className="group cursor-pointer"
                   >
                      <div className="aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-8 bg-slate-100 relative">
                         <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                         <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold text-primary uppercase">
                            {post.category}
                         </div>
                      </div>
                      <div className="flex items-center gap-6 text-xs font-bold text-muted-foreground mb-4 uppercase tracking-widest">
                         <span className="flex items-center gap-2"><Calendar size={14} /> {post.date}</span>
                         <span className="flex items-center gap-2"><User size={14} /> toopixels team</span>
                      </div>
                      <h3 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-primary transition-colors leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-slate-500 mb-8 line-clamp-2 font-medium">{post.excerpt}</p>
                      <div className="flex items-center gap-2 text-primary font-bold group-hover:gap-4 transition-all">
                        Read Full Article <ArrowRight size={20} />
                      </div>
                   </motion.div>
                 ))}
                 {blogs.length === 0 && (
                   <div className="col-span-full text-center py-20 text-muted-foreground font-bold">
                      No blog posts found. Visit the Admin Panel to write your first article!
                   </div>
                 )}
              </div>
            )}
         </div>
      </section>
    </div>
  );
}
