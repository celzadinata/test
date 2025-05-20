import TruncateText from "@/utils/helper/TruncateText";
import { FileType, SingleReturn } from "@/utils/helper/Type";
import Image from "next/image";
import Link from "next/link";

interface Props {
  randomNews: SingleReturn;
}

export default function FeaturedCategoryNewsSection({ randomNews }: Props) {
  return (
    <div className="mb-10">
      {/* Top border line */}
      <div className="border-t border-black mb-2"></div>
      {randomNews.data && (
        <div className="text-lg tracking-wider font-bold mb-4">
          <Link
            href="/internasional"
            className="text-black hover:text-gray-500 hover:underline"
          >
            {randomNews.data.category_name} &gt;
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {randomNews.data && (
          <div className="md:col-span-4">
            <h2 className="text-2xl font-bold mb-3">{randomNews.data.title}</h2>
            <p className="text-gray-700">
              {TruncateText(randomNews.data.body, 200)}
            </p>
          </div>
        )}

        {randomNews.data &&
          randomNews.data.file_news.map(
            (file: FileType, index: number) =>
              file.description === "HEADLINE" && (
                <div key={index} className="md:col-span-4">
                  <Image
                    src={file.url}
                    alt="Headline image"
                    width={300}
                    height={200}
                    className="w-full h-auto"
                  />
                </div>
              )
          )}

        <div className="md:col-span-4 flex flex-col space-y-4">
          <div>
            <h3 className="font-medium">
              Andrie Bayuajie Ditangkap, Begini Kata Yovie Widianto
            </h3>
            <div className="border-b border-gray-200 my-3"></div>
          </div>

          <div>
            <h3 className="font-medium">
              Terungkap Gitaris Kahitna Tak Pakai Resep Berkali-kali Beli
              Psikotropika
            </h3>
            <div className="border-b border-gray-200 my-3"></div>
          </div>

          <div>
            <h3 className="font-medium">
              Demo Mahasiswa Efisiensi tidak bisa dipercaya
            </h3>
            <div className="border-b border-gray-200 my-3"></div>
          </div>

          <div>
            <h3 className="font-medium">
              10 Kesalahan Dunia, Indonesia termasuk salah satunya
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
