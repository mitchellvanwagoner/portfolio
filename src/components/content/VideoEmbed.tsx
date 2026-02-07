'use client';

import { AspectRatio, Box } from '@mantine/core';

interface VideoEmbedProps {
  src: string;
  title?: string;
}

export function VideoEmbed({ src, title = 'Video' }: VideoEmbedProps) {
  return (
    <Box my="xl" maw={800}>
      <AspectRatio ratio={16 / 9}>
        <iframe
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            border: 'none',
            borderRadius: 'var(--mantine-radius-sm)',
            boxShadow: '6px 6px 4px rgba(0, 0, 0, 0.3)',
          }}
        />
      </AspectRatio>
    </Box>
  );
}
