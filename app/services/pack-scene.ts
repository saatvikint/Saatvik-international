// 3D private-label mock-up (three.js): a PET jar and a stand-up pouch carrying a generic "Your Brand Name"
// mark (client 2026-11-20: show the buyer's brand, not the Saatvik logo), turning slowly through 360°.
// Drag to spin. Loaded on demand by ./pack-showcase.tsx; never imported on the server.
//
// Labels are drawn on canvases. Product names on the packs are examples to show the idea, not a retail range.
import * as THREE from 'three';

export interface PackScene {
  setActive(active: boolean): void;
  setReducedMotion(reduced: boolean): void;
  dispose(): void;
}

interface Options {
  reducedMotion: boolean;
}

const INK = '#461025';
const GREEN = '#1c3d2b';
const GOLD = '#a8862f';
const CREAM = '#fcf4e6';


function text(ctx: CanvasRenderingContext2D, value: string, x: number, y: number, size: number, color: string, weight = 700, font = 'Outfit, Arial, sans-serif') {
  ctx.fillStyle = color;
  ctx.font = `${weight} ${size}px ${font}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(value, x, y);
}

function pill(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, fill: string) {
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.roundRect(x - w / 2, y - h / 2, w, h, h / 2);
  ctx.fill();
}

/** Generic placeholder brand mark: a small leaf sprig over "Your / Brand / NAME". `scale` 1 = ~300 px tall. */
function brandMark(ctx: CanvasRenderingContext2D, cx: number, cy: number, scale: number) {
  const s = scale;
  // leaf sprig
  ctx.save();
  ctx.translate(cx, cy - 118 * s);
  ctx.fillStyle = GOLD;
  for (const dir of [-1, 1]) {
    ctx.save();
    ctx.rotate(dir * 0.7);
    ctx.beginPath();
    ctx.ellipse(0, -22 * s, 11 * s, 24 * s, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  ctx.restore();
  text(ctx, 'Your', cx, cy - 62 * s, 52 * s, GREEN, 500, 'Georgia, "Times New Roman", serif');
  text(ctx, 'Brand', cx, cy + 12 * s, 112 * s, GREEN, 800, 'Ubuntu, Arial, sans-serif');
  ctx.save();
  ctx.font = `700 ${30 * s}px Outfit, Arial, sans-serif`;
  ctx.letterSpacing = `${10 * s}px`;
  ctx.fillStyle = GOLD;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('NAME', cx + 5 * s, cy + 86 * s);
  ctx.restore();
}

/** Wrap-around jar label: front panel with the brand mark, back panel with pack notes. */
function jarLabel(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 820;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = CREAM;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // top + bottom bands
  ctx.fillStyle = GREEN;
  ctx.fillRect(0, 0, canvas.width, 70);
  ctx.fillRect(0, canvas.height - 70, canvas.width, 70);
  ctx.fillStyle = GOLD;
  ctx.fillRect(0, 70, canvas.width, 12);
  ctx.fillRect(0, canvas.height - 82, canvas.width, 12);

  // Front (u = 0.5 faces the camera at rotation 0).
  const fx = canvas.width * 0.5;
  brandMark(ctx, fx, 250, 1.05);
  text(ctx, 'ROASTED MAKHANA', fx, 470, 72, GREEN, 800, 'Ubuntu, Arial, sans-serif');
  pill(ctx, fx, 575, 380, 80, '#e4512c');
  text(ctx, 'PERI PERI', fx, 577, 44, CREAM, 800);
  text(ctx, 'Nitrogen flushed · Food-grade pack', fx, 672, 32, INK, 600);

  // Back
  for (const bx of [canvas.width * 0.0, canvas.width * 1.0]) {
    text(ctx, 'PRIVATE LABEL', bx, 300, 54, GREEN, 800, 'Ubuntu, Arial, sans-serif');
    text(ctx, 'Your product · Your flavour', bx, 390, 36, INK, 600);
    text(ctx, 'Your pack format', bx, 445, 36, INK, 600);
    text(ctx, 'Nitrogen flushed', bx, 560, 30, GOLD, 700);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

/** Front face of the stand-up pouch. */
function pouchFront(back = false): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1400;
  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, '#24503a');
  gradient.addColorStop(1, GREEN);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // zip line + tear notches
  ctx.fillStyle = '#ffffff22';
  ctx.fillRect(0, 150, canvas.width, 10);
  // cream panel
  ctx.fillStyle = CREAM;
  ctx.beginPath();
  ctx.roundRect(90, 240, canvas.width - 180, 880, 60);
  ctx.fill();
  ctx.strokeStyle = GOLD;
  ctx.lineWidth = 8;
  ctx.stroke();
  const cx = canvas.width / 2;
  if (!back) {
    brandMark(ctx, cx, 462, 1.2);
    text(ctx, 'JOWAR PUFFS', cx, 650, 82, GREEN, 800, 'Ubuntu, Arial, sans-serif');
    pill(ctx, cx, 770, 420, 90, '#c7712a');
    text(ctx, 'MASALA', cx, 772, 50, CREAM, 800);
    text(ctx, 'Millet-based puffs', cx, 900, 40, INK, 600);
    text(ctx, 'Nitrogen flushed', cx, 1010, 38, GOLD, 700);
  } else {
    text(ctx, 'YOUR BRAND,', cx, 470, 76, GREEN, 800, 'Ubuntu, Arial, sans-serif');
    text(ctx, 'OUR SUPPLY', cx, 560, 76, GREEN, 800, 'Ubuntu, Arial, sans-serif');
    text(ctx, 'Product · Flavour · Pack', cx, 700, 40, INK, 600);
    brandMark(ctx, cx, 940, 0.85);
  }
  text(ctx, 'FOOD-GRADE PACKING', cx, 1250, 44, CREAM, 800);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

/** A pillowed rectangle: a plane whose middle bulges outwards like a filled pouch. */
function pouchFace(width: number, height: number, bulge: number, gusset: number): THREE.BufferGeometry {
  const g = new THREE.PlaneGeometry(width, height, 40, 56);
  const pos = g.getAttribute('position') as THREE.BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const u = x / (width / 2); // -1..1
    const v = (y + height / 2) / height; // 0 bottom .. 1 top
    const sealTop = v > 0.9 ? 0 : 1; // flat heat seal at the top
    const across = Math.cos((u * Math.PI) / 2);
    const along = Math.sin(Math.min(1, v / 0.9) * Math.PI) ** 0.6;
    const base = v < 0.18 ? (1 - v / 0.18) * gusset : 0; // bottom gusset pushes out
    pos.setZ(i, (bulge * across * along + base * across) * sealTop);
    // pouch narrows slightly towards the top seal
    pos.setX(i, x * (1 - 0.05 * v));
  }
  g.computeVertexNormals();
  return g;
}

export function createPackScene(container: HTMLElement, options: Options): PackScene {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0.6, 11);
  camera.lookAt(0, 0.1, 0);

  scene.add(new THREE.HemisphereLight('#fff6e8', '#7a4a2a', 1.6));
  const key = new THREE.DirectionalLight('#ffffff', 2.2);
  key.position.set(4, 6, 6);
  scene.add(key);
  const rim = new THREE.DirectionalLight('#ffd7a0', 1.2);
  rim.position.set(-5, 3, -4);
  scene.add(rim);

  const turntable = new THREE.Group();
  scene.add(turntable);

  // Motion state (declared before anything can call render()).
  let reduced = options.reducedMotion;
  let active = false;
  let disposed = false;
  let frame = 0;
  let last = 0;
  let angle = -0.35;
  let velocity = 0;
  let dragging = false;
  let lastX = 0;

  // ---------- jar ----------
  const jar = new THREE.Group();
  jar.position.set(-1.4, -0.2, 0);
  const jarR = 1.05, jarH = 2.9;
  const body = new THREE.Mesh(
    new THREE.CylinderGeometry(jarR, jarR, jarH, 64, 1, true),
    new THREE.MeshPhysicalMaterial({ color: '#ffffff', transparent: true, opacity: 0.28, roughness: 0.08, metalness: 0, clearcoat: 1, side: THREE.DoubleSide }),
  );
  jar.add(body);
  // contents visible above and below the label
  const fill = new THREE.Mesh(
    new THREE.CylinderGeometry(jarR * 0.94, jarR * 0.94, jarH * 0.9, 48),
    new THREE.MeshStandardMaterial({ color: '#e7b96a', roughness: 0.95 }),
  );
  fill.position.y = -jarH * 0.03;
  jar.add(fill);
  const labelMat = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.55 });
  const label = new THREE.Mesh(new THREE.CylinderGeometry(jarR * 1.01, jarR * 1.01, jarH * 0.62, 96, 1, true), labelMat);
  label.position.y = -0.08;
  jar.add(label);
  const lid = new THREE.Mesh(
    new THREE.CylinderGeometry(jarR * 1.04, jarR * 1.04, 0.5, 64),
    new THREE.MeshStandardMaterial({ color: GOLD, roughness: 0.35, metalness: 0.55 }),
  );
  lid.position.y = jarH / 2 + 0.22;
  jar.add(lid);
  const lidTop = new THREE.Mesh(new THREE.CylinderGeometry(jarR * 0.98, jarR * 1.04, 0.06, 64), new THREE.MeshStandardMaterial({ color: '#c9a443', roughness: 0.3, metalness: 0.6 }));
  lidTop.position.y = jarH / 2 + 0.49;
  jar.add(lidTop);
  const baseDisc = new THREE.Mesh(new THREE.CircleGeometry(jarR, 64), new THREE.MeshStandardMaterial({ color: '#e9c98f' }));
  baseDisc.rotation.x = Math.PI / 2;
  baseDisc.position.y = -jarH / 2;
  jar.add(baseDisc);
  turntable.add(jar);

  // ---------- pouch ----------
  const pouch = new THREE.Group();
  pouch.position.set(1.45, -0.05, 0);
  const pw = 2.3, ph = 3.3;
  const frontMat = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.45, metalness: 0.05 });
  const backMat = new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: 0.45, metalness: 0.05 });
  const front = new THREE.Mesh(pouchFace(pw, ph, 0.38, 0.22), frontMat);
  const back = new THREE.Mesh(pouchFace(pw, ph, 0.38, 0.22), backMat);
  back.rotation.y = Math.PI;
  pouch.add(front, back);
  // side seals
  const sealMat = new THREE.MeshStandardMaterial({ color: GREEN, roughness: 0.5 });
  for (const side of [-1, 1]) {
    const seal = new THREE.Mesh(new THREE.BoxGeometry(0.05, ph, 0.05), sealMat);
    seal.position.x = side * (pw / 2) * 0.975;
    pouch.add(seal);
  }
  const topSeal = new THREE.Mesh(new THREE.BoxGeometry(pw * 0.95, 0.22, 0.05), sealMat);
  topSeal.position.y = ph / 2 - 0.1;
  pouch.add(topSeal);
  turntable.add(pouch);

  // soft floor shadow
  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = shadowCanvas.height = 128;
  const sctx = shadowCanvas.getContext('2d')!;
  const grad = sctx.createRadialGradient(64, 64, 4, 64, 64, 64);
  grad.addColorStop(0, 'rgba(70,16,37,0.35)');
  grad.addColorStop(1, 'rgba(70,16,37,0)');
  sctx.fillStyle = grad;
  sctx.fillRect(0, 0, 128, 128);
  const shadow = new THREE.Mesh(new THREE.PlaneGeometry(7.5, 2.2), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(shadowCanvas), transparent: true, depthWrite: false }));
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -1.95;
  scene.add(shadow);

  // ---------- textures (redrawn once web fonts are ready) ----------
  const textures: THREE.Texture[] = [];
  function applyTextures() {
    textures.forEach(t => t.dispose());
    textures.length = 0;
    const jarTex = jarLabel();
    const frontTex = pouchFront();
    const backTex = pouchFront(true);
    textures.push(jarTex, frontTex, backTex);
    labelMat.map = jarTex;
    // Cylinder UV seam faces -z by default; offset so the front panel (u = 0.5) faces the camera.
    jarTex.wrapS = THREE.RepeatWrapping;
    jarTex.offset.x = 0.25;
    frontMat.map = frontTex;
    backMat.map = backTex;
    labelMat.needsUpdate = frontMat.needsUpdate = backMat.needsUpdate = true;
    render();
  }
  applyTextures();
  document.fonts?.ready.then(() => { if (!disposed) applyTextures(); }).catch(() => undefined);

  // ---------- size ----------
  function resize() {
    const { clientWidth: w, clientHeight: h } = container;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // keep both packs in frame on narrow screens
    camera.position.z = w / h < 0.9 ? 12 : w / h < 1.2 ? 9.6 : 9;
    camera.updateProjectionMatrix();
    render();
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);

  // ---------- motion ----------
  function render() {
    turntable.rotation.y = angle;
    // each pack also turns on its own axis so both show front and back
    jar.rotation.y = angle * 0.6;
    pouch.rotation.y = -angle * 0.4;
    renderer.render(scene, camera);
  }

  function tick(now: number) {
    frame = 0;
    if (disposed || !active) return;
    const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
    last = now;
    if (!dragging) {
      if (Math.abs(velocity) > 0.0005) {
        angle += velocity;
        velocity *= 0.94;
      } else if (!reduced) {
        angle += dt * 0.45; // ~14 s per full turn
      }
    }
    render();
    if (!reduced || dragging || Math.abs(velocity) > 0.0005) frame = requestAnimationFrame(tick);
  }
  function start() {
    if (!frame && active && !disposed) {
      last = 0;
      frame = requestAnimationFrame(tick);
    }
  }

  const canvas = renderer.domElement;
  canvas.style.touchAction = 'pan-y';
  function onDown(event: PointerEvent) {
    dragging = true;
    lastX = event.clientX;
    velocity = 0;
    canvas.setPointerCapture(event.pointerId);
    start();
  }
  function onMove(event: PointerEvent) {
    if (!dragging) return;
    const dx = event.clientX - lastX;
    lastX = event.clientX;
    angle += dx * 0.01;
    velocity = dx * 0.01;
    render();
  }
  function onUp(event: PointerEvent) {
    dragging = false;
    if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
    start();
  }
  canvas.addEventListener('pointerdown', onDown);
  canvas.addEventListener('pointermove', onMove);
  canvas.addEventListener('pointerup', onUp);
  canvas.addEventListener('pointercancel', onUp);

  resize();

  return {
    setActive(value) {
      active = value;
      if (active) start();
    },
    setReducedMotion(value) {
      reduced = value;
      start();
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('pointercancel', onUp);
      textures.forEach(t => t.dispose());
      scene.traverse(object => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach(material => { (material as THREE.MeshStandardMaterial).map?.dispose(); material.dispose(); });
        }
      });
      renderer.dispose();
      canvas.remove();
    },
  };
}
