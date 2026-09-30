import './globals.css';
import './motionsites.css';
import './resources/resource-detail.css';
import './resources/visual-guides/visual-guides.css';
import './resource-library.css';
import type { Metadata, Viewport } from 'next';
import { SiteChrome, SiteFooter } from './chrome';
import { ServiceWorkerRegister } from './service-worker-register';

export const metadata: Metadata = {
  metadataBase: new URL('https://nurselizzyhealth.vercel.app'),
  title: { default: 'Nurse Lizzy Health | Better health starts with better information', template: '%s | Nurse Lizzy Health' },
  applicationName: 'Nurse Lizzy Health Tips', description: 'Clear, practical health tips, explainers, and trusted health information for everyday life.', manifest: '/manifest.webmanifest',
  icons: { icon: [{ url: '/nurse-lizzy-health-mark.svg', type: 'image/svg+xml', sizes: 'any' }, { url: '/nurse-lizzy-health-mark.svg', type: 'image/svg+xml', sizes: 'any' }, { url: '/nurse-lizzy-health-mark.svg', type: 'image/svg+xml', sizes: 'any' }], apple: [{ url: '/nurse-lizzy-health-mark.svg', sizes: 'any', type: 'image/svg+xml' }] },
  appleWebApp: { capable: true, title: 'Lizzy Health Tips', statusBarStyle: 'default' },
  openGraph: { type: 'website', url: 'https://nurselizzyhealth.vercel.app', siteName: 'Nurse Lizzy Health', title: 'Nurse Lizzy Health', description: 'Evidence-informed health and wellness content for everyday life.', images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Nurse Lizzy Health — evidence-informed health education for everyday life' }] },
  twitter: { card: 'summary_large_image', title: 'Nurse Lizzy Health', description: 'Evidence-informed health and wellness content for everyday life.', images: ['/og.png'] },
};

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#D71920' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><ServiceWorkerRegister/><SiteChrome/><div className="page-enter">{children}</div><SiteFooter/></body></html>;
}
