'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Eye, EyeOff, HeartPulse, LockKeyhole, ShieldCheck } from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';

export function AdminLogin({ configured, nextPath, unauthorized }: { configured: boolean; nextPath: string; unauthorized: boolean }) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const safeNext = nextPath.startsWith('/') && !nextPath.startsWith('//') ? nextPath : '/admin';

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setBusy(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error: loginError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (loginError) throw loginError;
      router.replace(safeNext); router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed. Please check your details and try again.');
    } finally { setBusy(false); }
  }

  async function resetPassword() {
    if (!email.trim()) { setError('Enter your owner email above first, then choose “Reset password”.'); return; }
    setError(''); setBusy(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/auth/callback?next=%2Fadmin%2Fupdate-password` });
      if (resetError) throw resetError;
      setError('If that address belongs to an admin account, a password reset email is on its way.');
    } catch (err) { setError(err instanceof Error ? err.message : 'Could not send the reset email.'); }
    finally { setBusy(false); }
  }

  return <main className="admin-login-page">
    <section className="admin-login-story">
      <Link href="/" className="admin-login-brand" aria-label="Nurse Lizzy Health home"><img src="/nurse-lizzy-health-logo-light.svg" alt="Nurse Lizzy Health" width="255" height="46"/></Link>
      <div className="admin-login-story-copy"><span className="admin-kicker"><span/> PRIVATE OWNER ACCESS</span><h1>Thoughtful care.<br/><em>Thoughtful control.</em></h1><p>Your private workspace for keeping the Nurse Lizzy Health website clear, current, and caring.</p></div>
      <div className="admin-story-foot"><HeartPulse size={17}/><span>Care, clarity, confidence.</span></div>
      <div className="admin-story-number">NLH&nbsp; / &nbsp;ADMIN&nbsp; 01</div>
    </section>
    <section className="admin-login-panel"><div className="admin-login-card">
      <div className="admin-login-icon"><LockKeyhole size={19}/></div><span className="admin-kicker admin-kicker-dark">OWNER WORKSPACE</span><h2>Welcome back.</h2><p className="admin-login-sub">Sign in with your private administrator account.</p>
      {unauthorized && <div className="admin-alert" role="alert">That account does not have owner access to this workspace.</div>}
      {!configured ? <div className="admin-setup-alert"><strong>One-time setup required</strong><p>Connect a Supabase project and set the private environment variables before owner sign-in is enabled. No public data or passwords are exposed here.</p><p>Follow <strong>ADMIN_SETUP.md</strong> in the project files to connect Supabase and enable the owner login.</p></div> : <>
        <form onSubmit={submit} className="admin-login-form">
          <label htmlFor="admin-email">Owner email</label><input id="admin-email" type="email" autoComplete="username" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} required />
          <div className="admin-password-label"><label htmlFor="admin-password">Password</label><button type="button" onClick={resetPassword} disabled={busy}>Reset password</button></div>
          <div className="admin-password-wrap"><input id="admin-password" type={showPassword?'text':'password'} autoComplete="current-password" placeholder="Enter your password" value={password} onChange={e=>setPassword(e.target.value)} required/><button type="button" aria-label={showPassword?'Hide password':'Show password'} onClick={()=>setShowPassword(!showPassword)}>{showPassword?<EyeOff size={16}/>:<Eye size={16}/>}</button></div>
          {error && <p className="admin-form-error" role="alert">{error}</p>}
          <button className="admin-submit" disabled={busy}>{busy?'Please wait…':'Sign in securely'} <ArrowRight size={16}/></button>
        </form><div className="admin-login-assurance"><ShieldCheck size={15}/><span>Private access · Protected session · No shared passwords</span></div>
      </>}
      <Link href="/" className="admin-back-link">← Return to the public website</Link>
    </div><span className="admin-login-copyright">© {new Date().getFullYear()} Nurse Lizzy Health</span></section>
  </main>;
}
