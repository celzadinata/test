import SmallAds from "@/components/core/SmallAds";
import WidthAds from "@/components/core/WidthAds";
import { extractPlainTextFromHTML } from "@/utils/helper/ExtractPlainTextFromHTML";
import { timeAgo } from "@/utils/helper/FormatedDate";
import truncateText from "@/utils/helper/TruncateText";
import { FileType } from "@/utils/helper/TypeHelper";
import Image from "next/image";
import Link from "next/link";

interface Props {
  latestNews: any;
}

export default function LatestNewsSection({ latestNews }: Props) {
  const latestnewsList = (latestNews.data as any).data;

  return (
    <div className="bg-white text-black min-h-screen">
      <div className="container mx-auto px-4 md:px-0 py-6">
        {/* Main grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Main content area - 3 columns on large screens */}
          <div className="lg:col-span-3 border-t border-b border-black">
            {/* Top headline article */}
            <div className="py-6 border-b border-black">
              {latestnewsList &&
                latestnewsList.slice(0, 1).map((item: any, index: number) => (
                  <div
                    key={index}
                    className="group flex flex-col md:flex-row gap-4"
                  >
                    <div className="md:w-1/2">
                      <Link href={`/berita/${item.id}/${item.slug}`}>
                        <h1 className="text-2xl md:text-3xl font-extrabold cursor-pointer group-hover:text-gray-500 transition-colors duration-200">
                          {item.title}
                        </h1>
                      </Link>
                      <hr />
                      <div className="mb-4 text-xs text-black/80">
                        {timeAgo(item.created_at)}
                      </div>
                      <div className="space-y-3 mb-4">
                        <p className="text-sm">
                          {truncateText(
                            extractPlainTextFromHTML(item.body),
                            200
                          )}
                        </p>
                        <Link href={`/berita/${item.id}/${item.slug}`}>
                          <div className="text-md font-bold cursor-pointer hover:text-gray-500">
                            Baca selengkapnya {">"}
                          </div>
                        </Link>
                      </div>
                    </div>
                    {item.files.slice(0, 1).map(
                      (file: FileType, fileIndex: number) =>
                        file.description === "HEADLINE" && (
                          <Link
                            key={fileIndex}
                            href={`/berita/${item.id}/${item.slug}`}
                          >
                            <div className="relative rounded-md w-full h-[250px] md:w-[500px] md:h-[300px] overflow-hidden bg-cover cursor-pointer bg-no-repeat">
                              <Image
                                src={file.url}
                                alt="News Headline"
                                width={500}
                                height={300}
                                className="w-full rounded-md transition duration-300 ease-in-out group-hover:scale-110"
                              />
                            </div>
                          </Link>
                        )
                    )}
                  </div>
                ))}
            </div>

            {/* Second article */}
            <div className="py-6">
              {latestnewsList &&
                latestnewsList.slice(1, 2).map((item: any, index: number) => (
                  <div
                    key={index}
                    className="group flex flex-col md:flex-row gap-4"
                  >
                    <div className="md:w-1/2">
                      <h2 className="text-xl md:text-2xl font-extrabold cursor-pointer group-hover:text-gray-500 transition-colors duration-200">
                        {item.title}
                      </h2>
                      <hr />
                      <div className="mb-4 text-xs text-black/80">
                        {timeAgo(item.created_at)}
                      </div>
                      <p className="text-sm mb-4">
                        {truncateText(extractPlainTextFromHTML(item.body), 200)}
                      </p>
                      <div className="mt-4">
                        <div className="text-red-600 text-md font-bold cursor-pointer hover:text-red-400">
                          Berita terkait {">"}
                        </div>
                        <p className="text-sm">
                          Reportase Kasus Korupsi Timah 271 Triliun dari
                          Kacamata Hukum
                        </p>
                      </div>
                    </div>
                    {item.files.slice(0, 1).map(
                      (file: FileType, index: number) =>
                        file.description === "HEADLINE" && (
                          <div
                            key={index}
                            className="relative w-full h-[250px] md:w-[500px] md:h-[300px] rounded-md overflow-hidden cursor-pointer bg-cover bg-no-repeat"
                          >
                            <Image
                              src={file.url}
                              alt="News Headline"
                              width={500}
                              height={300}
                              className="w-full rounded-md transition duration-300 ease-in-out group-hover:scale-110"
                            />
                          </div>
                        )
                    )}
                  </div>
                ))}
            </div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="lg:col-span-1 border-t border-b border-black">
            <div className="py-4 border-b border-gray-300">
              <h3 className="text-lg font-bold">The Latest</h3>
              <hr className="mb-3 " />

              <div className="space-y-4">
                {latestnewsList &&
                  latestnewsList.slice(2, 5).map((item: any, index: number) => (
                    <div
                      key={index}
                      className="pb-3 border-b border-gray-300 hover:text-gray-500 cursor-pointer"
                    >
                      <Link href={`/berita/${item.id}/${item.slug}`}>
                        <div className="text-sm font-semibold mb-1">
                          {item.title}
                        </div>
                      </Link>
                      <p className="text-xs">
                        {truncateText(extractPlainTextFromHTML(item.body), 50)}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            <div className="py-4">
              <SmallAds />
            </div>
          </div>
        </div>

        {/* Bottom advertisement */}
        <WidthAds />
      </div>
    </div>
  );
}
