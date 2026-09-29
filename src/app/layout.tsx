import './globals.css';
import type { Metadata } from 'next';
import { SiteChrome } from './chrome';

export const metadata: Metadata = {
  title: {
    default: 'Nurse Lizzy Health | Better health starts with better information',
    template: '%s | Nurse Lizzy Health',
  },
  description:
    'Evidence-informed health and wellness content for everyday life. Explore practical guides, thoughtful articles, and free resources from Nurse Lizzy Health.',
  openGraph: {
    type: 'website',
    siteName: 'Nurse Lizzy Health',
    title: 'Nurse Lizzy Health',
    description: 'Evidence-informed health and wellness content for everyday life.',
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
