import './globals.css';
import type { Metadata } from 'next';
import { SiteChrome } from './chrome';

export const metadata: Metadata = {
  metadataBase: new URL('https://nurselizzyhealth.vercel.app'),
  title: {
    default: 'Nurse Lizzy Health | Better health starts with better information',
    template: '%s | Nurse Lizzy Health',
  },
  description: 'Evidence-informed health and wellness content for everyday life.',
  openGraph: {
    type: 'website',
    siteName: 'Nurse Lizzy Health',
    title: 'Nurse Lizzy Health',
    description: 'Evidence-informed health and wellness content for everyday life.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Nurse Lizzy Health — evidence-informed health education for everyday life' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nurse Lizzy Health',
    description: 'Evidence-informed health and wellness content for everyday life.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteChrome />
        <div className="page-enter">{children}</div>
      </body>
    </html>
  );
}
