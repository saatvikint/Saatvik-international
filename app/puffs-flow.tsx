'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { StickerHeading } from './sticker-heading';
import { Icon } from './visuals';
import type { PuffsScene } from './puffs-flow-scene';

// Scroll-driven 3D section: puffs float, then collect into a bowl as the page scrolls.
// - three.js is loaded only when the section is near the viewport (dynamic import).
// - Rendering runs only while the section is on screen, and only moves when you scroll.
// - prefers-reduced-motion: a still arrangement, no scroll-linked motion, shorter section.
// - No WebGL: the same labelled illustrative bowl used by the catalogue.

type Mode = 'pending' | 'webgl' | 'fallback';

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

export function PuffsFlow() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>('pending');

  useEffect(() => {
    const sectionEl = section.current;
    const stageEl = stage.current;
    if (!sectionEl || !stageEl) return;

    let scene: PuffsScene | null = null;
    let cancelled = false;
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    /** 0 when the stage pins to the top of the screen, 1 when it un-pins: the whole story plays while pinned. */
    function progress(): number {
      const rect = sectionEl!.getBoundingClientRect();
      const pinnedDistance = rect.height - window.innerHeight;
      return pinnedDistance > 0 ? -rect.top / pinnedDistance : 1;
    }
    function onScroll() {
      scene?.setProgress(progress());
    }
    function onMotionChange(event: MediaQueryListEvent) {
      scene?.setReducedMotion(event.matches);
    }

    const visibility = new IntersectionObserver(entries => {
      scene?.setActive(entries.some(entry => entry.isIntersecting));
    });

    const loader = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      loader.disconnect();
      if (!supportsWebGL()) {
        setMode('fallback');
        return;
      }
      import('./puffs-flow-scene')
        .then(({ createPuffsScene }) => {
          if (cancelled) return;
          scene = createPuffsScene(stageEl, {
            reducedMotion: motionQuery.matches,
            compact: window.matchMedia('(max-width: 760px)').matches,
          });
          scene.setProgress(progress());
          visibility.observe(sectionEl);
          setMode('webgl');
        })
        .catch(() => setMode('fallback'));
    }, { rootMargin: '600px 0px' });

    loader.observe(sectionEl);
    window.addEventListener('scroll', onScroll, { passive: true });
    motionQuery.addEventListener('change', onMotionChange);

    return () => {
      cancelled = true;
      loader.disconnect();
      visibility.disconnect();
      window.removeEventListener('scroll', onScroll);
      motionQuery.removeEventListener('change', onMotionChange);
      scene?.dispose();
    };
  }, []);

  return (
    <section ref={section} className={`puffs-flow is-${mode}`} id="puffs-flow" aria-labelledby="puffs-flow-title">
      <div className="puffs-flow-sticky">
        <div ref={stage} className="puffs-flow-stage" aria-hidden="true" />
        {mode === 'fallback' && (
          <img className="puffs-flow-fallback is-illustrative" src="/assets/products/bowls/jowar-puffs.png" width={900} height={900} alt="" loading="lazy" decoding="async" />
        )}
        <div className="puffs-flow-copy">
          <StickerHeading id="puffs-flow-title" align="start" kicker="Millet · Jowar · Quinoa · Chickpea"
            rows={[[{ text: 'Puffs', tone: 'lime' }, { text: 'in', tone: 'pink', small: true }], [{ text: 'Motion', tone: 'red' }]]} />
          <p>Roasted millet, jowar, quinoa and chickpea puffs for bulk supply and private label.</p>
          <Link className="button primary" href="/catalog#category-puffs">Explore puffs <Icon name="arrow" /></Link>
        </div>
      </div>
    </section>
  );
}
