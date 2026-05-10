"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, Calculator } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const CalculatorModal = dynamic(() => import("../calculator/CalculatorModal"), { ssr: false });

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Blog", href: "/blog" },
];

export default function Navbar({ logoImage }: { logoImage?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    const handleOpenCalc = () => setIsCalculatorOpen(true);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("open-calculator", handleOpenCalc);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("open-calculator", handleOpenCalc);
    };
  }, []);

  return (
    <>
    <nav
      className={cn(
        "fixed top-0 w-full z-[100] transition-all duration-300 px-6 py-4",
        scrolled ? "bg-white/85 backdrop-blur-xl border-b border-slate-100 shadow-sm py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-black tracking-tighter text-primary">
          {logoImage ? (
            <img src={logoImage} alt="Site Logo" className="h-8 md:h-10 w-auto object-contain" />
          ) : (
            <>TOOPIXELS<span className="text-foreground">.</span></>
          )}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCalculatorOpen(true)}
              className="text-primary hover:bg-primary/5 px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all"
            >
              <Calculator size={16} /> Cost Calculator
            </button>
            <Link
              href="/contact"
              className="bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-primary/90 transition-all"
            >
              Contact Us <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-foreground p-2 -mr-2 relative z-[110]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-[100%] left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-100 p-6 md:hidden shadow-2xl z-[90]"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium py-2 border-b border-muted"
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex flex-col gap-3 mt-4">
                <button
                  onClick={() => { setIsCalculatorOpen(true); setIsOpen(false); }}
                  className="bg-primary/10 text-primary p-4 rounded-xl text-center font-bold flex items-center justify-center gap-2"
                >
                  <Calculator size={18} /> Cost Calculator
                </button>
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="bg-primary text-white p-4 rounded-xl text-center font-bold"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>

    <AnimatePresence>
      {isCalculatorOpen && (
        <CalculatorModal isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />
      )}
    </AnimatePresence>
    </>
  );
}
