import { getNewsByCategory } from "@/utils/backend/news";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const categoryIdParam = req.nextUrl.searchParams.get("category_id");
    const pageParam = req.nextUrl.searchParams.get("page");
    const limitParam = req.nextUrl.searchParams.get("limit");
    const randomParam = req.nextUrl.searchParams.get("random");

    const categoryId = categoryIdParam || "0";
    const page = pageParam || "1";
    const limit = limitParam || "0";
    const random = randomParam || "false";

    const response = await getNewsByCategory(categoryId, page, limit, random);

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
