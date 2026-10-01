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
      { src: '/nurse-lizzy-health-mark.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/nurse-lizzy-health-mark.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/nurse-lizzy-health-mark.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'maskable' },
    ],
  };
}
