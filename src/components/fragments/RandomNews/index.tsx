import SmallAds from "@/components/core/SmallAds";
import { FormatedDate, TimeAgo } from "@/utils/helper/FormatedDate";
import TruncateText from "@/utils/helper/TruncateText";
import { FileType, NewsType } from "@/utils/helper/Type";
import Image from "next/image";
// import parse from "html-react-parser";
import React from "react";

interface Props {
  randomNewsLimit1: any;
  randomNewsLimit2: any;
}

export default function RandomNewsSection({
  randomNewsLimit1,
  randomNewsLimit2,
}: Props) {
  const newsList1 = (randomNewsLimit1.data as NewsType).data;
  const newsList2 = (randomNewsLimit2.data as NewsType).data;

  return (
    <div className="flex flex-col h-1/3 items-center mt-5 gap-x-3 md:flex-col lg:flex-row">
      <div className="mb-6 lg:mb-0">
        {newsList1 &&
          newsList1.map((item: any) =>
            item.files.slice(0, 1).map((file: any, index: number) => (
              <div
                key={index}
                className="relative overflow-hidden bg-cover bg-no-repeat group rounded-md"
              >
                <div className="relative w-[300px] h-[200px] md:w-[500px] md:h-[300px] rounded-md">
                  <Image
                    src={file.url}
                    alt="News image"
                    width={500}
                    height={300}
                    className="object-cover rounded-md transition duration-300 ease-in-out group-hover:scale-110 cursor-pointer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none z-[1]" />

                  <div className="absolute bottom-0 left-0 p-3 text-white transition duration-300 ease-in-out group-hover:cursor-pointer group-hover:scale-95 z-[2]">
                    {item.title && (
                      <div className="mb-1 flex items-center text-xs font-medium text-white/90">
                        <span>Warung Jurnalis</span>
                        <span className="mx-1">|</span>
                        <span>{FormatedDate(item.created_at)}</span>
                      </div>
                    )}
                    <h3 className="font-bold leading-tight">
                      {item.title || "News Title"}
                    </h3>
                    {item.created_at && (
                      <div className="mt-1 text-xs text-white/70">
                        {TimeAgo(item.created_at)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
      </div>
      <div>
        {newsList2 &&
          newsList2.map((item: any, index: number) => (
            <div
              key={index}
              className={`group flex flex-col items-start bg-white md:flex-row md:justify-between md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 pb-4 ${
                index === 0 ? "border-b-1 border-black mb-2" : "border-0"
              }`}
            >
              <div className="flex flex-col justify-between px-4 leading-normal">
                <h5 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white cursor-pointer group-hover:text-gray-500 transition-colors duration-200">
                  {item.title}
                </h5>
                <div className="mb-3 text-md font-medium text-gray-800 dark:text-gray-400">
                  {TruncateText(item.slug, 50)}
                </div>
                <p className="text-xs text-black/70 mb-2">
                  {TimeAgo(item.created_at)}
                </p>
              </div>
              <div className="px-4 w-60 md:w-95 md:px-0">
                {item.files
                  .slice(0, 1)
                  .map(
                    (file: FileType, index: number) =>
                      file.description === "HEADLINE" && (
                        <Image
                          key={index}
                          src={file.url}
                          alt="News image"
                          width={450}
                          height={200}
                          className="object-cover rounded-md w-40 h-25 group-hover:scale-105 cursor-pointer tr ansition-transform duration-300"
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
