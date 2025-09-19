import type { NextRequest } from "next/server";
import { authMiddleware } from "next-firebase-auth-edge";
import { serverConfig } from "./server-config";

export async function middleware(request: NextRequest) {
  // Check if the request is for admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // For admin routes, require authentication
    return authMiddleware(request, {
      loginPath: "/api/login",
      logoutPath: "/api/logout",
      apiKey: serverConfig.apiKey,
      cookieName: "AuthToken",
      cookieSignatureKeys: serverConfig.cookieSignatureKeys,
      cookieSerializeOptions: {
        path: "/",
        httpOnly: true,
        secure: false,
        sameSite: "lax" as const,
        maxAge: 12 * 60 * 60 * 24,
      },
      serviceAccount: {
        projectId: serverConfig.projectId,
        clientEmail: serverConfig.clientEmail,
        privateKey: serverConfig.privateKey,
      },
    });
  }

  // For non-admin routes, use the standard auth middleware
  return authMiddleware(request, {
    loginPath: "/api/login",
    logoutPath: "/api/logout",
    apiKey: serverConfig.apiKey,
    cookieName: "AuthToken",
    cookieSignatureKeys: ["Key-Should-Be-at-least-32-bytes-in-length"],
    cookieSerializeOptions: {
      path: "/",
      httpOnly: true,
      secure: false,
      sameSite: "lax" as const,
      maxAge: 12 * 60 * 60 * 24,
    },
    serviceAccount: {
      projectId: serverConfig.projectId,
      clientEmail: serverConfig.clientEmail,
      privateKey: serverConfig.privateKey,
    },
  });
}

export const config = {
  matcher: [
    "/api/login",
    "/api/logout",
    "/admin/:path*", // Protect all admin routes
    "/",
    "/((?!_next|favicon.ico|api|.*\\.).*)",
  ],
};
