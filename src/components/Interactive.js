'use client';
import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';

/** Wraps a child and pulls it toward the cursor. */
export function Magnetic({ children, strength = 0.35 }) {
  const ref = useRef(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el || window.matchMedia('(hover: none)').matches) return;
      const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      const move = (e) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * strength);
        yTo((e.clientY - (r.top + r.height / 2)) * strength);
      };
      const leave = () => {
        xTo(0);
        yTo(0);
      };
      el.addEventListener('mousemove', move);
      el.addEventListener('mouseleave', leave);
      return () => {
        el.removeEventListener('mousemove', move);
        el.removeEventListener('mouseleave', leave);
      };
    },
    { scope: ref }
  );
  return (
    <span ref={ref} style={{ display: 'inline-block' }}>
      {children}
    </span>
  );
}

/** 3D tilt on hover. Children with [data-depth] get pushed forward in Z. */
export function Tilt({ children, className, max = 10, ...rest }) {
  const ref = useRef(null);
  useGSAP(
    () => {
      const el = ref.current;
      if (!el || window.matchMedia('(hover: none)').matches) return;
      gsap.set(el, { transformPerspective: 1000, transformStyle: 'preserve-3d' });
      const rx = gsap.quickTo(el, 'rotationX', { duration: 0.8, ease: 'power3.out' });
      const ry = gsap.quickTo(el, 'rotationY', { duration: 0.8, ease: 'power3.out' });
      const glare = el.querySelector('[data-glare]');
      const move = (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry(px * max * 2);
        rx(-py * max * 2);
        if (glare) {
          glare.style.setProperty('--gx', `${(px + 0.5) * 100}%`);
          glare.style.setProperty('--gy', `${(py + 0.5) * 100}%`);
        }
      };
      const leave = () => {
        rx(0);
        ry(0);
      };
      el.addEventListener('mousemove', move);
      el.addEventListener('mouseleave', leave);
      return () => {
        el.removeEventListener('mousemove', move);
        el.removeEventListener('mouseleave', leave);
      };
    },
    { scope: ref }
  );
  return (
    <div ref={ref} className={className} {...rest}>
      {children}
    </div>
  );
}
