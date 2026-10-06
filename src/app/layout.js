import { Inter_Tight, Instrument_Serif } from 'next/font/google';
import './globals.css';

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  display: 'swap',
});

const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
});

export const metadata = {
  title: 'IRA Marketing Solutions — Get more leads. Never miss a call.',
  description:
    'IRA brings customers to your business through digital marketing. Third Assistant, our AI receptionist, answers, qualifies and books every lead — 24/7.',
  keywords: [
    'digital marketing',
    'AI receptionist',
    'lead generation',
    'Meta ads',
    'Google ads',
    'Third Assistant',
    'IRA Marketing',
  ],
};

export const viewport = {
  themeColor: '#08070d',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${interTight.variable} ${instrument.variable}`}>
      <body>{children}</body>
    </html>
  );
}
