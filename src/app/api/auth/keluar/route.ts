import { NextResponse } from "next/server";

export async function POST() {
  try {
    // Buat respons
    const response = NextResponse.json({
      status: 200,
      message: "Logout berhasil",
      data: { isAuthenticated: false },
    });

    // Hapus cookie token dengan mengatur expires ke masa lalu
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: false,
      expires: new Date(0), // Set tanggal kadaluwarsa ke masa lalu
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (err) {
    console.error("Gagal melakukan logout:", err);
    return NextResponse.json(
      {
        status: 500,
        message: "Terjadi kesalahan server saat logout",
        data: { isAuthenticated: false },
      },
      { status: 500 }
    );
  }
}
