'use client';

import { useEffect, useRef } from 'react';
import type { SiteVideo } from '@/content/company-media';

// Manufacturing videos with background music (client 2026-11-20: "add sound in bg of these videos").
// Music is always on: it starts when a visitor plays a video and pauses when all videos stop (browsers
// block sound before a click). The videos' own audio starts muted so it does not clash.
// Track: original ambient loop made for this site (public/assets/audio/about-background.mp3), no licence needed.

const MUSIC_SRC = '/assets/audio/about-background.mp3';

export function StoryVideos({ videos }: { videos: SiteVideo[] }) {
  const audio = useRef<HTMLAudioElement>(null);
  const grid = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (audio.current) audio.current.volume = 0.35;
  }, []);

  /** Runs in the same tick as the user's click on play, so the browser allows sound. */
  function syncMusic() {
    const el = audio.current;
    if (!el) return;
    const anyPlaying = Array.from(grid.current?.querySelectorAll('video') ?? []).some(video => !video.paused && !video.ended);
    if (anyPlaying) el.play().catch(() => undefined);
    else el.pause();
  }

  return (
    <>
      <div ref={grid} className="story-video-grid">
        {videos.map(video => (
          <figure key={video.id} className="story-video">
            {video.embed
              ? <iframe src={video.src} title={video.title} loading="lazy" allow="encrypted-media; picture-in-picture" allowFullScreen />
              : <video src={video.src} poster={video.poster} controls playsInline muted preload="metadata"
                  onPlay={syncMusic} onPause={syncMusic} onEnded={syncMusic} />}
            <figcaption>{video.title}</figcaption>
          </figure>
        ))}
      </div>
      <audio ref={audio} src={MUSIC_SRC} loop preload="none" />
    </>
  );
}
