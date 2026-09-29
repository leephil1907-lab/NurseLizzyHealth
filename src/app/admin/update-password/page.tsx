'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, KeyRound } from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';

export default function UpdateAdminPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  async function submit(e: React.FormEvent) {
    e.preventDefault(); setMessage('');
    if (password.length < 12) { setMessage('Choose a password with at least 12 characters.'); return; }
    if (password !== confirm) { setMessage('Those passwords do not match.'); return; }
    setBusy(true);
    try { const supabase=createSupabaseBrowserClient(); const {error}=await supabase.auth.updateUser({password}); if(error) throw error; setMessage('Password updated. Taking you to the admin workspace…'); setTimeout(()=>router.replace('/admin'),900); }
    catch(err){setMessage(err instanceof Error?err.message:'Could not update password.');} finally{setBusy(false);}
  }
  return <main className="admin-update-page"><div className="admin-update-card"><div className="admin-login-icon"><KeyRound size={19}/></div><span className="admin-kicker admin-kicker-dark">SECURE ACCOUNT</span><h1>Choose a new password.</h1><p>Use at least 12 characters that you do not reuse on another site.</p><form onSubmit={submit} className="admin-login-form"><label htmlFor="new-pass">New password</label><input id="new-pass" type="password" autoComplete="new-password" minLength={12} value={password} onChange={e=>setPassword(e.target.value)} required/><label htmlFor="confirm-pass">Confirm password</label><input id="confirm-pass" type="password" autoComplete="new-password" minLength={12} value={confirm} onChange={e=>setConfirm(e.target.value)} required/>{message&&<p className="admin-form-error" role="status">{message}</p>}<button className="admin-submit" disabled={busy}>{busy?'Updating…':'Save password'} <ArrowRight size={16}/></button></form><Link href="/admin/login" className="admin-back-link">← Back to sign in</Link></div></main>;
}
