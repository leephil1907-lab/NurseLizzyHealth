import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import './admin.css';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export const metadata: Metadata = { title: 'Admin Studio | Nurse Lizzy Health', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const adminEmail = process.env.ADMIN_EMAIL;
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    const supabase = await createSupabaseServerClient();
    const { data } = supabase ? await supabase.auth.getUser() : { data: { user: null } };
    const user = data.user;
    const isAdmin = Boolean(user && adminEmail && user.email?.toLowerCase() === adminEmail.toLowerCase() && user.app_metadata?.role === 'admin');
    if (user && !isAdmin) redirect('/admin/login?error=unauthorized');
  }
  return <div className="admin-frame">{children}</div>;
}
