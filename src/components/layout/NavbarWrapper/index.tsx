import { Suspense } from "react";
import Navbar from "../Navbar";

// Fallback component for navbar loading
function NavbarSkeleton() {
  return (
    <header className="flex flex-col w-full sticky top-0 z-50">
      {/* Top bar skeleton */}
      <div className="bg-black text-white py-3 md:py-4 px-3 md:px-6 flex items-center justify-between">
        <div className="hidden md:flex items-center">
          <div className="h-8 w-32 bg-gray-700 rounded animate-pulse"></div>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-700 rounded animate-pulse"></div>
          <div className="h-8 w-40 bg-gray-700 rounded animate-pulse"></div>
        </div>
        <div className="hidden md:flex items-center">
          <div className="h-8 w-20 bg-gray-700 rounded animate-pulse"></div>
        </div>
        <div className="md:hidden w-8 h-8 bg-gray-700 rounded animate-pulse"></div>
      </div>
      {/* Navigation skeleton */}
      <nav className="border-b-2 border-black bg-white">
        <div className="container mx-auto py-3 md:py-4 px-3 md:px-4">
          <div className="flex justify-center space-x-2 md:space-x-8 overflow-x-auto">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={`nav-skeleton-${i}`}
                className="h-6 w-16 bg-gray-200 rounded animate-pulse flex-shrink-0"
              ></div>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default function NavbarWrapper() {
  return (
    <Suspense fallback={<NavbarSkeleton />}>
      <Navbar />
    </Suspense>
  );
}
