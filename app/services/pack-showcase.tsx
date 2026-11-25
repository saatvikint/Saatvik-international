'use client';

import { useEffect, useRef, useState } from 'react';
import type { PackScene } from './pack-scene';

// 360° private-label mock-up: a jar, a stand-up pouch and a pillow pouch with a generic "Your Brand Name" label (client 2026-11-20).
// three.js loads only near the viewport and renders only while on screen; drag to spin.
// Reduced motion: no auto-rotation, dragging still works. No WebGL: a labelled still placeholder.

type Mode = 'pending' | 'webgl' | 'fallback';

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

export function PackShowcase() {
  const stage = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>('pending');

  useEffect(() => {
    const stageEl = stage.current;
    if (!stageEl) return;
    let scene: PackScene | null = null;
    let cancelled = false;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMotionChange = (event: MediaQueryListEvent) => scene?.setReducedMotion(event.matches);

    const visibility = new IntersectionObserver(entries => scene?.setActive(entries.some(entry => entry.isIntersecting)));
    const loader = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      loader.disconnect();
      if (!supportsWebGL()) {
        setMode('fallback');
        return;
      }
      import('./pack-scene')
        .then(({ createPackScene }) => {
          if (cancelled) return;
          scene = createPackScene(stageEl, { reducedMotion: motionQuery.matches });
          visibility.observe(stageEl);
          setMode('webgl');
        })
        .catch(error => {
          console.error('[pack-showcase] 3D mock-up failed, showing fallback', error);
          setMode('fallback');
        });
    }, { rootMargin: '400px 0px' });

    loader.observe(stageEl);
    motionQuery.addEventListener('change', onMotionChange);
    return () => {
      cancelled = true;
      loader.disconnect();
      visibility.disconnect();
      motionQuery.removeEventListener('change', onMotionChange);
      scene?.dispose();
    };
  }, []);

  return (
    <figure className={`pack-showcase is-${mode}`}>
      <div ref={stage} className="pack-showcase-stage" role="img"
        aria-label="3D mock-up of a jar of roasted makhana, a stand-up pouch of jowar puffs and a pillow pouch of peri peri makhana, labelled 'Your Brand Name', rotating" />
      {mode === 'fallback' && <div className="pack-showcase-fallback">Jar, stand-up pouch and pillow pouch mock-up</div>}
      <figcaption>
        <span className="pack-showcase-hint" aria-hidden="true">↔ Drag to rotate</span>
        <span>Illustrative mock-up. Your brand, flavour and pack format are agreed per enquiry.</span>
      </figcaption>
    </figure>
  );
}
