'use client';
import { useState } from 'react';
import { Tilt } from './Interactive';
import styles from './Contact.module.css';

export function LeadForm({ idPrefix = 'contact', onSuccess }) {
  const [service, setService] = useState('both');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      if (onSuccess) onSuccess();
    }, 700);
  };

  if (submitted) {
    return (
      <div className={styles.successBox}>
        <div className={styles.successIcon}>✓</div>
        <h3>Demo Requested!</h3>
        <p>Our team will reach out within 15 minutes to configure your customized growth preview.</p>
        <button
          className="btn btn-ghost btn-sm"
          style={{ marginTop: 18 }}
          onClick={() => setSubmitted(false)}
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor={`${idPrefix}-name`}>Your Name</label>
        <input
          id={`${idPrefix}-name`}
          type="text"
          required
          placeholder="e.g. Alex Morgan"
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor={`${idPrefix}-business`}>Business Name</label>
        <input
          id={`${idPrefix}-business`}
          type="text"
          required
          placeholder="e.g. Apex Health Clinic"
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor={`${idPrefix}-contact`}>Phone or Email</label>
        <input
          id={`${idPrefix}-contact`}
          type="text"
          required
          placeholder="e.g. alex@apexhealth.com or (555) 012-3456"
          className={styles.input}
        />
      </div>

      <div className={styles.field}>
        <label>What do you want help with?</label>
        <div className={styles.pills}>
          {[
            { id: 'marketing', label: 'Digital Marketing' },
            { id: 'assistant', label: 'Third Assistant AI Receptionist' },
            { id: 'both', label: 'Both' },
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`${styles.pill} ${service === opt.id ? styles.pillActive : ''}`}
              onClick={() => setService(opt.id)}
            >
              {service === opt.id && <span className={styles.check}>✓</span>}
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <button
        id={`${idPrefix}-submit-btn`}
        type="submit"
        className="btn btn-light"
        style={{ width: '100%', justifyContent: 'center', marginTop: 10 }}
        disabled={loading}
      >
        {loading ? 'Submitting…' : 'Request a Demo'} <span className="arrow">→</span>
      </button>

      <p className={styles.privacyNote}>
        🔒 No credit card required · Instant access · Guaranteed zero spam
      </p>
    </form>
  );
}

export default function Contact() {
  return (
    <section id="contact" className={`section ${styles.section}`}>
      <div className={styles.ambientGlow} aria-hidden="true" />
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.info}>
            <span className="eyebrow">Let&apos;s Talk</span>
            <h2 className="h2">
              See how IRA + Third Assistant can <span className="serif grad-text">work for your business.</span>
            </h2>
            <p className="lead">
              Get a customized walkthrough of both our lead generation campaigns and real-time AI receptionist workflows.
            </p>

            <div className={styles.reasons}>
              <div className={styles.reason}>
                <span className={styles.rIcon}>⚡</span>
                <div>
                  <h4>Zero Call-Loss Guarantee</h4>
                  <p>Capture 100% of high-intent callers outside standard office hours.</p>
                </div>
              </div>
              <div className={styles.reason}>
                <span className={styles.rIcon}>🎯</span>
                <div>
                  <h4>Data-Driven Acquisition</h4>
                  <p>Targeted ads designed strictly around booked clients and revenue ROI.</p>
                </div>
              </div>
              <div className={styles.reason}>
                <span className={styles.rIcon}>🤝</span>
                <div>
                  <h4>1-on-1 Strategy Setup</h4>
                  <p>Direct onboarding with our technical voice & growth engineering team.</p>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.formCol}>
            <Tilt className={styles.formCard} max={5}>
              <div className={styles.formCardHeader}>
                <span className={styles.dotActive} />
                <span>Private Consultation Booking</span>
              </div>
              <LeadForm idPrefix="inline" />
            </Tilt>
          </div>
        </div>
      </div>
    </section>
  );
}
