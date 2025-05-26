import WidthAds from "@/components/core/WidthAds";
import RandomNewsSection from "@/components/fragments/RandomNews";
import LatestNewsSection from "@/components/fragments/LatestNews";
import FeaturedCategoryNewsSection from "@/components/fragments/FeaturedCategoryNews";
import CategoryNewsSection from "@/components/fragments/CategoryNews";

import Logo from "../../public/assets/cam-logo-dark.svg";
import Image from "next/image";
import { Bokor } from "next/font/google";
import { getData } from "@/services";

const bokorFont = Bokor({
  subsets: ["latin"],
  weight: "400",
});

const baseURL = process.env.NEXT_PUBLIC_NEXT_SERVER_URL;

export default async function Home() {
  const randomNewsLimit2: any = await getData(
    `${baseURL}/api/berita/random?limit=2`
  );
  const randomNewsLimit1: any = await getData(
    `${baseURL}/api/berita/random?limit=1`
  );

  // const allNews: any = await getData("http://localhost:3000/api/berita");

  // console.log("INI GET ALL NEWSS", allNews);

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
      <RandomNewsSection
        randomNewsLimit1={randomNewsLimit1}
        randomNewsLimit2={randomNewsLimit2}
      />
      {/* <LatestNewsSection randomNews={randomNews} /> */}
      {/* <FeaturedCategoryNewsSection randomNews={randomNews} /> */}
      {/* <CategoryNewsSection allNews={allNews} /> */}
    </div>
  );
}
