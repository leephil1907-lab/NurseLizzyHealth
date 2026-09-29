import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const adminEmail = process.env.ADMIN_EMAIL;
  const isLogin = request.nextUrl.pathname === '/admin/login';
  if (!url || !anon || !adminEmail) {
    if (!isLogin) {
      const destination = request.nextUrl.clone();
      destination.pathname = '/admin/login';
      destination.searchParams.set('setup', '1');
      return NextResponse.redirect(destination);
    }
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });
  const supabase = createServerClient(url, anon, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const { data: { user } } = await supabase.auth.getUser();
  const isAdmin = Boolean(
    user && adminEmail && user.email?.toLowerCase() === adminEmail.toLowerCase() &&
    user.app_metadata?.role === 'admin'
  );
  if (!isLogin && !isAdmin) {
    const destination = request.nextUrl.clone();
    destination.pathname = '/admin/login';
    destination.searchParams.set('next', request.nextUrl.pathname);
    if (user) destination.searchParams.set('error', 'unauthorized');
    return NextResponse.redirect(destination);
  }
  if (isLogin && isAdmin) {
    const destination = request.nextUrl.clone();
    destination.pathname = '/admin';
    destination.search = '';
    return NextResponse.redirect(destination);
  }
  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};
