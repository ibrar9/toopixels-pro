import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Control | TopPixels",
  description: "Secure administrative dashboard for TopPixels.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-root">
      {children}
    </div>
  );
}
