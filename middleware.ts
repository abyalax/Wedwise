import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { Permission } from '~/types/entities/permission.types';
import { env } from './common/const/credential';
import { routePermissions } from './lib/routes/permissions';
import { matchPermission } from './lib/utils';

const publicRoutes = ['/auth/register', '/auth/login', '/auth/forgot-password', '/auth/reset-password'];

function getRequiredPermissions(pathname: string): string[] {
  if (routePermissions[pathname]) return routePermissions[pathname];
  for (const [pattern, permissions] of Object.entries(routePermissions)) {
    if (pattern.includes(':') || pattern.includes('*')) {
      if (matchesPattern(pathname, pattern)) return permissions;
    }
  }
  return [];
}

function matchesPattern(pathname: string, pattern: string): boolean {
  const pathSegments = pathname.split('/').filter(Boolean);
  const patternSegments = pattern.split('/').filter(Boolean);
  if (pattern.endsWith('*')) {
    // Catch-all route [...slug]
    const basePattern = patternSegments.slice(0, -1);
    return pathSegments.length >= basePattern.length && basePattern.every((seg, i) => seg.startsWith(':') || seg === pathSegments[i]);
  }
  if (pathSegments.length !== patternSegments.length) return false;
  return patternSegments.every((seg, i) => seg.startsWith(':') || seg === pathSegments[i]);
}

const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function middleware(req: NextRequest) {
  let loginUrl: string | URL;
  try {
    const origin = req.headers.get('origin') ?? '';
    const isAllowedOrigin = allowedOrigins.includes(origin);
    const pathname = req.nextUrl.pathname;
    // ✅ Skip middleware untuk NextAuth API routes
    if (pathname.startsWith('/api/auth')) return NextResponse.next();
    if (publicRoutes.includes(pathname)) return NextResponse.next();
    const token = await getToken({ req, secret: env.JWT_SECRET });
    const userPermissions: string[] = token?.permissions?.map((p: Permission) => p.key) || [];
    const requiredPermissions = getRequiredPermissions(pathname);
    const method = req.method;
    console.log(` ${method} ${pathname} 🔑 Required permissions: `, requiredPermissions);
    const hasPermission = requiredPermissions.every((p) => matchPermission(userPermissions, p));
    console.log(`🛡️  pass middleware: `, hasPermission);
    if (!hasPermission) {
      loginUrl = new URL('/auth/login', req.url);
      loginUrl.searchParams.set('callbackUrl', req.url);
      return NextResponse.redirect(loginUrl);
    }
    // Handle CORS Origin
    const response = NextResponse.next();
    if (isAllowedOrigin) response.headers.set('Access-Control-Allow-Origin', origin);
    Object.entries(corsOptions).forEach(([key, value]) => {
      response.headers.set(key, value);
    });
    return response;
  } catch (error) {
    console.dir((error as Error).message);
    loginUrl = new URL('/auth/login', req.url);
    loginUrl.searchParams.set('callbackUrl', req.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    // Protect semua API routes
    '/api/:path*',
    // Match semua route kecuali:
    // - Next.js static & image
    // - favicon
    // - login
    // - icon
    // - dot-files (/.well-known, .htaccess, dsb)
    // - files dengan extension (.js, .css, .png, .jpg, .svg, dll)
    '/((?!_next/static|_next/image|favicon.ico|icon|\\..+|.+\\..+).*)',
  ],
};
