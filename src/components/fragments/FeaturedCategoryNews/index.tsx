import truncateText from "@/utils/helper/TruncateText";
import { FileType } from "@/utils/helper/TypeHelper";
import Image from "next/image";
import Link from "next/link";
import { extractPlainTextFromHTML } from "@/utils/helper/ExtractPlainTextFromHTML";
import { formatedDate } from "@/utils/helper/FormatedDate";

interface Props {
  newsByCategory: any;
}

export default function FeaturedCategoryNewsSection({ newsByCategory }: Props) {
  return (
    <>
      {newsByCategory && (
        <div className="mb-10 container mx-auto px-4 md:px-0">
          {/* Top border line */}
          <div className="border-t border-black mb-2"></div>
          {newsByCategory.slice(0, 1).map((item: any, index: number) => (
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
            {newsByCategory.slice(0, 1).map((item: any) =>
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
                      <div className="mb-3 text-xs text-black/80">
                        {data.created_by.username} |{" "}
                        {formatedDate(data.created_at)}
                      </div>
                      <p className="text-gray-700">
                        {truncateText(extractPlainTextFromHTML(data.body), 250)}
                      </p>
                    </div>

                    {data.files.slice(0, 1).map(
                      (file: FileType, index: number) =>
                        file.description === "HEADLINE" && (
                          <div
                            key={index}
                            className="md:col-span-1 mt-2 md:h-[300px]  md:mt-0 rounded-md overflow-hidden cursor-pointer bg-cover bg-no-repeat"
                          >
                            <Link href={`/berita/${data.id}/${data.slug}`}>
                              <Image
                                src={file.url}
                                alt="Headline image"
                                width={500}
                                height={300}
                                className="w-full h-[200px] md:h-auto rounded-md transition duration-300 ease-in-out group-hover:scale-110"
                              />
                            </Link>
                          </div>
                        )
                    )}
                  </div>
                ))
            )}

            <div className="md:col-span-4 flex flex-col space-y-4">
              {newsByCategory.slice(2, 5).map((item: any) =>
                item.news.data.data.map((data: any, index: number) => (
                  <div key={index}>
                    <Link href={`/berita/${data.id}/${data.slug}`}>
                      <h3 className="font-bold cursor-pointer hover:text-gray-500">
                        {data.title}
                      </h3>
                      <p className="text-xs mt-1">
                        {truncateText(extractPlainTextFromHTML(data.body), 100)}
                      </p>
                    </Link>
                    <div className="border-b border-gray-200 my-3"></div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
