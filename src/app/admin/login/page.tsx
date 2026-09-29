import type { Metadata } from 'next';
import { AdminLogin } from '../login-form';

export const metadata: Metadata = { title: 'Owner sign in | Nurse Lizzy Health', robots: { index: false, follow: false } };

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  const params = await searchParams;
  const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && process.env.ADMIN_EMAIL);
  return <AdminLogin configured={configured} nextPath={params.next || '/admin'} unauthorized={params.error === 'unauthorized'} />;
}
