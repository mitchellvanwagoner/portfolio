import type { Metadata } from 'next';
import { Inter, Architects_Daughter } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import { theme } from '@/theme/theme';
import { AppShellLayout } from '@/components/layout/AppShellLayout';

import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const architectsDaughter = Architects_Daughter({
  variable: '--font-architects-daughter',
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
});

export const metadata: Metadata = {
  title: 'MVW Portfolio',
  description:
    "Mitchell Van Wagoner's Engineering Portfolio - Showcasing innovative projects in software development, hardware design, and engineering solutions.",
  authors: [{ name: 'Mitchell Van Wagoner' }],
  openGraph: {
    title: 'Mitchell Van Wagoner - Engineering Portfolio',
    description:
      'Explore innovative engineering projects including custom keyboards, robotics, and professional development tools.',
    type: 'website',
    url: 'https://portfolio.mvwengineering.org',
    images: [{ url: 'https://portfolio.mvwengineering.org/images/site/me.webp' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${architectsDaughter.variable}`}>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <AppShellLayout>{children}</AppShellLayout>
        </MantineProvider>
        <GoogleAnalytics gaId="G-3QFW0TDFG3" />
      </body>
    </html>
  );
}
