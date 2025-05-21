import SmallAds from "@/components/core/SmallAds";
import TruncateText from "@/utils/helper/TruncateText";
import { FileType, MultiplyReturn, SingleReturn } from "@/utils/helper/Type";
import Image from "next/image";
import React from "react";

interface Props {
  randomNews: SingleReturn;
  allNews: MultiplyReturn;
}

export default function RandomNewsSection({ randomNews, allNews }: Props) {
  return (
    <div className="flex flex-col h-1/3 items-center mt-5 gap-x-3 md:flex-col lg:flex-row">
      <div className="mb-6 lg:mb-0">
        {randomNews?.data?.file_news?.length > 0 &&
          randomNews.data.file_news.map(
            (item: FileType, index: number) =>
              item.description === "HEADLINE" && (
                <div
                  key={index}
                  className="relative overflow-hidden bg-cover bg-no-repeat group"
                >
                  <div className="relative w-[300px] h-[200px] md:w-[500px] md:h-[300px] rounded-md">
                    <Image
                      src={item.url}
                      alt="News image"
                      width={500}
                      height={300}
                      className="object-cover rounded-md transition duration-300 ease-in-out group-hover:scale-110 cursor-pointer"
                    />
                    {/* Dark gradient overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none z-[1]" />

                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 p-3 text-white transition duration-300 ease-in-out group-hover:cursor-pointer group-hover:scale-95 z-[2]">
                      {randomNews.data.title && (
                        <div className="mb-1 flex items-center text-xs font-medium text-white/90">
                          <span>News Source</span>
                          <span className="mx-1">|</span>
                          <span>Mei 17, 2025</span>
                        </div>
                      )}
                      <h3 className="font-bold leading-tight">
                        {randomNews.data.title || "News Title"}
                      </h3>
                      {randomNews.data && (
                        <div className="mt-1 text-xs text-white/70">
                          1 minggu yang lalu
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
          )}
      </div>
      <div>
        {allNews?.data?.length > 0 &&
          allNews.data.slice(0, 2).map((item: any, index: number) => (
            <div
              key={index}
              className={`group flex flex-col items-start bg-white md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 pb-4 ${
                index === 0 ? "border-b-1 border-black mb-2" : "border-0"
              }`}
            >
              <div className="flex flex-col justify-between px-4 leading-normal">
                <h5 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white cursor-pointer group-hover:text-gray-500 transition-colors duration-200">
                  {item.title}
                </h5>
                <p className="mb-3 text-md font-medium text-gray-800 dark:text-gray-400">
                  {TruncateText(item.body, 100)}
                </p>
                <p className="text-xs text-black/70 mb-2">1 minggu yang lalu</p>
              </div>
              <div className="px-4 w-60 md:w-95 md:px-0">
                {item.file_news.map(
                  (file: FileType, index: number) =>
                    file.description === "HEADLINE" && (
                      <Image
                        key={index}
                        src={file.url}
                        alt="News image"
                        width={450}
                        height={200}
                        className="object-cover rounded-md group-hover:scale-105 cursor-pointer tr ansition-transform duration-300"
                      />
                    )
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
