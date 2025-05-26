import { loginUser } from "@/utils/backend/auth";
import { DecodeJWT } from "@/utils/helper/decodeJwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const response = await loginUser(body);

    if (response.status !== 200 || !response.data?.token) {
      return NextResponse.json({
        status: response.status,
        message: response.message,
      });
    }

    const token = response.data.token;
    const decoded = DecodeJWT(token);

    let maxAge = 60 * 60;

    if (decoded?.exp && decoded?.iat) {
      maxAge = decoded.exp - decoded.iat;
    }

    const res = NextResponse.json({
      status: response.status,
      message: response.message,
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge,
      path: "/",
    });

    return res;
  } catch (error) {
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
