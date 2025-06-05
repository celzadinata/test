"use client";

import Image from "next/image";
import Logo from "../../../../public/assets/cam-logo.svg";
import { Bokor } from "next/font/google";
import Link from "next/link";
import type { CategoryType } from "@/utils/helper/TypeHelper";
import { useState, useEffect } from "react";
import { Facebook, Instagram, Mail, Youtube } from "lucide-react";

const bokorFont = Bokor({
  subsets: ["latin"],
  weight: "400",
});

export default function Footer() {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  // Fetch categories on client side
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/kategori", { cache: "no-store" });
        if (response.ok) {
          const data = await response.json();
          const uniqueCategories =
            data.data?.filter(
              (category: CategoryType, index: number, self: CategoryType[]) =>
                index ===
                self.findIndex((c: CategoryType) => c.id === category.id)
            ) || [];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="relative mt-16 bg-black">
      <svg
        className="absolute top-0 w-full h-6 -mt-5 sm:-mt-10 sm:h-16 text-black"
        preserveAspectRatio="none"
        viewBox="0 0 1440 54"
      >
        <path
          fill="currentColor"
          d="M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"
        />
      </svg>

      <div className="px-4 pt-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        {/* Main Content */}
        <div className="text-center mb-12">
          <Link
            href="/"
            title="Warung Jurnalis"
            className="inline-flex items-center justify-center mb-8"
          >
            <Image
              src={Logo || "/placeholder.svg"}
              alt="Camera icon"
              width={64}
              height={64}
            />
            <span
              className={`ml-3 text-4xl tracking-wider text-white uppercase ${bokorFont.className}`}
            >
              Warung Jurnalis
            </span>
          </Link>

          <p className="text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Platform jurnalisme terpercaya dan menangkal berita hoaks.
          </p>

          {/* Categories as Tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((item: CategoryType, index: number) => (
              <Link
                key={`footer-category-${item.id}-${index}`}
                href={`/${item.category_name}?id=${item.id}`}
                className="px-4 py-2 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-gray-700 hover:text-white transition-all duration-200 border border-gray-700 hover:border-gray-600"
              >
                {item.category_name}
              </Link>
            ))}
          </div>

          {/* Social Media */}
          <div className="flex justify-center items-center space-x-6 mb-8">
            <span className="text-gray-400 text-sm">Ikuti Kami:</span>
            <div className="flex space-x-4">
              <Link
                href="mailto:redaksiwj@gmail.com?subject=Hello%20Warung%20Jurnalis!"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200"
              >
                <Mail />
              </Link>
              <Link
                href="https://www.instagram.com/warungjurnalis/"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200"
              >
                <Instagram />
              </Link>
              <Link
                href="https://www.facebook.com/warungjurnalis"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200"
              >
                <Facebook />
              </Link>
              <Link
                href="https://www.youtube.com/@warung_jurnalis"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200"
              >
                <Youtube />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center pt-8 pb-10 border-t border-gray-800">
          <p className="text-sm text-gray-400">
            © Copyright 2025 Warung Jurnalis. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
