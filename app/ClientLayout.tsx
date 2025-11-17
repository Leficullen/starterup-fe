"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // halaman yang tidak pakai navbar
  const noNavbar = ["/scan"];

  const showNavbar = !noNavbar.includes(pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
      <Footer/>
    </>
  );
}
