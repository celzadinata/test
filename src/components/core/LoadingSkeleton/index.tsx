export default function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content - 2/3 width */}
        <div className="lg:col-span-2 space-y-12">
          {/* First article skeleton */}
          <div className="space-y-4 border-b pb-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2 space-y-4">
                {/* Title skeleton */}
                <div className="h-10 bg-gray-200 rounded-md animate-pulse w-full"></div>
                <div className="h-8 bg-gray-200 rounded-md animate-pulse w-3/4"></div>

                {/* Content skeleton */}
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded-md animate-pulse w-full"></div>
                  <div className="h-4 bg-gray-200 rounded-md animate-pulse w-full"></div>
                  <div className="h-4 bg-gray-200 rounded-md animate-pulse w-full"></div>
                  <div className="h-4 bg-gray-200 rounded-md animate-pulse w-full"></div>
                  <div className="h-4 bg-gray-200 rounded-md animate-pulse w-3/4"></div>
                </div>

                {/* Date skeleton */}
                <div className="h-4 bg-gray-200 rounded-md animate-pulse w-24"></div>
              </div>

              {/* Image skeleton */}
              <div className="md:w-1/2 aspect-video bg-gray-200 rounded-md animate-pulse"></div>
            </div>
          </div>

          {/* Second article skeleton */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2 space-y-4">
                {/* Title skeleton */}
                <div className="h-10 bg-gray-200 rounded-md animate-pulse w-full"></div>
                <div className="h-8 bg-gray-200 rounded-md animate-pulse w-2/3"></div>

                {/* Content skeleton */}
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded-md animate-pulse w-full"></div>
                  <div className="h-4 bg-gray-200 rounded-md animate-pulse w-full"></div>
                  <div className="h-4 bg-gray-200 rounded-md animate-pulse w-full"></div>
                  <div className="h-4 bg-gray-200 rounded-md animate-pulse w-full"></div>
                  <div className="h-4 bg-gray-200 rounded-md animate-pulse w-2/3"></div>
                </div>

                {/* Date skeleton */}
                <div className="h-4 bg-gray-200 rounded-md animate-pulse w-24"></div>
              </div>

              {/* Image skeleton */}
              <div className="md:w-1/2 aspect-video bg-gray-200 rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Sidebar - 1/3 width */}
        <div className="space-y-6">
          {/* Most Read header */}
          <div className="flex justify-between items-center">
            <div className="h-6 bg-gray-200 rounded-md animate-pulse w-32"></div>
            <div className="h-6 bg-gray-200 rounded-md animate-pulse w-6"></div>
          </div>

          {/* Most read articles list */}
          <div className="space-y-6">
            {/* Article 1 */}
            <div className="flex gap-4">
              <div className="w-full space-y-3">
                <div className="aspect-video bg-gray-200 rounded-md animate-pulse w-full"></div>
                <div className="flex gap-2 items-center">
                  <div className="h-5 bg-gray-200 rounded-full animate-pulse w-5"></div>
                  <div className="h-4 bg-gray-200 rounded-md animate-pulse w-full"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded-md animate-pulse w-24"></div>
              </div>
            </div>

            {/* Article 2 */}
            <div className="flex gap-4">
              <div className="w-full space-y-3">
                <div className="flex gap-2 items-center">
                  <div className="h-5 bg-gray-200 rounded-full animate-pulse w-5"></div>
                  <div className="h-4 bg-gray-200 rounded-md animate-pulse w-full"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded-md animate-pulse w-24"></div>
              </div>
            </div>

            {/* Article 3 */}
            <div className="flex gap-4">
              <div className="w-full space-y-3">
                <div className="flex gap-2 items-center">
                  <div className="h-5 bg-gray-200 rounded-full animate-pulse w-5"></div>
                  <div className="h-4 bg-gray-200 rounded-md animate-pulse w-full"></div>
                </div>
                <div className="h-4 bg-gray-200 rounded-md animate-pulse w-24"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
