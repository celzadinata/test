import truncateText from "@/utils/helper/TruncateText";
import { FileType } from "@/utils/helper/TypeHelper";
import Image from "next/image";
import Link from "next/link";
import { extractPlainTextFromHTML } from "@/utils/helper/ExtractPlainTextFromHTML";
import { formatedDate } from "@/utils/helper/FormatedDate";
import { getData } from "@/services";
import { getInternalBaseUrl } from "@/utils/helper/Internal";
import { OctagonAlert } from "lucide-react";
import ImgPlaceholder from "../../../../public/assets/placeholder-image.jpg";

interface Props {
  allCategories: any;
}

export default async function FeaturedCategoryNewsSection({
  allCategories,
}: Props) {
  async function getNewsByCategory(
    categoryId: string,
    page?: string,
    limit?: string,
    random?: string
  ) {
    const res = await getData(
      `${getInternalBaseUrl()}/api/berita/category?category_id=${categoryId}&page=${
        page || "1"
      }&limit=${limit || "0"}&random=${random || "false"}`
    );

    return res;
  }

  const newsByCategory = await Promise.all(
    allCategories.data.slice(0, 1).map(async (item: any) => {
      const news = await getNewsByCategory(item.id);
      return {
        category_id: item.id,
        category_name: item.category_name,
        news,
      };
    })
  );

  return (
    <>
      {newsByCategory && (
        <div className="mb-10 container mx-auto px-4 md:px-0">
          {/* Top border line */}
          <div className="border-t border-black mb-2"></div>
          {newsByCategory.map((item: any, index: number) => (
            <div key={index} className="text-lg tracking-wider font-bold mb-4">
              <Link
                href={`/${item.category_name}?id=${item.category_id}`}
                className="text-red-600 hover:underline"
              >
                {item.category_name} &gt;
              </Link>
            </div>
          ))}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {newsByCategory.slice(0, 1).map((item: any, index: number) =>
              item.news.data.data.length > 0 ? (
                item.news.data.data
                  .slice(0, 1)
                  .map((data: any, index: number) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 group md:grid-cols-2 md:col-span-8"
                    >
                      <div className="md:col-span-1">
                        <Link href={`/berita/${data.id}/${data.slug}`}>
                          <h2 className="text-2xl font-bold mb-1 cursor-pointer group-hover:text-gray-500 transition-colors duration-200">
                            {data.title}
                          </h2>
                        </Link>
                        <div className="mb-4 text-sm text-black/80">
                          {formatedDate(data.created_at)}
                        </div>
                        <p className="text-gray-700 text-md mb-2">
                          {truncateText(
                            extractPlainTextFromHTML(data.body),
                            250
                          )}
                        </p>
                        <div className="text-sm text-muted-foreground">
                          Oleh: {data.created_by.username}
                        </div>
                      </div>

                      {data.banner.length > 0 ? (
                        data.banner.map((file: FileType, index: number) => (
                          <div
                            key={index}
                            className="md:col-span-1 mt-2 relative w-full md:h-[300px] lg:w-[500px] lg:h-[300px] md:mt-0 rounded-lg overflow-hidden cursor-pointer bg-cover bg-no-repeat"
                          >
                            <Link href={`/berita/${data.id}/${data.slug}`}>
                              <Image
                                src={file.url || ImgPlaceholder}
                                alt="Headline image"
                                width={500}
                                height={300}
                                className="object-cover w-full h-full rounded-lg transition duration-300 ease-in-out group-hover:scale-110"
                              />
                            </Link>
                          </div>
                        ))
                      ) : (
                        <div
                          key={index}
                          className="md:col-span-1 mt-2 md:h-[300px]  md:mt-0 rounded-lg overflow-hidden cursor-pointer bg-cover bg-no-repeat"
                        >
                          <Link href={`/berita/${data.id}/${data.slug}`}>
                            <Image
                              src={ImgPlaceholder}
                              alt="Headline image"
                              width={500}
                              height={300}
                              className="w-full h-[200px] md:h-auto rounded-lg transition duration-300 ease-in-out group-hover:scale-110"
                            />
                          </Link>
                        </div>
                      )}
                    </div>
                  ))
              ) : (
                <div
                  key={index}
                  className="grid grid-cols-1 group md:grid-cols-2 md:col-span-8"
                >
                  <div className="flex justify-center items-center">
                    <h1 className="text-gray-400">Tidak ada berita</h1>
                  </div>
                </div>
              )
            )}

            <div className="md:col-span-4 flex flex-col space-y-4">
              <h2 className="font-black text-xl pb-1 border-b-2">
                Lokal Terkini
              </h2>

              {newsByCategory.map((item: any, index: number) =>
                item.news.data.data.length > 0 ? (
                  item.news.data.data
                    .slice(1, 5)
                    .map((data: any, index: number) => (
                      <div key={index}>
                        <Link href={`/berita/${data.id}/${data.slug}`}>
                          <h3 className="font-semibold text-sm cursor-pointer hover:text-gray-500">
                            {data.title}
                          </h3>
                          <p className="text-xs mt-1">
                            {truncateText(
                              extractPlainTextFromHTML(data.body),
                              100
                            )}
                          </p>
                        </Link>
                        <div className="border-b border-gray-200 my-3"></div>
                      </div>
                    ))
                ) : (
                  <div
                    key={index}
                    className="flex flex-col text-black/30 h-60 justify-center items-center"
                  >
                    <OctagonAlert className="w-30 h-30" />
                    <p>Tidak ada berita</p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
