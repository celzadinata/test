import { getData } from "@/services";
import { extractPlainTextFromHTML } from "@/utils/helper/ExtractPlainTextFromHTML";
import { timeAgo } from "@/utils/helper/FormatedDate";
import { getInternalBaseUrl } from "@/utils/helper/Internal";
import truncateText from "@/utils/helper/TruncateText";
import { FileType } from "@/utils/helper/TypeHelper";
import { Bokor } from "next/font/google";
import ImgPlaceholder from "../../../public/assets/placeholder-image.jpg";
import Image from "next/image";
import { CustomPagination } from "@/components/layout/CustomPagination";
import Link from "next/link";
import SmallAds from "@/components/core/SmallAds";
import WidthAds from "@/components/core/WidthAds";

const bokorFont = Bokor({
  subsets: ["latin"],
  weight: "400",
});

type Params = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ id?: string; page?: string }>;
};

export default async function CategoryPage({ params, searchParams }: Params) {
  const { slug } = await params;
  const { id, page = "1" } = await searchParams;

  const currentPage = Number.parseInt(page, 10) || 1;

  const getAllNewsByCategory = await getData(
    `${getInternalBaseUrl()}/api/berita/category?category_id=${id}&page=${currentPage}&limit=5`
  );

  const newsData = getAllNewsByCategory.data;
  const getNews = newsData.data;

  const paginationData = {
    current_page: newsData.current_page,
    first_page_url: newsData.first_page_url,
    from: newsData.from,
    last_page: newsData.last_page,
    last_page_url: newsData.last_page_url,
    links: newsData.links,
    next_page_url: newsData.next_page_url,
    path: newsData.path,
    per_page: newsData.per_page,
    prev_page_url: newsData.prev_page_url,
    to: newsData.to,
    total: newsData.total,
  };

  const allNews: any = await getData(`${getInternalBaseUrl()}/api/berita`);
  const getAllNews = allNews.data.data;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4">
        <h1
          className={`text-3xl ${bokorFont.className} tracking-widest md:text-6xl mb-6 uppercase text-center underline my-6 md:my-10`}
        >
          {decodeURIComponent(slug)}
        </h1>

        <WidthAds />

        {getNews.length === 0 && (
          <p className="text-center px-4">
            Tidak ada berita untuk kategori ini.
          </p>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {getNews.map((news: any, index: number) => (
              <div key={index} className="mb-10">
                <div className="flex flex-col md:flex-col lg:flex-row gap-6 group">
                  <div className="flex-1 max-w-md">
                    <Link
                      href={`/berita/${news.id}/${news.slug}`}
                      className="group-hover:text-gray-500 cursor-pointer"
                    >
                      <h2 className="text-2xl md:text-3xl font-bold mb-3">
                        {news.title}
                      </h2>
                    </Link>
                    <p className="text-gray-700 mb-3">
                      {truncateText(extractPlainTextFromHTML(news.body), 150)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {timeAgo(news.created_at)}
                    </p>
                  </div>
                  <Link
                    href={`/berita/${news.id}/${news.slug}`}
                    className="group-hover:text-gray-300 cursor-pointer"
                  >
                    {news.banner.length > 0 ? (
                      news.banner.map((file: FileType, index: number) => (
                        <div key={index} className="flex-1">
                          <div className="w-full h-50 md:w-100 lg:w-90 xl:w-120 xl:h-80 relative overflow-hidden bg-cover bg-no-repeat rounded-lg">
                            <Image
                              src={file.url || ImgPlaceholder}
                              alt={news.slug}
                              className="object-cover w-full h-full rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-110 cursor-pointer"
                              width={500}
                              height={300}
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div key={index} className="flex-1">
                        <div className="w-full h-[200] md:w-[500px] md:h-[300px] rounded-lg">
                          <Image
                            src={ImgPlaceholder}
                            alt={news.slug}
                            className="object-cover w-full h-full rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-110 cursor-pointer"
                            width={500}
                            height={300}
                          />
                        </div>
                      </div>
                    )}
                  </Link>
                </div>
                <div className="border-b border-gray-200 my-6"></div>
              </div>
            ))}
            <CustomPagination paginationData={paginationData} />
          </div>

          <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-sm h-fit">
            <h3 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200">
              Terkini &gt;
            </h3>
            <div className="space-y-4">
              {getAllNews.slice(0, 5).map((item: any, index: number) => (
                <div
                  key={index}
                  className="pb-4 border-b border-gray-100 last:border-0 group"
                >
                  <Link href={`/berita/${item.id}/${item.slug}`}>
                    {item.banner.length > 0
                      ? item.banner &&
                        index === 0 && (
                          <div className="mb-3 relative overflow-hidden bg-cover bg-no-repeat rounded-lg aspect-video w-full">
                            <Image
                              src={item.banner[0].url || ImgPlaceholder}
                              alt={item.slug}
                              fill
                              className="object-cover rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-110 cursor-pointer"
                              sizes="(max-width: 768px) 100vw, 300px"
                            />
                          </div>
                        )
                      : item.banner &&
                        index === 0 && (
                          <div className="mb-3 relative aspect-video w-full">
                            <Image
                              src={ImgPlaceholder}
                              alt={item.slug}
                              fill
                              className="object-cover rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-110 cursor-pointer"
                              sizes="(max-width: 768px) 100vw, 300px"
                            />
                          </div>
                        )}
                  </Link>
                  <div className="flex items-start gap-2">
                    <span className="text-gray-400 font-medium">
                      {index + 1}.
                    </span>
                    <div>
                      <Link href={`/berita/${item.id}/${item.slug}`}>
                        <h4 className="font-medium text-gray-800 group-hover:font-bold">
                          {item.title}
                        </h4>
                      </Link>
                      <p className="text-xs text-gray-500 mt-1">May 19, 2025</p>
                    </div>
                  </div>
                </div>
              ))}
              <SmallAds />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
