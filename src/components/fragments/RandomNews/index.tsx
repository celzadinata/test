import SmallAds from "@/components/core/SmallAds";
import { extractPlainTextFromHTML } from "@/utils/helper/ExtractPlainTextFromHTML";
import { formatedDate, timeAgo } from "@/utils/helper/FormatedDate";
import truncateText from "@/utils/helper/TruncateText";
import type { FileType } from "@/utils/helper/TypeHelper";
import Image from "next/image";
import Link from "next/link";
import imagePlaceholder from "../../../../public/assets/placeholder-image.jpg";

interface Props {
  randomNewsLimit1: any;
  randomNewsLimit2: any;
}

export default async function RandomNewsSection({
  randomNewsLimit1,
  randomNewsLimit2,
}: Props) {
  const newsList1 = (randomNewsLimit1.data as any).data;
  const newsList2 = (randomNewsLimit2.data as any).data;

  return (
    <div className="container mx-auto px-4 lg:px-0 mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Featured News - Large Image */}
        <div className="lg:col-span-5">
          {newsList1 &&
            newsList1.map((item: any, itemIndex: number) => (
              <div key={itemIndex} className="group">
                <Link href={`/berita/${item.id}/${item.slug}`}>
                  <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-lg overflow-hidden cursor-pointer">
                    {item.banner.length > 0 ? (
                      item.banner.map((file: FileType, fileIndex: number) => (
                        <Image
                          key={fileIndex}
                          src={
                            file.url || imagePlaceholder || "/placeholder.svg"
                          }
                          alt={item.slug || "News image"}
                          fill
                          sizes="(max-width: 1024px) 100vw, 42vw"
                          className="object-cover rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-110"
                        />
                      ))
                    ) : (
                      <Image
                        src={imagePlaceholder || "/placeholder.svg"}
                        alt={item.slug || "News image"}
                        fill
                        sizes="(max-width: 1024px) 100vw, 42vw"
                        className="object-cover rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-110"
                      />
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none z-10" />

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white z-20">
                      <div className="mb-2 flex items-center text-xs sm:text-sm font-medium text-white/90">
                        <span>
                          {item.created_by.username || "Warung Jurnalis"}
                        </span>
                        <span className="mx-2">|</span>
                        <span>
                          {formatedDate(item.created_at) || "xxxx, xx-xx"}
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold leading-tight mb-2 line-clamp-2">
                        {item.title || "News Title"}
                      </h3>
                      <div className="text-xs sm:text-sm text-white/80">
                        {timeAgo(item.created_at) || "xxxx, xx-xx"}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>

        {/* News List */}
        <div className="lg:col-span-4">
          <div className="space-y-6">
            {newsList2 &&
              newsList2.map((item: any, index: number) => (
                <div
                  key={index}
                  className={`group bg-white rounded-lg border border-gray-100 hover:shadow-md transition-shadow duration-300 overflow-hidden ${
                    index === 0 ? "border-b-2" : ""
                  }`}
                >
                  <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {/* Content */}
                      <div className="sm:col-span-2 space-y-3">
                        <Link href={`/berita/${item.id}/${item.slug}`}>
                          <h5 className="text-base sm:text-lg font-bold leading-tight text-gray-900 cursor-pointer group-hover:text-gray-600 transition-colors duration-200 line-clamp-2">
                            {item.title}
                          </h5>
                        </Link>

                        <div className="text-xs text-black/70">
                          {timeAgo(item.created_at)}
                        </div>

                        <p className="text-sm text-gray-700 leading-relaxed line-clamp-2">
                          {truncateText(
                            extractPlainTextFromHTML(item.body),
                            100
                          )}
                        </p>

                        <div className="text-xs text-muted-foreground">
                          Oleh: {item.created_by.username}
                        </div>
                      </div>

                      {/* Image */}
                      <div className="sm:col-span-1">
                        <Link href={`/berita/${item.id}/${item.slug}`}>
                          <div className="relative w-full h-32 sm:h-24 lg:h-28 rounded-lg overflow-hidden cursor-pointer">
                            {item.banner.length > 0 ? (
                              item.banner.map(
                                (file: FileType, fileIndex: number) => (
                                  <Image
                                    key={fileIndex}
                                    src={
                                      file.url ||
                                      imagePlaceholder ||
                                      "/placeholder.svg"
                                    }
                                    alt={item.slug || "News image"}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                                    className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                                  />
                                )
                              )
                            ) : (
                              <Image
                                src={imagePlaceholder || "/placeholder.svg"}
                                alt={item.slug || "News image"}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                                className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                              />
                            )}
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Advertisement Sidebar */}
        <div className="lg:col-span-3">
          <SmallAds />
        </div>
      </div>
    </div>
  );
}
