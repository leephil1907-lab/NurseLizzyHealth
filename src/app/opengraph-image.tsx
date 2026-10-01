import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Nurse Lizzy Health';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 72, background: '#080808', color: 'white', fontFamily: 'sans-serif' }}>
      <div style={{ color: '#D71920', fontSize: 28, fontWeight: 700, letterSpacing: 3 }}>NURSE LIZZY HEALTH</div>
      <div style={{ marginTop: 24, fontSize: 58, lineHeight: 1.05, fontWeight: 700 }}>Clear, practical health information for everyday life.</div>
      <div style={{ marginTop: 28, fontSize: 25, color: '#dddddd' }}>Care · Clarity · Confidence</div>
    </div>
  );
}
