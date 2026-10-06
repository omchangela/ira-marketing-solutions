'use client';
import { useRef } from 'react';
import { gsap, SplitText, useGSAP } from '@/lib/gsap';
import { Tilt } from './Interactive';
import styles from './Engines.module.css';

const ENGINES = [
  {
    id: 'engine-marketing',
    href: '#marketing',
    kicker: 'Engine 01 — IRA Marketing',
    title: 'Bring customers in.',
    copy: 'Paid ads, funnels and a credible digital presence that create demand and a predictable flow of qualified leads.',
    tags: ['Meta Ads', 'Google Ads', 'Funnels', 'Websites'],
    icon: '/3d/megaphone.webp',
  },
  {
    id: 'engine-assistant',
    href: '#assistant',
    kicker: 'Engine 02 — Third Assistant',
    title: 'Answer every one of them.',
    copy: 'An AI receptionist that picks up instantly, qualifies the caller and books the appointment — even at 2 AM.',
    tags: ['24/7 answering', 'Lead capture', 'Booking', 'Transfers'],
    icon: '/3d/ai_headset.webp',
  },
];

export default function Engines() {
  const ref = useRef(null);

  useGSAP(
    () => {
      // word-by-word "light up" manifesto
      const split = SplitText.create('[data-manifesto]', { type: 'words' });
      gsap.fromTo(
        split.words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: { trigger: '[data-manifesto]', start: 'top 80%', end: 'bottom 45%', scrub: true },
        }
      );

      gsap.from('[data-head] > *', {
        y: 50,
        opacity: 0,
        duration: 1.1,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: { trigger: '[data-head]', start: 'top 80%' },
      });

      gsap.utils.toArray('[data-engine]').forEach((card, i) => {
        gsap.from(card, {
          y: 120,
          rotationX: -12,
          opacity: 0,
          duration: 1.3,
          delay: i * 0.12,
          ease: 'power4.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
        });
        gsap.fromTo(
          card.querySelector('img'),
          { rotationY: -35, y: 40 },
          {
            rotationY: 20,
            y: -30,
            ease: 'none',
            scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        );
      });

      return () => split.revert();
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className="section">
      <div className="container">
        <p className={styles.manifesto} data-manifesto>
          Most businesses don&apos;t have a lead problem. They have a <em>leak.</em> Ads bring people in — then calls go
          unanswered, after-hours inquiries vanish, and good leads go cold. IRA fixes both ends of the funnel.
        </p>

        <div className={styles.head} data-head>
          <span className="eyebrow">The system</span>
          <h2 className="h2">
            One website. Two growth engines. <span className="serif grad-text">One clear customer journey.</span>
          </h2>
        </div>

        <div className={styles.grid}>
          {ENGINES.map((e) => (
            <div key={e.id} data-engine className={styles.perspective}>
              <Tilt className={styles.card} max={7}>
                <span className={styles.glare} data-glare />
                <a id={e.id} href={e.href} className={styles.link}>
                  <div className={styles.top}>
                    <span className={styles.kicker}>{e.kicker}</span>
                    <span className={styles.go}>↗</span>
                  </div>
                  <div className={styles.iconWrap}>
                    <img src={e.icon} alt="" className="icon3d" width="300" height="300" />
                  </div>
                  <h3>{e.title}</h3>
                  <p>{e.copy}</p>
                  <div className={styles.tags}>
                    {e.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </a>
              </Tilt>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
