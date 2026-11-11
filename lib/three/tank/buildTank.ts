import * as THREE from 'three';
import { createPanelNormalMap } from './textures';

// Procedural model of the real sectional GRP tank (see the site photos): tall
// cream panels with moulded crescents, galvanized flange fins and corner
// angles bolted along every edge, a galvanized ladder, concrete plinth strips
// and a faceted hatch lid. Units are metres, origin at ground level centre.
const PANEL = 1.0;
const LEN = 4; // panels along the long side
const WID = 2; // panels along the short side
const HEIGHT = 1.9;
const BASE = 0.22; // plinth height
const T = 0.03; // panel thickness
const X = (LEN * PANEL) / 2;
const Z = (WID * PANEL) / 2;
const TOP = BASE + HEIGHT;
const FIN = 0.07;

export function buildTank() {
  const root = new THREE.Group();
  const normalMap = createPanelNormalMap();

  const panelMat = new THREE.MeshPhysicalMaterial({
    color: 0xcbc1a6,
    roughness: 0.34,
    clearcoat: 0.7,
    clearcoatRoughness: 0.2,
    normalMap,
    normalScale: new THREE.Vector2(1, 1),
  });
  const roofMat = new THREE.MeshPhysicalMaterial({ color: 0xcbc1a6, roughness: 0.45, clearcoat: 0.5, clearcoatRoughness: 0.3 });
  const steelMat = new THREE.MeshStandardMaterial({ color: 0xb9bec4, metalness: 0.85, roughness: 0.4 });
  const boltMat = new THREE.MeshStandardMaterial({ color: 0x8a9096, metalness: 0.9, roughness: 0.35 });
  const concreteMat = new THREE.MeshStandardMaterial({ color: 0x9b988f, roughness: 0.95 });
  const slabMat = new THREE.MeshStandardMaterial({ color: 0xaaa79e, roughness: 0.95 });
  const pvcMat = new THREE.MeshStandardMaterial({ color: 0xeceae3, roughness: 0.5 });

  const geometries: THREE.BufferGeometry[] = [];
  const geo = <G extends THREE.BufferGeometry>(g: G) => {
    geometries.push(g);
    return g;
  };

  const box = (w: number, h: number, d: number, mat: THREE.Material, x: number, y: number, z: number) => {
    const m = new THREE.Mesh(geo(new THREE.BoxGeometry(w, h, d)), mat);
    m.position.set(x, y, z);
    root.add(m);
    return m;
  };

  // Bolt heads are collected, then drawn as two instanced meshes (axis x / axis z).
  const boltsX: THREE.Vector3[] = [];
  const boltsZ: THREE.Vector3[] = [];
  const bolt = (axis: 'x' | 'z', x: number, y: number, z: number) => (axis === 'x' ? boltsX : boltsZ).push(new THREE.Vector3(x, y, z));
  const boltColumn = (axis: 'x' | 'z', x: number, z: number) => {
    for (let y = BASE + 0.1; y <= TOP - 0.1 + 1e-6; y += 0.12) bolt(axis, x, y, z);
  };

  const yMid = BASE + HEIGHT / 2;
  const wallPanel = geo(new THREE.BoxGeometry(PANEL - 0.012, HEIGHT - 0.01, T));

  // wall panels
  for (let i = 0; i < LEN; i++) {
    for (const s of [1, -1]) {
      const m = new THREE.Mesh(wallPanel, panelMat);
      m.position.set(-X + PANEL * (i + 0.5), yMid, s * Z);
      if (s < 0) m.rotation.y = Math.PI;
      root.add(m);
    }
  }
  for (let j = 0; j < WID; j++) {
    for (const s of [1, -1]) {
      const m = new THREE.Mesh(wallPanel, panelMat);
      m.position.set(s * X, yMid, -Z + PANEL * (j + 0.5));
      m.rotation.y = (s * Math.PI) / 2;
      root.add(m);
    }
  }

  // flange fins at the panel joints, bolted on both sides
  const finOut = T / 2 + FIN / 2;
  for (let k = 1; k < LEN; k++) {
    const x = -X + k * PANEL;
    for (const s of [1, -1]) {
      box(0.012, HEIGHT, FIN, steelMat, x, yMid, s * (Z + finOut));
      for (const side of [-1, 1]) boltColumn('x', x + side * 0.009, s * (Z + finOut));
    }
  }
  for (let k = 1; k < WID; k++) {
    const z = -Z + k * PANEL;
    for (const s of [1, -1]) {
      box(FIN, HEIGHT, 0.012, steelMat, s * (X + finOut), yMid, z);
      for (const side of [-1, 1]) boltColumn('z', s * (X + finOut), z + side * 0.009);
    }
  }

  // corner angles
  for (const sx of [1, -1]) {
    for (const sz of [1, -1]) {
      box(0.12, HEIGHT, 0.012, steelMat, sx * (X - 0.01), yMid, sz * (Z + T / 2 + 0.006));
      boltColumn('z', sx * (X - 0.04), sz * (Z + T / 2 + 0.012));
      box(0.012, HEIGHT, 0.12, steelMat, sx * (X + T / 2 + 0.006), yMid, sz * (Z - 0.01));
      boltColumn('x', sx * (X + T / 2 + 0.012), sz * (Z - 0.04));
    }
  }

  // horizontal angles along the bottom and top edges
  for (const y of [BASE + 0.04, TOP - 0.04]) {
    for (const s of [1, -1]) {
      box(2 * X, 0.08, 0.014, steelMat, 0, y, s * (Z + T / 2 + 0.007));
      for (let x = -X + 0.15; x <= X - 0.14; x += 0.1) bolt('z', x, y, s * (Z + T / 2 + 0.015));
      box(0.014, 0.08, 2 * Z, steelMat, s * (X + T / 2 + 0.007), y, 0);
      for (let z = -Z + 0.15; z <= Z - 0.14; z += 0.1) bolt('x', s * (X + T / 2 + 0.015), y, z);
    }
  }

  const boltGeo = (axis: 'x' | 'z') => {
    const g = new THREE.CylinderGeometry(0.014, 0.014, 0.01, 6);
    g.rotateZ(Math.PI / 2); // axis along x
    if (axis === 'z') g.rotateY(Math.PI / 2);
    return geo(g);
  };
  const dummy = new THREE.Object3D();
  for (const [axis, list] of [['x', boltsX], ['z', boltsZ]] as const) {
    const inst = new THREE.InstancedMesh(boltGeo(axis), boltMat, list.length);
    list.forEach((v, i) => {
      dummy.position.copy(v);
      dummy.updateMatrix();
      inst.setMatrixAt(i, dummy.matrix);
    });
    root.add(inst);
  }

  // roof: flat panels, faceted hatch lid, vent
  const roofY = TOP + 0.02;
  const roofPanel = geo(new THREE.BoxGeometry(PANEL - 0.012, 0.04, PANEL - 0.012));
  for (let i = 0; i < LEN; i++) {
    for (let j = 0; j < WID; j++) {
      const m = new THREE.Mesh(roofPanel, roofMat);
      m.position.set(-X + PANEL * (i + 0.5), roofY, -Z + PANEL * (j + 0.5));
      root.add(m);
    }
  }
  const hatch = { x: 0.5, z: 0.5 };
  box(0.72, 0.06, 0.72, roofMat, hatch.x, roofY + 0.05, hatch.z);
  const lid = new THREE.Mesh(geo(new THREE.CylinderGeometry(0.3, 0.34, 0.08, 8)), roofMat);
  lid.rotation.y = Math.PI / 8;
  lid.position.set(hatch.x, roofY + 0.12, hatch.z);
  root.add(lid);
  box(0.16, 0.025, 0.04, steelMat, hatch.x, roofY + 0.095, hatch.z - 0.38);
  const vent = new THREE.Mesh(geo(new THREE.CylinderGeometry(0.035, 0.035, 0.42, 12)), pvcMat);
  vent.position.set(-1.4, roofY + 0.23, -0.6);
  root.add(vent);
  const ventCap = new THREE.Mesh(geo(new THREE.CylinderGeometry(0.075, 0.075, 0.03, 12)), pvcMat);
  ventCap.position.set(-1.4, roofY + 0.45, -0.6);
  root.add(ventCap);

  // support: floor slab + two concrete plinth strips
  box(2 * X + 0.5, 0.05, 2 * Z + 0.9, slabMat, 0, -0.025, 0);
  for (const s of [1, -1]) box(2 * X + 0.3, BASE, 0.32, concreteMat, 0, BASE / 2, s * 0.6);

  // galvanized ladder with wall brackets
  const ladderX = -1.5;
  const ladderZ = Z + T / 2 + FIN + 0.09;
  const ladderTop = TOP + 0.35;
  for (const side of [-1, 1]) {
    box(0.035, ladderTop, 0.02, steelMat, ladderX + side * 0.2, ladderTop / 2, ladderZ);
    for (const y of [0.5, 1.25, 2.0]) {
      box(0.03, 0.03, ladderZ - (Z + T / 2), steelMat, ladderX + side * 0.2, y, (ladderZ + Z + T / 2) / 2);
    }
  }
  const rung = geo(new THREE.CylinderGeometry(0.011, 0.011, 0.4, 8));
  rung.rotateZ(Math.PI / 2);
  for (let y = 0.3; y < ladderTop - 0.1; y += 0.3) {
    const m = new THREE.Mesh(rung, steelMat);
    m.position.set(ladderX, y, ladderZ);
    root.add(m);
  }

  root.traverse((o) => {
    if (o instanceof THREE.Mesh) {
      o.castShadow = true;
      o.receiveShadow = true;
    }
  });

  return {
    group: root,
    dispose: () => {
      geometries.forEach((g) => g.dispose());
      [panelMat, roofMat, steelMat, boltMat, concreteMat, slabMat, pvcMat].forEach((m) => m.dispose());
      normalMap.dispose();
    },
  };
}
