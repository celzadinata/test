import { getRandomNews } from "@/utils/DummyApi/news";
import { NextResponse } from "next/server";

export async function GET() {
  const randomNews = await getRandomNews();

  if (randomNews) {
    return NextResponse.json({
      status: 200,
      message: "Success",
      data: randomNews,
    });
  }

  return NextResponse.json({
    status: 404,
    message: "Product not found",
    data: {},
  });
}
