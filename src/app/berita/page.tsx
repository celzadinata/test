import { getData } from "@/services/news";
import { MultiplyReturn, SingleReturn } from "@/utils/helper/Type";
import RandomNewsSection from "@/components/fragments/RandomNewsSection";
import LatestNewsSection from "@/components/fragments/LatestNewsSection";
import WidthAds from "@/components/core/WidthAds";

export default async function News() {
  const randomNews: SingleReturn = await getData(
    "http://localhost:3000/api/berita/random"
  );
  const allNews: MultiplyReturn = await getData(
    "http://localhost:3000/api/berita"
  );

  return (
    <div>
      <WidthAds value={8} />
      <RandomNewsSection randomNews={randomNews} allNews={allNews} />
      <LatestNewsSection randomNews={randomNews} />
    </div>
  );
}
