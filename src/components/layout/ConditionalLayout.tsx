"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import dynamic from "next/dynamic";

const AIChatbot = dynamic(() => import("../chat/AIChatbot"), { ssr: false });

export default function ConditionalLayout({
  children,
  logoImage
}: {
  children: React.ReactNode;
  logoImage?: string;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar logoImage={logoImage} />}
      <main>{children}</main>
      {!isAdmin && <AIChatbot />}
      {!isAdmin && <Footer logoImage={logoImage} />}
    </>
  );
}
