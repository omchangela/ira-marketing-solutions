'use client';
import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import styles from './Modal.module.css';

export default function Modal({ open, onClose, label, children }) {
  const overlayRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);

    // Save previous overflow style and prevent page scroll
    const origOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Animate open
    if (overlayRef.current && cardRef.current) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.5)' }
      );
    }

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = origOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div ref={overlayRef} className={styles.backdrop} onClick={onClose}>
      <div
        ref={cardRef}
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={label}
      >
        <div className={styles.top}>
          <span className={styles.label}>{label}</span>
          <button className={styles.close} onClick={onClose} aria-label="Close modal">
            ✕
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
