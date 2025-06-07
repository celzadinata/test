"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface ConditionalLayoutProps {
  children: ReactNode;
}

export default function ConditionalLayout({
  children,
}: ConditionalLayoutProps) {
  const pathname = usePathname();

  // Halaman yang tidak memerlukan navbar dan footer
  const authPages = ["/masuk", "/daftar"];
  const isAuthPage = authPages.includes(pathname);

  if (isAuthPage) {
    // Untuk halaman auth, hanya render children tanpa navbar dan footer
    return <>{children}</>;
  }

  // Untuk halaman lain, render dengan navbar dan footer
  return <>{children}</>;
}
