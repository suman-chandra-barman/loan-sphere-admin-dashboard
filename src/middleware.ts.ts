import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const buildSigninRedirect = (request: NextRequest) => {
  const url = request.nextUrl.clone();
  url.pathname = "/signin";
  url.searchParams.set("next", request.nextUrl.pathname);
  return NextResponse.redirect(url);
};

const hasAuthToken = (request: NextRequest): boolean => {
  return Boolean(request.cookies.get("accessToken")?.value);
};

const getUserRole = (request: NextRequest): string | null => {
  const rawUser = request.cookies.get("user")?.value;
  if (!rawUser) return null;

  try {
    const parsed = JSON.parse(decodeURIComponent(rawUser));
    return typeof parsed?.role === "string" ? parsed.role : null;
  } catch {
    return null;
  }
};

export function middleware(request: NextRequest) {
  if (hasAuthToken(request)) {
    if (request.nextUrl.pathname.startsWith("/users")) {
      const role = getUserRole(request);
      if (role !== "admin") {
        return buildSigninRedirect(request);
      }
    }
    return NextResponse.next();
  }

  return buildSigninRedirect(request);
}

export const config = {
  matcher: [
    "/",
    "/ai-insights/:path*",
    "/loan-management/:path*",
    "/my-profile/:path*",
    "/applications/:path*",
    "/users/:path*",
    "/supports/:path*",
  ],
};
