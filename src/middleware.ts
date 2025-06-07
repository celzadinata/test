import { type NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Routes yang perlu dilindungi dari user yang sudah login
const authRoutes = ["/login", "/daftar", "/masuk"];

// Routes yang memerlukan authentication
const protectedRoutes = ["/dashboard", "/profile", "/admin"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // Function untuk verify JWT token
  async function verifyToken(token: string): Promise<boolean> {
    try {
      const secret = new TextEncoder().encode(
        process.env.NEXT_PUBLIC_JWT_SECRET || "your-secret-key"
      );
      await jwtVerify(token, secret);
      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  }

  // Cek apakah user sudah login (ada token valid)
  const isAuthenticated = token ? await verifyToken(token) : false;

  // Jika user sudah login dan mencoba akses halaman auth (login/daftar)
  if (isAuthenticated && authRoutes.includes(pathname)) {
    // Redirect ke home page
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Jika user belum login dan mencoba akses halaman yang dilindungi
  if (
    !isAuthenticated &&
    protectedRoutes.some((route) => pathname.startsWith(route))
  ) {
    // Redirect ke login page
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Lanjutkan request normal
  return NextResponse.next();
}

// Konfigurasi matcher - OPSI 1: Regex (lebih efisien)
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
