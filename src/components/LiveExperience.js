'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './LiveExperience.module.css';

const SCRIPT = [
  { role: 'ai', text: 'Thanks for calling Bright Smile Dental, this is your AI receptionist. How can I help you today?' },
  { role: 'user', text: 'Hi, I’d like to schedule a teeth cleaning appointment this week.' },
  { role: 'ai', text: 'Absolutely! I have an opening this Wednesday at 10:00 AM or Friday at 2:00 PM. Which works best for you?' },
  { role: 'user', text: 'Friday at 2:00 PM is perfect.' },
  { role: 'ai', text: 'Wonderful! You’re booked for Friday at 2:00 PM. I’ve sent a confirmation SMS to this number with directions. Anything else I can assist with?' },
  { role: 'user', text: 'No, that’s all. Thank you!' },
  { role: 'ai', text: 'Have a great day!' },
];

function speak(text) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 1.02;
  u.pitch = 1.05;
  window.speechSynthesis.speak(u);
}

export default function LiveExperience() {
  const [step, setStep] = useState(-1);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);
  const scrollRef = useRef(null);

  const running = step >= 0 && step < SCRIPT.length;
  const done = step >= SCRIPT.length;

  useEffect(() => {
    if (!running) return;
    const line = SCRIPT[step];
    if (line.role === 'ai') {
      speak(line.text);
    }

    // Scroll chat into view
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }

    const duration = Math.max(2200, line.text.length * 52);
    const timeout = setTimeout(() => {
      setStep((s) => s + 1);
    }, duration);

    return () => clearTimeout(timeout);
  }, [step, running]);

  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [running]);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleStart = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setSeconds(0);
    setStep(0);
  };

  const handleReset = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setStep(-1);
    setSeconds(0);
  };

  const formattedTime = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.aiBadge}>
          <img src="/3d/ai_headset.webp" alt="" className={styles.headsetIcon} width="40" height="40" />
          <div>
            <h3 className={styles.title}>Third Assistant</h3>
            <span className={styles.voiceModel}>Neural Voice v4 · Low Latency</span>
          </div>
        </div>

        <div className={`${styles.statusPill} ${running ? styles.statusActive : done ? styles.statusDone : ''}`}>
          <span className={styles.pulseDot} />
          <span>
            {step < 0 ? 'Incoming Call Simulation' : done ? 'Call Ended · Booked ✓' : `Live Call · ${formattedTime}`}
          </span>
        </div>
      </div>

      <div className={`${styles.orbBox} ${running ? styles.orbActive : ''}`}>
        <div className={styles.orbGlow} />
        <div className={styles.orbWave}>
          {Array.from({ length: 7 }).map((_, i) => (
            <span key={i} style={{ animationDelay: `${i * 0.14}s` }} />
          ))}
        </div>
        <span className={styles.orbLabel}>
          {step < 0
            ? 'Click Start Demo to test the voice engine'
            : done
            ? 'Appointment confirmed on calendar'
            : SCRIPT[step]?.role === 'ai'
            ? 'Third Assistant speaking…'
            : 'Caller speaking…'}
        </span>
      </div>

      <div ref={scrollRef} className={styles.transcript}>
        {step < 0 ? (
          <div className={styles.placeholder}>
            <p>Experience how Third Assistant answers instantly, handles schedule inquiries naturally, and sends confirmation messages without human intervention.</p>
          </div>
        ) : (
          SCRIPT.slice(0, step + 1).map((item, idx) => (
            <div
              key={idx}
              className={`${styles.bubble} ${item.role === 'ai' ? styles.bubbleAi : styles.bubbleUser}`}
            >
              <div className={styles.bubbleAuthor}>
                <span>{item.role === 'ai' ? '🤖 Third Assistant' : '👤 Customer'}</span>
              </div>
              <p>{item.text}</p>
            </div>
          ))
        )}
      </div>

      <div className={styles.actions}>
        <button
          id="live-start-demo-btn"
          className="btn btn-light"
          style={{ flex: 1, justifyContent: 'center' }}
          onClick={done ? handleReset : handleStart}
          disabled={running}
        >
          {running ? 'Listening & Responding…' : done ? 'Replay Simulation' : 'Start Demo'}
        </button>

        {running && (
          <button className="btn btn-ghost btn-sm" onClick={handleReset}>
            End Call
          </button>
        )}
      </div>
    </div>
  );
}
