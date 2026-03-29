import React from 'react';
import { Syne, JetBrains_Mono } from 'next/font/google';
import '../styles/index.css';
import SmoothScroll from '../components/animations/SmoothScroll';
import CustomCursor from '../components/animations/CustomCursor';

const syne = Syne({ subsets: ['latin'], display: 'swap', variable: '--font-syne' });
const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: 'Vishal Kushwah - DevOps & Full Stack Portfolio',
  description:
    'Premium portfolio of Vishal Kushwah, showcasing high-end motion design and DevOps expertise.',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${jetBrainsMono.variable}`}>
      <body className="font-primary overflow-x-hidden">
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>

        <script
          type="module"
          async
          src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fvishtechd4044back.builtwithrocket.new&_be=https%3A%2F%2Fapplication.rocket.new&_v=0.1.9"
        />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.1" />
      </body>
    </html>
  );
}
