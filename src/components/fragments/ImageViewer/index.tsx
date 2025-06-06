"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { ZoomIn, ZoomOut, RotateCw, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatedDate } from "@/utils/helper/FormatedDate";
import type { StaticImageData } from "next/image";

interface ImageViewerProps {
  imageUrl: string | StaticImageData;
  title?: string;
  author?: string;
  date?: string;
}

export default function ImageViewer({
  imageUrl,
  title,
  author,
  date,
}: ImageViewerProps) {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Process the image URL to handle both string URLs and imported images
  const processedImageData = useCallback(() => {
    // If imageUrl is a StaticImageData object (imported image)
    if (
      typeof imageUrl === "object" &&
      imageUrl !== null &&
      "src" in imageUrl
    ) {
      return {
        src: imageUrl.src,
        width: imageUrl.width,
        height: imageUrl.height,
        blurDataURL:
          "blurDataURL" in imageUrl ? imageUrl.blurDataURL : undefined,
        isStatic: true,
      };
    }

    // If imageUrl is a string
    return {
      src: imageUrl,
      width: 1920,
      height: 1080,
      blurDataURL: undefined,
      isStatic: false,
    };
  }, [imageUrl]);

  const { src, width, height, blurDataURL } = processedImageData();

  // Determine if the image is external (for unoptimized prop)
  const isExternal = typeof src === "string" && !src.startsWith("/");

  const zoomIn = useCallback(() => {
    setScale((prev) => Math.min(prev + 0.25, 3));
  }, []);

  const zoomOut = useCallback(() => {
    setScale((prev) => Math.max(prev - 0.25, 0.5));
  }, []);

  const resetZoom = useCallback(() => {
    setScale(1);
    setRotation(0);
  }, []);

  const rotate = useCallback(() => {
    setRotation((prev) => (prev + 90) % 360);
  }, []);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
    setError(null);
  }, []);

  const handleImageError = useCallback(() => {
    setIsLoading(false);
    setError("Gagal memuat gambar. Silakan coba lagi nanti.");
  }, []);

  // Reset state when image URL changes
  useEffect(() => {
    setScale(1);
    setRotation(0);
    setIsLoading(true);
    setError(null);
  }, [imageUrl]);

  // Handle download for both static and external images
  const handleDownload = useCallback(() => {
    window.open(src, "_blank");
  }, [src]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center">
      {/* Main content container */}
      <div className="w-full h-full max-w-6xl max-h-screen mx-auto flex flex-col items-center justify-center p-3 md:p-6">
        {/* Image container */}
        <div className="relative flex-1 flex items-center justify-center w-full">
          {isLoading && (
            <div className="flex flex-col items-center justify-center text-white">
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border-4 border-white border-t-transparent animate-spin mb-3 md:mb-4"></div>
              <p className="text-sm md:text-lg">Memuat gambar...</p>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center justify-center text-white px-4">
              <p className="text-red-400 mb-3 md:mb-4 text-sm md:text-lg text-center">
                {error}
              </p>
              <Button
                variant="outline"
                onClick={() => setIsLoading(true)}
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 text-sm"
              >
                Coba Lagi
              </Button>
            </div>
          )}

          {!error && (
            <div
              className={`relative transition-transform duration-200 ease-out ${
                isLoading ? "opacity-0" : "opacity-100"
              }`}
              style={{
                transform: `scale(${scale}) rotate(${rotation}deg)`,
                cursor: scale > 1 ? "move" : "default",
              }}
            >
              <Image
                src={src || "/placeholder.svg"}
                alt={title || "News Image"}
                width={width}
                height={height}
                className="max-w-[90vw] max-h-[60vh] md:max-w-[75vw] md:max-h-[65vh] lg:max-w-[70vw] lg:max-h-[70vh] object-contain shadow-xl"
                priority
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 75vw, 70vw"
                onLoad={handleImageLoad}
                onError={handleImageError}
                unoptimized={isExternal}
                placeholder={blurDataURL ? "blur" : "empty"}
                blurDataURL={blurDataURL}
              />
            </div>
          )}
        </div>

        {/* Image info and controls - positioned at the bottom */}
        <div className="w-full mt-2 md:mt-4">
          {/* Image info */}
          {title && !isLoading && !error && (
            <div className="text-white text-center mb-3 md:mb-4 max-w-xl md:max-w-2xl mx-auto px-4">
              <h3 className="font-medium text-sm md:text-base lg:text-lg mb-1 line-clamp-2">
                {title}
              </h3>
              {(author || date) && (
                <div className="flex items-center justify-center gap-2 md:gap-3 text-xs md:text-sm text-gray-300">
                  {author && <span className="font-medium">{author}</span>}
                  {author && date && <span className="text-gray-500">•</span>}
                  {date && <span>{formatedDate(date)}</span>}
                </div>
              )}
            </div>
          )}

          {/* Controls */}
          <div className="flex justify-center">
            <div className="flex items-center gap-2 md:gap-3 bg-black/40 backdrop-blur-sm rounded-full px-4 md:px-6 py-2 md:py-3">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 rounded-full h-8 w-8 md:h-10 md:w-10"
                onClick={zoomOut}
                disabled={scale <= 0.5 || isLoading || !!error}
              >
                <ZoomOut className="h-4 w-4 md:h-5 md:w-5" />
                <span className="sr-only">Zoom Out</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 rounded-full px-3 md:px-4 h-8 md:h-10 min-w-[60px] md:min-w-[80px] text-xs md:text-sm"
                onClick={resetZoom}
                disabled={isLoading || !!error}
              >
                {Math.round(scale * 100)}%
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 rounded-full h-8 w-8 md:h-10 md:w-10"
                onClick={zoomIn}
                disabled={scale >= 3 || isLoading || !!error}
              >
                <ZoomIn className="h-4 w-4 md:h-5 md:w-5" />
                <span className="sr-only">Zoom In</span>
              </Button>

              <div className="w-px h-4 md:h-6 bg-white/30 mx-1"></div>

              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 rounded-full h-8 w-8 md:h-10 md:w-10"
                onClick={rotate}
                disabled={isLoading || !!error}
              >
                <RotateCw className="h-4 w-4 md:h-5 md:w-5" />
                <span className="sr-only">Rotate</span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 rounded-full h-8 w-8 md:h-10 md:w-10"
                onClick={handleDownload}
                disabled={isLoading || !!error}
              >
                <Download className="h-4 w-4 md:h-5 md:w-5" />
                <span className="sr-only">Download</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
