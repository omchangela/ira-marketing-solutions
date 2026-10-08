import './globals.css';
import Script from 'next/script';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: 'IRA Marketing Solutions — Your Growth. Our Strategy. (3D Funnel)',
  description: 'IRA Marketing Solutions helps businesses grow through strategy, advertising, websites, social media, automation, and AI.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@500;700;800&family=DM+Sans:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <Script src="/three.min.js" strategy="beforeInteractive" />
      </head>
      <body>{children}</body>
    </html>
  );
}
