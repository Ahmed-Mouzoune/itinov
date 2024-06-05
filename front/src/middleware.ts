import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getMeUserService } from "./services/UserService";

export async function middleware(request: NextRequest) {
  const user = await getMeUserService();
  const currentPath = request.nextUrl.pathname;

  const userUnAuthorized = (!user || ('error' in user) || (user?.confirmed === false));
  
  if (!currentPath.startsWith("/signin") && userUnAuthorized) return NextResponse.redirect(new URL("/signin", request.url));
  // if (currentPath.startsWith("/signin") && !userUnAuthorized) return NextResponse.redirect(new URL("/", request.url));
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
}