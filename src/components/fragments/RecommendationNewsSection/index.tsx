import Image from "next/image";
import Link from "next/link";

import truncateText from "@/utils/helper/TruncateText";
import { extractPlainTextFromHTML } from "@/utils/helper/ExtractPlainTextFromHTML";
import { FileType } from "@/utils/helper/TypeHelper";
import ImgPlaceholder from "../../../../public/assets/placeholder-image.jpg";
import { formatedDate } from "@/utils/helper/FormatedDate";

interface Props {
  randomNews: any;
}

export default function RecommendationNewsSection({ randomNews }: Props) {
  return (
    <div className="border-t border-black">
      <div className="flex justify-between mb-5 mt-3 text-md tracking-normal lg:text-lg lg:tracking-wider font-bold">
        <h2>Rekomendasi untuk anda</h2>
      </div>
      {randomNews && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {randomNews.data.data.map((item: any, index: number) => (
            <Link key={index} href={`/berita/${item.id}/${item.slug}`}>
              <div className="max-w-sm h-100 cursor-pointer bg-white hover:bg-gray-100 border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                {item.banner.length > 0 ? (
                  item.banner
                    .slice(0, 1)
                    .map((file: FileType, index: number) => (
                      <div key={index} className="relative w-full h-50">
                        <Image
                          className="object-cover rounded-t-lg w-full h-full"
                          src={file.url || ImgPlaceholder}
                          alt={item.slug}
                          width={500}
                          height={300}
                        />
                      </div>
                    ))
                ) : (
                  <div key={index} className="relative w-full h-50">
                    <Image
                      className="object-cover rounded-t-lg w-full h-full"
                      src={ImgPlaceholder}
                      alt={item.slug}
                      width={500}
                      height={300}
                    />
                  </div>
                )}
                <div className="p-5">
                  <h5 className="truncate md:truncate-none text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                    {item.title}
                  </h5>

                  <p className="text-xs mb-2 text-black/70">
                    {formatedDate(item.created_at)}
                  </p>

                  <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
                    {truncateText(extractPlainTextFromHTML(item.body), 90)}
                  </p>

                  <p className="text-xs text-black/70">
                    Oleh: {item.created_by.username}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
