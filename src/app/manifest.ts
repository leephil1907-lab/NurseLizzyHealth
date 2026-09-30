import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'Nurse Lizzy Health',
    short_name: 'Nurse Lizzy',
    description: 'Evidence-informed health and wellness content for everyday life.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#ffffff',
    theme_color: '#D71920',
    lang: 'en',
    categories: ['health', 'education'],
    icons: [
      { src: '/nurse-lizzy-health-icon.svg', sizes: '192x192', type: 'image/svg+xml', purpose: 'any' },
      { src: '/nurse-lizzy-health-icon.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'any' },
      { src: '/nurse-lizzy-health-icon.svg', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
