'use client';
import { useRef } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import styles from './Marquee.module.css';

const ROW_A = ['Dental clinics', 'Real estate', 'Law firms', 'HVAC & plumbing', 'Med spas', 'Auto repair'];
const ROW_B = ['Salons', 'Restaurants', 'Insurance', 'Fitness studios', 'Home services', 'Clinics'];

function Row({ items, reverse, rowRef }) {
  const list = [...items, ...items, ...items, ...items];
  return (
    <div className={`${styles.row} ${reverse ? styles.rev : ''}`}>
      <div ref={rowRef} className={styles.track}>
        {list.map((t, i) => (
          <span key={i} className={styles.item}>
            {t}
            <svg viewBox="0 0 24 24" className={styles.star} aria-hidden="true">
              <path d="M12 0c.8 6.4 5.6 11.2 12 12-6.4.8-11.2 5.6-12 12-.8-6.4-5.6-11.2-12-12C6.4 11.2 11.2 6.4 12 0z" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  const ref = useRef(null);
  const a = useRef(null);
  const b = useRef(null);

  useGSAP(
    () => {
      // infinite loop whose speed reacts to scroll velocity
      const la = gsap.to(a.current, { xPercent: -50, duration: 40, ease: 'none', repeat: -1 });
      const lb = gsap.fromTo(b.current, { xPercent: -50 }, { xPercent: 0, duration: 40, ease: 'none', repeat: -1 });
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const v = Math.min(Math.abs(self.getVelocity()) / 300, 6);
          gsap.to([la, lb], { timeScale: 1 + v, duration: 0.3, overwrite: true });
          gsap.to([la, lb], { timeScale: 1, duration: 1.2, delay: 0.3 });
        },
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className={styles.wrap} aria-label="Industries we serve">
      <p className={styles.label}>Built for businesses where every call is revenue</p>
      <Row items={ROW_A} rowRef={a} />
      <Row items={ROW_B} rowRef={b} reverse />
    </section>
  );
}
