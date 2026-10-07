'use client';
import { useRef, useState } from 'react';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import Logo from './Logo';
import { Magnetic } from './Interactive';
import styles from './Navbar.module.css';

const LINKS = [
  { href: '#marketing', label: 'Marketing' },
  { href: '#assistant', label: 'Third Assistant' },
  { href: '#how', label: 'How It Works' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar({ onOpenDemo }) {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      gsap.from(ref.current, { y: -40, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.2 });

      // hide on scroll down, reveal on scroll up
      const show = gsap
        .fromTo(ref.current, { yPercent: 0 }, { yPercent: -160, duration: 0.45, ease: 'power2.inOut', paused: true })
        .progress(0);
      ScrollTrigger.create({
        start: 'top top-=120',
        end: 'max',
        onUpdate: (self) => (self.direction === 1 ? show.play() : show.reverse()),
        onToggle: (self) => ref.current.classList.toggle(styles.scrolled, self.isActive),
      });
    },
    { scope: ref }
  );

  useGSAP(
    () => {
      if (!open) return;
      gsap.from(`.${styles.mLink}`, { yPercent: 110, duration: 0.7, stagger: 0.06, ease: 'power4.out' });
    },
    { dependencies: [open] }
  );

  return (
    <>
      <header ref={ref} className={styles.nav}>
        <a href="#top" className={styles.brand} aria-label="IRA home">
          <Logo />
        </a>
        <nav className={styles.links} aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className={styles.link}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className={styles.right}>
          <Magnetic>
            <button id="nav-book-demo" className="btn btn-primary btn-sm" onClick={onOpenDemo}>
              Free Growth Audit
            </button>
          </Magnetic>
          <button
            id="nav-menu-toggle"
            className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      {open && (
        <div className={styles.mobile} onClick={() => setOpen(false)}>
          {LINKS.map((l, i) => (
            <a key={l.href} href={l.href} className={styles.mRow}>
              <span className={styles.mLink}>
                <em>0{i + 1}</em>
                {l.label}
              </span>
            </a>
          ))}
        </div>
      )}
    </>
  );
}
