import { getAllCategory } from "@/utils/backend/category";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await getAllCategory();

    if (response.statusCode === 200) {
      return NextResponse.json({
        status: response.statusCode,
        message: response.message,
        data: response.data,
      });
    }

    return NextResponse.json({
      status: response.statusCode,
      message: response.message,
      data: [],
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({
      status: 500,
      message: error,
      data: [],
    });
  }
}
