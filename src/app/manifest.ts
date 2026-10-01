import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'Nurse Lizzy Health Tips',
    short_name: 'Lizzy Health Tips',
    description: 'Clear, practical health tips, explainers, and trusted health information for everyday life.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#ffffff',
    theme_color: '#D71920',
    lang: 'en',
    categories: ['health', 'education'],
    icons: [
      { src: '/pwa-icon-192', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/pwa-icon-512', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
    ],
  };
}
