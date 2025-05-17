import { getData } from "@/services/news";
import TruncateText from "@/utils/helper/TruncateText";
import Image from "next/image";

export default async function News() {
  const randomNews = await getData("http://localhost:3000/api/berita/random");
  const allNews = await getData("http://localhost:3000/api/berita");
  console.log("INI ALL NEWS", allNews.data);

  return (
    <div className="flex h-1/2 items-center gap-x-2">
      <div>
        {randomNews?.data?.file_news?.length > 0 &&
          randomNews.data.file_news.map(
            (item: any, index: number) =>
              item.file_type === "image" && (
                <div key={index} className="relative overflow-hidden">
                  <div className="relative w-[500px] h-[300px] overflow-hidden rounded-md">
                    <Image
                      src={item.url}
                      alt="News image"
                      width={500}
                      height={300}
                      className="object-cover rounded-md"
                    />
                    {/* Dark gradient overlay for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 p-3 text-white">
                      {randomNews.data.title && (
                        <div className="mb-1 flex items-center text-xs font-medium text-white/90">
                          <span>News Source</span>
                          <span className="mx-1">|</span>
                          <span>Mei 17, 2025</span>
                        </div>
                      )}
                      <h3 className="font-bold leading-tight">
                        {randomNews.data.title || item.title || "News Title"}
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
              className={`flex flex-col items-start bg-white md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 ${
                index === 0 ? "border-b-1 border-black mb-2" : "border-0"
              }`}
            >
              <div className="flex flex-col justify-between px-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.title}
                </h5>
                <p className="mb-3 font-normal text-gray-800 dark:text-gray-400">
                  {TruncateText(item.body, 100)}
                </p>
                <p className="text-xs text-black/70 mb-2">1 minggu yang lalu</p>
              </div>
              {item.file_news.map(
                (file: any, index: number) =>
                  file.file_type === "image" && (
                    <Image
                      key={index}
                      src={file.url}
                      alt="News image"
                      width={200}
                      height={100}
                      className="object-cover rounded-md"
                    />
                  )
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
