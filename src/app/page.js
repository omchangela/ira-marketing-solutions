'use client';
import { useState } from 'react';
import SmoothScroll from '../components/SmoothScroll';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Engines from '../components/Engines';
import Marketing from '../components/Marketing';
import Assistant from '../components/Assistant';
import Journey from '../components/Journey';
import BrandArchitecture from '../components/BrandArchitecture';
import SalesCta from '../components/SalesCta';
import Contact, { LeadForm } from '../components/Contact';
import Footer from '../components/Footer';
import Modal from '../components/Modal';
import LiveExperience from '../components/LiveExperience';

export default function Home() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [liveOpen, setLiveOpen] = useState(false);

  const openDemo = () => setDemoOpen(true);
  const openLive = () => setLiveOpen(true);

  return (
    <>
      <SmoothScroll />
      <Navbar onOpenDemo={openDemo} />

      <main>
        <Hero onOpenDemo={openDemo} onOpenExperience={openLive} />
        <Marquee />
        <Engines />
        <Marketing />
        <Assistant onOpenExperience={openLive} />
        <Journey />
        <BrandArchitecture />
        <SalesCta onOpenDemo={openDemo} onOpenExperience={openLive} />
        <Contact />
      </main>

      <Footer onOpenDemo={openDemo} />

      {/* Book a Demo Modal */}
      <Modal open={demoOpen} onClose={() => setDemoOpen(false)} label="Let's Talk">
        <h3
          style={{
            fontSize: '1.45rem',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            marginBottom: 8,
            lineHeight: 1.25,
          }}
        >
          See how IRA + Third Assistant can work for your business.
        </h3>
        <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: 20 }}>
          Fill in your details below and our team will configure a dedicated live preview.
        </p>
        <LeadForm idPrefix="modal" onSuccess={() => {}} />
      </Modal>

      {/* Live AI Voice Receptionist Demo Modal */}
      <Modal
        open={liveOpen}
        onClose={() => {
          if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.cancel();
          }
          setLiveOpen(false);
        }}
        label="Live Experience"
      >
        <LiveExperience />
      </Modal>
    </>
  );
}
