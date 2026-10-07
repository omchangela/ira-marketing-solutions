'use client';
import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { Magnetic } from './Interactive';
import styles from './SalesCta.module.css';

export default function SalesCta({ onOpenDemo, onOpenExperience }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      gsap.from('[data-cta-content] > *', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 75%',
        },
      });

      gsap.fromTo(
        '[data-cta-float-1]',
        { y: 30, rotation: -10 },
        {
          y: -30,
          rotation: 10,
          duration: 4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        }
      );

      gsap.fromTo(
        '[data-cta-float-2]',
        { y: -25, rotation: 12 },
        {
          y: 25,
          rotation: -12,
          duration: 4.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        }
      );
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className={`section ${styles.section}`}>
      <div className={styles.bgGlow} aria-hidden="true" />
      <div className={styles.orb} aria-hidden="true" />

      <div className="container">
        <div className={styles.box}>
          <img
            data-cta-float-1
            src="/3d/funnel.webp"
            alt=""
            className={`icon3d ${styles.floatLeft}`}
            width="180"
            height="180"
            loading="lazy"
          />
          <img
            data-cta-float-2
            src="/3d/ai_headset.webp"
            alt=""
            className={`icon3d ${styles.floatRight}`}
            width="190"
            height="190"
            loading="lazy"
          />

          <div className={styles.content} data-cta-content>
            <span className="eyebrow">Simple Sales Message</span>
            <h2 className={styles.headline}>
              We bring customers to your business —{' '}
              <span className="serif grad-text">and make sure someone is always there to answer them.</span>
            </h2>
            <p className={styles.subtext}>
              Stop losing qualified revenue to unanswered phone lines, busy hours, and weekend voicemail black holes.
            </p>

            <div className={styles.actions}>
              <Magnetic>
                <button id="cta-book-demo" className="btn btn-primary" onClick={onOpenDemo}>
                  Get Free Growth Audit <span className="arrow">→</span>
                </button>
              </Magnetic>
              <button id="cta-hear-call" className="btn btn-ghost" onClick={onOpenExperience}>
                <span className="play">▶</span> Hear Sample Call
              </button>
            </div>

            <div className={styles.badgeRow}>
              <span className={styles.liveIndicator}>
                <span className={styles.liveDot} />
                <span>Instant onboarding · Custom trained on your business data</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
