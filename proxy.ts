import createMiddleware from 'next-intl/middleware';
import { routing } from './navigation';
import type { NextRequest } from 'next/server';

const handleRequest = createMiddleware(routing);

export function proxy(request: NextRequest) {
  return handleRequest(request);
}

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Static files (e.g. favicon.ico)
  // - Next.js internals (e.g. _next)
  matcher: ['/((?!api|_next|.*\\..*).*)']
};

