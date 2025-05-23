"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const AdBanner = dynamic(() => import("../AdBanner"), {
  ssr: false,
  loading: () => (
    <div className="bg-gray-200 h-48 flex items-center justify-center">
      <span className="text-gray-400">Loading ad...</span>
    </div>
  ),
});

export default function SmallAds() {
  return (
    <div className="mb-8 w-full bg-gray-100 p-4 rounded-md">
      <p className="text-xs text-gray-500 mb-2">Advertisement</p>
      <Suspense
        fallback={
          <div className="bg-gray-200 h-48 flex items-center justify-center">
            <span className="text-gray-400">Loading ad...</span>
          </div>
        }
      >
        <div className="bg-gray-200 h-48 flex items-center justify-center">
          <AdBanner
            dataAdFormat="auto"
            dataFullWidthResponsive={true}
            dataAdSlot="5748426756"
          />
        </div>
      </Suspense>
    </div>
  );
}
