import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export function GET() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#080808' }}>
      <div style={{ width: 360, height: 360, borderRadius: 76, background: '#080808', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '18px solid #D71920' }}>
        <div style={{ color: 'white', fontSize: 210, fontWeight: 800 }}>N</div>
      </div>
    </div>,
    { width: 512, height: 512 }
  );
}
