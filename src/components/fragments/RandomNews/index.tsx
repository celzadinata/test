import SmallAds from "@/components/core/SmallAds";
import { extractPlainTextFromHTML } from "@/utils/helper/ExtractPlainTextFromHTML";
import { formatedDate, timeAgo } from "@/utils/helper/FormatedDate";
import truncateText from "@/utils/helper/TruncateText";
import { FileType } from "@/utils/helper/TypeHelper";
import Image from "next/image";
import Link from "next/link";
import imagePlaceholder from "../../../../public/assets/placeholder-image.jpg";
import React from "react";

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
    <div className="flex flex-col h-1/3 items-center mt-5 gap-x-3 md:flex-col lg:flex-row">
      <div className="mb-6 lg:mb-0">
        {newsList1 &&
          newsList1.map((item: any) =>
            item.banner.length > 0 ? (
              item.banner.map((file: FileType, index: number) => (
                <div
                  key={index}
                  className="relative w-100 container md:w-full overflow-hidden bg-cover bg-no-repeat group rounded-lg"
                >
                  <Link href={`/berita/${item.id}/${item.slug}`}>
                    <div className="relative w-full h-[250px] md:h-[400px] md:w-[600px] rounded-lg overflow-hidden">
                      <Image
                        src={file.url || imagePlaceholder}
                        alt={item.slug}
                        width={800}
                        height={600}
                        className="object-cover w-full h-full rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-110 cursor-pointer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none z-[1]" />
                      <div className="absolute bottom-0 left-0 p-3 text-white transition-transform duration-300 ease-in-out group-hover:scale-95 z-[2]">
                        <div className="mb-1 flex items-center text-xs font-medium text-white/90">
                          <span>{item.created_by.username}</span>
                          <span className="mx-1">|</span>
                          <span>
                            {formatedDate(item.created_at) || "xxxx, xx-xx"}
                          </span>
                        </div>
                        <h3 className="font-bold leading-tight">
                          {item.title || "News Title"}
                        </h3>
                        <div className="mt-1 text-xs text-white/70">
                          {timeAgo(item.created_at) || "xxxx, xx-xx"}
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div
                key={item.id}
                className="relative w-100 container md:w-full overflow-hidden bg-cover bg-no-repeat group rounded-lg"
              >
                <Link href={`/berita/${item.id}/${item.slug}`}>
                  <div className="relative w-full h-[250px] md:h-[400px] md:w-[600px] rounded-lg overflow-hidden">
                    <Image
                      src={imagePlaceholder}
                      alt={item.slug}
                      width={800}
                      height={600}
                      className="object-cover w-full h-full rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-110 cursor-pointer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none z-[1]" />
                    <div className="absolute bottom-0 left-0 p-3 text-white transition-transform duration-300 ease-in-out group-hover:scale-95 z-[2]">
                      <div className="mb-1 flex items-center text-xs font-medium text-white/90">
                        <span>
                          {item.created_by.username || "Warung Jurnalis"}
                        </span>
                        <span className="mx-1">|</span>
                        <span>
                          {formatedDate(item.created_at) || "xxxx, xx-xx"}
                        </span>
                      </div>
                      <h3 className="font-bold leading-tight">
                        {item.title || "News Title"}
                      </h3>
                      <div className="mt-1 text-xs text-white/70">
                        {timeAgo(item.created_at) || "xxxx, xx-xx"}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )
          )}
      </div>
      <div className="px-3">
        {newsList2 &&
          newsList2.map((item: any, index: number) => (
            <div
              key={index}
              className={`group flex flex-col items-start bg-white md:flex-row md:justify-between md:max-w-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 pb-4 ${
                index === 0 ? "border-b-1 border-black mb-2" : "border-0"
              }`}
            >
              <div className="flex flex-col justify-between pe-4 leading-normal">
                <Link href={`/berita/${item.id}/${item.slug}`}>
                  <h5 className="text-lg md:text-xl max-w-lg font-bold tracking-tight text-gray-900 dark:text-white cursor-pointer group-hover:text-gray-500 transition-colors duration-200">
                    {truncateText(item.title, 100)}
                  </h5>
                </Link>
                <p className="text-xs text-black/70 mb-2">
                  {timeAgo(item.created_at)}
                </p>
                <p className="mb-2 text-sm font-medium text-primary">
                  {truncateText(extractPlainTextFromHTML(item.body), 100)}
                </p>
                <div className="text-xs text-muted-foreground">
                  Oleh: {item.created_by.username}
                </div>
              </div>
              <div className="flex justify-end w-50 md:w-[500px] md:h-[120px] md:px-0">
                {item.banner.length > 0 ? (
                  item.banner.map((file: FileType, index: number) => (
                    <Link key={index} href={`/berita/${item.id}/${item.slug}`}>
                      <Image
                        src={file.url || imagePlaceholder}
                        alt={item.slug}
                        width={500}
                        height={300}
                        className="object-cover rounded-lg w-60 h-25 md:w-[220px] md:h-[120px] group-hover:scale-105 cursor-pointer tr ansition-transform duration-300"
                      />
                    </Link>
                  ))
                ) : (
                  <Link key={index} href={`/berita/${item.id}/${item.slug}`}>
                    <Image
                      src={imagePlaceholder}
                      alt={item.slug}
                      width={500}
                      height={300}
                      className="object-cover rounded-lg w-60 h-25 md:w-[220px] md:h-[120px] group-hover:scale-105 cursor-pointer tr ansition-transform duration-300"
                    />
                  </Link>
                )}
              </div>
            </div>
          ))}
      </div>
      <div className="w-full px-5 md:px-0 md:mx-0 md:ms-5 ">
        <SmallAds />
      </div>
    </div>
  );
}
