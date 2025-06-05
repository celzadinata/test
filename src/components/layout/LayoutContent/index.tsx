"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import FooterWrapper from "@/components/layout/FooterWrapper";

interface LayoutContentProps {
  children: ReactNode;
}

export default function LayoutContent({ children }: LayoutContentProps) {
  const pathname = usePathname();

  // Halaman yang tidak memerlukan navbar dan footer
  const authPages = ["/masuk", "/daftar", "/login"];
  const isAuthPage = authPages.includes(pathname);

  if (isAuthPage) {
    // Untuk halaman auth, render tanpa navbar dan footer
    return <>{children}</>;
  }

  // Untuk halaman lain, render dengan navbar dan footer
  return (
    <>
      <NavbarWrapper />
      <div className="container mx-auto">{children}</div>
      <FooterWrapper />
    </>
  );
}
