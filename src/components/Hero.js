'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { Magnetic } from './Interactive';
import styles from './Hero.module.css';

const STATS = [
  { v: '24/7', l: 'AI call coverage' },
  { v: '2-in-1', l: 'Growth ecosystem' },
  { v: '1', l: 'Unified partner' },
];

function PhoneScreen() {
  const [state, setState] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setState((s) => (s + 1) % 3), 3400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className={styles.phone}>
      <div className={styles.island} />
      <div className={styles.status}>
        <span>9:41</span>
        <span className={styles.sig}>
          <i />
          <i />
          <i />
        </span>
      </div>

      <div key={state} className={styles.screen}>
        {state === 0 && (
          <>
            <span className={styles.pill}>Incoming call</span>
            <div className={styles.avatar}>
              <span>NC</span>
              <i className={styles.ring} />
              <i className={styles.ring} style={{ animationDelay: '0.6s' }} />
            </div>
            <h4>New customer</h4>
            <p>+1 (555) 014-2290</p>
            <div className={styles.callBtns}>
              <span className={styles.decline}>✕</span>
              <span className={styles.accept}>☎</span>
            </div>
          </>
        )}
        {state === 1 && (
          <>
            <span className={`${styles.pill} ${styles.pillLive}`}>● Third Assistant · 00:07</span>
            <div className={styles.wave}>
              {Array.from({ length: 14 }).map((_, i) => (
                <i key={i} style={{ animationDelay: `${(i % 7) * 0.09}s` }} />
              ))}
            </div>
            <div className={styles.bubble}>Thanks for calling! How can I help you today?</div>
            <div className={`${styles.bubble} ${styles.bubbleMe}`}>I&apos;d like to book an appointment.</div>
          </>
        )}
        {state === 2 && (
          <>
            <span className={`${styles.pill} ${styles.pillOk}`}>Lead captured</span>
            <div className={styles.check}>✓</div>
            <h4>Appointment booked</h4>
            <p>Friday · 2:00 PM</p>
            <div className={styles.miniRow}>
              <span>SMS confirmation</span>
              <b>Sent</b>
            </div>
            <div className={styles.miniRow}>
              <span>CRM updated</span>
              <b>Done</b>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function Hero({ onOpenDemo, onOpenExperience }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.25 });

      tl.from(q('[data-line]'), { yPercent: 115, rotate: 3, duration: 1.4, stagger: 0.12 })
        .from(q('[data-fade]'), { y: 24, opacity: 0, duration: 1.1, stagger: 0.08 }, '-=1.1')
        .from(q('[data-stat]'), { y: 30, opacity: 0, duration: 1, stagger: 0.08 }, '-=0.9')
        .from(q('[data-phone]'), { y: 120, rotationX: 25, opacity: 0, duration: 1.6, ease: 'power4.out' }, 0.2)
        .from(q('[data-orbit]'), { scale: 0.6, opacity: 0, duration: 1.8, stagger: 0.15 }, 0.3)
        .from(q('[data-icon]'), { scale: 0, rotation: -30, opacity: 0, duration: 1.2, stagger: 0.12, ease: 'back.out(1.6)' }, 0.8)
        .from(q('[data-card]'), { x: (i) => (i === 1 ? 60 : -60), opacity: 0, duration: 1.1, stagger: 0.15 }, 1);

      // idle float
      q('[data-float]').forEach((el, i) => {
        gsap.to(el, {
          y: i % 2 ? 16 : -18,
          rotation: i % 2 ? -4 : 4,
          duration: 3 + i * 0.6,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      });
      gsap.to(q('[data-orbit]'), { rotation: 360, duration: 60, ease: 'none', repeat: -1 });

      // pointer parallax
      const layers = q('[data-depth]').map((el) => ({
        d: parseFloat(el.dataset.depth),
        x: gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3.out' }),
        y: gsap.quickTo(el, 'y', { duration: 1.2, ease: 'power3.out' }),
      }));
      const onMove = (e) => {
        const px = e.clientX / window.innerWidth - 0.5;
        const py = e.clientY / window.innerHeight - 0.5;
        layers.forEach((l) => {
          l.x(px * 40 * l.d);
          l.y(py * 40 * l.d);
        });
      };
      window.addEventListener('pointermove', onMove);

      // scroll out
      gsap.to(q('[data-copy]'), {
        yPercent: -18,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to(q('[data-stage]'), {
        yPercent: 12,
        scale: 0.94,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
      });

      return () => window.removeEventListener('pointermove', onMove);
    },
    { scope: ref }
  );

  return (
    <section id="top" ref={ref} className={styles.hero}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.glowA} aria-hidden="true" />
      <div className={styles.glowB} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.copy} data-copy>
          <span className="eyebrow" data-fade>
            One growth system for modern businesses
          </span>

          <h1 className={styles.title}>
            <span className={styles.line}>
              <span data-line>More leads.
              </span>
            </span>
            <span className={styles.line}>
              <span data-line>
                Never miss <span className={`serif ${styles.accent}`}>a call.</span>
              </span>
            </span>
          </h1>

          <p className={styles.sub} data-fade>
            <strong>IRA</strong> runs targeted digital marketing that brings qualified leads to your business.{' '}
            <strong>Third Assistant</strong>, our AI receptionist, answers every call 24/7 — so you convert more and miss none.
          </p>

          <div className={styles.ctas} data-fade>
            <Magnetic>
              <button id="hero-grow-business" className="btn btn-primary" onClick={onOpenDemo}>
                Get Free Growth Audit <span className="arrow">→</span>
              </button>
            </Magnetic>
            <button id="hero-hear-experience" className="btn btn-ghost" onClick={onOpenExperience}>
              <span className="play">▶</span> Hear Third Assistant
            </button>
          </div>

          <dl className={styles.stats}>
            {STATS.map((s) => (
              <div key={s.l} data-stat>
                <dt>{s.v}</dt>
                <dd>{s.l}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={styles.stage} data-stage>
          <div className={styles.orbitA} data-orbit>
            <i />
          </div>
          <div className={styles.orbitB} data-orbit>
            <i />
          </div>

          <div className={styles.phoneLayer} data-depth="0.35">
            <div data-phone>
              <PhoneScreen />
            </div>
          </div>

          <div className={`${styles.iconA}`} data-depth="1.4">
            <div data-float>
              <img data-icon src="/3d/megaphone.webp" alt="" className="icon3d" width="200" height="200" />
            </div>
          </div>
          <div className={`${styles.iconB}`} data-depth="1.1">
            <div data-float>
              <img data-icon src="/3d/calendar.webp" alt="" className="icon3d" width="170" height="170" />
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}
