"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <Link href="/" className="text-3xl font-black tracking-tighter text-primary">
            TOPPIXELS<span className="text-white">.</span>
          </Link>
          <p className="mt-6 text-slate-400 max-w-sm text-lg leading-relaxed">
            Building creative digital experiences that grow brands. Since 2018, TopPixels has been helping businesses
            thrive.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-xl mb-6">Quick Links</h4>
          <ul className="space-y-4 text-slate-400">
            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="/services" className="hover:text-primary transition-colors">Our Services</Link></li>
            <li><Link href="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-xl mb-6">Contact Info</h4>
          <ul className="space-y-4 text-slate-400">
            <li>hello@toppixels.pro</li>
            <li>+1 (555) 000-0000</li>
            <li>Business Bay, Dubai, UAE</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-slate-900 text-center text-slate-500 text-sm">
        <p>&copy; 2026 TopPixels Pro. All rights reserved.</p>
      </div>
    </footer>
  );
}
