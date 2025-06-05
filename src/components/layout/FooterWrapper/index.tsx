import { Suspense } from "react";
import Footer from "../Footer";

// Fallback component for footer loading
function FooterSkeleton() {
  return (
    <div className="relative mt-16 bg-black">
      <svg
        className="absolute top-0 w-full h-6 -mt-5 sm:-mt-10 sm:h-16 text-black"
        preserveAspectRatio="none"
        viewBox="0 0 1440 54"
      >
        <path
          fill="currentColor"
          d="M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"
        />
      </svg>

      <div className="px-4 pt-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-8">
            <div className="w-16 h-16 bg-gray-800 rounded-full animate-pulse"></div>
            <div className="ml-3 h-10 w-64 bg-gray-800 rounded animate-pulse"></div>
          </div>

          <div className="h-20 max-w-2xl mx-auto mb-8 bg-gray-800 rounded animate-pulse"></div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={`footer-skeleton-${i}`}
                className="w-24 h-10 bg-gray-800 rounded-full animate-pulse"
              ></div>
            ))}
          </div>

          <div className="flex justify-center items-center space-x-6 mb-8">
            <div className="w-20 h-4 bg-gray-800 rounded animate-pulse"></div>
            <div className="flex space-x-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={`social-skeleton-${i}`}
                  className="w-10 h-10 bg-gray-800 rounded-full animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center pt-8 pb-10 border-t border-gray-800">
          <div className="h-4 w-64 mx-auto bg-gray-800 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

export default function FooterWrapper() {
  return (
    <Suspense fallback={<FooterSkeleton />}>
      <Footer />
    </Suspense>
  );
}
