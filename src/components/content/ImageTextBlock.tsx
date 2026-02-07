'use client';

import { Flex, Box, Text } from '@mantine/core';
import Image from 'next/image';
import classes from './ImageTextBlock.module.css';

type ImageSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ImagePosition = 'left' | 'right';

const sizeMap: Record<ImageSize, number> = {
  xs: 200,
  sm: 300,
  md: 400,
  lg: 600,
  xl: 800,
};

interface ImageTextBlockProps {
  src: string;
  alt: string;
  caption?: string;
  size?: ImageSize;
  position?: ImagePosition;
  children: React.ReactNode;
}

export function ImageTextBlock({
  src,
  alt,
  caption,
  size = 'lg',
  position = 'left',
  children,
}: ImageTextBlockProps) {
  const maxWidth = sizeMap[size];

  const imageElement = (
    <Box className={classes.imageContainer} style={{ maxWidth, flexShrink: 0 }}>
      <Image
        src={src}
        alt={alt}
        width={maxWidth}
        height={Math.round(maxWidth * 0.75)}
        className={classes.image}
        style={{ width: '100%', height: 'auto' }}
        loading="lazy"
      />
      {caption && (
        <Text size="sm" c="dimmed" fs="italic" ta="center" mt={4}>
          {caption}
        </Text>
      )}
    </Box>
  );

  return (
    <Flex
      className={classes.block}
      direction={{ base: 'column', md: position === 'right' ? 'row-reverse' : 'row' }}
      gap="md"
      align="flex-start"
      my="lg"
    >
      {imageElement}
      <Box className={classes.textContainer}>{children}</Box>
    </Flex>
  );
}
