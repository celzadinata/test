import SmallAds from "@/components/core/SmallAds";
import WidthAds from "@/components/core/WidthAds";
import TruncateText from "@/utils/helper/TruncateText";
import { FileType, SingleReturn } from "@/utils/helper/Type";
import Image from "next/image";

interface Props {
  randomNews: SingleReturn;
}

export default function LatestNewsSection({ randomNews }: Props) {
  return (
    <div className="bg-white text-black min-h-screen">
      <div className="container mx-auto px-4 md:px-0 py-6">
        {/* Main grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Main content area - 3 columns on large screens */}
          <div className="lg:col-span-3 border-t border-b border-black">
            {/* Top headline article */}
            <div className="py-6 border-b border-black">
              {randomNews.data && (
                <div className="group flex flex-col md:flex-row gap-4">
                  <div className="md:w-1/2">
                    <h1 className="text-2xl md:text-3xl font-extrabold mb-4 cursor-pointer group-hover:text-gray-500 transition-colors duration-200">
                      {randomNews.data.title}
                    </h1>
                    <div className="space-y-3 mb-4">
                      <p className="text-sm">
                        {TruncateText(randomNews.data.body, 300)}
                      </p>
                      <div className="text-md font-bold cursor-pointer hover:text-gray-500">
                        Baca selengkapnya {">"}
                      </div>
                    </div>
                  </div>
                  {randomNews.data.file_news.map(
                    (file: FileType, index: number) =>
                      file.description === "HEADLINE" && (
                        <div
                          key={index}
                          className="relative rounded-md overflow-hidden bg-cover cursor-pointer bg-no-repeat md:w-120"
                        >
                          <Image
                            src={file.url}
                            alt="News Headline"
                            width={500}
                            height={300}
                            className="w-full rounded-md h-auto transition duration-300 ease-in-out group-hover:scale-110"
                          />
                        </div>
                      )
                  )}
                </div>
              )}
            </div>

            {/* Second article */}
            <div className="py-6">
              {randomNews.data && (
                <div className="group flex flex-col md:flex-row gap-4">
                  <div className="md:w-1/2">
                    <h2 className="text-xl md:text-2xl font-extrabold mb-4 cursor-pointer group-hover:text-gray-500 transition-colors duration-200">
                      {randomNews.data.title}
                    </h2>
                    <p className="text-sm mb-4">
                      {TruncateText(randomNews.data.body, 200)}
                    </p>
                    <div className="mt-4">
                      <div className="text-red-600 text-md font-bold cursor-pointer hover:text-red-400">
                        Berita terkait {">"}
                      </div>
                      <p className="text-sm">
                        Reportase Kasus Korupsi Timah 271 Triliun dari Kacamata
                        Hukum
                      </p>
                    </div>
                  </div>
                  {randomNews.data.file_news.map(
                    (file: FileType, index: number) =>
                      file.description === "HEADLINE" && (
                        <div
                          key={index}
                          className="relative rounded-md overflow-hidden cursor-pointer bg-cover bg-no-repeat md:w-120"
                        >
                          <Image
                            src={file.url}
                            alt="News Headline"
                            width={500}
                            height={300}
                            className="w-full rounded-md h-auto transition duration-300 ease-in-out group-hover:scale-110"
                          />
                        </div>
                      )
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="lg:col-span-1 border-t border-b border-black">
            <div className="py-4 border-b border-gray-300">
              <h3 className="text-lg font-bold mb-4">The Latest</h3>

              <div className="space-y-4">
                <div className="pb-3 border-b border-gray-300">
                  <div className="text-sm font-semibold mb-1">Akademis</div>
                  <p className="text-xs">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor
                  </p>
                </div>

                <div className="pb-3 border-b border-gray-300">
                  <div className="text-sm font-semibold mb-1">Akademis</div>
                  <p className="text-xs">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor
                  </p>
                </div>

                <div className="pb-3 border-b border-gray-300">
                  <div className="text-sm font-semibold mb-1">Akademis</div>
                  <p className="text-xs">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor
                  </p>
                </div>
              </div>
            </div>

            <div className="py-4">
              <SmallAds />
            </div>
          </div>
        </div>

        {/* Bottom advertisement */}
        <WidthAds value={28} />
      </div>
    </div>
  );
}
