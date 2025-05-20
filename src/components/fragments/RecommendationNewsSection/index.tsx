import Image from "next/image";
import Link from "next/link";

import Dummy from "../../../../public/assets/porsche.jpg";

export default function RecommendationNewsSection() {
  return (
    <div className="border-t border-black">
      <div className="flex justify-between mb-5 mt-3 text-md tracking-normal lg:text-lg lg:tracking-wider font-bold">
        <h2>Rekomendasi untuk anda</h2>
        <h2>Selengkapnya {">"}</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <Link href="#">
            <Image className="rounded-t-lg" src={Dummy} alt="Card Image" />
          </Link>
          <div className="p-5">
            <Link href="#">
              <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">
                Porsche 911 GT3
              </h5>
            </Link>
            <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </div>
        </div>
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <Link href="#">
            <Image className="rounded-t-lg" src={Dummy} alt="Card Image" />
          </Link>
          <div className="p-5">
            <Link href="#">
              <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">
                Porsche 911 GT3
              </h5>
            </Link>
            <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </div>
        </div>
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <Link href="#">
            <Image className="rounded-t-lg" src={Dummy} alt="Card Image" />
          </Link>
          <div className="p-5">
            <Link href="#">
              <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">
                Porsche 911 GT3
              </h5>
            </Link>
            <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </div>
        </div>
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <Link href="#">
            <Image className="rounded-t-lg" src={Dummy} alt="Card Image" />
          </Link>
          <div className="p-5">
            <Link href="#">
              <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">
                Porsche 911 GT3
              </h5>
            </Link>
            <p className="mb-3 text-sm font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so
              far, in reverse chronological order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
