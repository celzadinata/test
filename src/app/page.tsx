import WidthAds from "@/components/core/WidthAds";
import RandomNewsSection from "@/components/fragments/RandomNews";
import LatestNewsSection from "@/components/fragments/LatestNews";
import FeaturedCategoryNewsSection from "@/components/fragments/FeaturedCategoryNews";
import CategoryNewsSection from "@/components/fragments/CategoryNews";

import Logo from "../../public/assets/cam-logo-dark.svg";
import Image from "next/image";
import { Bokor } from "next/font/google";
import { getData } from "@/services";
import { getInternalBaseUrl } from "@/utils/helper/Internal";

const bokorFont = Bokor({
  subsets: ["latin"],
  weight: "400",
});

export default async function Home() {
  const randomNewsLimit2: any = await getData(
    `${getInternalBaseUrl()}/api/berita/random?limit=2`
  );
  const randomNewsLimit1: any = await getData(
    `${getInternalBaseUrl()}/api/berita/random?limit=1`
  );

  const allNews: any = await getData(`${getInternalBaseUrl()}/api/berita`);

  const allCategories: any = await getData(
    `${getInternalBaseUrl()}/api/kategori`
  );

  async function getNewsByCategory(
    categoryId: string,
    page?: string,
    limit?: string,
    random?: string
  ) {
    const res = await getData(
      `${getInternalBaseUrl()}/api/berita/category?category_id=${categoryId}&page=${
        page || "1"
      }&limit=${limit || "0"}&random=${random || "false"}`
    );

    return res;
  }

  const filteredCategories = await Promise.all(
    allCategories.data.map(async (item: any) => {
      const news = await getNewsByCategory(item.id);
      return {
        category_id: item.id,
        category_name: item.category_name,
        news,
      };
    })
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
      <RandomNewsSection
        randomNewsLimit1={randomNewsLimit1}
        randomNewsLimit2={randomNewsLimit2}
      />
      <LatestNewsSection
        latestNews={allNews}
        newsByCategory={getNewsByCategory}
      />
      <FeaturedCategoryNewsSection newsByCategory={filteredCategories} />
      <CategoryNewsSection newsByCategory={filteredCategories} />
    </div>
  );
}
