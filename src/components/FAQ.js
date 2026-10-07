'use client';
import { useRef, useState } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import styles from './FAQ.module.css';

const FAQS = [
  {
    q: 'How much does digital marketing cost for a small business?',
    a: 'Our monthly digital marketing packages start from a budget that fits most small and medium businesses. We run paid Meta and Google campaigns with full management, creative, and reporting included. Every client gets a Free Growth Audit first so we can give you an exact number based on your goals and industry — no guessing.',
  },
  {
    q: 'What is the best AI receptionist for a local business?',
    a: 'Third Assistant is purpose-built for local service businesses — clinics, salons, law firms, home services, and more. It answers every inbound call in under one ring, 24/7, in a natural conversational voice. It qualifies leads, books appointments directly into your calendar, and updates your CRM — all automatically.',
  },
  {
    q: 'How fast can I start getting more leads?',
    a: 'Most clients see their first qualified leads within 7–14 days of campaign launch. We build and launch your first ad creative within 48 hours of onboarding, and Third Assistant can go live on the same day. Speed depends on your niche and target area, which we map out in your free audit.',
  },
  {
    q: 'Do I need to run ads AND use an AI receptionist?',
    a: 'Not necessarily — but the combination is what makes our system so powerful. IRA Marketing drives qualified traffic to your business, and Third Assistant ensures none of those leads are lost to a missed call or voicemail. Together they form one closed-loop growth engine. You can start with just one and add the other anytime.',
  },
  {
    q: 'What industries do you work with?',
    a: "We work with local and regional service businesses across healthcare, legal, home services, fitness, beauty, education, and professional services. If your business depends on phone calls and booked appointments, our system is a direct fit. We've helped clients from solo operators to 20-location franchises.",
  },
  {
    q: 'What does "Free Growth Audit" include?',
    a: 'Your Growth Audit is a 20-minute strategy call where we analyze your current marketing, call-handling process, and biggest gaps. We deliver a custom report showing exactly where you\'re losing leads and the fastest path to fix it — for free, with no obligation.',
  },
  {
    q: 'Can Third Assistant handle complex questions about my business?',
    a: 'Yes. Third Assistant is trained on information you provide about your services, pricing, team, and FAQs. It can answer specific questions, explain your offers, collect caller details, and route complex queries to your team. It sounds natural — not robotic — because it\'s built on advanced conversational AI.',
  },
];

export default function FAQ() {
  const ref = useRef(null);
  const [open, setOpen] = useState(null);

  useGSAP(
    () => {
      gsap.from('[data-faq-head] > *', {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: { trigger: '[data-faq-head]', start: 'top 80%' },
      });

      gsap.from('[data-faq-item]', {
        y: 50,
        opacity: 0,
        stagger: 0.07,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: '[data-faq-list]', start: 'top 80%' },
      });
    },
    { scope: ref }
  );

  const toggle = (i) => setOpen(open === i ? null : i);

  return (
    <section id="faq" ref={ref} className={`section ${styles.section}`}>
      <div className={styles.glow} aria-hidden="true" />
      <div className="container">
        <div className={styles.header} data-faq-head>
          <span className="eyebrow">Frequently Asked</span>
          <h2 className="h2">
            Questions we get <span className="serif grad-text">all the time.</span>
          </h2>
          <p className="lead">
            Everything you need to know about IRA Marketing and Third Assistant — plain English, no jargon.
          </p>
        </div>

        <div className={styles.list} data-faq-list>
          {FAQS.map((item, i) => (
            <div
              key={i}
              data-faq-item
              className={`${styles.item} ${open === i ? styles.itemOpen : ''}`}
            >
              <button
                id={`faq-toggle-${i}`}
                className={styles.question}
                onClick={() => toggle(i)}
                aria-expanded={open === i}
              >
                <span className={styles.qText}>{item.q}</span>
                <span className={styles.icon} aria-hidden="true">
                  {open === i ? '−' : '+'}
                </span>
              </button>
              <div className={styles.answerWrap} style={{ maxHeight: open === i ? 400 : 0 }}>
                <p className={styles.answer}>{item.a}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.cta} data-faq-head>
          <p>Still have questions? We&apos;ll answer them on your free audit call.</p>
          <a href="#contact" id="faq-cta-link" className="btn btn-primary">
            Get Your Free Growth Audit <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
