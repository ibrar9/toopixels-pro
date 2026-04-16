"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "Since", value: "2018" },
  { label: "Customers Served", value: "1,800+" },
  { label: "Successful Projects", value: "2,500+" },
  { label: "Industry Awards", value: "15+" },
];

export default function Stats() {
  return (
    <section className="bg-primary py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</h2>
              <p className="text-primary-foreground/70 font-medium uppercase tracking-widest text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
