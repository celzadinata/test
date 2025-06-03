"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../../public/assets/cam-logo.svg";
import LogoDark from "../../../../public/assets/cam-logo-dark.svg";
import { Search, X, TextSearch, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Bokor } from "next/font/google";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useMediaQuery } from "@/utils/hooks/use-media-query";
import { getData } from "@/services";
import type { CategoryType } from "@/utils/helper/TypeHelper";
import { DialogTitle } from "@radix-ui/react-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const bokorFont = Bokor({
  subsets: ["latin"],
  weight: "400",
});

type NavItems = {
  name: string;
  href: string;
};

export default function Navbar() {
  const [navItems, setNavItems] = useState<NavItems[]>([
    { name: "Berita", href: "/" },
  ]);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isMenuSearchOpen, setIsMenuSearchOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false); // State untuk modal logout
  const isMobile = useMediaQuery("(max-width: 767px)");
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);
  const [mobileSearchQuery, setMobileSearchQuery] = useState<string>("");

  // Cache untuk menyimpan hasil pencarian
  const searchCache = useRef<Map<string, any>>(new Map());

  // Debounce function untuk menunda pemanggilan API
  const debounce = useCallback(
    (func: (...args: any[]) => void, delay: number) => {
      let timeout: NodeJS.Timeout;
      return (...args: any[]) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
      };
    },
    []
  );

  // Fungsi untuk mengambil data pencarian
  const fetchNewsByTitle = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults(null);
      return;
    }

    // Cek cache terlebih dahulu
    if (searchCache.current.has(query)) {
      setSearchResults(searchCache.current.get(query));
      return;
    }

    setIsLoading(true);
    setSearchError(null);

    try {
      const news = await getData(
        `/api/berita?title=${encodeURIComponent(query)}&limit=5`
      );
      setSearchResults(news);
      // Simpan ke cache
      searchCache.current.set(query, news);
    } catch (error) {
      console.error("Gagal mengambil data pencarian: ", error);
      setSearchError("Gagal memuat hasil pencarian. Coba lagi nanti.");
      setSearchResults(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounced version dari fetchNewsByTitle
  const debouncedFetchNews = useCallback(
    debounce((query: string) => fetchNewsByTitle(query), 300),
    [fetchNewsByTitle]
  );

  useEffect(() => {
    if (searchQuery || mobileSearchQuery) {
      debouncedFetchNews(searchQuery || mobileSearchQuery);
    } else {
      setSearchResults(null);
    }
  }, [searchQuery, mobileSearchQuery, debouncedFetchNews]);

  const openLoginModal = () => {
    router.push("/masuk");
  };

  const handleLogout = async () => {
    try {
      // Panggil API logout untuk menghapus cookie atau token di server
      const res = await fetch("/api/auth/keluar", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        setIsAuthenticated(false);
        setIsLogoutModalOpen(false); // Tutup modal setelah logout
        router.push("/"); // Arahkan ke halaman utama setelah logout
      } else {
        console.error("Gagal logout:", await res.json());
      }
    } catch (err) {
      console.error("Error saat logout:", err);
    }
  };

  const checkAuth = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/check", {
        method: "GET",
        credentials: "include", // Mengirim cookies
      });
      const response = await res.json();
      console.log("Respons penuh: ", response);
      if (response.status === 200 && response.data) {
        setIsAuthenticated(response.data.isAuthenticated);
        console.log("Data pengguna: ", response.data);
      } else {
        setIsAuthenticated(false);
        console.log("Autentikasi gagal: ", response.message);
      }
    } catch (err) {
      console.error("Gagal memeriksa autentikasi:", err);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data } = await getData("/api/kategori");
        const dynamicNavItems: NavItems[] = data.map((item: CategoryType) => ({
          name: item.category_name,
          href: `/${item.category_name}?id=${item.id}`,
        }));
        setNavItems((prev) => [...prev, ...dynamicNavItems]);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCategories();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/berita?search=${encodeURIComponent(searchQuery.trim())}`);
      inputRef.current?.blur();
      setIsSearchOpen(false);
    }
  };

  const handleMobileSearch = () => {
    if (mobileSearchQuery.trim()) {
      router.push(
        `/berita?search=${encodeURIComponent(mobileSearchQuery.trim())}`
      );
      setIsMenuSearchOpen(false);
      setMobileSearchQuery("");
    }
  };

  useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      setSearchQuery(search);
    }
  }, [searchParams]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    let timer: NodeJS.Timeout;

    const handleScroll = () => {
      lastScrollY = window.scrollY;

      clearTimeout(timer);
      timer = setTimeout(() => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            setScrolled(lastScrollY > 300);
            ticking = false;
          });
          ticking = true;
        }
      }, 150);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <header className="flex flex-col w-full sticky top-0 z-50 will-change-transform">
      {/* Top bar */}
      <div className="bg-black text-white py-3 md:py-4 px-3 md:px-6 flex items-center justify-between relative">
        {/* Search section - only visible on desktop */}
        <div className="hidden md:flex items-center relative">
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
            <div className="flex flex-col">
              <div className="flex items-center">
                <Input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Cari berita"
                  className="h-8 bg-gray-800 border-gray-700 text-white text-sm w-64"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white h-8 p-0 ml-1"
                  onClick={() => {
                    setSearchQuery("");
                    setIsSearchOpen(false);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              {/* Tampilkan hasil pencarian di dropdown */}
              {isSearchOpen && (searchQuery || mobileSearchQuery) && (
                <div className="absolute top-10 left-0 w-full bg-white shadow-lg rounded-md p-2 max-h-60 overflow-y-auto z-50">
                  {isLoading && (
                    <p className="text-sm text-gray-500">Memuat...</p>
                  )}
                  {searchError && (
                    <p className="text-sm text-red-500">{searchError}</p>
                  )}
                  {searchResults?.data?.data?.length > 0
                    ? searchResults.data.data.map((item: any) => (
                        <Link
                          key={item.id}
                          href={`/berita/${item.id}/${item.slug}`}
                          className="block p-2 hover:bg-gray-100 rounded-md"
                          onClick={() => setIsSearchOpen(false)}
                        >
                          <p className="text-sm font-medium text-black">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.category_id?.category_name}
                          </p>
                        </Link>
                      ))
                    : !isLoading && (
                        <p className="text-sm text-gray-500">
                          Tidak ada hasil.
                        </p>
                      )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Center logo */}
        <div
          className={`ml-2 flex items-center gap-1 transition-all duration-500 ease-in-out md:absolute md:left-1/2 md:transform md:-translate-x-1/2 ${
            pathname !== "/" || isMobile || scrolled
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
        >
          <div className="relative w-10 h-10 md:w-12 md:h-12">
            <Image
              src={Logo || "/placeholder.svg"}
              alt="Camera icon"
              width={44}
              height={44}
              className="w-full h-full"
              priority
            />
          </div>
          <Link href="/">
            <h1
              className={`text-2xl md:text-3xl text-white ${bokorFont.className}`}
            >
              Warung Jurnalis
            </h1>
          </Link>
        </div>

        {/* Auth buttons - only visible on desktop */}
        <div className="hidden md:flex items-center gap-2">
          {isLoading ? (
            <p className="text-white text-sm">Memuat...</p>
          ) : isAuthenticated ? (
            <AlertDialog
              open={isLogoutModalOpen}
              onOpenChange={setIsLogoutModalOpen}
            >
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white border-1 hover:bg-white cursor-pointer hover:text-red-500 text-sm h-8 px-3"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Keluar
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Konfirmasi Keluar</AlertDialogTitle>
                  <AlertDialogDescription>
                    Apakah Anda yakin ingin keluar dari akun ini? Anda perlu
                    login kembali untuk mengakses aplikasi.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Batal</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                  >
                    Ya, Keluar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          ) : (
            <Button
              onClick={openLoginModal}
              variant="ghost"
              size="sm"
              className="text-white border-1 hover:bg-white cursor-pointer hover:text-black text-sm h-8 px-3"
            >
              <LogIn className="h-4 w-4 mr-2" />
              Masuk
            </Button>
          )}
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
            className="w-[280px] sm:w-[320px] px-5 overflow-y-auto"
          >
            <DialogTitle className="sr-only">Cari Berita</DialogTitle>
            <div className="flex justify-center mb-6 mt-4">
              <div className="relative w-10 h-10">
                <Image
                  src={LogoDark || "/placeholder.svg"}
                  alt="Camera icon"
                  width={52}
                  height={52}
                  priority
                />
              </div>
              <Link href="/">
                <h2 className={`text-3xl ml-1 ${bokorFont.className}`}>
                  Warung Jurnalis
                </h2>
              </Link>
            </div>
            {/* Search in mobile menu */}
            <div className="mb-6 px-1 relative">
              {!isMenuSearchOpen ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsMenuSearchOpen(true);
                  }}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Cari berita
                </Button>
              ) : (
                <div
                  className="flex flex-col gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center">
                    <Input
                      type="text"
                      value={mobileSearchQuery}
                      onChange={(e) => setMobileSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleMobileSearch();
                        }
                      }}
                      placeholder="Cari berita"
                      className="h-9 text-sm"
                      autoFocus
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-9 p-0 ml-1"
                      onClick={() => {
                        setIsMenuSearchOpen(false);
                        setMobileSearchQuery("");
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <SheetClose asChild>
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-blue-500 hover:bg-blue-600"
                      onClick={handleMobileSearch}
                      disabled={isLoading}
                    >
                      {isLoading ? "Memuat..." : "Cari"}
                    </Button>
                  </SheetClose>
                  {/* Tampilkan hasil pencarian di mobile */}
                  {isMenuSearchOpen && mobileSearchQuery && (
                    <div className="mt-2 bg-white shadow-lg rounded-md p-2 max-h-60 overflow-y-auto">
                      {isLoading && (
                        <p className="text-sm text-gray-500">Memuat...</p>
                      )}
                      {searchError && (
                        <p className="text-sm text-red-500">{searchError}</p>
                      )}
                      {searchResults?.data?.data?.length > 0
                        ? searchResults.data.data.map((item: any) => (
                            <Link
                              key={item.id}
                              href={`/berita/${item.id}/${item.slug}`}
                              className="block p-2 hover:bg-gray-100 rounded-md"
                              onClick={() => setIsMenuSearchOpen(false)}
                            >
                              <p className="text-sm font-medium text-black">
                                {item.title}
                              </p>
                              <p className="text-xs text-gray-500">
                                {item.category_id?.category_name}
                              </p>
                            </Link>
                          ))
                        : !isLoading && (
                            <p className="text-sm text-gray-500">
                              Tidak ada hasil.
                            </p>
                          )}
                    </div>
                  )}
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
              {isLoading ? (
                <p className="text-sm text-gray-500">Memuat...</p>
              ) : isAuthenticated ? (
                <AlertDialog
                  open={isLogoutModalOpen}
                  onOpenChange={setIsLogoutModalOpen}
                >
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full">
                      <LogOut className="h-4 w-4 mr-1" />
                      Keluar
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Konfirmasi Keluar</AlertDialogTitle>
                      <AlertDialogDescription>
                        Apakah Anda yakin ingin keluar dari akun ini? Anda perlu
                        login kembali untuk mengakses aplikasi.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                      >
                        Ya, Keluar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              ) : (
                <SheetClose asChild>
                  <Button
                    onClick={openLoginModal}
                    variant="outline"
                    className="w-full bg-blue-500 text-white hover:bg-blue-300"
                  >
                    <LogIn className="h-4 w-4 mr-2" />
                    Masuk
                  </Button>
                </SheetClose>
              )}
            </div>
          </SheetContent>
        </Sheet>
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
