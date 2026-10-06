'use client';
import Logo from './Logo';
import styles from './Footer.module.css';

export default function Footer({ onOpenDemo }) {
  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brandCol}>
            <Logo size="lg" />
            <p className={styles.brandDesc}>
              One growth system for modern businesses. Targeted digital marketing combined with a 24/7 AI voice receptionist so you never miss another customer.
            </p>
            <div className={styles.statusBadge}>
              <span className={styles.livePulse} />
              <span>Voice Receptionist Network: 99.98% Uptime</span>
            </div>
          </div>

          <div className={styles.navCol}>
            <h4>Engines</h4>
            <ul>
              <li>
                <a href="#marketing">IRA Marketing (Paid Ads)</a>
              </li>
              <li>
                <a href="#assistant">Third Assistant (AI Receptionist)</a>
              </li>
              <li>
                <a href="#how">Full Customer Journey</a>
              </li>
            </ul>
          </div>

          <div className={styles.navCol}>
            <h4>Company</h4>
            <ul>
              <li>
                <a href="#top">About IRA</a>
              </li>
              <li>
                <a href="#contact">Contact Strategy Team</a>
              </li>
              <li>
                <button className={styles.demoLink} onClick={onOpenDemo}>
                  Book a Private Demo
                </button>
              </li>
            </ul>
          </div>

          <div className={styles.actionCol}>
            <h4>Ready to scale?</h4>
            <p>Deploy both customer acquisition & autonomous call answering in 48 hours.</p>
            <button className="btn btn-light btn-sm" onClick={onOpenDemo} style={{ marginTop: 12 }}>
              Get Started Now <span className="arrow">→</span>
            </button>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>
            © {new Date().getFullYear()} IRA Marketing Solutions. All rights reserved. Third Assistant is a registered product of IRA.
          </p>
          <div className={styles.bottomRight}>
            <span className={styles.salesMessage}>
              Third Assistant — Your AI Receptionist. Always Ready.
            </span>
            <button className={styles.topBtn} onClick={scrollToTop} aria-label="Back to top">
              ↑ Top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
