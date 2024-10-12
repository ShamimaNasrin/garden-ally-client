import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import { getCurrentUser } from "./service/AuthServices";

const AuthRoutes = ["/login", "/register"];

type Role = keyof typeof roleBasedRoutes;

const roleBasedRoutes = {
  user: ["/news-feed", "/user-dashboard", "/user-profile"],
  admin: ["/admin-profile", "/admin-dashboard"],
};

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = await getCurrentUser();
  // const user = {
  //   name: "shamima",
  //   role: "user",
  // };

  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`/login?redirect=${pathname}`, request.url)
      );
    }
  }

  if (user?.role && roleBasedRoutes[user?.role as Role]) {
    const routes = roleBasedRoutes[user?.role as Role];

    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/news-feed",
    "/user-dashboard",
    "/user-profile",
    "/admin-profile",
    "/admin-dashboard",
    "/login",
    "/register",
  ],
};