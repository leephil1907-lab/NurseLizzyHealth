'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { InteractiveHeader } from './interactive';

function WhatsAppIcon() {
  return <svg viewBox="0 0 32 32" width="21" height="21" aria-hidden="true"><path fill="currentColor" d="M16 3.2a12.2 12.2 0 0 0-10.4 18.6L4 28l6.4-1.7A12.2 12.2 0 1 0 16 3.2Zm0 22.1a9.9 9.9 0 0 1-5-1.4l-.4-.2-3.8 1 1-3.7-.3-.4A9.9 9.9 0 1 1 16 25.3Zm5.4-7.4c-.3-.2-1.8-.9-2.1-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.2 8.2 0 0 1-2.5-1.5 9 9 0 0 1-1.7-2.1c-.2-.3 0-.5.1-.7l.5-.5.3-.5c.1-.2 0-.4 0-.6l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.4 1 2.8 1.2 3 2 3.1 5 4.4a16 16 0 0 0 1.7.6c.7.2 1.3.2 1.8.1.6-.1 1.8-.7 2-1.4s.3-1.3.2-1.4-.2-.2-.5-.4Z"/></svg>;
}
function Footer() {
  const groups = [
    {heading:'Explore',links:[['Home','/'],['Health Blog','/blog'],['Knowledge Hub','/hub'],['Health Guides','/guides'],['Free Resources','/resources'],['About Nurse Lizzy','/about']]},
    {heading:'Learn',links:[['Health explainers','/learn'],['Learning paths','/start-here'],['A–Z glossary','/glossary'],['Learning tools','/tools'],['Saved articles','/saved'],['Suggest a topic','/ask']]},
    {heading:'Information',links:[['Contact','/contact'],['Privacy policy','/privacy'],['Terms of use','/terms'],['Health disclaimer','/disclaimer']]},
  ];
  return <footer className="footer"><div className="footer-accent"/><div className="wrap"><div className="footer-grid"><div className="footer-brand"><Link href="/" className="brand brand-full"><img src="/nurse-lizzy-health-logo-light.svg" alt="Nurse Lizzy Health — Care, Clarity, Confidence" width="240" height="44"/></Link><p className="footer-description">Clear, compassionate health education for everyday life. Learn at your own pace and bring your questions to a qualified health professional.</p><a className="footer-whatsapp" href="https://wa.me/2349150484921?text=Hello%20Nurse%20Lizzy%2C%20I%20have%20a%20question." target="_blank" rel="noopener noreferrer"><WhatsAppIcon/><span>WhatsApp support</span><span className="footer-arrow" aria-hidden="true">↗</span></a></div>{groups.map(g=><nav className="footer-column" aria-label={g.heading} key={g.heading}><h2>{g.heading}</h2><ul className="footer-links">{g.links.map(([label,href])=><li key={href}><Link href={href}>{label}</Link></li>)}</ul></nav>)}</div><div className="footer-bottom"><span>© {new Date().getFullYear()} Nurse Lizzy Health</span><span>Health education only—not a substitute for personal medical advice.</span></div></div></footer>;
}

export function SiteChrome() {
  const pathname = usePathname();
  if (pathname?.startsWith('/admin')) return null;
  return <><InteractiveHeader/><Footer/><a className="whatsapp-float" href="https://wa.me/2349150484921?text=Hello%20Nurse%20Lizzy%2C%20I%20have%20a%20question." target="_blank" rel="noopener noreferrer" aria-label="Chat with Nurse Lizzy Health on WhatsApp"><WhatsAppIcon/><span>Chat with us</span></a></>;
}
