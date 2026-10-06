'use client';
import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { Tilt } from './Interactive';
import styles from './BrandArchitecture.module.css';

const BRANDS = [
  {
    tier: 'Parent Brand',
    name: 'IRA Marketing Solutions',
    badge: 'Main Ecosystem',
    role: 'Parent brand + overarching growth infrastructure',
    features: ['Single point of accountability', 'Integrated reporting', 'Shared business intelligence'],
    highlight: true,
  },
  {
    tier: 'Inbound Growth',
    name: 'IRA Marketing',
    badge: 'Traffic & Funnels',
    role: 'Demand generation, Meta/Google ads & digital presence',
    features: ['High-intent customer acquisition', 'Tailored landing pages', 'Performance-driven ROAS'],
    highlight: false,
  },
  {
    tier: 'Autonomous AI',
    name: 'Third Assistant',
    badge: 'Voice Receptionist',
    role: 'Dedicated 24/7 AI receptionist & call booking engine',
    features: ['Zero hold times & missed calls', 'Natural conversational voice', 'Direct calendar booking'],
    highlight: false,
  },
];

export default function BrandArchitecture() {
  const ref = useRef(null);

  useGSAP(
    () => {
      gsap.from('[data-brand-head] > *', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '[data-brand-head]',
          start: 'top 80%',
        },
      });

      gsap.from('[data-brand-card]', {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '[data-brand-grid]',
          start: 'top 82%',
        },
      });
    },
    { scope: ref }
  );

  return (
    <section ref={ref} className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.header} data-brand-head>
          <span className="eyebrow">Brand Architecture</span>
          <h2 className="h2">
            One company. <span className="serif grad-text">Two clear offers.</span>
          </h2>
          <p className="lead">
            Keep IRA as your single trusted partner while deploying Third Assistant as a dedicated AI receptionist product.
          </p>
        </div>

        <div className={styles.grid} data-brand-grid>
          {BRANDS.map((b) => (
            <div key={b.name} data-brand-card className={styles.cardCol}>
              <Tilt className={`${styles.card} ${b.highlight ? styles.cardHighlight : ''}`} max={6}>
                <span className={styles.glare} data-glare />

                <div className={styles.topRow}>
                  <span className={styles.tier}>{b.tier}</span>
                  <span className={styles.badge}>{b.badge}</span>
                </div>

                <h3 className={styles.brandTitle}>{b.name}</h3>
                <p className={styles.role}>{b.role}</p>

                <div className={styles.divider} />

                <ul className={styles.featureList}>
                  {b.features.map((item, idx) => (
                    <li key={idx} className={styles.featureItem}>
                      <span className={styles.checkIcon}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Tilt>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
