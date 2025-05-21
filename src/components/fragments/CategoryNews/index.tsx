import Image from "next/image";
import Link from "next/link";

import Dummy from "../../../../public/assets/oasis-band-candid-g1wd1knn8tmu2y5g.jpg";
import { FileType, MultiplyReturn } from "@/utils/helper/Type";
import TruncateText from "@/utils/helper/TruncateText";
import SmallAds from "@/components/core/SmallAds";

interface Props {
  allNews: MultiplyReturn;
}

export default function CategoryNewsSection({ allNews }: Props) {
  return (
    <div>
      <div className="grid container mx-auto px-4 md:px-0 grid-cols-1 md:grid-cols-2 gap-6 border-t border-b py-3 border-black mt-4">
        {/* Nasional Section */}
        {allNews?.data?.length > 0 ? (
          <>
            {allNews.data.map((item: any, index: number) => (
              <div key={index} className="pr-6">
                <div className="flex items-center mb-4">
                  <h2 className="text-lg tracking-wider text-black cursor-pointer font-bold hover:text-gray-500 hover:underline">
                    {item.category_name} &gt;
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Featured News */}
                  <div className="mb-6">
                    <Link href="/">
                      {item.file_news.map(
                        (file: FileType, index: number) =>
                          file.description === "HEADLINE" && (
                            <div
                              key={index}
                              className="relative rounded-md overflow-hidden group bg-cover bg-no-repeat"
                            >
                              <Image
                                src={file.url} // Fallback ke Dummy jika file.url tidak ada
                                alt="News thumbnail"
                                width={400}
                                height={250}
                                className="w-full h-48 rounded-md object-cover mb-2 transition duration-300 ease-in-out group-hover:scale-110 cursor-pointer"
                              />
                            </div>
                          )
                      )}
                      <h3 className="text-md lg:text-xl font-bold group-hover:text-gray-500">
                        {item.title}
                      </h3>
                    </Link>
                  </div>
                  <div className="border-t text-sm lg:text-md border-gray-300">
                    <p>{TruncateText(item.body, 200)}</p>
                  </div>
                </div>
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
