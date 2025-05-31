"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import SmallAds from "@/components/core/SmallAds";
import { Bokor } from "next/font/google";

const bokorFont = Bokor({
  subsets: ["latin"],
  weight: "400",
});

type Params = {
  searchParams: Promise<{ title?: string }>;
};

export default function NewsPage({ searchParams }: Params) {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 md:px-0">
      <h1
        className={`text-3xl ${bokorFont.className} tracking-widest md:text-6xl mb-6 uppercase text-center underline my-6 md:my-10`}
      >
        Hasil Pencarian
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Konten Berita - 2/3 lebar pada desktop */}
        <div className="lg:col-span-2">
          {/* Card Berita */}
          <Card className="mb-6 overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img
                  src="/placeholder.svg?height=200&width=300"
                  alt="Gambar Berita"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="md:w-2/3">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Judul Berita Utama</CardTitle>
                      <CardDescription className="mt-2">
                        <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded-md text-xs">
                          Kategori
                        </span>
                      </CardDescription>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      21 Mei 2025
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>
                    Ini adalah deskripsi singkat tentang berita. Deskripsi ini
                    memberikan gambaran umum tentang isi berita tanpa
                    mengungkapkan seluruh detailnya. Pembaca dapat mengklik
                    tombol &quot;Baca Selengkapnya&quot; untuk melihat berita
                    lengkap.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="text-sm text-muted-foreground">
                    Oleh: Nama Penulis
                  </div>
                  <Button variant="outline" size="sm">
                    Baca Selengkapnya
                  </Button>
                </CardFooter>
              </div>
            </div>
          </Card>

          {/* Pagination */}
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) handlePageChange(currentPage - 1);
                  }}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              {[1, 2, 3, 4, 5].map((pageNumber) => (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    isActive={pageNumber === currentPage}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(pageNumber);
                    }}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < 5) handlePageChange(currentPage + 1);
                  }}
                  className={
                    currentPage === 5 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        {/* Area Advertisement - 1/3 lebar pada desktop */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 space-y-6">
            <SmallAds />
          </div>
        </div>
      </div>
    </div>
  );
}
