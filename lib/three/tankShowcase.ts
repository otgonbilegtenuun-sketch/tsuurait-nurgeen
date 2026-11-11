// Self-contained 3D scene for the GRP tank model, sized to and living inside
// a normal in-flow "card" element, so it receives pointer events directly
// for drag-to-rotate.
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

export type TankShowcaseHandle = {
  dispose: () => void;
};

export function mount(canvas: HTMLCanvasElement, container: HTMLElement): TankShowcaseHandle {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  // Placeholder framing until the model loads; frameModel() replaces it.
  camera.position.set(0, 1.4, 9);
  camera.lookAt(0, 0, 0);

  // Half-height and horizontal turning radius of the loaded model, used to
  // fit the camera so the model fills the box at any aspect ratio (wide on
  // desktop, near-square on phones) without clipping while it rotates.
  let fit: { halfH: number; radiusXZ: number } | null = null;

  const frameModel = () => {
    if (!fit) return;
    const vHalf = THREE.MathUtils.degToRad(camera.fov) / 2;
    const hHalf = Math.atan(Math.tan(vHalf) * camera.aspect);
    const distV = fit.halfH / Math.tan(vHalf);
    const distH = fit.radiusXZ / Math.tan(hHalf);
    // + part of the radius: the near corners sit closer to the camera and
    // appear larger under perspective as the tank turns.
    const dist = Math.max(distV, distH) + fit.radiusXZ * 0.6;
    camera.position.set(0, dist * 0.155, dist);
    camera.lookAt(0, 0, 0);
  };

  const group = new THREE.Group();
  scene.add(group);

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
      const targetHeight = 3.4;
      const scale = targetHeight / (size.y || 1);
      model.position.sub(center).multiplyScalar(scale);
      model.scale.setScalar(scale);
      tankGroup.add(model);
      fit = {
        halfH: targetHeight / 2,
        radiusXZ: (Math.hypot(size.x, size.z) / 2) * scale,
      };
      frameModel();
      tankGroup.visible = true;
    },
    undefined,
    (err) => console.warn('[tankShowcase] tank model failed to load', err)
  );

  scene.add(new THREE.AmbientLight(0xffffff, 0.45));
  const l1 = new THREE.PointLight(0xa9c9ec, 50, 30);
  l1.position.set(-5, 5, 5);
  scene.add(l1);
  const l2 = new THREE.PointLight(0xc3d8ee, 35, 30);
  l2.position.set(5, -2, 4);
  scene.add(l2);
  const l3 = new THREE.DirectionalLight(0xffffff, 1.1);
  l3.position.set(2, 6, 3);
  scene.add(l3);

  const resize = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w === 0 || h === 0) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    frameModel();
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(container);

  // Drag-to-rotate, directly on this canvas (it's a normal DOM element in
  // the content layer, so no z-index/pointer-events workaround is needed).
  let dragRotX = 0;
  let dragRotY = 0;
  let isDragging = false;
  let lastX = 0;
  let lastY = 0;

  const onPointerDown = (e: PointerEvent) => {
    isDragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    canvas.style.cursor = 'grabbing';
    canvas.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    dragRotY += dx * 0.01;
    // Clamped so a vertical drag can tilt the tank but never flip it over.
    dragRotX = THREE.MathUtils.clamp(dragRotX + dy * 0.01, -0.45, 0.45);
  };
  const onPointerUp = (e: PointerEvent) => {
    isDragging = false;
    canvas.style.cursor = 'grab';
    canvas.releasePointerCapture(e.pointerId);
  };
  canvas.style.cursor = 'grab';
  canvas.style.touchAction = 'none';
  canvas.addEventListener('pointerdown', onPointerDown);
  canvas.addEventListener('pointermove', onPointerMove);
  canvas.addEventListener('pointerup', onPointerUp);
  canvas.addEventListener('pointercancel', onPointerUp);

  let raf = 0;
  const t0 = performance.now();
  const tick = (now: number) => {
    const t = (now - t0) / 1000;
    // Gentle idle auto-rotation, overridden/added-to by manual drag.
    group.rotation.y = t * 0.15 + dragRotY;
    group.rotation.x = -0.08 + dragRotX;
    renderer.render(scene, camera);
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);

  return {
    dispose: () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener('pointerdown', onPointerDown);
      canvas.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('pointerup', onPointerUp);
      canvas.removeEventListener('pointercancel', onPointerUp);
      dracoLoader.dispose();
      renderer.dispose();
    },
  };
}
