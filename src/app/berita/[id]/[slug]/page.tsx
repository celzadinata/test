import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import RecommendationNewsSection from "@/components/fragments/RecommendationNewsSection";
import CommentSection from "@/components/fragments/CommentSection";
import { getData } from "@/services";
import { Bookmark, Printer, Share2 } from "lucide-react";
import parse from "html-react-parser";
import { HashtagType } from "@/utils/helper/TypeHelper";
import SmallAds from "@/components/core/SmallAds";
import { getInternalBaseUrl } from "@/utils/helper/Internal";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DetailPage({ params }: Props) {
  const { id } = await params;
  const newsDetail: any = await getData(
    `${getInternalBaseUrl()}/api/berita?id=${id}`
  );

  const randomNews: any = await getData(
    `${getInternalBaseUrl()}/api/berita/random?limit=6`
  );

  return (
    <div className="min-h-screen">
      <div className="px-4 py-6">
        {/* Header */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
          {newsDetail.data && (
            <div>
              <span className="text-sm font-semibold text-red-600">
                {newsDetail.data.category_id.category_name}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold mt-1">
                {newsDetail.data.title}
              </h1>
              <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                <span>warungjurnalis.com</span>
                <div className="flex items-center gap-2">
                  <button className="hover:text-gray-800">
                    <Share2 width={16} height={16} />
                  </button>
                  <button className="hover:text-gray-800">
                    <Bookmark width={16} height={16} />
                  </button>
                  <button className="hover:text-gray-800">
                    <Printer width={16} height={16} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 lg:border-r lg:pe-6 lg:border-gray-300">
            <div className="prose max-w-none mb-8">
              {parse(newsDetail.data.body)}
              <br />

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {newsDetail.data.tags.map((tag: HashtagType, index: number) => (
                  <Badge key={index} variant="outline" className="rounded-sm">
                    #{tag.hashtag_name}
                  </Badge>
                ))}
              </div>
            </div>

            <RecommendationNewsSection randomNews={randomNews} />
          </div>

          <div className="lg:col-span-1">
            {/* Advertisement */}
            <SmallAds />

            {/* Related Articles */}
            <div className="mb-8">
              <h3 className="font-bold mb-4">Berita Terkait</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex-none">
                    <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                      <span>1</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="flex gap-3">
                  <div className="flex-none">
                    <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                      <span>2</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="flex gap-3">
                  <div className="flex-none">
                    <div className="bg-orange-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
                      <span>3</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Advertisement */}
            <SmallAds />
            <CommentSection />
          </div>
        </div>
      </div>
    </div>
  );
}
