"use client";

import { useEffect, useState } from "react";

const DEFAULT_STATS = [
  { value: "1,800+", label: "Global Clients" },
  { value: "99%", label: "Satisfaction Rate" },
  { value: "6+", label: "Years Experience" },
];

export default function Stats() {
  const [stats, setStats] = useState(DEFAULT_STATS);

  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => { if (data?.home?.stats?.length) setStats(data.home.stats); })
      .catch(() => {});
  }, []);

  return (
    <section className="bg-slate-50 py-12 border-y">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="text-center">
            <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-2">{stat.value}</h3>
            <p className="text-muted-foreground font-bold text-sm uppercase tracking-widest">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
