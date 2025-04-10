// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const token = request.cookies.get("token")?.value || ""

  const isPublicPath = path === "/auth/login-register"

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/auth/login-register", request.url))
  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/auth/login-register"],
}
