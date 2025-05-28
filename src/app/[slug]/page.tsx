import { getData } from "@/services";
import { extractPlainTextFromHTML } from "@/utils/helper/ExtractPlainTextFromHTML";
import { timeAgo } from "@/utils/helper/FormatedDate";
import { getInternalBaseUrl } from "@/utils/helper/Internal";
import truncateText from "@/utils/helper/TruncateText";
import { FileType } from "@/utils/helper/TypeHelper";
import { log } from "console";
import { Bokor } from "next/font/google";
import Image from "next/image";

const bokorFont = Bokor({
  subsets: ["latin"],
  weight: "400",
});

type Params = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ id?: string }>;
};

export default async function CategoryPage({ params, searchParams }: Params) {
  const { slug } = await params;
  const { id } = await searchParams;

  const getAllNewsByCategory = await getData(
    `${getInternalBaseUrl()}/api/berita/category?category=${id}`
  );

  const getNews = getAllNewsByCategory.data.data;

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4">
        <h1
          className={`text-3xl ${bokorFont.className} tracking-widest md:text-6xl mb-6 uppercase text-center underline my-6 md:my-10`}
        >
          {slug}
        </h1>

        {getNews.length === 0 && (
          <p className="text-center px-4">
            Tidak ada berita untuk kategori ini.
          </p>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {getNews.map((news: any, index: number) => (
              <div key={index} className="mb-10">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold mb-3">
                      {news.title}
                    </h2>
                    <p className="text-gray-700 mb-3">
                      {truncateText(extractPlainTextFromHTML(news.body), 300)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {timeAgo(news.created_at)}
                    </p>
                  </div>

                  {news.files.slice(0, 1).map(
                    (file: FileType, index: number) =>
                      file.description === "HEADLINE" && (
                        <div key={index} className="flex-1">
                          <div className=" w-full h-auto">
                            <Image
                              src={file.url}
                              alt={news.slug}
                              className="object-cover rounded-lg w-full h-[200] md:w-[500px] md:h-[300]"
                              width={500}
                              height={300}
                            />
                          </div>
                        </div>
                      )
                  )}
                </div>
                <div className="border-b border-gray-200 my-6"></div>
              </div>
            ))}
          </div>

          <div className="lg:w-1/3 bg-white p-6 rounded-lg shadow-sm h-fit">
            <h3 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200">
              Most Read {">"}
            </h3>
            <div className="space-y-4">
              {getNews.map((item: any, index: number) => (
                <div
                  key={index}
                  className="pb-4 border-b border-gray-100 last:border-0"
                >
                  {item.files && index === 0 && (
                    <div className="mb-3 relative aspect-video w-full">
                      <Image
                        src={item.files[0].url}
                        alt={item.slug}
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 768px) 100vw, 300px"
                      />
                    </div>
                  )}
                  <div className="flex items-start gap-2">
                    <span className="text-gray-400 font-medium">
                      {index + 1}.
                    </span>
                    <div>
                      <h4 className="font-medium text-gray-800">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">May 19, 2025</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
