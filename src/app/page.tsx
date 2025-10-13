import WidthAds from "@/components/core/WidthAds";
import RandomNewsSection from "@/components/fragments/RandomNews";
import LatestNewsSection from "@/components/fragments/LatestNews";
import FeaturedCategoryNewsSection from "@/components/fragments/FeaturedCategoryNews";
import CategoryNewsSection from "@/components/fragments/CategoryNews";

import Logo from "../../public/assets/cam-logo-dark.svg";
import Image from "next/image";
import { Bokor } from "next/font/google";
import { getData } from "@/services";
import { getInternalBaseUrl } from "@/utils/helper/Internal";

const bokorFont = Bokor({
  subsets: ["latin"],
  weight: "400",
});

export default async function Home() {
  const randomNewsLimit2: any = await getData(
    `${getInternalBaseUrl()}/api/berita/random?limit=2`
  );
  const randomNewsLimit1: any = await getData(
    `${getInternalBaseUrl()}/api/berita/random?limit=1`
  );

  const allNews: any = await getData(`${getInternalBaseUrl()}/api/berita`);

  const allCategories: any = await getData(
    `${getInternalBaseUrl()}/api/kategori`
  );

  async function getNewsByCategory(
    categoryId: string,
    page?: string,
    limit?: string,
    random?: string
  ) {
    const res = await getData(
      `${getInternalBaseUrl()}/api/berita/category?category_id=${categoryId}&page=${
        page || "1"
      }&limit=${limit || "0"}&random=${random || "false"}`
    );

    return res;
  }

  const filteredCategories = await Promise.all(
    allCategories.data.map(async (item: any) => {
      const news = await getNewsByCategory(item.id);
      return {
        category_id: item.id,
        category_name: item.category_name,
        news,
      };
    })
  );

  return (
    <div>
      <div className="hidden md:flex md:justify-center md:items-center gap-1">
        <div className="relative w-24 h-24 md:w-32 md:h-32">
          <Image
            src={Logo}
            alt="Camera icon"
            width={44}
            height={44}
            className="w-full h-full"
            priority
          />
        </div>
        <h1
          className={`text-4xl md:text-6xl lg:text-7xl ${bokorFont.className}`}
        >
          Warung Jurnalis
        </h1>
      </div>
      <WidthAds />
      <RandomNewsSection
        randomNewsLimit1={randomNewsLimit1}
        randomNewsLimit2={randomNewsLimit2}
      />
      <LatestNewsSection
        latestNews={allNews}
        newsByCategory={getNewsByCategory}
      />
      <FeaturedCategoryNewsSection allCategories={allCategories} />
      <CategoryNewsSection newsByCategory={filteredCategories} />
    </div>
  );
}

// // app/page.tsx

// import WidthAds from "@/components/core/WidthAds";
// import RandomNewsSection from "@/components/fragments/RandomNews";
// import LatestNewsSection from "@/components/fragments/LatestNews";
// import FeaturedCategoryNewsSection from "@/components/fragments/FeaturedCategoryNews";
// import CategoryNewsSection from "@/components/fragments/CategoryNews";

// import Logo from "../../public/assets/cam-logo-dark.svg";
// import Image from "next/image";
// import { Bokor } from "next/font/google";
// import { getData } from "@/services";
// import { getInternalBaseUrl } from "@/utils/helper/Internal";

// // ✅ Pastikan SSR aktif (tidak cache, bukan static)
// export const dynamic = "force-dynamic";

// // ✅ Metadata penting buat SEO & Ads Preview
// export const metadata = {
//   title: "Warung Jurnalis - Berita Aktual dan Terpercaya",
//   description: "Berita pilihan terkini dari para jurnalis lokal.",
//   openGraph: {
//     title: "Warung Jurnalis",
//     description: "Berita terkini dan pilihan terbaik dari jurnalis Indonesia.",
//     url: "https://warungjurnalis.com",
//     siteName: "Warung Jurnalis",
//     images: [
//       {
//         url: "/assets/cam-logo-dark.svg",
//         width: 800,
//         height: 600,
//       },
//     ],
//     type: "website",
//   },
// };

// const bokorFont = Bokor({
//   subsets: ["latin"],
//   weight: "400",
// });

// export default async function Home() {
//   // ✅ Fetch data realtime dari API
//   const randomNewsLimit2: any = await getData(
//     `${getInternalBaseUrl()}/api/berita/random?limit=2`
//   );
//   const randomNewsLimit1: any = await getData(
//     `${getInternalBaseUrl()}/api/berita/random?limit=1`
//   );
//   const allNews: any = await getData(`${getInternalBaseUrl()}/api/berita`);
//   const allCategories: any = await getData(
//     `${getInternalBaseUrl()}/api/kategori`
//   );

//   async function getNewsByCategory(
//     categoryId: string,
//     page?: string,
//     limit?: string,
//     random?: string
//   ) {
//     return await getData(
//       `${getInternalBaseUrl()}/api/berita/category?category_id=${categoryId}&page=${
//         page || "1"
//       }&limit=${limit || "0"}&random=${random || "false"}`
//     );
//   }

//   const filteredCategories = await Promise.all(
//     allCategories.data.map(async (item: any) => {
//       const news = await getNewsByCategory(item.id);
//       return {
//         category_id: item.id,
//         category_name: item.category_name,
//         news,
//       };
//     })
//   );

//   return (
//     <main>
//       <div className="hidden md:flex md:justify-center md:items-center gap-1">
//         <div className="relative w-24 h-24 md:w-32 md:h-32">
//           <Image
//             src={Logo}
//             alt="Camera icon"
//             width={128}
//             height={128}
//             priority
//             loading="eager"
//           />
//         </div>
//         <h1
//           className={`text-4xl md:text-6xl lg:text-7xl ${bokorFont.className}`}
//         >
//           Warung Jurnalis
//         </h1>
//       </div>

//       {/* ✅ Fallback untuk Ad Preview/Googlebot tanpa JS */}
//       <noscript>
//         <div>
//           <p>Silakan aktifkan JavaScript untuk menampilkan konten penuh.</p>
//         </div>
//       </noscript>

//       {/* ✅ Ads component */}
//       <WidthAds />

//       {/* ✅ Bagian berita */}
//       <RandomNewsSection
//         randomNewsLimit1={randomNewsLimit1}
//         randomNewsLimit2={randomNewsLimit2}
//       />
//       <LatestNewsSection
//         latestNews={allNews}
//         newsByCategory={getNewsByCategory}
//       />
//       <FeaturedCategoryNewsSection allCategories={allCategories} />
//       <CategoryNewsSection newsByCategory={filteredCategories} />
//     </main>
//   );
// }
