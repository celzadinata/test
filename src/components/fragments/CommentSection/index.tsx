"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { MessageCircleMore, User } from "lucide-react";
import { formatedDate } from "@/utils/helper/FormatedDate";

type Data = {
  id: string;
  news_id: string;
  user_id: string;
  comment: string;
  created_at: string;
  updated_at: string;
};

type Props = {
  comments: Data[];
  newsId: string;
};

export default function CommentSection({ comments, newsId }: Props) {
  const [comment, setComment] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await fetch("/api/berita/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          news_id: newsId,
          comment,
        }),
      });

      const data = await response.json();

      console.log("INI DATA COMMENT: ", data);

      if (data.status === 200) {
        setComment(""); // Reset form setelah sukses
        router.refresh();
        setMessage("Komentar berhasil dikirim!");
      } else {
        if (data.status === 401) {
          setError("Anda harus login untuk mengirim komentar.");
          setTimeout(() => {
            router.push("/masuk"); // Ganti "/masuk" dengan path halaman login Anda
          }, 1000);
        } else {
          setError(data.message || "Gagal mengirim komentar.");
        }
      }
    } catch (err) {
      setError("Terjadi kesalahan server. Silakan coba lagi.");
      console.error("Error submitting comment:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border-t border-black py-4 lg:py-16 antialiased">
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Comments ({comments.length})
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
          {message && <p className="text-green-600 mb-4">{message}</p>}
          {error && <p className="text-red-600 mb-4">{error}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex cursor-pointer items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800 hover:bg-blue-800 disabled:bg-gray-400"
          >
            {isLoading ? "Mengirim..." : "Post comment"}
          </button>
        </form>
        <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
          {comments.length > 0 ? (
            comments.slice(0, 9).map((data: Data, index: number) => (
              <div key={index} className="border-t-1 border-b-1 py-6 px-2">
                <footer className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <div className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                      <User className="w-5 h-5 mr-2" />
                      Michael Gough
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <time
                        dateTime={data.created_at}
                        title={formatedDate(data.created_at)}
                      >
                        {formatedDate(data.created_at)}
                      </time>
                    </p>
                  </div>
                </footer>
                <p className="text-gray-500 dark:text-gray-400">
                  {data.comment}
                </p>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center">
              <MessageCircleMore className="w-88 h-88 opacity-40" />
              <h1 className="text-2xl font-bold opacity-40">
                Belum ada Komentar
              </h1>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
