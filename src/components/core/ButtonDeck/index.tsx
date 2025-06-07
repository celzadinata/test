"use client";

import { Printer, Share2 } from "lucide-react";
import { useState } from "react";

export default function ButtonDeck() {
  const [shareMessage, setShareMessage] = useState<string>("");

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const shareData = {
      title: document.title,
      text: "Check out this article on warungjurnalis.com!",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(shareData.url);
        setShareMessage("Link copied to clipboard!");
        setTimeout(() => setShareMessage(""), 3000); // Clear message after 3 seconds
      }
    } catch (err) {
      setShareMessage(`Failed to share. Please try again. ${err}`);
      setTimeout(() => setShareMessage(""), 3000);
    }
  };

  return (
    <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
      <span>warungjurnalis.com</span>
      <div className="flex items-center gap-2">
        <button
          onClick={handleShare}
          className="hover:text-gray-800 cursor-pointer"
          aria-label="Share this article"
        >
          <Share2 width={16} height={16} />
        </button>
        <button
          onClick={handlePrint}
          className="hover:text-gray-800 cursor-pointer"
          aria-label="Print this page"
        >
          <Printer width={16} height={16} />
        </button>
      </div>
      {shareMessage && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-md">
          {shareMessage}
        </div>
      )}
    </div>
  );
}
