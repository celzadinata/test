import { MultiplyReturn, SingleReturn } from "@/utils/helper/Type";
import { getData } from "@/services/news";
import WidthAds from "@/components/core/WidthAds";
import RandomNewsSection from "@/components/fragments/RandomNews";
import LatestNewsSection from "@/components/fragments/LatestNews";
import FeaturedCategoryNewsSection from "@/components/fragments/FeaturedCategoryNews";
import CategoryNewsSection from "@/components/fragments/CategoryNews";

import Logo from "../../public/assets/cam-logo-dark.svg";
import Image from "next/image";
import { Bokor } from "next/font/google";

const bokorFont = Bokor({
  subsets: ["latin"],
  weight: "400",
});

export default async function Home() {
  const randomNews: SingleReturn = await getData(
    "http://localhost:3000/api/berita/random"
  );
  const allNews: MultiplyReturn = await getData(
    "http://localhost:3000/api/berita"
  );

  return (
    <div>
      <div className="hidden md:flex md:justify-center md:items-center gap-1">
        <div className="relative w-24 h-24 md:w-32 md:h-32">
          <Image
            src={Logo}
            alt="Camera icon"
            width={44}
            height={44}
            className="w-full h-full"
            priority
          />
        </div>
        <h1
          className={`text-4xl md:text-6xl lg:text-7xl ${bokorFont.className}`}
        >
          Warung Jurnalis
        </h1>
      </div>
      <WidthAds />
      <RandomNewsSection randomNews={randomNews} allNews={allNews} />
      <LatestNewsSection randomNews={randomNews} />
      <FeaturedCategoryNewsSection randomNews={randomNews} />
      <CategoryNewsSection allNews={allNews} />
    </div>
  );
}
