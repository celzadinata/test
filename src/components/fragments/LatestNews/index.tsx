import SmallAds from "@/components/core/SmallAds";
import WidthAds from "@/components/core/WidthAds";
import imagePlaceholder from "../../../../public/assets/placeholder-image.jpg";
import { extractPlainTextFromHTML } from "@/utils/helper/ExtractPlainTextFromHTML";
import { formatedDate, timeAgo } from "@/utils/helper/FormatedDate";
import truncateText from "@/utils/helper/TruncateText";
import type { FileType } from "@/utils/helper/TypeHelper";
import Image from "next/image";
import Link from "next/link";

interface Props {
  latestNews: any;
  newsByCategory: (
    category_id: string,
    page?: string,
    limit?: string,
    random?: string
  ) => Promise<any>;
}

export default async function LatestNewsSection({
  latestNews,
  newsByCategory,
}: Props) {
  const latestNewsList = (latestNews.data as any).data;

  const filteredNews = await Promise.all(
    latestNewsList.slice(1, 2).map(async (item: any) => {
      const news = await newsByCategory(item.category_id.id, "1", "0", "true");
      return {
        category_id: item.category_id.id,
        category_name: item.category_id.category_name,
        news: news.data,
      };
    })
  );

  return (
    <div className="bg-white text-black min-h-screen">
      <div className="container mx-auto px-4 lg:px-0 py-6">
        {/* Main grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main content area - 9 columns on large screens */}
          <div className="lg:col-span-9 border-t border-b border-black">
            {/* Top headline article */}
            <div className="py-6 border-b border-black">
              {latestNewsList &&
                latestNewsList.slice(0, 1).map((item: any, index: number) => (
                  <div key={index} className="group">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Article Content */}
                      <div className="order-2 md:order-1 space-y-4">
                        <Link href={`/berita/${item.id}/${item.slug}`}>
                          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold cursor-pointer group-hover:text-gray-500 transition-colors duration-200 leading-tight">
                            {item.title}
                          </h1>
                        </Link>
                        <div className="text-sm text-black/80">
                          {timeAgo(item.created_at)}
                        </div>
                        <div className="space-y-3">
                          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                            {truncateText(
                              extractPlainTextFromHTML(item.body),
                              200
                            )}
                          </p>
                          <div className="text-sm text-muted-foreground">
                            Oleh: {item.created_by.username}
                          </div>
                          <Link href={`/berita/${item.id}/${item.slug}`}>
                            <div className="text-sm sm:text-base font-bold cursor-pointer hover:text-gray-500 transition-colors duration-200">
                              Baca selengkapnya &gt;
                            </div>
                          </Link>
                        </div>
                      </div>

                      {/* Article Image */}
                      <div className="order-1 md:order-2">
                        <Link href={`/berita/${item.id}/${item.slug}`}>
                          <div className="relative w-full h-56 sm:h-64 md:h-72 lg:h-80 rounded-lg overflow-hidden cursor-pointer">
                            {item.banner.length > 0 ? (
                              item.banner.map(
                                (file: FileType, fileIndex: number) => (
                                  <Image
                                    key={fileIndex}
                                    src={file.url || "/placeholder.svg"}
                                    alt={item.slug || "News image"}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover rounded-lg transition duration-300 ease-in-out group-hover:scale-110"
                                  />
                                )
                              )
                            ) : (
                              <Image
                                src={imagePlaceholder || "/placeholder.svg"}
                                alt={item.slug || "News image"}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover rounded-lg transition duration-300 ease-in-out group-hover:scale-110"
                              />
                            )}
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Second article */}
            <div className="py-6">
              {latestNewsList &&
                latestNewsList.slice(1, 2).map((item: any, index: number) => (
                  <div key={index} className="group">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Article Content */}
                      <div className="order-2 md:order-1 space-y-4">
                        <Link href={`/berita/${item.id}/${item.slug}`}>
                          <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold cursor-pointer group-hover:text-gray-500 transition-colors duration-200 leading-tight">
                            {item.title}
                          </h2>
                        </Link>
                        <div className="text-sm text-black/80">
                          {timeAgo(item.created_at)}
                        </div>
                        <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                          {truncateText(
                            extractPlainTextFromHTML(item.body),
                            200
                          )}
                        </p>
                        <div className="text-sm text-muted-foreground">
                          Oleh: {item.created_by.username}
                        </div>

                        {/* Related News */}
                        <div className="pt-4 mt-2 border-t border-gray-200">
                          {filteredNews
                            .slice(0, 1)
                            .map((item: any, relatedIndex: number) => (
                              <div key={relatedIndex}>
                                {item.news.data
                                  .slice(1, 2)
                                  .map((data: any, newsIndex: number) => (
                                    <Link
                                      key={newsIndex}
                                      href={`/${item.category_name}?id=${item.category_id}`}
                                    >
                                      <div className="text-red-600 text-sm sm:text-base font-bold cursor-pointer hover:text-red-400 transition-colors duration-200 mb-2">
                                        Berita terkait &gt;
                                      </div>
                                      <p className="text-sm hover:text-gray-600 transition-colors duration-200">
                                        {data.title || "Tidak ada berita"}
                                      </p>
                                    </Link>
                                  ))}
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Article Image */}
                      <div className="order-1 md:order-2">
                        <Link href={`/berita/${item.id}/${item.slug}`}>
                          <div className="relative w-full h-56 sm:h-64 md:h-72 lg:h-80 rounded-lg overflow-hidden cursor-pointer">
                            {item.banner.length > 0 ? (
                              item.banner.map(
                                (file: FileType, fileIndex: number) => (
                                  <Image
                                    key={fileIndex}
                                    src={file.url || "/placeholder.svg"}
                                    alt={item.slug || "News image"}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover rounded-lg transition duration-300 ease-in-out group-hover:scale-110"
                                  />
                                )
                              )
                            ) : (
                              <Image
                                src={imagePlaceholder || "/placeholder.svg"}
                                alt={item.slug || "News image"}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover rounded-lg transition duration-300 ease-in-out group-hover:scale-110"
                              />
                            )}
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Sidebar - 3 columns */}
          <div className="lg:col-span-3 border-t border-b border-black">
            <div className="py-4 mb-4 border-b border-gray-300">
              <h3 className="text-lg sm:text-xl font-black pb-2">
                Berita Terkini
              </h3>
              <hr className="mb-4" />

              <div className="space-y-4">
                {latestNewsList &&
                  latestNewsList.slice(2, 5).map((item: any, index: number) => (
                    <div
                      key={index}
                      className="pb-4 border-b border-gray-200 last:border-b-0 last:pb-0 hover:bg-gray-50 transition-colors duration-200 rounded-md p-2"
                    >
                      <Link href={`/berita/${item.id}/${item.slug}`}>
                        <div className="text-sm mb-1 font-semibold hover:text-gray-600 transition-colors duration-200 leading-tight">
                          {item.title}
                        </div>
                        <p className="text-xs mb-1 text-black/70">
                          {formatedDate(item.created_at)} |{" "}
                          {item.created_by.username}
                        </p>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {truncateText(
                            extractPlainTextFromHTML(item.body),
                            50
                          )}
                        </p>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>

            <SmallAds />
          </div>
        </div>

        {/* Bottom advertisement */}
        <div className="mt-8">
          <WidthAds />
        </div>
      </div>
    </div>
  );
}
