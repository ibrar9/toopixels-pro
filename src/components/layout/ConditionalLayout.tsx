"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import Footer from "./Footer";

const Navbar = dynamic(() => import("./Navbar"), { ssr: false });

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}
      <main>{children}</main>
      {!isAdmin && <Footer />}
    </>
  );
}
