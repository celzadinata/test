import Image from "next/image";
import Link from "next/link";

import TruncateText from "@/utils/helper/TruncateText";
import SmallAds from "@/components/core/SmallAds";
import type { FileType } from "@/utils/helper/TypeHelper";
import { extractPlainTextFromHTML } from "@/utils/helper/ExtractPlainTextFromHTML";
import { formatedDate } from "@/utils/helper/FormatedDate";
import ImgPlaceholder from "../../../../public/assets/placeholder-image.jpg";

interface Props {
  newsByCategory: any;
}

export default function CategoryNewsSection({ newsByCategory }: Props) {
  return (
    <div>
      <div className="container mx-auto px-4 lg:px-0 border-t border-b py-6 border-black mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {/* News Category Cards */}
          {newsByCategory && newsByCategory.length > 0 ? (
            <>
              {newsByCategory.slice(1).map((item: any, index: number) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                >
                  {/* Category Header */}
                  <div className="p-4 pb-2 border-b border-gray-100">
                    <Link
                      href={`/${item.category_name}?id=${item.category_id}`}
                    >
                      <h2 className="text-base sm:text-lg tracking-wider text-red-600 cursor-pointer font-bold hover:underline transition-colors duration-200">
                        {item.category_name} &gt;
                      </h2>
                    </Link>
                  </div>

                  {/* Card Content */}
                  <div className="p-4">
                    {item.news.data.data.length > 0 ? (
                      item.news.data.data
                        .slice(0, 1)
                        .map((data: any, dataIndex: number) => (
                          <div key={dataIndex} className="space-y-4">
                            {/* Image Section */}
                            <div className="group">
                              <Link href={`/berita/${data.id}/${data.slug}`}>
                                <div className="relative w-full h-48 sm:h-52 md:h-40 lg:h-44 xl:h-52 rounded-lg overflow-hidden cursor-pointer">
                                  {data.banner.length > 0 ? (
                                    data.banner
                                      .slice(0, 1)
                                      .map(
                                        (file: FileType, fileIndex: number) => (
                                          <Image
                                            key={fileIndex}
                                            src={file.url || ImgPlaceholder}
                                            alt={data.slug || "News image"}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 33vw"
                                            className="object-cover rounded-lg transition duration-300 ease-in-out group-hover:scale-110"
                                          />
                                        )
                                      )
                                  ) : (
                                    <Image
                                      src={ImgPlaceholder || "/placeholder.svg"}
                                      alt={data.slug || "News image"}
                                      fill
                                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 33vw"
                                      className="object-cover rounded-lg transition duration-300 ease-in-out group-hover:scale-110"
                                    />
                                  )}
                                </div>
                              </Link>
                            </div>

                            {/* Content Section */}
                            <div className="space-y-3">
                              <Link href={`/berita/${data.id}/${data.slug}`}>
                                <h3 className="text-base sm:text-lg font-bold leading-tight hover:text-gray-500 transition-colors duration-200 cursor-pointer line-clamp-2">
                                  {data.title}
                                </h3>
                              </Link>

                              <div className="text-xs text-black/80">
                                {formatedDate(data.created_at)}
                              </div>

                              <div className="border-t border-gray-200 pt-3">
                                <p className="text-sm text-gray-700 leading-relaxed mb-3 line-clamp-3">
                                  {TruncateText(
                                    extractPlainTextFromHTML(data.body),
                                    120
                                  )}
                                </p>
                                <div className="text-xs text-muted-foreground">
                                  Oleh: {data.created_by.username}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                    ) : (
                      <div className="text-center py-8 text-gray-400">
                        <p className="text-sm">Tidak ada berita tersedia</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Small Ads Card */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                {/* Ads Header */}
                <div className="p-4 pb-2 border-b border-gray-100">
                  <h2 className="text-base sm:text-lg tracking-wider text-gray-600 font-bold">
                    Advertisement
                  </h2>
                </div>

                {/* Ads Content */}
                <div className="p-4">
                  <div className="flex justify-center items-center min-h-[250px]">
                    <div className="w-full">
                      <SmallAds />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="col-span-full">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
                <div className="text-center text-gray-500">
                  <p className="text-lg">No data available</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
