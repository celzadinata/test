import Image from "next/image";
import Link from "next/link";

import Dummy from "../../../../public/assets/oasis-band-candid-g1wd1knn8tmu2y5g.jpg";
import TruncateText from "@/utils/helper/TruncateText";
import SmallAds from "@/components/core/SmallAds";
import { FileType } from "@/utils/helper/TypeHelper";
import { extractPlainTextFromHTML } from "@/utils/helper/ExtractPlainTextFromHTML";

interface Props {
  newsByCategory: any;
}

export default function CategoryNewsSection({ newsByCategory }: Props) {
  return (
    <div>
      <div className="grid container mx-auto px-4 md:px-0 grid-cols-1 md:grid-cols-2 gap-6 border-t border-b py-3 border-black mt-4">
        {/* Nasional Section */}
        {newsByCategory && newsByCategory.length > 0 ? (
          <>
            {newsByCategory.slice(1).map((item: any, index: number) => (
              <div key={index} className="pr-6 group">
                <div className="flex items-center mb-4">
                  <Link href={`/${item.category_name}?id=${item.category_id}`}>
                    <h2 className="text-lg tracking-wider text-red-600 cursor-pointer font-bold hover:underline">
                      {item.category_name} &gt;
                    </h2>
                  </Link>
                </div>

                {item.news.data.data
                  .slice(0, 1)
                  .map((data: any, index: number) => (
                    <div key={index} className="grid grid-cols-2 gap-4">
                      {/* Featured News */}
                      <div className="mb-6">
                        {data.files.slice(0, 1).map(
                          (file: FileType, index: number) =>
                            file.description === "HEADLINE" && (
                              <Link
                                key={index}
                                href={`/berita/${data.id}/${data.slug}`}
                              >
                                <div className="relative rounded-md overflow-hidden group bg-cover bg-no-repeat">
                                  <Image
                                    src={file.url}
                                    alt={data.slug}
                                    width={500}
                                    height={300}
                                    className="w-full h-50 rounded-md object-cover mb-2 transition duration-300 ease-in-out group-hover:scale-110 cursor-pointer"
                                  />
                                </div>
                              </Link>
                            )
                        )}
                        <Link href={`/berita/${data.id}/${data.slug}`}>
                          <h3 className="text-md lg:text-xl font-bold group-hover:text-gray-500">
                            {data.title}
                          </h3>
                        </Link>
                      </div>
                      <div className="border-t text-sm lg:text-md border-gray-300">
                        <p>
                          {TruncateText(
                            extractPlainTextFromHTML(data.body),
                            200
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            ))}
            {/* Small Ads Card */}
            <div className="pr-6">
              <div className="flex justify-center w-full">
                <div className="mt-5 w-90">
                  <SmallAds />
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
}
