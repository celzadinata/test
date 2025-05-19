import Image from "next/image";
import Link from "next/link";

import Dummy from "../../../../public/assets/oasis-band-candid-g1wd1knn8tmu2y5g.jpg";
import { MultiplyReturn } from "@/utils/helper/Type";

interface Props {
  allNews: MultiplyReturn;
}

export default function CategoryNewsSection({ allNews }: Props) {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6 border-t border-b py-3 border-black mt-4">
        {/* Nasional Section */}
        <div className="border-r border-gray-400 pr-6">
          <div className="flex items-center mb-4">
            <h2 className="text-lg tracking-wider cursor-pointer font-bold hover:text-gray-500">
              Nasional &gt;
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Featured News */}
            <div className="mb-6">
              <Link href="#" className="group">
                <Image
                  src={Dummy}
                  alt="News thumbnail"
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover mb-2"
                />
                <h3 className="text-xl font-bold group-hover:text-gray-500">
                  Demo mahasiswa, Efisiensi tidak bisa dipercaya
                </h3>
              </Link>
            </div>
            <div className="border-t border-gray-300">
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                perferendis asperiores id voluptatem iusto corporis maiores
                minus libero adipisci soluta eaque eveniet perspiciatis fuga
                nihil consectetur maxime quas, neque voluptatum!
              </p>
            </div>
          </div>
        </div>

        {/* Nasional Section */}
        {/* <div className="border-r border-gray-300 pr-6">
          <div className="flex items-center mb-4">
            <h2 className="text-lg tracking-wider font-bold">
              Mega Politik &gt;
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-6">
              <Link href="#" className="group">
                <Image
                  src={Dummy}
                  alt="News thumbnail"
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover mb-2"
                />
                <h3 className="text-xl font-bold group-hover:text-blue-600">
                  Demo mahasiswa, Efisiensi tidak bisa dipercaya
                </h3>
              </Link>
            </div>
            <div className="border-t border-gray-300">
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam
                perferendis asperiores id voluptatem iusto corporis maiores
                minus libero adipisci soluta eaque eveniet perspiciatis fuga
                nihil consectetur maxime quas, neque voluptatum!
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
