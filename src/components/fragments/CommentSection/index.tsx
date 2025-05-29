"use client";

import { useState, FormEvent } from "react";

import { MessageCircleMore } from "lucide-react";

export default function CommentSection() {
  const [comment, setComment] = useState<string>("");
  const [dropdowns, setDropdowns] = useState<{
    dropdownComment1: boolean;
    dropdownComment2: boolean;
    dropdownComment3: boolean;
    dropdownComment4: boolean;
  }>({
    dropdownComment1: false,
    dropdownComment2: false,
    dropdownComment3: false,
    dropdownComment4: false,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Comment submitted:", comment);
    setComment("");
  };

  const toggleDropdown = (dropdownId: keyof typeof dropdowns) => {
    setDropdowns((prev) => ({
      ...prev,
      [dropdownId]: !prev[dropdownId],
    }));
  };

  return (
    <div className="bg-white border-t border-black py-4 lg:py-16 antialiased">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Comments (20)
          </h2>
        </div>
        <form className="mb-6" onSubmit={handleSubmit}>
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows={6}
              className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
              placeholder="Write a comment..."
              value={comment}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setComment(e.target.value)
              }
              required
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 hover:bg-blue-800"
          >
            Post comment
          </button>
        </form>
        <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
          {/* <footer className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                <Image
                  className="mr-2 w-6 h-6 rounded-full"
                  src={Dummy}
                  alt="Michael Gough"
                  width={24}
                  height={24}
                />
                Michael Gough
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <time dateTime="2022-02-08" title="February 8th, 2022">
                  Feb. 8, 2022
                </time>
              </p>
            </div>
          </footer>
          <p className="text-gray-500 dark:text-gray-400">
            Very straight-to-point article. Really worth time reading. Thank
            you! But tools are just the instruments for the UX designers. The
            knowledge of the design tools are as important as the creation of
            the design strategy.
          </p> */}
          <div className="flex flex-col items-center justify-center">
            <MessageCircleMore className="w-88 h-88 opacity-40" />
            <h1 className="text-2xl font-bold opacity-40">
              Belum ada Komentar
            </h1>
          </div>
        </article>
      </div>
    </div>
  );
}
