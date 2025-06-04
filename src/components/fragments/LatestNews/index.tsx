import SmallAds from "@/components/core/SmallAds";
import WidthAds from "@/components/core/WidthAds";
import imagePlaceholder from "../../../../public/assets/placeholder-image.jpg";
import { extractPlainTextFromHTML } from "@/utils/helper/ExtractPlainTextFromHTML";
import { timeAgo } from "@/utils/helper/FormatedDate";
import truncateText from "@/utils/helper/TruncateText";
import { FileType } from "@/utils/helper/TypeHelper";
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
      <div className="container mx-auto px-4 md:px-0 py-6">
        {/* Main grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Main content area - 3 columns on large screens */}
          <div className="lg:col-span-3 border-t border-b border-black">
            {/* Top headline article */}
            <div className="py-6 border-b border-black">
              {latestNewsList &&
                latestNewsList.slice(0, 1).map((item: any, index: number) => (
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
                      <div className="mb-4 mt-1 text-sm text-black/80">
                        {timeAgo(item.created_at)}
                      </div>
                      <div className="space-y-2 mb-4">
                        <p className="text-md">
                          {truncateText(
                            extractPlainTextFromHTML(item.body),
                            200
                          )}
                        </p>
                        <div className="text-sm mb-2 text-muted-foreground">
                          Oleh: {item.created_by.username}
                        </div>
                        <Link href={`/berita/${item.id}/${item.slug}`}>
                          <div className="text-md font-bold cursor-pointer hover:text-gray-500">
                            Baca selengkapnya &gt;
                          </div>
                        </Link>
                      </div>
                    </div>
                    {item.banner.length > 0 ? (
                      item.banner.map((file: FileType, fileIndex: number) => (
                        <div
                          key={fileIndex}
                          className="relative rounded-lg w-full h-[250px] md:w-[500px] md:h-[300px] overflow-hidden bg-cover cursor-pointer bg-no-repeat"
                        >
                          <Link href={`/berita/${item.id}/${item.slug}`}>
                            <Image
                              src={file.url}
                              alt={item.slug}
                              width={500}
                              height={300}
                              className="object-cover w-full h-full rounded-lg transition duration-300 ease-in-out group-hover:scale-110"
                            />
                          </Link>
                        </div>
                      ))
                    ) : (
                      <Link
                        key={item.id}
                        href={`/berita/${item.id}/${item.slug}`}
                      >
                        <div className="relative rounded-lg w-full h-[250px] md:w-[500px] md:h-[300px] overflow-hidden bg-cover cursor-pointer bg-no-repeat">
                          <Image
                            src={imagePlaceholder}
                            alt={item.slug}
                            width={500}
                            height={300}
                            className="object-cover w-full h-full rounded-lg transition duration-300 ease-in-out group-hover:scale-110"
                          />
                        </div>
                      </Link>
                    )}
                  </div>
                ))}
            </div>

            {/* Second article */}
            <div className="py-6">
              {latestNewsList &&
                latestNewsList.slice(1, 2).map((item: any, index: number) => (
                  <div
                    key={index}
                    className="group flex flex-col md:flex-row gap-4"
                  >
                    <div className="md:w-1/2">
                      <Link href={`/berita/${item.id}/${item.slug}`}>
                        <h2 className="text-xl md:text-2xl font-extrabold cursor-pointer group-hover:text-gray-500 transition-colors duration-200">
                          {item.title}
                        </h2>
                      </Link>
                      <div className="mb-4 mt-1 text-sm text-black/80">
                        {timeAgo(item.created_at)}
                      </div>
                      <p className="text-md mb-2">
                        {truncateText(extractPlainTextFromHTML(item.body), 200)}
                      </p>
                      <div className="text-sm text-muted-foreground">
                        Oleh: {item.created_by.username}
                      </div>
                      <div className="mt-4">
                        {filteredNews
                          .slice(0, 1)
                          .map((item: any, index: number) => (
                            <div key={index}>
                              {item.news.data
                                .slice(1, 2)
                                .map((data: any, index: number) => (
                                  <Link
                                    key={index}
                                    href={`/${item.category_name}?id=${item.category_id}`}
                                  >
                                    <div className="text-red-600 text-md font-bold cursor-pointer hover:text-red-400">
                                      Berita terkait &gt;
                                    </div>
                                    <p className="text-sm">
                                      {data.title || "Tidak ada berita"}
                                    </p>
                                  </Link>
                                ))}
                            </div>
                          ))}
                      </div>
                    </div>
                    {item.banner.length > 0 ? (
                      item.banner.map((file: FileType, index: number) => (
                        <Link
                          href={`/berita/${item.id}/${item.slug}`}
                          key={index}
                          className="relative w-full h-[250px] md:w-[500px] md:h-[300px] rounded-lg overflow-hidden cursor-pointer bg-cover bg-no-repeat"
                        >
                          <Image
                            src={file.url}
                            alt={item.slug}
                            width={500}
                            height={300}
                            className="object-cover w-full h-full rounded-lg transition duration-300 ease-in-out group-hover:scale-110"
                          />
                        </Link>
                      ))
                    ) : (
                      <Link
                        href={`/berita/${item.id}/${item.slug}`}
                        key={index}
                        className="relative w-full h-[250px] md:w-[500px] md:h-[300px] rounded-lg overflow-hidden cursor-pointer bg-cover bg-no-repeat"
                      >
                        <Image
                          src={imagePlaceholder}
                          alt={item.slug}
                          width={500}
                          height={300}
                          className="w-full rounded-lg transition duration-300 ease-in-out group-hover:scale-110"
                        />
                      </Link>
                    )}
                  </div>
                ))}
            </div>
          </div>

          {/* Sidebar - 1 column */}
          <div className="lg:col-span-1 border-t border-b border-black">
            <div className="py-4 border-b border-gray-300">
              <h3 className="text-xl font-black">Berita Terkini</h3>
              <hr className="mb-3 " />

              <div className="space-y-4">
                {latestNewsList &&
                  latestNewsList.slice(2, 5).map((item: any, index: number) => (
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
