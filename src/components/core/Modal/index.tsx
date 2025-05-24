"use client";

import { Button } from "@/components/ui/button";
import { Undo2, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import path from "path";
import { MouseEventHandler, ReactNode, useRef } from "react";

interface Props {
  children: ReactNode;
}

export default function Modal({ children }: Props) {
  const overlay = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleCloseOverlay: MouseEventHandler = (e) => {
    if (e.target === overlay.current) {
      router.back();
    }
  };

  const handleCloseButton = () => {
    router.back();
  };

  const Icon = pathname === "/daftar" ? Undo2 : X;

  return (
    <div
      ref={overlay}
      className="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex"
      onClick={handleCloseOverlay}
    >
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow">
          <Button
            variant="outline"
            onClick={handleCloseButton}
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close"
          >
            <Icon className="h-4 w-4" />
          </Button>
          {children}
        </div>
      </div>
    </div>
  );
}
