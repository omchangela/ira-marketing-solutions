'use client';
import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { Tilt } from './Interactive';
import styles from './Journey.module.css';

const STEPS = [
  {
    n: '01',
    title: 'Get attention',
    desc: 'Ads, content, and high-converting websites create qualified demand.',
    icon: '/3d/megaphone.webp',
    tag: 'Marketing Engine',
    metric: 'Impressions & Clicks',
  },
  {
    n: '02',
    title: 'Customer reaches out',
    desc: 'A high-intent prospect calls or messages your business directly.',
    icon: '/3d/phone.webp',
    tag: 'Inbound Flow',
    metric: '< 1 Ring Response',
  },
  {
    n: '03',
    title: 'Third Assistant answers',
    desc: 'The AI engages instantly, answers specific questions, and qualifies intent.',
    icon: '/3d/ai_headset.webp',
    tag: 'AI Receptionist',
    metric: '24/7 Availability',
  },
  {
    n: '04',
    title: 'Lead becomes action',
    desc: 'Instant appointment booked, hot transfer placed, or CRM updated.',
    icon: '/3d/calendar.webp',
    tag: 'Closed Loop',
    metric: 'Zero Leads Lost',
  },
];

export default function Journey() {
  const ref = useRef(null);

  useGSAP(
    () => {
      gsap.from('[data-journey-header] > *', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '[data-journey-header]',
          start: 'top 80%',
        },
      });

      const cards = gsap.utils.toArray('[data-step-card]');
      gsap.from(cards, {
        y: 80,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '[data-steps-grid]',
          start: 'top 80%',
        },
      });

      // Animate progress line on scroll
      gsap.fromTo(
        '[data-progress-bar]',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-steps-grid]',
            start: 'top 75%',
            end: 'bottom 75%',
            scrub: true,
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <section id="how" ref={ref} className={`section ${styles.section}`}>
      <div className={styles.glow} aria-hidden="true" />
      <div className="container">
        <div className={styles.header} data-journey-header>
          <span className="eyebrow">The full customer journey</span>
          <h2 className="h2">
            From attention <span className="serif grad-text">to appointment.</span>
          </h2>
          <p className="lead">
            Your marketing and AI receptionist work together as one synchronous system instead of two disconnected tools.
          </p>
        </div>

        <div className={styles.gridWrapper}>
          <div className={styles.trackLine}>
            <div className={styles.progressBar} data-progress-bar />
          </div>

          <div className={styles.grid} data-steps-grid>
            {STEPS.map((step) => (
              <div key={step.n} data-step-card className={styles.cardWrap}>
                <Tilt className={styles.card} max={8}>
                  <span className={styles.glare} data-glare />
                  <div className={styles.cardHeader}>
                    <span className={styles.number}>{step.n}</span>
                    <span className={styles.badge}>{step.tag}</span>
                  </div>

                  <div className={styles.iconContainer}>
                    <img
                      src={step.icon}
                      alt={step.title}
                      className="icon3d"
                      width="160"
                      height="160"
                      loading="lazy"
                    />
                  </div>

                  <h3 className={styles.title}>{step.title}</h3>
                  <p className={styles.desc}>{step.desc}</p>

                  <div className={styles.metric}>
                    <span className={styles.metricDot} />
                    <span>{step.metric}</span>
                  </div>
                </Tilt>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
