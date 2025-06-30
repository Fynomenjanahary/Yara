import { NextRequest, NextResponse } from "next/server";
import { getUserRoleFromToken } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const publicPages = ["/", "/sign-in", "/sign-up"];

  console.log("➡️ Middleware triggered:", pathname);

  if (!token) {
    const isPublicPage = publicPages.includes(pathname);
    if (!isPublicPage) {
      console.log("⛔ Redirecting unauthenticated user to /unauthorized");
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
    return NextResponse.next(); // Allow access to public pages
  }

  const role = await getUserRoleFromToken(token);
  console.log("🔐 Role from token:", role);

  if (!role) {
    const res = NextResponse.redirect(new URL("/sign-in", request.url));
    res.cookies.set("token", "", { maxAge: 0, path: "/" });
    return res;
  }

  if (publicPages.includes(pathname)) {
    const redirectTo =
      role === "admin"
        ? "/admin/dashboard"
        : role === "supplier"
          ? "/supplier/dashboard"
          : "/client/dashboard";
    return NextResponse.redirect(new URL(redirectTo, request.url));
  }

  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (pathname.startsWith("/supplier") && role !== "supplier") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (pathname.startsWith("/client") && role !== "client") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
