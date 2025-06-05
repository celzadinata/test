import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import RecommendationNewsSection from "@/components/fragments/RecommendationNewsSection";
import CommentSection from "@/components/fragments/CommentSection";
import { getData } from "@/services";
import parse from "html-react-parser";
import { HashtagType } from "@/utils/helper/TypeHelper";
import SmallAds from "@/components/core/SmallAds";
import { getInternalBaseUrl } from "@/utils/helper/Internal";
import { formatedDate } from "@/utils/helper/FormatedDate";
import truncateText from "@/utils/helper/TruncateText";
import { extractPlainTextFromHTML } from "@/utils/helper/ExtractPlainTextFromHTML";
import Link from "next/link";
import ButtonDeck from "@/components/core/ButtonDeck";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const newsDetail: any = await getData(
    `${getInternalBaseUrl()}/api/berita?id=${id}`
  );

  const title = newsDetail.data?.title || "Berita";
  const body = extractPlainTextFromHTML(newsDetail.data?.body || "");
  const description = body.slice(0, 150) + "...";
  const image = newsDetail.data?.slug + ".jpg" || "/default-thumbnail.jpg"; // fallback image

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: [image],
    },
    // twitter: {
    //   card: "summary_large_image",
    //   title,
    //   description,
    //   images: [image],
    // },
  };
}

export default async function DetailPage({ params }: Props) {
  const { id } = await params;
  const newsDetail: any = await getData(
    `${getInternalBaseUrl()}/api/berita?id=${id}`
  );

  const randomNews: any = await getData(
    `${getInternalBaseUrl()}/api/berita/random?limit=6`
  );

  const allNews: any = await getData(
    `${getInternalBaseUrl()}/api/berita?page=1`
  );

  const allNewsData = allNews.data.data.slice(2, 5);

  console.log("INI ALL NEWS: ", allNewsData);

  return (
    <main className="min-h-screen">
      <section className="px-4 py-6">
        {/* Header */}
        <header className="mb-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
          {newsDetail.data && (
            <div>
              <span className="text-sm font-semibold text-red-600">
                {newsDetail.data.category_id.category_name}
              </span>
              <h1 className="mb-1 text-2xl md:text-3xl font-bold mt-1">
                {newsDetail.data.title}
              </h1>
              <span className="text-sm">
                {newsDetail.data.created_by.username} |{" "}
                {formatedDate(newsDetail.data.created_at)}
              </span>
              <ButtonDeck />
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2 lg:border-r lg:pe-6 lg:border-gray-300">
            <article className="prose max-w-none mb-2">
              {parse(newsDetail.data.body)}
              <br />

              {newsDetail.data.youtube_url && (
                <div className="flex justify-center w-full mb-5">
                  <iframe
                    className="aspect-video w-80 md:w-[500px] lg:w-[600px]"
                    src={`https://www.youtube.com/embed/${new URL(
                      newsDetail.data.youtube_url
                    ).searchParams.get("v")}`}
                    title="YouTube Video"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </article>

            {/* Everything below this point will be hidden during printing */}
            <div className="print:hidden">
              {/* Tags */}
              <section className="flex flex-wrap gap-2 mb-8" aria-label="Tags">
                {newsDetail.data.tags.map((tag: HashtagType, index: number) => (
                  <Badge key={index} variant="outline" className="rounded-sm">
                    #{tag.hashtag_name}
                  </Badge>
                ))}
              </section>

              <RecommendationNewsSection randomNews={randomNews} />
            </div>
          </section>

          <aside className="lg:col-span-1 print:hidden">
            {/* Advertisement */}
            <SmallAds />

            {/* Related Articles */}
            <section className="mb-8" aria-label="Berita Terkini">
              <h3 className="font-bold mb-4">Berita Terkini</h3>
              <div className="space-y-4">
                {allNewsData.map((data: any, index: number) => (
                  <div key={index}>
                    <div className="flex gap-3">
                      <div className="flex-none">
                        <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                          <span>{index + 1}</span>
                        </div>
                      </div>
                      <Link href={`/berita/${data.id}/${data.slug}`}>
                        <p className="text-sm hover:font-bold">
                          {truncateText(
                            extractPlainTextFromHTML(data.body),
                            100
                          )}
                        </p>
                      </Link>
                    </div>
                    <Separator />
                  </div>
                ))}
              </div>
            </section>

            {/* Advertisement */}
            <SmallAds />
            <CommentSection
              comments={newsDetail.data.comments}
              newsId={newsDetail.data.id}
            />
          </aside>
        </div>
      </section>
    </main>
  );
}
