"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface WithAuthProps {
  children: React.ReactNode;
  redirectTo?: string;
  requireAuth?: boolean;
}

export function WithAuth({
  children,
  redirectTo = "/masuk",
  requireAuth = true,
}: WithAuthProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();
        const authenticated = data.status === 200 && data.data?.isAuthenticated;

        setIsAuthenticated(authenticated);

        // Jika memerlukan auth tapi user tidak login
        if (requireAuth && !authenticated) {
          router.push(redirectTo);
          return;
        }

        // Jika tidak memerlukan auth tapi user sudah login (untuk halaman login/daftar)
        if (!requireAuth && authenticated) {
          router.push("/");
          return;
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        if (requireAuth) {
          router.push(redirectTo);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, redirectTo, requireAuth]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  // Jika memerlukan auth tapi tidak authenticated, jangan render
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  // Jika tidak memerlukan auth tapi authenticated (halaman login/daftar), jangan render
  if (!requireAuth && isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
