import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

import Dummy from "../../../../../public/assets/porsche.jpg";
import RecommendationNewsSection from "@/components/fragments/RecommendationNewsSection";
import CommentSection from "@/components/fragments/CommentSection";
import { getData } from "@/services";
import { redirect } from "next/navigation";
import { Bookmark, Printer, Share2 } from "lucide-react";
import parse from "html-react-parser";
import { FileType } from "@/utils/helper/Type";

type Props = {
  params: Promise<{ id: string; slug: string }>;
};

const baseURL = process.env.NEXT_PUBLIC_NEXT_SERVER_URL;

export default async function DetailPage({ params }: Props) {
  const { id, slug } = await params;

  const newsDetail = await getData(`${baseURL}/api/berita?id=${id}`);

  console.log("INI NEWSS DETAILL", newsDetail.data.files);

  if (newsDetail.data.slug !== slug) {
    redirect(`/berita/${id}/${newsDetail.data.slug}`);
  }

  return (
    <div className="min-h-screen">
      <div className="px-4 py-6">
        {/* Header */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
          {newsDetail.data && (
            <div>
              <span className="text-sm font-semibold text-red-600">
                {newsDetail.data.category_id}
              </span>
              <h1 className="text-2xl md:text-3xl font-bold mt-1">
                {newsDetail.data.title}
              </h1>
              <p className="text-sm text-gray-600 mt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellendus assumenda repellat facere ad aperiam maiores
                numquam, sed quisquam soluta laudantium culpa dolorum, ut
                doloremque tempore unde totam, qui ullam iste?
              </p>
              <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                <span>Liputan6.com</span>
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
            {newsDetail.data &&
              newsDetail.data.files
                .slice(0, 1)
                .map((file: FileType, index: number) => {
                  if (file.description === "HEADLINE") {
                    return (
                      <div key={index} className="mb-8 relative">
                        <Image
                          src={file.url}
                          alt="KPK officials"
                          width={700}
                          height={400}
                          className="w-full rounded-md"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                          Sumber: {file.file_name} / Warung Jurnalis
                        </p>
                      </div>
                    );
                  }
                  return null;
                })}

            <div className="prose max-w-none mb-8">
              {parse(newsDetail.data.body)}
              {/* <div className="prose max-w-none mb-8">
                <p className="font-semibold">
                  Jakarta - Lorem ipsum dolor sit amet, consectetur adipiscing
                  elit, sed do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat.
                </p>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>

                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>

              <div className="mb-8 relative">
                <Card className="overflow-hidden aspect-video">
                  <div className="relative">
                    <Image
                      src={Dummy}
                      alt="Corruption case"
                      width={600}
                      height={300}
                      className="w-full"
                    />
                  </div>
                </Card>
              </div>

              <div className="mb-8">
                <h3 className="font-bold mb-4">Baca Juga:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">
                      Kasus Korupsi Biak Numfor: Tersangka Mengakui Diduga
                      Rugikan Negara Rp2,2 Triliun
                    </a>
                  </li>
                </ul>
              </div>

              <div className="prose max-w-none mb-8">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div> */}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                <Badge variant="outline" className="rounded-sm">
                  #Berita Nasional
                </Badge>
                <Badge variant="outline" className="rounded-sm">
                  #Korupsi
                </Badge>
                <Badge variant="outline" className="rounded-sm">
                  #KPK
                </Badge>
              </div>
            </div>

            <RecommendationNewsSection />
          </div>

          <div className="lg:col-span-1">
            {/* Advertisement */}
            <div className="mb-8 w-full bg-gray-100 p-4 rounded-md">
              <p className="text-xs text-gray-500 mb-2">Advertisement</p>
              <div className="bg-gray-200 h-48 flex items-center justify-center">
                <span className="text-gray-400">Ad Space</span>
              </div>
            </div>

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
            <div className="mb-8 w-full bg-gray-100 p-4 rounded-md">
              <p className="text-xs text-gray-500 mb-2">Advertisement</p>
              <div className="bg-gray-200 h-48 flex items-center justify-center">
                <span className="text-gray-400">Ad Space</span>
              </div>
            </div>
            <CommentSection />
          </div>
        </div>
      </div>
    </div>
  );
}
