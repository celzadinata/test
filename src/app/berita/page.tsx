import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import SmallAds from "@/components/core/SmallAds";
import { Bokor } from "next/font/google";
import { getData } from "@/services";
import { getInternalBaseUrl } from "@/utils/helper/Internal";
import { FileType } from "@/utils/helper/TypeHelper";
import Image from "next/image";
import ImgPlaceholder from "../../../public/assets/placeholder-image.jpg";
import { formatedDate } from "@/utils/helper/FormatedDate";
import truncateText from "@/utils/helper/TruncateText";
import { extractPlainTextFromHTML } from "@/utils/helper/ExtractPlainTextFromHTML";
import { CustomPagination } from "@/components/layout/CustomPagination";
import Link from "next/link";

const bokorFont = Bokor({
  subsets: ["latin"],
  weight: "400",
});

type Params = {
  searchParams: Promise<{ search?: string; page?: string }>;
};

export default async function NewsPage({ searchParams }: Params) {
  const { search, page = "1" } = await searchParams;
  const encodedSearch = decodeURIComponent(search || "");

  const currentPage = Number.parseInt(page, 10) || 1;

  const getNews = await getData(
    `${getInternalBaseUrl()}/api/berita?title=${encodedSearch}&page=${currentPage}&limit=5`
  );

  const newsData = getNews.data;
  const news = newsData.data;

  const paginationData = {
    current_page: newsData.current_page,
    first_page_url: newsData.first_page_url,
    from: newsData.from,
    last_page: newsData.last_page,
    last_page_url: newsData.last_page_url,
    links: newsData.links,
    next_page_url: newsData.next_page_url,
    path: newsData.path,
    per_page: newsData.per_page,
    prev_page_url: newsData.prev_page_url,
    to: newsData.to,
    total: newsData.total,
  };

  return (
    <div className="container mx-auto px-4 md:px-0">
      <h1
        className={`text-3xl ${bokorFont.className} tracking-widest md:text-6xl mb-6 uppercase text-center underline my-6 md:my-10`}
      >
        Hasil Pencarian
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Konten Berita - 2/3 lebar pada desktop */}
        <div className="lg:col-span-2">
          {/* Card Berita */}
          {news.length > 0 ? (
            news.map((item: any, index: number) => (
              <Card
                key={index}
                className="mb-6 hover:bg-gray-100 overflow-hidden"
              >
                <Link
                  href={`/berita/${item.id}/${item.slug}`}
                  className="md:flex cursor-pointer"
                >
                  {item.banner.length > 0 ? (
                    item.banner.map((file: FileType, index: number) => (
                      <div key={index} className="md:w-1/3 h-50">
                        <Image
                          src={file.url || ImgPlaceholder}
                          alt={item.slug}
                          width={500}
                          height={300}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))
                  ) : (
                    <div className="md:w-1/3">
                      <Image
                        src={ImgPlaceholder}
                        alt={item.slug}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}

                  <div className="md:w-2/3 cursor-pointer ">
                    <CardHeader>
                      <div className="flex mt-4 md:mt-0 justify-between items-start">
                        <div>
                          <CardTitle className="max-w-55 md:max-w-md">
                            {item.title}
                          </CardTitle>
                          <CardDescription className="mt-2">
                            <span className="inline-block bg-red-600/10 text-primary px-2 py-1 rounded-md text-xs">
                              {item.category_id.category_name}
                            </span>
                          </CardDescription>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {formatedDate(item.created_at)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p>
                        {truncateText(extractPlainTextFromHTML(item.body), 200)}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <div className="text-sm text-muted-foreground">
                        Oleh: {item.created_by.username}
                      </div>
                      {/* <Button
                        className="mt-5 cursor-pointer"
                        variant="outline"
                        size="sm"
                      >
                        Baca Selengkapnya
                      </Button> */}
                    </CardFooter>
                  </div>
                </Link>
              </Card>
            ))
          ) : (
            <h1>Tidak ada berita</h1>
          )}

          {/* Pagination */}
          <CustomPagination paginationData={paginationData} />
        </div>

        {/* Area Advertisement - 1/3 lebar pada desktop */}
        <div className="lg:col-span-1">
          <div className="sticky top-30 space-y-6">
            <SmallAds />
          </div>
        </div>
      </div>
    </div>
  );
}
