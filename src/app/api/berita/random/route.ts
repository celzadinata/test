import { getAllRandomNews } from "@/utils/backend/news";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const limitParam = req.nextUrl.searchParams.get("limit");
    const limit = parseInt(limitParam || "0");

    const response = await getAllRandomNews(limit);

    if (response.statusCode === 200) {
      return NextResponse.json({
        status: response.statusCode,
        message: response.message,
        data: response.data, //ADA DATA DATA PAGINATION DISINI
      });
    }

    return NextResponse.json({
      status: response.statusCode,
      message: response.message,
      data: [],
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json({
      status: 500,
      message: error,
      data: [],
    });
  }
}
