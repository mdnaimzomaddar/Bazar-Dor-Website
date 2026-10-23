import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user) {
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("callbackURL", request.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/product/:path*"],
};
