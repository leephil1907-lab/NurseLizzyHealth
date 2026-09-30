'use client';

import { useEffect } from 'react';

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch((error) => {
      // Registration is best-effort; the site remains fully usable without PWA support.
      console.warn('Service worker registration failed:', error);
    });
  }, []);

  return null;
}
