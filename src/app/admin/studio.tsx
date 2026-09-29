'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Activity, ArrowDownRight, ArrowUpRight, BookOpenText, Check, ChevronDown, CircleHelp, FileText, ExternalLink, LayoutDashboard, LogOut, Menu, Plus, Search, Settings2, ShieldCheck, ShoppingBag, X } from 'lucide-react';
import { createSupabaseBrowserClient } from '@/lib/supabase/browser';

type Kind = 'article' | 'guide' | 'page' | 'resource' | 'setting';
type Entry = { id: string; kind: Kind; slug: string; title: string; summary: string; status: 'draft' | 'published'; payload: Record<string, string>; updated_at: string };
type Draft = { id?: string; kind: Kind; slug: string; title: string; summary: string; status: 'draft' | 'published'; category: string; image: string; body: string; price: string; selar_url: string; seo_description: string };
const types: {id: Kind; label: string; icon: typeof FileText}[] = [
  {id:'article',label:'Articles',icon:FileText}, {id:'guide',label:'Health guides',icon:BookOpenText}, {id:'page',label:'Site pages',icon:LayoutDashboard}, {id:'resource',label:'Resources',icon:ShoppingBag}, {id:'setting',label:'Site settings',icon:Settings2},
];
const emptyDraft = (kind:Kind='article'):Draft=>({kind,slug:'',title:'',summary:'',status:'draft',category:'',image:'',body:'',price:'',selar_url:'',seo_description:''});
const humanDate=(date:string)=>date?new Intl.DateTimeFormat('en',{day:'numeric',month:'short',year:'numeric'}).format(new Date(date)):'—';

export function AdminStudio() {
  const router=useRouter();
  const [entries,setEntries]=useState<Entry[]>([]);
  const [active,setActive]=useState<Kind|'all'>('all');
  const [search,setSearch]=useState('');
  const [busy,setBusy]=useState(true);
  const [saving,setSaving]=useState(false);
  const [error,setError]=useState('');
  const [userEmail,setUserEmail]=useState('');
  const [modal,setModal]=useState(false);
  const [draft,setDraft]=useState<Draft>(emptyDraft());
  const [mobileNav,setMobileNav]=useState(false);

  async function load() {
    setBusy(true); setError('');
    try {
      const supabase=createSupabaseBrowserClient();
      const {data:userData}=await supabase.auth.getUser();
      setUserEmail(userData.user?.email||'Owner');
      const {data,error:queryError}=await supabase.from('admin_content').select('*').order('updated_at',{ascending:false});
      if(queryError) throw queryError;
      setEntries((data||[]) as unknown as Entry[]);
    } catch(err) { setError(err instanceof Error?err.message:'Could not load the content library. Check your Supabase setup and table migration.'); }
    finally { setBusy(false); }
  }
  useEffect(()=>{void load();},[]);

  const filtered=useMemo(()=>entries.filter(e=>(active==='all'||e.kind===active)&&`${e.title} ${e.slug} ${e.summary}`.toLowerCase().includes(search.toLowerCase())),[entries,active,search]);
  const counts=useMemo(()=>({all:entries.length,published:entries.filter(e=>e.status==='published').length,drafts:entries.filter(e=>e.status==='draft').length}),[entries]);
  function openNew(kind:Kind=active==='all'?'article':active) { setDraft(emptyDraft(kind));setModal(true); }
  function openEdit(entry:Entry) { const p=entry.payload||{};setDraft({id:entry.id,kind:entry.kind,slug:entry.slug,title:entry.title,summary:entry.summary,status:entry.status,category:p.category||'',image:p.image||'',body:p.body||'',price:p.price||'',selar_url:p.selar_url||'',seo_description:p.seo_description||''});setModal(true); }
  async function save(event:React.FormEvent<HTMLFormElement>) {
    event.preventDefault();setSaving(true);setError('');
    const payload={category:draft.category,image:draft.image,body:draft.body,price:draft.price,selar_url:draft.selar_url,seo_description:draft.seo_description};
    const row={kind:draft.kind,slug:draft.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g,'-').replace(/^-|-$/g,''),title:draft.title.trim(),summary:draft.summary.trim(),status:draft.status,payload};
    if(draft.kind==='guide'&&draft.selar_url&&!/^https:\/\/(www\.)?selar\.(co|com)(\/|$)/i.test(draft.selar_url)){setError('Use the full HTTPS product link from your Selar dashboard.');setSaving(false);return;}
    try {
      const supabase=createSupabaseBrowserClient();
      const result=draft.id?await supabase.from('admin_content').update(row).eq('id',draft.id):await supabase.from('admin_content').insert(row);
      if(result.error)throw result.error;
      setModal(false);await load();
    } catch(err) {setError(err instanceof Error?err.message:'Could not save this item.');}
    finally {setSaving(false);}
  }
  async function remove(entry:Entry) {
    if(!window.confirm(`Permanently delete “${entry.title}”?`))return;
    try {const supabase=createSupabaseBrowserClient();const {error}=await supabase.from('admin_content').delete().eq('id',entry.id);if(error)throw error;await load();}
    catch(err){setError(err instanceof Error?err.message:'Could not delete the item.');}
  }
  async function signOut(){try{const supabase=createSupabaseBrowserClient();await supabase.auth.signOut();}finally{router.replace('/admin/login');router.refresh();}}

  return <div className="admin-shell">
    <aside className={`admin-sidebar ${mobileNav?'admin-sidebar-open':''}`}>
      <div className="admin-sidebar-top"><Link href="/" className="admin-mark" aria-label="Nurse Lizzy Health"><img src="/nurse-lizzy-health-mark.svg" width="39" height="39" alt=""/><span>NURSE LIZZY<span>HEALTH STUDIO</span></span></Link><button className="admin-mobile-close" onClick={()=>setMobileNav(false)} aria-label="Close menu"><X size={19}/></button></div>
      <div className="admin-nav-label">WORKSPACE</div><button onClick={()=>{setActive('all');setMobileNav(false)}} className={`admin-nav-item ${active==='all'?'active':''}`}><LayoutDashboard size={17}/> Overview <span className="admin-nav-count">{counts.all}</span></button>
      <div className="admin-nav-label admin-nav-label-spaced">CONTENT</div>{types.map(t=><button key={t.id} onClick={()=>{setActive(t.id);setMobileNav(false)}} className={`admin-nav-item ${active===t.id?'active':''}`}><t.icon size={17}/>{t.label}<span className="admin-nav-count">{entries.filter(e=>e.kind===t.id).length}</span></button>)}
      <div className="admin-sidebar-bottom"><div className="admin-owner"><div className="admin-owner-avatar">{userEmail.slice(0,1).toUpperCase()}</div><span><strong>Site owner</strong><small>{userEmail}</small></span><ChevronDown size={14}/></div><button className="admin-signout" onClick={signOut}><LogOut size={16}/> Sign out</button><Link href="/" className="admin-public-link" target="_blank">View public website <ExternalLink size={14}/></Link></div>
    </aside>
    {mobileNav&&<button className="admin-nav-shade" onClick={()=>setMobileNav(false)} aria-label="Close navigation"/>}
    <main className="admin-main"><header className="admin-topbar"><button className="admin-menu-trigger" onClick={()=>setMobileNav(true)} aria-label="Open navigation"><Menu size={21}/></button><div className="admin-breadcrumb"><span>Workspace</span><span>/</span><strong>{active==='all'?'Overview':types.find(t=>t.id===active)?.label}</strong></div><div className="admin-top-actions"><span className="admin-secure-chip"><ShieldCheck size={14}/> Private workspace</span><button className="admin-top-avatar" aria-label={`Signed in as ${userEmail}`}>{userEmail.slice(0,1).toUpperCase()}</button></div></header>
      <div className="admin-content"><div className="admin-page-heading"><div><span className="admin-kicker admin-kicker-dark">NURSE LIZZY HEALTH · CONTENT STUDIO</span><h1>{active==='all'?'Good morning.':types.find(t=>t.id===active)?.label}</h1><p>Keep your health education clear, current, and thoughtfully cared for.</p></div><button className="admin-primary-button" onClick={()=>openNew()}><Plus size={17}/> New content</button></div>
        {error&&<div className="admin-alert admin-alert-wide" role="alert"><CircleHelp size={17}/><span>{error}</span><button onClick={()=>setError('')} aria-label="Dismiss"><X size={16}/></button></div>}
        <div className="admin-metrics"><div className="admin-metric-card"><div className="admin-metric-top"><span>CONTENT ITEMS</span><span className="admin-metric-icon"><FileText size={17}/></span></div><strong>{busy?'—':counts.all.toString().padStart(2,'0')}</strong><small>Across your workspace</small></div><div className="admin-metric-card"><div className="admin-metric-top"><span>READY TO PUBLISH</span><span className="admin-metric-icon admin-icon-green"><Check size={17}/></span></div><strong>{busy?'—':counts.published.toString().padStart(2,'0')}</strong><small>Marked published in the library</small></div><div className="admin-metric-card"><div className="admin-metric-top"><span>IN DRAFT</span><span className="admin-metric-icon admin-icon-amber"><Activity size={17}/></span></div><strong>{busy?'—':counts.drafts.toString().padStart(2,'0')}</strong><small>Work in progress</small></div><div className="admin-metric-card admin-sync-card"><div className="admin-metric-top"><span>PUBLIC SITE SYNC</span><span className="admin-sync-dot"/></div><strong>Setup needed</strong><small>Connect content publishing after backend setup</small></div></div>
        <section className="admin-library"><div className="admin-library-heading"><div><span className="admin-kicker admin-kicker-dark">YOUR LIBRARY</span><h2>{active==='all'?'Recent content':`Your ${types.find(t=>t.id===active)?.label.toLowerCase()}`}</h2></div><div className="admin-library-tools"><label className="admin-search"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search content" aria-label="Search content"/>{search&&<button onClick={()=>setSearch('')} aria-label="Clear search"><X size={14}/></button>}</label><button className="admin-filter-button" onClick={()=>setActive(active==='all'?'article':'all')}>{active==='all'?'All types':'All content'}<ChevronDown size={15}/></button></div></div>
          <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>CONTENT</th><th>TYPE</th><th>STATUS</th><th>LAST UPDATED</th><th><span className="sr-only">Actions</span></th></tr></thead><tbody>{busy?<tr><td colSpan={5} className="admin-table-message">Connecting to your private content library…</td></tr>:filtered.length===0?<tr><td colSpan={5} className="admin-table-message"><span className="admin-empty-icon"><FileText size={20}/></span><strong>{entries.length?'No matching entries':'Your workspace is ready for its first entry'}</strong><span>{entries.length?'Try another search or content section.':'Start with a blog article, health guide, site page, or Selar product link.'}</span>{!entries.length&&<button className="admin-text-button" onClick={()=>openNew('article')}>Create your first entry <ArrowUpRight size={15}/></button>}</td></tr>:filtered.map(entry=><tr key={entry.id}><td><button className="admin-content-cell" onClick={()=>openEdit(entry)}><span className="admin-content-type-icon">{entry.kind==='guide'?<BookOpenText size={17}/>:entry.kind==='page'?<LayoutDashboard size={17}/>:entry.kind==='resource'?<ShoppingBag size={17}/>:<FileText size={17}/>}</span><span><strong>{entry.title}</strong><small>/{entry.slug}</small></span></button></td><td><span className="admin-kind-pill">{types.find(t=>t.id===entry.kind)?.label||entry.kind}</span></td><td><span className={`admin-status ${entry.status}`}><i/>{entry.status==='published'?'Published':'Draft'}</span></td><td className="admin-date">{humanDate(entry.updated_at)}</td><td><div className="admin-row-actions"><button onClick={()=>openEdit(entry)} aria-label={`Edit ${entry.title}`}><ArrowUpRight size={16}/></button><button onClick={()=>remove(entry)} aria-label={`Delete ${entry.title}`}><X size={16}/></button></div></td></tr>)}</tbody></table></div>
          <div className="admin-table-footer"><span>Showing {filtered.length} of {entries.length} entries</span><button onClick={()=>void load()}><Activity size={14}/> Refresh library</button></div>
        </section>
        <div className="admin-bottom-notice"><div className="admin-notice-icon"><ShieldCheck size={17}/></div><p><strong>Private by design.</strong> Owner-only login, database row policies, and a protected admin route keep this workspace separate from visitors.</p><Link href="/admin/login" className="admin-notice-link">Security <ArrowUpRight size={14}/></Link></div>
        <p className="admin-legal-note">Health content should remain educational, evidence-informed, and not a substitute for professional care. Confirm sources before publishing.</p>
      </div>
    </main>
    {modal&&<div className="admin-modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)setModal(false)}}><section className="admin-editor" role="dialog" aria-modal="true" aria-labelledby="editor-title"><header className="admin-editor-head"><div><span className="admin-kicker admin-kicker-dark">CONTENT EDITOR</span><h2 id="editor-title">{draft.id?'Edit content':'Create content'}</h2></div><button onClick={()=>setModal(false)} className="admin-editor-close" aria-label="Close editor"><X size={19}/></button></header><form onSubmit={save} className="admin-editor-form"><div className="admin-form-grid"><label>Content type<select value={draft.kind} onChange={e=>setDraft({...draft,kind:e.target.value as Kind})}>{types.map(t=><option key={t.id} value={t.id}>{t.label}</option>)}</select></label><label>Publishing status<select value={draft.status} onChange={e=>setDraft({...draft,status:e.target.value as Draft['status']})}><option value="draft">Draft</option><option value="published">Published</option></select></label><label className="admin-form-full">Title<input required value={draft.title} onChange={e=>setDraft({...draft,title:e.target.value})} placeholder="Clear, helpful title"/></label><label>URL slug<input required value={draft.slug} onChange={e=>setDraft({...draft,slug:e.target.value})} placeholder="a-clear-helpful-slug"/></label><label>Category / topic<input value={draft.category} onChange={e=>setDraft({...draft,category:e.target.value})} placeholder="e.g. Women's health"/></label><label className="admin-form-full">Summary / introduction<textarea rows={3} value={draft.summary} onChange={e=>setDraft({...draft,summary:e.target.value})} placeholder="A short, useful introduction"/></label><label className="admin-form-full">Main content<textarea rows={8} value={draft.body} onChange={e=>setDraft({...draft,body:e.target.value})} placeholder="Write or paste the article, page or resource content here…"/></label><label>Cover image URL<input value={draft.image} onChange={e=>setDraft({...draft,image:e.target.value})} placeholder="https://…"/></label><label>SEO description<input value={draft.seo_description} onChange={e=>setDraft({...draft,seo_description:e.target.value})} placeholder="Optional search description"/></label>{draft.kind==='guide'&&<><label>Price (e.g. ₦5,000)<input value={draft.price} onChange={e=>setDraft({...draft,price:e.target.value})} placeholder="Set the published price"/></label><label>Selar checkout URL<input type="url" value={draft.selar_url} onChange={e=>setDraft({...draft,selar_url:e.target.value})} placeholder="https://selar.co/…"/></label></>}</div>{error&&<div className="admin-form-error" role="alert">{error}</div>}<div className="admin-editor-foot"><button type="button" className="admin-cancel-button" onClick={()=>setModal(false)}>Cancel</button><button type="submit" className="admin-primary-button" disabled={saving}>{saving?'Saving…':draft.id?'Save changes':'Save entry'} <ArrowDownRight size={15}/></button></div></form></section></div>}
  </div>;
}
