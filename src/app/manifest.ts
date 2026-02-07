import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MVW Engineering Portfolio',
    short_name: 'MVW Portfolio',
    description:
      "Mitchell Van Wagoner's Engineering Portfolio - Showcasing innovative projects in software development, hardware design, and engineering solutions.",
    start_url: '/bio',
    display: 'standalone',
    background_color: '#fefef4',
    theme_color: '#1f3b8a',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
