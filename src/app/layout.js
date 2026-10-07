import { Playfair_Display, Source_Sans_3 } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans',
  weight: ['300', '400', '600', '700'],
  display: 'swap',
});

export const metadata = {
  title: 'IRA Marketing Solutions — Digital Marketing & AI Receptionist for Modern Businesses',
  description:
    'IRA Marketing Solutions helps local businesses get more leads through targeted digital marketing. Our AI receptionist, Third Assistant, answers every call 24/7 — so you never lose a customer.',
  keywords: [
    'digital marketing agency',
    'AI receptionist',
    'lead generation for small business',
    'Meta ads management',
    'Google ads agency',
    'Third Assistant AI',
    'IRA Marketing Solutions',
    'free growth audit',
  ],
};

export const viewport = {
  themeColor: '#09757A',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
