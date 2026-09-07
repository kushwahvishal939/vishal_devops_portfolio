import React from 'react';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import '../styles/index.css';
import SmoothScroll from '../components/animations/SmoothScroll';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});
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
  title: 'Vishal Kushwah - DevOps Engineer',
  description:
    'DevOps Engineer specializing in cloud infrastructure, Kubernetes, CI/CD automation, and cost optimization.',
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
    <html lang="en" className={`${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
      <body className="font-mono overflow-x-hidden">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
