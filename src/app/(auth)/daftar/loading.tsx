import { Newspaper } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Side - Hero Section Skeleton */}
      <div className="hidden lg:flex lg:w-1/2 bg-black relative">
        <div className="flex flex-col justify-center items-center text-white p-12 w-full">
          <div className="text-center">
            <div className="flex items-center justify-center mb-8">
              <Newspaper className="w-20 h-20 text-white opacity-70" />
            </div>
            <div className="h-12 w-64 bg-gray-700 animate-pulse rounded-md mx-auto mb-4"></div>
            <div className="h-6 w-80 bg-gray-700 animate-pulse rounded-md mx-auto mb-12"></div>

            <div className="space-y-6 max-w-sm">
              <div className="text-left">
                <div className="h-6 w-40 bg-gray-700 animate-pulse rounded-md mb-2"></div>
                <div className="h-4 w-56 bg-gray-700 animate-pulse rounded-md"></div>
              </div>
              <div className="text-left">
                <div className="h-6 w-48 bg-gray-700 animate-pulse rounded-md mb-2"></div>
                <div className="h-4 w-32 bg-gray-700 animate-pulse rounded-md"></div>
              </div>
              <div className="text-left">
                <div className="h-6 w-36 bg-gray-700 animate-pulse rounded-md mb-2"></div>
                <div className="h-4 w-64 bg-gray-700 animate-pulse rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form Skeleton */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo Skeleton */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Newspaper className="w-12 h-12 text-black opacity-70" />
            </div>
            <div className="h-6 w-48 bg-gray-300 animate-pulse rounded-md mx-auto mb-2"></div>
            <div className="h-4 w-40 bg-gray-300 animate-pulse rounded-md mx-auto"></div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 border">
            <div className="text-center mb-8">
              <div className="h-8 w-24 bg-gray-300 animate-pulse rounded-md mx-auto mb-2"></div>
              <div className="h-5 w-56 bg-gray-300 animate-pulse rounded-md mx-auto"></div>
            </div>

            <div className="space-y-6">
              {/* Email Field Skeleton */}
              <div>
                <div className="h-5 w-12 bg-gray-300 animate-pulse rounded-md mb-2"></div>
                <div className="h-12 w-full bg-gray-200 animate-pulse rounded-lg"></div>
              </div>

              {/* Password Field Skeleton */}
              <div>
                <div className="h-5 w-20 bg-gray-300 animate-pulse rounded-md mb-2"></div>
                <div className="h-12 w-full bg-gray-200 animate-pulse rounded-lg"></div>
              </div>

              {/* Button Skeleton */}
              <div className="h-12 w-full bg-gray-800 animate-pulse rounded-lg"></div>
            </div>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white">
                    <div className="h-4 w-32 bg-gray-300 animate-pulse rounded-md"></div>
                  </span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <div className="h-12 w-full border-2 border-gray-300 rounded-lg animate-pulse"></div>
              </div>
            </div>

            {/* Back to Home Skeleton */}
            <div className="mt-6 text-center">
              <div className="h-4 w-32 bg-gray-300 animate-pulse rounded-md mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
