import truncateText from "@/utils/helper/TruncateText";
import type { FileType } from "@/utils/helper/TypeHelper";
import Image from "next/image";
import Link from "next/link";
import { extractPlainTextFromHTML } from "@/utils/helper/ExtractPlainTextFromHTML";
import { formatedDate } from "@/utils/helper/FormatedDate";
import { getData } from "@/services";
import { getInternalBaseUrl } from "@/utils/helper/Internal";
import { OctagonAlert } from "lucide-react";
import ImgPlaceholder from "../../../../public/assets/placeholder-image.jpg";

interface Props {
  allCategories: any;
}

export default async function FeaturedCategoryNewsSection({
  allCategories,
}: Props) {
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

  const newsByCategory = await Promise.all(
    allCategories.data.slice(0, 1).map(async (item: any) => {
      const news = await getNewsByCategory(item.id);
      return {
        category_id: item.id,
        category_name: item.category_name,
        news,
      };
    })
  );

  return (
    <>
      {newsByCategory && (
        <div className="mb-10 container mx-auto px-4 lg:px-0">
          {/* Top border line */}
          <div className="border-t border-black mb-2"></div>
          {newsByCategory.map((item: any, index: number) => (
            <div
              key={index}
              className="text-base sm:text-lg tracking-wider font-bold mb-4"
            >
              <Link
                href={`/${item.category_name}?id=${item.category_id}`}
                className="text-red-600 hover:underline"
              >
                {item.category_name} &gt;
              </Link>
            </div>
          ))}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Featured Article */}
            {newsByCategory.slice(0, 1).map((item: any, index: number) =>
              item.news.data.data.length > 0 ? (
                item.news.data.data
                  .slice(0, 1)
                  .map((data: any, dataIndex: number) => (
                    <div key={dataIndex} className="lg:col-span-8 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 group">
                        {/* Article Content */}
                        <div className="order-2 md:order-1 space-y-3">
                          <Link href={`/berita/${data.id}/${data.slug}`}>
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight cursor-pointer group-hover:text-gray-500 transition-colors duration-200">
                              {data.title}
                            </h2>
                          </Link>
                          <div className="text-sm text-black/80">
                            {formatedDate(data.created_at)}
                          </div>
                          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                            {truncateText(
                              extractPlainTextFromHTML(data.body),
                              250
                            )}
                          </p>
                          <div className="text-sm text-muted-foreground">
                            Oleh: {data.created_by.username}
                          </div>
                        </div>

                        {/* Article Image */}
                        <div className="order-1 md:order-2">
                          <Link href={`/berita/${data.id}/${data.slug}`}>
                            <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 rounded-lg overflow-hidden cursor-pointer">
                              {data.banner.length > 0 ? (
                                data.banner.map(
                                  (file: FileType, fileIndex: number) => (
                                    <Image
                                      key={fileIndex}
                                      src={file.url || ImgPlaceholder}
                                      alt="Headline image"
                                      fill
                                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                      className="object-cover rounded-lg transition duration-300 ease-in-out group-hover:scale-110"
                                    />
                                  )
                                )
                              ) : (
                                <Image
                                  src={ImgPlaceholder || "/placeholder.svg"}
                                  alt="Headline image"
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
                  ))
              ) : (
                <div
                  key={index}
                  className="lg:col-span-8 flex justify-center items-center py-12"
                >
                  <div className="text-center">
                    <OctagonAlert className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                    <h1 className="text-gray-400 text-lg">Tidak ada berita</h1>
                  </div>
                </div>
              )
            )}

            {/* Sidebar - Latest Local News */}
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <div className="rounded-lg p-4 sm:p-6">
                <h2 className="font-black text-lg sm:text-xl pb-3 border-b-2 border-gray-300 mb-4">
                  Lokal Terkini
                </h2>

                <div className="space-y-4">
                  {newsByCategory.map((item: any, index: number) =>
                    item.news.data.data.length > 0 ? (
                      item.news.data.data
                        .slice(1, 5)
                        .map((data: any, dataIndex: number) => (
                          <div
                            key={dataIndex}
                            className="pb-4 border-b border-gray-200 hover:bg-gray-50 last:border-b-0 last:pb-0 p-2"
                          >
                            <Link href={`/berita/${data.id}/${data.slug}`}>
                              <h3 className="font-semibold text-sm sm:text-base cursor-pointer hover:text-gray-500 transition-colors duration-200 leading-tight mb-2">
                                {data.title}
                              </h3>
                              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                                {truncateText(
                                  extractPlainTextFromHTML(data.body),
                                  100
                                )}
                              </p>
                            </Link>
                          </div>
                        ))
                    ) : (
                      <div
                        key={index}
                        className="flex flex-col text-black/30 h-40 justify-center items-center"
                      >
                        <OctagonAlert className="w-8 h-8 mb-2" />
                        <p className="text-sm">Tidak ada berita</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
