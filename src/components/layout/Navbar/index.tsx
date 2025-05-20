"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../../public/assets/cam-logo.svg";
import LogoDark from "../../../../public/assets/cam-logo-dark.svg";
import { Search, X, TextSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Bokor } from "next/font/google";
import { useRouter } from "next/navigation";

const bokorFont = Bokor({
  subsets: ["latin"],
  weight: "400",
});

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isMenuSearchOpen, setIsMenuSearchOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const router = useRouter();

  const openLoginModal = () => {
    router.push("/masuk");
  };

  type NavItems = {
    name: string;
    href: string;
  };

  const navItems: NavItems[] = [
    { name: "Berita", href: "/" },
    { name: "Nasional", href: "/nasional" },
    { name: "Internasional", href: "/internasional" },
    { name: "Mega Politik", href: "/mega-politik" },
    { name: "Lokal", href: "/lokal" },
  ];

  useEffect(() => {
    // Check if window is defined (to avoid SSR issues)
    if (typeof window !== "undefined") {
      // Initial check for mobile
      setIsMobile(window.innerWidth < 768);

      // Add listener for resize
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      lastScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Use a higher threshold for scrolling down than scrolling up
          // This creates a "sticky" effect and prevents flickering
          const shouldBeScrolled = lastScrollY > 150;

          if (shouldBeScrolled !== scrolled) {
            setScrolled(shouldBeScrolled);
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <header className="flex flex-col w-full sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-black text-white py-3 md:py-4 px-3 md:px-6 flex items-center justify-between relative">
        {/* Search section - only visible on desktop */}
        <div className="hidden md:flex items-center">
          {!isSearchOpen ? (
            <Button
              variant="ghost"
              size="sm"
              className="text-white p-0 h-8 px-2"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-4 w-4" />
              <span className="ml-2 text-sm">Cari berita</span>
            </Button>
          ) : (
            <div className="flex items-center">
              <Input
                type="text"
                placeholder="Cari berita"
                className="h-8 bg-gray-800 border-gray-700 text-white text-sm w-64"
                autoFocus
              />
              <Button
                variant="ghost"
                size="sm"
                className="text-white h-8 p-0 ml-1"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Empty div for mobile to maintain layout */}
        <div className="md:hidden"></div>

        {/* Center logo - visible when scrolled OR on mobile */}
        <div
          className={`absolute left-1/2 transform -translate-x-1/2 flex items-center gap-1 transition-all duration-300 ease-in-out ${
            scrolled
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          } ${
            isMobile
              ? "opacity-100 w-full translate-y-0"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <div className="relative w-12 h-12 md:w-15 md:h-15">
            <Image
              src={Logo}
              alt="Camera icon"
              width={44}
              height={44}
              className="w-full h-full"
            />
          </div>
          <h1
            className={`text-3xl md:text-4xl text-white ${bokorFont.className}`}
          >
            Warung Jurnalis
          </h1>
        </div>

        {/* Auth buttons - only visible on desktop */}
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="default"
            size="sm"
            onClick={openLoginModal}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm h-8 px-3"
          >
            Daftar
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-white border-1 hover:bg-white hover:text-black text-sm h-8 px-3"
          >
            Masuk
          </Button>
        </div>

        {/* Hamburger menu - only visible on mobile */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-white md:hidden p-0 h-8"
            >
              <TextSearch width={90} height={90} className="h-8 w-8" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[280px] sm:w-[320px] overflow-y-auto"
          >
            <div className="flex justify-center mb-6 mt-4">
              <div className="relative w-10 h-10">
                <Image
                  src={LogoDark}
                  alt="Camera icon"
                  width={52}
                  height={52}
                />
              </div>
              <h2 className={`text-3xl ml-1 ${bokorFont.className}`}>
                Warung Jurnalis
              </h2>
            </div>

            {/* Search in mobile menu */}
            <div className="mb-6 px-1">
              {!isMenuSearchOpen ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setIsMenuSearchOpen(true)}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Cari berita
                </Button>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center">
                    <Input
                      type="text"
                      placeholder="Cari berita"
                      className="h-9 text-sm"
                      autoFocus
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-9 p-0 ml-1"
                      onClick={() => setIsMenuSearchOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="default"
                    size="sm"
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    Cari
                  </Button>
                </div>
              )}
            </div>

            {/* Navigation links */}
            <nav className="flex flex-col gap-1 mb-6">
              {navItems.map((item) => (
                <SheetClose asChild key={item.name}>
                  <Link
                    href={item.href}
                    className="text-lg font-medium hover:text-gray-500 transition-colors py-2 px-1 border-b border-gray-100"
                  >
                    {item.name}
                  </Link>
                </SheetClose>
              ))}
            </nav>

            {/* Auth buttons in mobile menu */}
            <div className="flex flex-col gap-3 mt-4">
              <SheetClose asChild>
                <Button
                  onClick={openLoginModal}
                  className="w-full bg-blue-500 hover:bg-blue-600"
                >
                  Daftar
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button variant="outline" className="w-full">
                  Masuk
                </Button>
              </SheetClose>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Logo - only visible when not scrolled AND on desktop */}
      <div
        className={`flex justify-center py-0 bg-white transition-all duration-300 ease-in-out ${
          scrolled || isMobile
            ? "max-h-0 opacity-0 overflow-hidden"
            : "max-h-36 py-4 md:py-6 opacity-100"
        }`}
      >
        <Link
          href="/"
          className="flex flex-col md:flex-row items-center gap-1 md:gap-2"
        >
          <div className="relative w-24 h-24 md:w-32 md:h-32">
            <Image
              src={LogoDark}
              alt="Camera icon"
              width={128}
              height={128}
              className="w-full h-full"
            />
          </div>
          <h1
            className={`text-4xl md:text-6xl lg:text-7xl ${bokorFont.className}`}
          >
            Warung Jurnalis
          </h1>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="container mx-auto border-b-2 border-black bg-white">
        <ul className="flex justify-center space-x-2 md:space-x-8 py-3 md:py-4 px-3 md:px-4 overflow-x-auto">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="text-sm md:text-base font-medium hover:text-gray-500 transition-colors whitespace-nowrap px-1"
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
