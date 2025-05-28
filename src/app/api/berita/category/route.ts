import { getNewsByCategory } from "@/utils/backend/news";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const categoryIdParam = req.nextUrl.searchParams.get("category");
    const categoryId = categoryIdParam || "0";

    const response = await getNewsByCategory(categoryId);

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
