import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

import Dummy from "../../../../../public/assets/porsche.jpg";
import RecommendationNewsSection from "@/components/fragments/RecommendationNewsSection";
import CommentSection from "@/components/fragments/CommentSection";

export default function DetailPage() {
  return (
    <div className="min-h-screen">
      <div className="px-4 py-6">
        {/* Header */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
          <div>
            <span className="text-sm font-semibold text-red-600">Nasional</span>
            <h1 className="text-2xl md:text-3xl font-bold mt-1">
              KPK Diminta Usut Kerugian Negara Rp2,2 Triliun di Kabupaten Biak
              Numfor
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation.
            </p>
            <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
              <span>Liputan6.com</span>
              <div className="flex items-center gap-2">
                <button className="hover:text-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-share-2"
                  >
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                </button>
                <button className="hover:text-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-bookmark"
                  >
                    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                  </svg>
                </button>
                <button className="hover:text-gray-800">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-printer"
                  >
                    <polyline points="6 9 6 2 18 2 18 9" />
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                    <rect width="12" height="8" x="6" y="14" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 lg:border-r lg:pe-6 lg:border-gray-300">
            {/* Main Article */}
            <div className="mb-8 relative">
              <Image
                src={Dummy}
                alt="KPK officials"
                width={700}
                height={400}
                className="w-full rounded-md"
              />

              <p className="text-xs text-gray-500 mt-2">
                Sumber: Lorem Ipsum / Liputan6.com
              </p>
            </div>

            <div className="prose max-w-none mb-8">
              <p className="font-semibold">
                Jakarta - Lorem ipsum dolor sit amet, consectetur adipiscing
                elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>

              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>

            {/* Corruption Case Card */}
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

            {/* Also Read Section */}
            <div className="mb-8">
              <h3 className="font-bold mb-4">Baca Juga:</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <a href="#" className="text-blue-600 hover:underline">
                    Kasus Korupsi Biak Numfor: Tersangka Mengakui Diduga Rugikan
                    Negara Rp2,2 Triliun
                  </a>
                </li>
              </ul>
            </div>

            <div className="prose max-w-none mb-8">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>

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
