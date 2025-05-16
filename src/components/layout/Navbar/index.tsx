"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../../public/assets/cam-logo.svg";
import LogoDark from "../../../../public/assets/cam-logo-dark.svg";
import { Bokor } from "next/font/google";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { name: "Berita", href: "/berita" },
  { name: "Nasional", href: "/nasional" },
  { name: "Internasional", href: "/internasional" },
  { name: "Mega Politik", href: "/mega-politik" },
  { name: "Lokal", href: "/lokal" },
];

const bokorFont = Bokor({
  subsets: ["latin"],
  weight: "400",
});

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header className="flex flex-col w-full sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-black text-white py-2 px-4 flex items-center justify-between relative">
        <div className="flex items-center gap-4">
          {!isSearchOpen && (
            <Button
              variant="ghost"
              size="icon"
              className="text-white"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
              <span className="ml-2 hidden md:inline">Cari berita</span>
            </Button>
          )}

          {isSearchOpen && (
            <div className="flex items-center">
              <Input
                type="text"
                placeholder="Cari berita"
                className="h-8 bg-gray-800 border-gray-700 text-white w-full md:w-64"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                className="text-white"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {scrolled && (
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2">
            <div className="relative">
              <Image src={Logo} alt="Camera icon" width={40} height={40} />
            </div>
            <h1 className={`text-2xl text-white ${bokorFont.className}`}>
              Warung Jurnalis
            </h1>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Button
            variant="default"
            size="sm"
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Daftar
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-white border-white hover:bg-gray-800"
          >
            Masuk
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white md:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium hover:text-gray-500 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Logo - only visible when not scrolled */}
      {!scrolled && (
        <div className="flex justify-center py-6 bg-white">
          <Link href="/" className="flex items-center gap-2">
            <div className="relative">
              <Image
                src={LogoDark}
                alt="Camera icon"
                width={100}
                height={100}
              />
            </div>
            <h1 className={`text-7xl font-bold ${bokorFont.className}`}>
              Warung Jurnalis
            </h1>
          </Link>
        </div>
      )}

      {/* Navigation */}
      <nav className="border-b border-t bg-white">
        <ul className="flex justify-center space-x-8 py-4 px-4 overflow-x-auto">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="font-medium hover:text-gray-500 transition-colors whitespace-nowrap"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
