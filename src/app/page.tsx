import { MultiplyReturn, SingleReturn } from "@/utils/helper/Type";
import { getData } from "@/services/news";
import WidthAds from "@/components/core/WidthAds";
import RandomNewsSection from "@/components/fragments/RandomNews";
import LatestNewsSection from "@/components/fragments/LatestNews";
import FeaturedCategoryNewsSection from "@/components/fragments/FeaturedCategoryNews";
import CategoryNewsSection from "@/components/fragments/CategoryNews";

export default async function Home() {
  const randomNews: SingleReturn = await getData(
    "http://localhost:3000/api/berita/random"
  );
  const allNews: MultiplyReturn = await getData(
    "http://localhost:3000/api/berita"
  );

  return (
    <div>
      <WidthAds value={48} />
      <RandomNewsSection randomNews={randomNews} allNews={allNews} />
      <LatestNewsSection randomNews={randomNews} />
      <FeaturedCategoryNewsSection randomNews={randomNews} />
      <CategoryNewsSection allNews={allNews} />
    </div>
  );
}
