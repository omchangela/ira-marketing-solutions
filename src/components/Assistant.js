'use client';
import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { Magnetic } from './Interactive';
import styles from './Assistant.module.css';

const FEATURES = [
  { t: 'Answers calls naturally, 24/7', d: 'Picks up on the first ring — nights, weekends and holidays included.' },
  { t: 'Answers common customer questions', d: 'Hours, pricing, services, location — handled in a human-sounding voice.' },
  { t: 'Qualifies and captures new leads', d: 'Asks the right questions and logs every detail to your CRM.' },
  { t: 'Books appointments and transfers calls', d: 'Syncs with your calendar, or hands hot leads straight to your team.' },
];

const CHAT = [
  { who: 'AI', text: 'Thanks for calling. How can I help you today?' },
  { who: 'Customer', text: 'I’d like to schedule an appointment.' },
  { who: 'AI', text: 'Absolutely. What day works best for you?' },
];

const ACTIVITY = [
  { l: 'Calls answered', v: 18 },
  { l: 'Leads captured', v: 9 },
  { l: 'Appointments', v: 6 },
  { l: 'Missed calls', v: 0 },
];

export default function Assistant({ onOpenExperience }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      gsap.from('[data-copy] > *', {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: { trigger: '[data-copy]', start: 'top 78%' },
      });

      gsap.from('[data-feat]', {
        x: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-feats]', start: 'top 82%' },
      });
      gsap.from('[data-feat-line]', {
        scaleX: 0,
        transformOrigin: 'left',
        stagger: 0.12,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: { trigger: '[data-feats]', start: 'top 82%' },
      });

      // call device: entrance + scripted conversation
      const tl = gsap.timeline({ scrollTrigger: { trigger: '[data-device]', start: 'top 70%' } });
      tl.from('[data-device]', { y: 100, rotationY: 18, rotationX: 8, opacity: 0, duration: 1.4, ease: 'power4.out' });
      gsap.utils.toArray('[data-msg]').forEach((m) => {
        const typing = m.previousElementSibling;
        tl.fromTo(typing, { autoAlpha: 0, height: 0 }, { autoAlpha: 1, height: 34, duration: 0.3 }, '+=0.15')
          .to(typing, { autoAlpha: 0, height: 0, duration: 0.25 }, '+=0.7')
          .from(m, { y: 16, scale: 0.94, autoAlpha: 0, duration: 0.5, ease: 'back.out(1.8)' }, '<');
      });
      tl.from('[data-act]', { y: 20, autoAlpha: 0, stagger: 0.08, duration: 0.6, ease: 'power3.out' }, '-=0.4').from(
        '[data-act-n]',
        { textContent: 0, snap: { textContent: 1 }, duration: 1.4, ease: 'power2.out', stagger: 0.08 },
        '<'
      );

      gsap.to('[data-phone3d]', {
        y: -100,
        rotation: -18,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    },
    { scope: ref }
  );

  return (
    <section id="assistant" ref={ref} className={`section ${styles.section}`}>
      <div className={styles.bgGlow} aria-hidden="true" />
      <div className={`container ${styles.layout}`}>
        <div className={styles.deviceCol}>
          <img data-phone3d src="/3d/phone.webp" alt="" className={`icon3d ${styles.phone3d}`} width="190" height="190" />

          <div className={styles.device} data-device>
            <div className={styles.dHead}>
              <span>9:41</span>
              <span className={styles.dots}>● ● ●</span>
            </div>
            <div className={styles.caller}>
              <span className={styles.kicker}>AI Receptionist</span>
              <h4>Third Assistant</h4>
              <p>
                <i className={styles.rec} /> Call in progress • 00:18
              </p>
            </div>

            <div className={styles.chat}>
              {CHAT.map((c, i) => (
                <div key={i} className={styles.msgWrap}>
                  <div className={`${styles.typing} ${c.who !== 'AI' ? styles.typingMe : ''}`}>
                    <i />
                    <i />
                    <i />
                  </div>
                  <div data-msg className={`${styles.msg} ${c.who === 'AI' ? styles.ai : styles.me}`}>
                    <small>{c.who}</small>
                    {c.text}
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.controls}>
              <span title="Audio">⌁</span>
              <span title="Keypad">⌨</span>
              <span className={styles.end} title="End">
                ×
              </span>
            </div>
          </div>

          <div className={styles.activity}>
            <div className={styles.actHead}>
              <span>Today&apos;s activity</span>
              <b>● LIVE</b>
            </div>
            <div className={styles.actGrid}>
              {ACTIVITY.map((a) => (
                <div key={a.l} data-act className={a.v === 0 ? styles.zero : ''}>
                  <b data-act-n>{a.v}</b>
                  <small>{a.l}</small>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.copyCol}>
          <div data-copy>
            <span className="eyebrow">Third Assistant</span>
            <h2 className="h2">
              Your AI receptionist. <span className="serif grad-text">Always ready.</span>
            </h2>
            <p className="lead">
              When your team is busy, closed, or already on another call, Third Assistant keeps the conversation moving.
            </p>
          </div>

          <ol className={styles.feats} data-feats>
            {FEATURES.map((f, i) => (
              <li key={f.t} data-feat>
                <span className={styles.fLine} data-feat-line />
                <span className={styles.fNum}>0{i + 1}</span>
                <div>
                  <h3>{f.t}</h3>
                  <p>{f.d}</p>
                </div>
              </li>
            ))}
          </ol>

          <Magnetic>
            <button id="assistant-sample-call" className="btn btn-light" onClick={onOpenExperience}>
              <span className="play" style={{ marginLeft: -12 }}>
                ▶
              </span>
              Experience a Sample Call
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
