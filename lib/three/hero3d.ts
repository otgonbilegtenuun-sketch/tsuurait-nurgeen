// Ported 1:1 from design_handoff_tsuurait/hero3d.js (CDN import -> npm 'three').
// Behaviour must not change: see HANDOFF-PROMPT.md "hero3d.js API" + README.md section 4.
// Addition: a real GLB model of the company's GRP water tank product, loaded
// alongside the original diamond-lattice/dust scene (user-provided asset,
// optimized from a 23.8MB OBJ down to a 142KB Draco-compressed GLB).
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

export type Hero3DHandle = {
  setScroll: (p: number) => void;
  setSpeed: (v: number) => void;
  dispose: () => void;
};

export function mount(
  canvas: HTMLCanvasElement,
  opts: { speed?: number; showPrism?: boolean } = {}
): Hero3DHandle {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xffffff, 10, 26);
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.set(0, 2.2, 15);

  const group = new THREE.Group();
  scene.add(group);

  // stepped pyramid lattice of diamonds, echoing the logo mark
  const L = 9;
  const gap = 0.72;
  const positions: [number, number, number, number][] = [];
  for (let k = 0; k < L; k++) {
    const n = L - k;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        positions.push([
          (i - (n - 1) / 2) * gap,
          k * gap * 0.78 - 2.4,
          (j - (n - 1) / 2) * gap,
          k / (L - 1),
        ]);
      }
    }
  }
  const geo = new THREE.OctahedronGeometry(0.19, 0);
  const mat = new THREE.MeshPhysicalMaterial({ metalness: 0.35, roughness: 0.28, clearcoat: 0.6 });
  const mesh = new THREE.InstancedMesh(geo, mat, positions.length);
  const dummy = new THREE.Object3D();
  // Darker/more saturated than the original dark-theme palette — pale tones
  // disappear against a white background, so the mid/tip stops are deepened.
  const cRed = new THREE.Color(0x2e86de);
  const cPink = new THREE.Color(0x1f6fc4);
  const cCyan = new THREE.Color(0x6f93be);
  positions.forEach((p, idx) => {
    dummy.position.set(p[0], p[1], p[2]);
    dummy.updateMatrix();
    mesh.setMatrixAt(idx, dummy.matrix);
    const c = cRed.clone().lerp(cPink, p[3] * 0.9);
    if (p[3] > 0.85) c.lerp(cCyan, 0.5);
    mesh.setColorAt(idx, c);
  });
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  if (opts.showPrism !== false) group.add(mesh);

  // ambient dust
  const DUST_N = 900;
  const pts = new Float32Array(DUST_N * 3);
  for (let i = 0; i < DUST_N; i++) {
    pts[i * 3] = (Math.random() - 0.5) * 40;
    pts[i * 3 + 1] = (Math.random() - 0.5) * 24;
    pts[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
  }
  const dust = new THREE.Points(
    new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(pts, 3)),
    new THREE.PointsMaterial({ color: 0x6f93be, size: 0.045, transparent: true, opacity: 0.4 })
  );
  scene.add(dust);

  // GRP water tank model — the actual product, as the hero's centerpiece.
  const tankGroup = new THREE.Group();
  tankGroup.visible = false; // shown once loaded + measured, to avoid a flash at the wrong scale
  group.add(tankGroup);

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('/draco/');
  const gltfLoader = new GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader);
  gltfLoader.load(
    '/models/tank.glb',
    (gltf) => {
      const model = gltf.scene;
      const box = new THREE.Box3().setFromObject(model);
      const size = new THREE.Vector3();
      box.getSize(size);
      const center = new THREE.Vector3();
      box.getCenter(center);
      const targetHeight = 2.9;
      const scale = targetHeight / (size.y || 1);
      model.position.sub(center);
      model.scale.setScalar(scale);
      tankGroup.add(model);
      // Nudge it up within the hero's empty band — right of the logo, below
      // the header, clear of the "about" card lower on the right.
      tankGroup.position.y = 1.7;
      tankGroup.visible = true;
    },
    undefined,
    (err) => console.warn('[hero3d] tank model failed to load', err)
  );

  scene.add(new THREE.AmbientLight(0xffffff, 0.35));
  const l1 = new THREE.PointLight(0xa9c9ec, 60, 40);
  l1.position.set(-6, 6, 6);
  scene.add(l1);
  const l2 = new THREE.PointLight(0xc3d8ee, 40, 40);
  l2.position.set(6, -2, 5);
  scene.add(l2);
  const l3 = new THREE.DirectionalLight(0xffffff, 1.2);
  l3.position.set(3, 8, 4);
  scene.add(l3);

  let mx = 0;
  let my = 0;
  let tx = 0;
  let ty = 0;
  let scroll = 0;
  let speed = opts.speed ?? 1;

  const onMove = (e: PointerEvent) => {
    mx = (e.clientX / window.innerWidth) * 2 - 1;
    my = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener('pointermove', onMove, { passive: true });

  // Drag-to-rotate the tank/scene manually. The canvas itself sits BEHIND the
  // hero's text content in z-index (so links/buttons stay clickable/
  // selectable everywhere else), which means the canvas can never reliably
  // receive pointer events directly — the content layer intercepts them
  // first. Instead, Hero.tsx renders a small invisible "drag zone" positioned
  // exactly over the tank's on-screen area, above the content, and forwards
  // pointer activity here via window CustomEvents so this module never needs
  // a DOM reference to that zone.
  let dragRotX = 0;
  let dragRotY = 0;
  let isDragging = false;
  let lastPointerX = 0;
  let lastPointerY = 0;

  const onDragStart = (e: Event) => {
    const { clientX, clientY } = (e as CustomEvent<{ clientX: number; clientY: number }>).detail;
    isDragging = true;
    lastPointerX = clientX;
    lastPointerY = clientY;
  };
  const onDragMove = (e: Event) => {
    if (!isDragging) return;
    const { clientX, clientY } = (e as CustomEvent<{ clientX: number; clientY: number }>).detail;
    const dx = clientX - lastPointerX;
    const dy = clientY - lastPointerY;
    lastPointerX = clientX;
    lastPointerY = clientY;
    dragRotY += dx * 0.01;
    dragRotX += dy * 0.01;
  };
  const onDragEnd = () => {
    isDragging = false;
  };
  window.addEventListener('tn-hero-drag-start', onDragStart);
  window.addEventListener('tn-hero-drag-move', onDragMove);
  window.addEventListener('tn-hero-drag-end', onDragEnd);

  const resize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    group.position.x = w / h > 1.05 ? 4.2 : 0;
    group.position.y = w / h > 1.05 ? 0.4 : 2.6;
    const s = w / h > 1.05 ? 1 : 0.7;
    group.scale.set(s, s, s);
  };
  resize();
  window.addEventListener('resize', resize);

  let raf = 0;
  const t0 = performance.now();
  const tick = (now: number) => {
    const t = (now - t0) / 1000;
    tx += (mx - tx) * 0.04;
    ty += (my - ty) * 0.04;
    group.rotation.y = t * 0.18 * speed + tx * 0.35 + scroll * 2.2 + dragRotY;
    group.rotation.x = -0.12 + ty * 0.18 + scroll * 0.35 + dragRotX;
    group.position.z = -scroll * 6;

    // The canvas is position:fixed over the whole page, but the scene is a
    // Hero-only decoration — fade it out once the user has scrolled past the
    // hero, otherwise the tank model keeps floating behind every later section.
    const fadeOpacity = Math.max(0, 1 - scroll / 0.3);
    canvas.style.opacity = String(fadeOpacity);
    positions.forEach((p, idx) => {
      const s = 1 + 0.28 * Math.sin(t * 1.6 * speed + p[0] * 1.3 + p[2] * 1.1 + p[3] * 4);
      dummy.position.set(p[0], p[1] + Math.sin(t * 0.8 + p[0] + p[2]) * 0.05, p[2]);
      dummy.rotation.y = t * 0.6 + p[3] * 2;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      mesh.setMatrixAt(idx, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
    dust.rotation.y = t * 0.02;
    dust.position.y = -scroll * 3;
    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);

  return {
    setScroll: (p: number) => {
      scroll = p;
    },
    setSpeed: (v: number) => {
      speed = v;
    },
    dispose: () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', resize);
      window.removeEventListener('tn-hero-drag-start', onDragStart);
      window.removeEventListener('tn-hero-drag-move', onDragMove);
      window.removeEventListener('tn-hero-drag-end', onDragEnd);
      dracoLoader.dispose();
      renderer.dispose();
    },
  };
}
