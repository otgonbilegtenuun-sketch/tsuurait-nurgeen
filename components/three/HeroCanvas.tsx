'use client';

import { useEffect, useRef } from 'react';
import { mount, type Hero3DHandle } from '@/lib/three/hero3d';

type HeroCanvasProps = {
  onReady: (handle: Hero3DHandle) => void;
  onDispose: () => void;
};

// Must stay position:fixed; inset:0; z-index:0; pointer-events:none — see
// design_handoff_tsuurait/README.md section 6, point 8 (breaks click-through otherwise).
export default function HeroCanvas({ onReady, onDispose }: HeroCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const handle = mount(canvasRef.current, { speed: 1, showPrism: false });
    onReady(handle);
    return () => {
      handle.dispose();
      onDispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
