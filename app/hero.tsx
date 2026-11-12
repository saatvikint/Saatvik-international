'use client';

import { useEffect, useRef, useState, type FocusEvent, type KeyboardEvent } from 'react';
import { featuredSlides } from './flavours';
import { Icon } from './visuals';

export function FlavourHero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [switching, setSwitching] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [status, setStatus] = useState('');
  const requested = useRef(0);
  const motion = useRef<MediaQueryList | null>(null);
  const transition = useRef<ReturnType<typeof setTimeout> | null>(null);
  const announce = useRef(false);
  const slide = featuredSlides[current];

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    motion.current = preference;
    if (preference.matches) setPaused(true);
    function changeMotion(event: MediaQueryListEvent) { if (event.matches) setPaused(true); }
    function changeVisibility() { setHidden(document.hidden); }
    changeVisibility();
    preference.addEventListener('change', changeMotion);
    document.addEventListener('visibilitychange', changeVisibility);
    return () => {
      if (transition.current) clearTimeout(transition.current);
      preference.removeEventListener('change', changeMotion);
      document.removeEventListener('visibilitychange', changeVisibility);
    };
  }, []);

  function select(index: number, manual: boolean) {
    const size = featuredSlides.length;
    requested.current = (index + size) % size;
    if (requested.current === current && transition.current === null) return;
    announce.current ||= manual;
    if (transition.current !== null) return;

    function commit() {
      const selected = requested.current;
      setCurrent(selected);
      if (announce.current) setStatus(featuredSlides[selected].label + ', slide ' + (selected + 1) + ' of ' + size);
      announce.current = false;
      transition.current = null;
      setSwitching(false);
    }

    if (motion.current?.matches) {
      commit();
      return;
    }
    setSwitching(true);
    transition.current = setTimeout(commit, 195);
  }

  useEffect(() => {
    if (paused || focused || hidden || switching) return;
    const timer = setTimeout(() => select(current + 1, false), 5500);
    return () => clearTimeout(timer);
  }, [current, paused, focused, hidden, switching]);

  function pauseForFocus(event: FocusEvent<HTMLElement>) {
    const target = event.type === 'blur' ? event.relatedTarget : event.target;
    setFocused(target instanceof Element && event.currentTarget.contains(target) && !target.closest('.hero-toggle'));
  }

  function useArrows(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    select(requested.current + (event.key === 'ArrowLeft' ? -1 : 1), true);
  }

  return (
    <section className={switching ? 'hero is-switching' : 'hero'} data-flavour={slide.theme} onFocus={pauseForFocus} onBlur={pauseForFocus} aria-label="Featured products" aria-roledescription="carousel">
        <svg className="hero-wave" viewBox="0 0 1440 580" preserveAspectRatio="none" aria-hidden="true"><path d="M0 485C105 495 152 570 280 550c119-19 140-76 253-88 127-13 149 18 219-67C849 277 904 81 1040 64c111-14 149 67 249 24 59-26 99-68 151-80v572H0Z"/></svg>
        <div className="shell hero-inner">
          <div className="hero-copy">
            <div className="hero-slide-copy">
              <span className="sticker" data-hero-tag>{slide.tag}</span>
              <h1 id="hero-title"><span className="hero-title-top" data-hero-title-first>{slide.title[0]}</span><br /><span className="hero-title-bottom"><span data-hero-title-second>{slide.title[1]}</span><svg viewBox="0 0 310 30" preserveAspectRatio="none" aria-hidden="true"><path d="M5 23C88 6 208-2 304 12M60 26c61-8 123-10 182-9"/></svg></span></h1>
              <p data-hero-description>{slide.description}</p>
              <a href={slide.href} className="button primary hero-shop" data-hero-shop>Request quote <Icon name="arrow" /></a>
            </div>
            <div className="hero-controls" aria-label="Carousel controls" onKeyDown={useArrows}>
              <button className="hero-control hero-prev" type="button" onClick={() => select(requested.current - 1, true)} aria-label="Previous product"><Icon name="arrow" /></button>
              <div className="hero-dots" role="group" aria-label="Select a product">
                {featuredSlides.map((item, index) => <button key={item.id} type="button" onClick={() => select(index, true)} aria-label={item.label} aria-pressed={current === index} />)}
            </div>
              <button className="hero-control" type="button" onClick={() => select(requested.current + 1, true)} aria-label="Next product"><Icon name="arrow" /></button>
              <button className="hero-control hero-toggle" type="button" aria-label={(paused ? 'Play' : 'Pause') + ' product rotation'} onClick={() => setPaused(value => !value)}><Icon name={paused ? 'play-icon' : 'pause-icon'} /></button>
            </div>
            <span className="sr-only" data-hero-status role="status">{status}</span>
          </div>
          <div className="hero-art" role="img" aria-label={slide.image.alt}>
            <div className="hero-stage" aria-hidden="true">
              <div className="hero-pattern"></div>
              <div className="hero-orbit"></div>
              <div className="hero-shadow"></div>
            </div>
            <div className="hero-product">
              <img key={slide.id} className="hero-jar hero-photo" src={slide.image.src} width={slide.image.width} height={slide.image.height} alt="" fetchPriority={current === 0 ? 'high' : 'auto'} decoding="async" />
            </div>
            <svg className="hero-rays" viewBox="0 0 85 75" aria-hidden="true"><path d="M12 39 6 10m24 33 21-35M43 56l33-11"/></svg>
                        <div className="hero-seal" aria-hidden="true"><span>{slide.seal[0]}</span><span className="seal-divider"></span><span>{slide.seal[1]}</span></div>
          </div>
        </div>
      </section>
  );
}
