import * as THREE from 'three';

const W = 256;
const H = 486; // matches the 1 : 1.9 wall panel

// Heights (0..1) of the embossed relief on a real GRP wall panel: one crescent
// ("smile") in the upper half and a mirrored one in the lower half.
function panelHeightMap(): Float32Array {
  const height = document.createElement('canvas');
  height.width = W;
  height.height = H;
  const hctx = height.getContext('2d')!;
  hctx.fillStyle = '#000';
  hctx.fillRect(0, 0, W, H);

  const piece = document.createElement('canvas');
  piece.width = W;
  piece.height = H;
  const p = piece.getContext('2d')!;
  const R = W * 0.46;
  const cx = W / 2;
  const cy = H * 0.36 - R;
  p.fillStyle = '#fff';
  p.beginPath();
  p.arc(cx, cy, R, 0, Math.PI * 2);
  p.fill();
  p.globalCompositeOperation = 'destination-out';
  p.beginPath();
  p.arc(cx, cy - W * 0.1, R, 0, Math.PI * 2);
  p.fill();

  // shadowBlur gives the soft shoulders of a moulded rib (works on every browser)
  hctx.shadowColor = '#fff';
  hctx.shadowBlur = 12;
  hctx.drawImage(piece, 0, 0);
  hctx.save();
  hctx.translate(0, H);
  hctx.scale(1, -1);
  hctx.drawImage(piece, 0, 0);
  hctx.restore();

  const px = hctx.getImageData(0, 0, W, H).data;
  let a = new Float32Array(W * H);
  for (let i = 0; i < a.length; i++) a[i] = px[i * 4] / 255;

  // two 3x3 box-blur passes smooth the stair-stepping before taking gradients
  for (let pass = 0; pass < 2; pass++) {
    const b = new Float32Array(a.length);
    for (let y = 1; y < H - 1; y++) {
      for (let x = 1; x < W - 1; x++) {
        let s = 0;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) s += a[(y + dy) * W + x + dx];
        b[y * W + x] = s / 9;
      }
    }
    a = b;
  }
  return a;
}

export function createPanelNormalMap(strength = 9): THREE.DataTexture {
  const h = panelHeightMap();
  const data = new Uint8Array(W * H * 4);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const gx = ((h[y * W + Math.min(W - 1, x + 1)] ?? 0) - (h[y * W + Math.max(0, x - 1)] ?? 0)) * 0.5;
      const gu = ((h[Math.max(0, y - 1) * W + x] ?? 0) - (h[Math.min(H - 1, y + 1) * W + x] ?? 0)) * 0.5;
      let nx = -gx * strength;
      let ny = -gu * strength;
      let nz = 1;
      const len = Math.hypot(nx, ny, nz);
      nx /= len;
      ny /= len;
      nz /= len;
      const row = H - 1 - y; // DataTexture rows start at the bottom
      const o = (row * W + x) * 4;
      data[o] = (nx * 0.5 + 0.5) * 255;
      data[o + 1] = (ny * 0.5 + 0.5) * 255;
      data[o + 2] = (nz * 0.5 + 0.5) * 255;
      data[o + 3] = 255;
    }
  }
  const tex = new THREE.DataTexture(data, W, H, THREE.RGBAFormat);
  tex.colorSpace = THREE.NoColorSpace;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = true;
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}
