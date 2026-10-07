'use client';
import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { Tilt } from './Interactive';
import styles from './Marketing.module.css';

const SERVICES = [
  {
    n: '01',
    title: 'Paid Advertising',
    copy: 'Meta and Google campaigns built around measurable business growth — not vanity clicks.',
    tags: ['Meta Ads', 'Google Ads'],
    icon: '/3d/target.webp',
  },
  {
    n: '02',
    title: 'Lead Generation',
    copy: 'Funnels and campaigns that turn attention into real customer opportunities.',
    tags: ['Funnels', 'Landing Pages'],
    icon: '/3d/funnel.webp',
  },
  {
    n: '03',
    title: 'Digital Presence',
    copy: 'Modern websites and social content that help your business look credible from the first click.',
    tags: ['Websites', 'Social Media'],
    icon: '/3d/web.webp',
  },
];

const BARS = [38, 52, 44, 66, 58, 80, 92];

export default function Marketing() {
  const ref = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      gsap.from('[data-intro] > *', {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: { trigger: '[data-intro]', start: 'top 80%' },
      });

      // dashboard bars + counters
      const dash = gsap.timeline({ scrollTrigger: { trigger: '[data-dash]', start: 'top 80%' } });
      dash
        .from('[data-dash]', { y: 60, opacity: 0, duration: 1, ease: 'power4.out' })
        .from('[data-bar]', { scaleY: 0, transformOrigin: 'bottom', duration: 1, stagger: 0.07, ease: 'expo.out' }, '-=0.6')
        .from(
          '[data-count]',
          {
            textContent: 0,
            duration: 1.6,
            ease: 'power2.out',
            snap: { textContent: 1 },
            stagger: 0.1,
          },
          '<'
        )
        .from('[data-line-path]', { strokeDashoffset: 400, duration: 1.6, ease: 'power2.inOut' }, '<');

      // service cards
      gsap.utils.toArray('[data-service]').forEach((card) => {
        const icon = card.querySelector('img');
        gsap.from(card, {
          y: 100,
          opacity: 0,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: { trigger: card, start: 'top 90%' },
        });
        gsap.fromTo(
          icon,
          { rotationY: -50, rotationZ: -10, scale: 0.7 },
          {
            rotationY: 15,
            rotationZ: 6,
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: card, start: 'top bottom', end: 'center center', scrub: 1 },
          }
        );
      });

      mm.add('(min-width: 1001px)', () => {
        gsap.to('[data-growth]', {
          y: -80,
          rotation: 12,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section id="marketing" ref={ref} className={`section ${styles.section}`}>
      <div className={`container ${styles.layout}`}>
        <div className={styles.left}>
          <div className={styles.sticky}>
            <div data-intro>
              <span className="eyebrow">IRA Marketing</span>
              <h2 className="h2">
                Bring customers <span className="serif grad-text">in.</span>
              </h2>
              <p className="lead">Build attention, demand, and a predictable flow of qualified leads.</p>
            </div>

            <div className={styles.dash} data-dash>
              <img data-growth src="/3d/growth.webp" alt="" className={`icon3d ${styles.growth}`} width="160" height="160" />
              <div className={styles.dashTop}>
                <span>Campaign performance</span>
                <span className={styles.live}>● Live</span>
              </div>
              <div className={styles.kpis}>
                <div>
                  <small>Leads this month</small>
                  <b>
                    <span data-count>284</span>
                  </b>
                  <em>+38%</em>
                </div>
                <div>
                  <small>Cost per lead</small>
                  <b>
                    $<span data-count>12</span>
                  </b>
                  <em>−21%</em>
                </div>
                <div>
                  <small>ROAS</small>
                  <b>
                    <span data-count>6</span>.4x
                  </b>
                  <em>+1.9x</em>
                </div>
              </div>
              <div className={styles.chart}>
                <svg viewBox="0 0 300 100" preserveAspectRatio="none" className={styles.lineSvg} aria-hidden="true">
                  <path
                    data-line-path
                    d="M0 80 C 40 70, 60 76, 90 60 S 150 50, 180 36 S 250 24, 300 8"
                    fill="none"
                    stroke="url(#lg)"
                    strokeWidth="2.5"
                    strokeDasharray="400"
                    strokeDashoffset="0"
                  />
                  <defs>
                    <linearGradient id="lg" x1="0" x2="1">
                      <stop offset="0" stopColor="#09757A" />
                      <stop offset="1" stopColor="#F4C430" />
                    </linearGradient>
                  </defs>
                </svg>
                {BARS.map((h, i) => (
                  <i key={i} data-bar style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.right}>
          {SERVICES.map((s) => (
            <div key={s.n} data-service className={styles.perspective}>
              <Tilt className={styles.service} max={5}>
                <span className={styles.glare} data-glare />
                <div className={styles.svcIcon}>
                  <img src={s.icon} alt="" className="icon3d" width="200" height="200" />
                </div>
                <div className={styles.svcBody}>
                  <span className={styles.num}>{s.n}</span>
                  <h3>{s.title}</h3>
                  <p>{s.copy}</p>
                  <div className={styles.tags}>
                    {s.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Tilt>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
