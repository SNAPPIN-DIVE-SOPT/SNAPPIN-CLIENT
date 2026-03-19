import { NextResponse, type NextRequest } from 'next/server';

const LOGIN_RESTRICTED_PATHS = ['/login'];
// 로그인이 필요한 페이지 (인증이 필요한 페이지)
const AUTH_REQUIRED_PATHS = ['/photographers/profile', '/profile'];

function isPathMatch(pathname: string, basePath: string) {
  return pathname === basePath || pathname.startsWith(`${basePath}/`);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('AccessToken')?.value;

  //  로그인 상태면 로그인 페이지 접근 차단
  if (accessToken && LOGIN_RESTRICTED_PATHS.some((p) => isPathMatch(pathname, p))) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 비로그인이면 보호 페이지 접근 차단
  const isAuthRequired = AUTH_REQUIRED_PATHS.some((p) => isPathMatch(pathname, p));
  if (isAuthRequired && !accessToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // 정적 파일 제외
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
