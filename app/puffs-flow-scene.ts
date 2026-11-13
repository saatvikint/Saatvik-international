// 3D "puffs collect in a bowl" scene (three.js). Loaded on demand by app/puffs-flow.tsx; never imported on the server.
//
// Scroll story: puffs float around the heading, then arc one by one into a ceramic bowl,
// filling it from the bottom up into a heaped pile.
//
// Puffs are procedural: bent capsules (curls), rounded cubes, flattened discs and balls, with
// noise-displaced surfaces and a speckle texture, tinted with flavour colours taken from the
// client's puff photos. One InstancedMesh per shape keeps it to four draw calls.
// Motion is driven only by scroll progress (eased); nothing animates on its own.
import * as THREE from 'three';

export interface PuffsScene {
  setProgress(progress: number): void;
  setActive(active: boolean): void;
  setReducedMotion(reduced: boolean): void;
  dispose(): void;
}

interface Options {
  reducedMotion: boolean;
  compact: boolean;
}

// ---------- deterministic noise ----------
function hash(i: number, j: number, k: number): number {
  let h = Math.imul(i, 374761393) ^ Math.imul(j, 668265263) ^ Math.imul(k, 1440662683);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}
const fade = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
function noise(x: number, y: number, z: number): number {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
  const xf = fade(x - xi), yf = fade(y - yi), zf = fade(z - zi);
  const c = (a: number, b: number, d: number) => hash(xi + a, yi + b, zi + d);
  return lerp(
    lerp(lerp(c(0, 0, 0), c(1, 0, 0), xf), lerp(c(0, 1, 0), c(1, 1, 0), xf), yf),
    lerp(lerp(c(0, 0, 1), c(1, 0, 1), xf), lerp(c(0, 1, 1), c(1, 1, 1), xf), yf),
    zf,
  );
}

function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

// ---------- geometry ----------
/** Push vertices along their normals by layered noise for a crispy, puffed surface. */
function bumpify(geometry: THREE.BufferGeometry, amplitude: number, frequency: number): THREE.BufferGeometry {
  geometry.computeVertexNormals();
  const pos = geometry.getAttribute('position') as THREE.BufferAttribute;
  const nor = geometry.getAttribute('normal') as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    const n = (noise(x * frequency + 11, y * frequency + 7, z * frequency + 3) - 0.5) * 2
      + (noise(x * frequency * 2.7, y * frequency * 2.7, z * frequency * 2.7) - 0.5) * 0.6;
    const d = n * amplitude;
    pos.setXYZ(i, x + nor.getX(i) * d, y + nor.getY(i) * d, z + nor.getZ(i) * d);
  }
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

/** Corn-puff style curl: a capsule bent along an arc. */
function curlGeometry(): THREE.BufferGeometry {
  const g = new THREE.CapsuleGeometry(0.26, 1.15, 8, 18, 28);
  const R = 1.25;
  const pos = g.getAttribute('position') as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i);
    const theta = y / R;
    pos.setXY(i, R - (R - x) * Math.cos(theta) - R * 0.35, (R - x) * Math.sin(theta));
  }
  return bumpify(g, 0.045, 4.5);
}

/** Puffed cube: a subdivided box pulled towards a sphere. */
function cubeGeometry(): THREE.BufferGeometry {
  const g = new THREE.BoxGeometry(0.66, 0.6, 0.62, 10, 10, 10);
  const pos = g.getAttribute('position') as THREE.BufferAttribute;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const len = v.length();
    v.lerp(v.clone().normalize().multiplyScalar(0.42), 0.38);
    if (len === 0) continue;
    pos.setXYZ(i, v.x, v.y, v.z);
  }
  return bumpify(g, 0.035, 5.5);
}

/** Round flat puff, like the disc puffs in the photo. */
function discGeometry(): THREE.BufferGeometry {
  const g = new THREE.SphereGeometry(0.42, 32, 20);
  g.scale(1, 0.45, 1);
  return bumpify(g, 0.03, 6);
}

/** Ball puff. */
function ballGeometry(): THREE.BufferGeometry {
  return bumpify(new THREE.SphereGeometry(0.34, 28, 18), 0.05, 5);
}

// ---------- textures ----------
function canvasTexture(size: number, draw: (ctx: CanvasRenderingContext2D, random: () => number) => void, srgb: boolean): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  draw(ctx, seeded(20261113));
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  if (srgb) texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** Seasoning specks over a light base; multiplied with each puff's flavour colour. */
function speckleTexture(): THREE.CanvasTexture {
  return canvasTexture(256, (ctx, random) => {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 1400; i++) {
      const shade = random();
      ctx.fillStyle = shade < 0.75 ? `rgba(150, 82, 30, ${0.12 + random() * 0.22})` : `rgba(255, 246, 225, ${0.4 + random() * 0.4})`;
      const r = 0.6 + random() * 1.8;
      ctx.beginPath();
      ctx.arc(random() * 256, random() * 256, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }, true);
}

/** Fine grain for the bump map, so surfaces read as crisp and airy. */
function grainTexture(): THREE.CanvasTexture {
  return canvasTexture(256, (ctx, random) => {
    const img = ctx.createImageData(256, 256);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = 120 + random() * 135;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
  }, false);
}

// ---------- flavours (from the client's puff photos) ----------
const FLAVOURS = {
  plain: '#f2deb0',
  golden: '#e9b45a',
  cheese: '#f3a33b',
  masala: '#d8832f',
  herb: '#c6cf8f',
};

interface ShapeSpec {
  geometry: () => THREE.BufferGeometry;
  /** Resting pose in the bowl: long shapes lie on their side, flat ones lie flat. */
  lies: 'side' | 'flat';
  share: number;
  colours: string[];
  scale: [number, number];
}

const SHAPES: ShapeSpec[] = [
  { geometry: curlGeometry, lies: 'side', share: 0.4, colours: [FLAVOURS.golden, FLAVOURS.cheese, FLAVOURS.masala], scale: [0.9, 1.25] },
  { geometry: discGeometry, lies: 'flat', share: 0.25, colours: [FLAVOURS.plain, FLAVOURS.cheese, FLAVOURS.masala, FLAVOURS.herb], scale: [0.9, 1.2] },
  { geometry: cubeGeometry, lies: 'side', share: 0.2, colours: [FLAVOURS.golden, FLAVOURS.masala], scale: [0.85, 1.15] },
  { geometry: ballGeometry, lies: 'flat', share: 0.15, colours: [FLAVOURS.plain, FLAVOURS.golden], scale: [0.85, 1.2] },
];

interface Particle {
  mesh: THREE.InstancedMesh;
  index: number;
  nx: number;               // floating field, -1..1 across the view width
  ny: number;               // floating field, -1..1 across the view height
  z: number;                // floating depth
  scale: number;
  axis: THREE.Vector3;
  tilt: THREE.Quaternion;
  rest: THREE.Quaternion;   // orientation once settled in the bowl
  target: THREE.Vector3;    // resting spot, in bowl space (unscaled)
  spin: number;
  wave: number;
  phase: number;
  lift: number;             // extra arc height on the way to the bowl
  long: boolean;            // lies on its side: needs extra room from the bowl wall
  delay: number;            // 0..1: lower spots in the bowl are filled first
}

// ---------- bowl (lathe-turned, origin at the bottom centre) ----------
const RIM_Y = 1.78;
const BOWL_PROFILE: [number, number][] = [
  [0, 0], [1.25, 0], [1.85, 0.32], [2.3, 0.95], [2.5, 1.6], [2.56, RIM_Y],
  [2.44, RIM_Y], [2.36, 1.55], [2.15, 0.98], [1.72, 0.45], [1.15, 0.2], [0, 0.18],
];
const INNER: [number, number][] = [[0, 0.18], [1.15, 0.2], [1.72, 0.45], [2.15, 0.98], [2.36, 1.55], [2.44, RIM_Y]];

function innerRadiusAt(y: number): number {
  if (y <= INNER[0][1]) return 0;
  for (let i = 1; i < INNER.length; i++) {
    const [r1, y1] = INNER[i];
    const [r0, y0] = INNER[i - 1];
    if (y <= y1) return lerp(r0, r1, (y - y0) / (y1 - y0 || 1));
  }
  return INNER[INNER.length - 1][0];
}

/** Resting spots inside the bowl: a heap packed from the bottom up, sorted lowest first. */
function bowlTargets(count: number, random: () => number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const heap = 0.85; // how far the pile rises above the rim
  let minDistance = 0.44;
  let tries = 0;
  while (points.length < count && tries < count * 600) {
    tries++;
    if (tries % (count * 60) === 0) minDistance *= 0.94; // relax spacing if the bowl is too full
    const y = 0.34 + Math.pow(random(), 0.8) * (RIM_Y + heap - 0.34);
    const maxR = y <= RIM_Y
      ? innerRadiusAt(y) - 0.5
      : (innerRadiusAt(RIM_Y) - 0.5) * Math.sqrt(Math.max(0, 1 - ((y - RIM_Y) / heap) ** 2));
    if (maxR <= 0.05) continue;
    const r = maxR * Math.sqrt(random());
    const angle = random() * Math.PI * 2;
    const candidate = new THREE.Vector3(Math.cos(angle) * r, y, Math.sin(angle) * r);
    if (points.some(point => point.distanceTo(candidate) < minDistance)) continue;
    points.push(candidate);
  }
  while (points.length < count) points.push(new THREE.Vector3((random() - 0.5) * 2, RIM_Y * 0.6 + random(), (random() - 0.5) * 2));
  return points.sort((a, b) => a.y - b.y);
}

function shadowTexture(): THREE.CanvasTexture {
  return canvasTexture(128, ctx => {
    const gradient = ctx.createRadialGradient(64, 64, 4, 64, 64, 64);
    gradient.addColorStop(0, 'rgba(70, 16, 37, 0.42)');
    gradient.addColorStop(1, 'rgba(70, 16, 37, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
  }, true);
}

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const FINISHED = 1; // reduced motion shows the filled bowl

export function createPuffsScene(container: HTMLElement, options: Options): PuffsScene {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, options.compact ? 1.5 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 1.6, 14);
  camera.lookAt(0, -0.2, 0);

  scene.add(new THREE.HemisphereLight(0xfff6e8, 0xb97a3c, 1.3));
  const key = new THREE.DirectionalLight(0xffe2b8, 2.4);
  key.position.set(4, 7, 6);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xffaaf1, 0.9);
  rim.position.set(-6, 2, -4);
  scene.add(rim);

  // Bowl: cream ceramic with a purple rim, like the catalogue's bowl visuals.
  const bowl = new THREE.Group();
  const bowlGeometry = new THREE.LatheGeometry(BOWL_PROFILE.map(([r, y]) => new THREE.Vector2(r, y)), 96);
  const bowlMaterial = new THREE.MeshStandardMaterial({ color: '#efe3cf', roughness: 0.5, metalness: 0, side: THREE.DoubleSide });
  bowl.add(new THREE.Mesh(bowlGeometry, bowlMaterial));
  const rimGeometry = new THREE.TorusGeometry(2.5, 0.075, 14, 120);
  const rimMaterial = new THREE.MeshStandardMaterial({ color: '#5a2a84', roughness: 0.4, metalness: 0 });
  const rimMesh = new THREE.Mesh(rimGeometry, rimMaterial);
  rimMesh.rotation.x = Math.PI / 2;
  rimMesh.position.y = RIM_Y;
  bowl.add(rimMesh);
  const shadow = shadowTexture();
  const shadowGeometry = new THREE.PlaneGeometry(7.5, 7.5);
  const shadowMaterial = new THREE.MeshBasicMaterial({ map: shadow, transparent: true, depthWrite: false });
  const shadowMesh = new THREE.Mesh(shadowGeometry, shadowMaterial);
  shadowMesh.rotation.x = -Math.PI / 2;
  shadowMesh.position.y = -0.02;
  bowl.add(shadowMesh);
  scene.add(bowl);

  const speckle = speckleTexture();
  const grain = grainTexture();
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff, map: speckle, bumpMap: grain, bumpScale: 0.6, roughness: 0.82, metalness: 0 });

  const total = options.compact ? 34 : 56;
  const random = seeded(1311);
  const particles: Particle[] = [];
  const meshes: THREE.InstancedMesh[] = [];
  const geometries: THREE.BufferGeometry[] = [];
  const colour = new THREE.Color();
  const euler = new THREE.Euler();

  for (const shape of SHAPES) {
    const count = Math.max(1, Math.round(total * shape.share));
    const geometry = shape.geometry();
    geometries.push(geometry);
    const mesh = new THREE.InstancedMesh(geometry, material, count);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    mesh.frustumCulled = false; // instances move every frame and span the whole view
    for (let i = 0; i < count; i++) {
      mesh.setColorAt(i, colour.set(shape.colours[Math.floor(random() * shape.colours.length)]));
      particles.push({
        mesh,
        index: i,
        nx: random() * 2 - 1,
        ny: random() * 1.9 - 0.85,
        z: -5 + random() * 6.5,
        scale: lerp(shape.scale[0], shape.scale[1], random()),
        axis: new THREE.Vector3(random() - 0.5, random() - 0.5, random() - 0.5).normalize(),
        tilt: new THREE.Quaternion().setFromEuler(euler.set(random() * Math.PI * 2, random() * Math.PI * 2, random() * Math.PI * 2)),
        rest: new THREE.Quaternion().setFromEuler(shape.lies === 'side'
          ? euler.set(Math.PI / 2 + (random() - 0.5) * 0.8, (random() - 0.5) * 0.6, random() * Math.PI * 2, 'XZY')
          : euler.set((random() - 0.5) * 0.7, random() * Math.PI * 2, (random() - 0.5) * 0.7)),
        target: new THREE.Vector3(),
        spin: 4 + random() * 8,
        wave: 0.25 + random() * 0.8,
        phase: random() * Math.PI * 2,
        lift: 1.6 + random() * 2.2,
        long: shape.lies === 'side',
        delay: 0,
      });
    }
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    meshes.push(mesh);
    scene.add(mesh);
  }

  // Shuffle so shapes and colours mix in the pile, then fill the bowl from the bottom up.
  const order = particles.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  const targets = bowlTargets(particles.length, random);
  order.forEach((particleIndex, rank) => {
    const particle = particles[particleIndex];
    particle.target.copy(targets[rank]);
    if (particle.long) {
      // Pull long puffs towards the centre so their ends stay inside the wall.
      const r = Math.hypot(particle.target.x, particle.target.z);
      const k = r > 0 ? Math.max(0, r - 0.55) / r : 0;
      particle.target.x *= k;
      particle.target.z *= k;
    }
    particle.delay = rank / Math.max(1, particles.length - 1);
  });

  // Reused in the loop: no per-frame allocations.
  const matrix = new THREE.Matrix4();
  const position = new THREE.Vector3();
  const floatPos = new THREE.Vector3();
  const bowlPos = new THREE.Vector3();
  const control = new THREE.Vector3();
  const rotation = new THREE.Quaternion();
  const spinQ = new THREE.Quaternion();
  const scaleV = new THREE.Vector3();

  let halfWidth = 6;
  let halfHeight = 4.4;
  let bowlScale = 1;
  // Horizontal range of the floating field: biased to the bowl's side on wide screens, so the copy stays clear.
  let fieldMinX = -6;
  let fieldMaxX = 6;
  let target = 0;
  let current = 0;
  let reduced = options.reducedMotion;
  let active = false;
  let dirty = true;

  function layout(progress: number) {
    for (const p of particles) {
      // 1. Floating: puffs drift gently around the heading.
      const depthScale = 1 + (-p.z) * 0.1;
      floatPos.set(
        lerp(fieldMinX, fieldMaxX, (p.nx + 1) / 2) * depthScale + Math.sin(progress * 5 + p.phase) * p.wave,
        p.ny * halfHeight * 0.9 + Math.sin(progress * 4 + p.phase * 1.3) * 0.35 + progress * 0.8,
        p.z,
      );
      // 2. Collecting: each puff arcs into its spot, lowest spots first.
      const start = 0.06 + p.delay * 0.62;
      const t = easeInOut(clamp01((progress - start) / 0.26));
      bowlPos.copy(p.target).multiplyScalar(bowlScale).add(bowl.position);
      control.set(
        lerp(floatPos.x, bowlPos.x, 0.5),
        Math.max(floatPos.y, bowlPos.y) + p.lift * bowlScale,
        lerp(floatPos.z, bowlPos.z, 0.5),
      );
      const u = 1 - t;
      position.set(
        u * u * floatPos.x + 2 * u * t * control.x + t * t * bowlPos.x,
        u * u * floatPos.y + 2 * u * t * control.y + t * t * bowlPos.y,
        u * u * floatPos.z + 2 * u * t * control.z + t * t * bowlPos.z,
      );
      // Tumble while floating, slowing to a resting angle in the bowl.
      spinQ.setFromAxisAngle(p.axis, p.phase + progress * p.spin * (1 - t));
      rotation.copy(p.tilt).multiply(spinQ).slerp(p.rest, t);
      const floatScale = p.scale * Math.min(1, bowlScale + 0.15);
      scaleV.setScalar(lerp(floatScale, p.scale * 0.82 * bowlScale, t));
      matrix.compose(position, rotation, scaleV);
      p.mesh.setMatrixAt(p.index, matrix);
    }
    for (const mesh of meshes) mesh.instanceMatrix.needsUpdate = true;
  }

  function resize() {
    const width = container.clientWidth || 1;
    const height = container.clientHeight || 1;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    halfHeight = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.position.length();
    halfWidth = halfHeight * camera.aspect;
    // Bowl sits in the lower part of the screen, under the heading; smaller on narrow screens.
    if (camera.aspect > 1.15) {
      // Wide screens: copy on the left, bowl on the right, vertically centred.
      bowlScale = Math.min(1.3, Math.max(0.8, halfHeight * 0.3));
      bowl.position.set(halfWidth * 0.42, -halfHeight * 0.62, 0.5);
      fieldMinX = -halfWidth * 0.1;
      fieldMaxX = halfWidth * 0.98;
    } else {
      // Narrow screens: copy at the top, bowl at the bottom centre.
      bowlScale = Math.min(1.15, Math.max(0.55, (halfWidth * 0.8) / 2.6));
      bowl.position.set(0, -halfHeight * 0.92, 0.5);
      fieldMinX = -halfWidth * 0.95;
      fieldMaxX = halfWidth * 0.95;
    }
    bowl.scale.setScalar(bowlScale);
    dirty = true;
    if (!active) frame();
  }

  function frame() {
    if (!reduced) {
      const delta = target - current;
      if (Math.abs(delta) > 0.0001) {
        current += delta * 0.09; // eased follow: puffs glide to the scroll position
        dirty = true;
      }
    }
    if (!dirty) return;
    layout(reduced ? FINISHED : current);
    renderer.render(scene, camera);
    dirty = false;
  }

  const observer = new ResizeObserver(resize);
  observer.observe(container);
  resize();

  return {
    setProgress(progress) {
      target = clamp01(progress);
    },
    setActive(next) {
      if (next === active) return;
      active = next;
      renderer.setAnimationLoop(active ? frame : null);
    },
    setReducedMotion(next) {
      reduced = next;
      current = target;
      dirty = true;
      frame();
    },
    dispose() {
      renderer.setAnimationLoop(null);
      observer.disconnect();
      for (const mesh of meshes) {
        scene.remove(mesh);
        mesh.dispose();
      }
      for (const geometry of [...geometries, bowlGeometry, rimGeometry, shadowGeometry]) geometry.dispose();
      for (const texture of [speckle, grain, shadow]) texture.dispose();
      for (const mat of [material, bowlMaterial, rimMaterial, shadowMaterial]) mat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
