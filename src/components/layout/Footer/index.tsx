import Image from "next/image";
import Logo from "../../../../public/assets/cam-logo.svg";
import { Bokor } from "next/font/google";
import Link from "next/link";
import { getData } from "@/services";
import { getInternalBaseUrl } from "@/utils/helper/Internal";

const bokorFont = Bokor({
  subsets: ["latin"],
  weight: "400",
});

export default async function Footer() {
  const getAllCategory: any = await getData(
    `${getInternalBaseUrl()}/api/kategori`
  );
  const categories = getAllCategory.data;

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
            Platform jurnalisme terpercaya yang menyajikan berita terkini dengan
            perspektif mendalam dan analisis yang komprehensif untuk masyarakat
            Indonesia.
          </p>

          {/* Categories as Tags */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((item: any, index: number) => (
              <Link
                key={index}
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
                href="/"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M24,4.6c-0.9,0.4-1.8,0.7-2.8,0.8c1-0.6,1.8-1.6,2.2-2.7c-1,0.6-2,1-3.1,1.2c-0.9-1-2.2-1.6-3.6-1.6 c-2.7,0-4.9,2.2-4.9,4.9c0,0.4,0,0.8,0.1,1.1C7.7,8.1,4.1,6.1,1.7,3.1C1.2,3.9,1,4.7,1,5.6c0,1.7,0.9,3.2,2.2,4.1 C2.4,9.7,1.6,9.5,1,9.1c0,0,0,0,0,0.1c0,2.4,1.7,4.4,3.9,4.8c-0.4,0.1-0.8,0.2-1.3,0.2c-0.3,0-0.6,0-0.9-0.1c0.6,2,2.4,3.4,4.6,3.4 c-1.7,1.3-3.8,2.1-6.1,2.1c-0.4,0-0.8,0-1.2-0.1c2.2,1.4,4.8,2.2,7.5,2.2c9.1,0,14-7.5,14-14c0-0.2,0-0.4,0-0.6 C22.5,6.4,23.3,5.5,24,4.6z" />
                </svg>
              </Link>
              <Link
                href="/"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200"
              >
                <svg
                  viewBox="0 0 30 30"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <circle cx="15" cy="15" r="4" />
                  <path d="M19.999,3h-10C6.14,3,3,6.141,3,10.001v10C3,23.86,6.141,27,10.001,27h10C23.86,27,27,23.859,27,19.999v-10   C27,6.14,23.859,3,19.999,3z M15,21c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S18.309,21,15,21z M22,9c-0.552,0-1-0.448-1-1   c0-0.552,0.448-1,1-1s1,0.448,1,1C23,8.552,22.552,9,22,9z" />
                </svg>
              </Link>
              <Link
                href="/"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-200"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
                </svg>
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
