import styles from "./CertificationsMarquee.module.css";

// Default badge set — the Anveshan footer certification logos. Swap by passing
// your own `images` array (e.g. ["/assets/cert-1.png", ...]).
const DEFAULT_BADGES = [
  "https://www.anveshan.farm/cdn/shop/files/anv-ftr-1.png",
  "https://www.anveshan.farm/cdn/shop/files/anv-ftr-2.png",
  "https://www.anveshan.farm/cdn/shop/files/anv-ftr-3.png",
  "https://www.anveshan.farm/cdn/shop/files/anv-ftr-4.png",
  "https://www.anveshan.farm/cdn/shop/files/anv-ftr-5.png",
  "https://www.anveshan.farm/cdn/shop/files/anv-ftr-6.png",
  "https://www.anveshan.farm/cdn/shop/files/anv-ftr-7.png",
  "https://www.anveshan.farm/cdn/shop/files/anv-ftr-8.png",
];

interface Props {
  /** Badge image URLs/paths. Defaults to the Anveshan certification logos. */
  images?: string[];
}

// Infinite, continuously-scrolling certification badge strip with edge fades.
// Pure-CSS animation (pauses on hover, disabled under prefers-reduced-motion).
// The badge set is duplicated once so the -50% translate loops seamlessly.
export default function CertificationsMarquee({ images = DEFAULT_BADGES }: Props) {
  if (images.length === 0) return null;
  const slides = [...images, ...images]; // duplicate for the seamless loop

  return (
    <section className={styles.logoSlider} aria-label="Our certifications">
      <div className={styles.logoSlideTrack}>
        {slides.map((src, i) => (
          <div className={styles.logoSlide} key={i}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
