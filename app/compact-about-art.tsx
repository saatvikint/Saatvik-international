type CompactAboutArtProps = {
  className?: string;
};

export function CompactAboutArt({ className = '' }: CompactAboutArtProps) {
  return (
    <div className={`compact-about-art ${className}`.trim()} aria-hidden="true">
      <span className="compact-about-photo">
        <img
          src="/assets/about/lifestyle-makhana.webp"
          width={900}
          height={900}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </span>
      <img className="compact-about-piece piece-makhana" src="/assets/decor/single-raw-makhana.webp" width={220} height={220} alt="" loading="lazy" decoding="async" />
      <img className="compact-about-piece piece-puff" src="/assets/decor/single-puff-curl.webp" width={220} height={220} alt="" loading="lazy" decoding="async" />
      <img className="compact-about-piece piece-mango" src="/assets/decor/single-mango-cube.webp" width={220} height={220} alt="" loading="lazy" decoding="async" />
    </div>
  );
}
