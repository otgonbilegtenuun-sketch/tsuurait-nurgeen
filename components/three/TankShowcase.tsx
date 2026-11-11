'use client';

import { useEffect, useRef } from 'react';
import { mount } from '@/lib/three/tankShowcase';

export default function TankShowcase() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const handle = mount(canvasRef.current, containerRef.current);
    return () => handle.dispose();
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  );
}
