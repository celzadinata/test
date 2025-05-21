import { getAllNews } from "@/utils/DummyApi/news";
import TruncateText from "@/utils/helper/TruncateText";
import { Bokor } from "next/font/google";
import Image from "next/image";

const bokorFont = Bokor({
  subsets: ["latin"],
  weight: "400",
});

type Params = {
  params: {
    slug: string;
  };
};

export default async function CategoryPage({ params }: Params) {
  const { slug } = params;

  const allNews = await getAllNews();
  const filteredNews = allNews.filter(
    (news) => news.category_name.toLowerCase() === slug.toLowerCase()
  );

  const mostReadNews = filteredNews.slice(0, 5);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4">
        <h1
          className={`text-3xl ${bokorFont.className} tracking-widest md:text-6xl mb-6 uppercase text-center underline my-6 md:my-10`}
        >
          {slug}
        </h1>

        {filteredNews.length === 0 && (
          <p className="text-center px-4">
            Tidak ada berita untuk kategori ini.
          </p>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            {filteredNews.map((news: any, index: number) => (
              <div key={index} className="mb-10">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold mb-3">
                      {news.title}
                    </h2>
                    <p className="text-gray-700 mb-3">
                      {TruncateText(news.body, 300)}
                    </p>
                    <p className="text-sm text-gray-500">May 19, 2025</p>
                  </div>

                  <div className="flex-1">
                    <div className="relative aspect-video w-full h-auto">
                      <Image
                        src={news.file_news[0].url}
                        alt={news.title}
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </div>
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
              {mostReadNews.map((item: any, index: number) => (
                <div
                  key={index}
                  className="pb-4 border-b border-gray-100 last:border-0"
                >
                  {item.file_news && index === 0 && (
                    <div className="mb-3 relative aspect-video w-full">
                      <Image
                        src={item.file_news[0].url}
                        alt={item.title}
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
