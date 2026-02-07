'use client';

import { Flex, Box, Text, Stack } from '@mantine/core';
import Image from 'next/image';
import classes from './DualImageBlock.module.css';

type ImageSize = 'sm' | 'md' | 'lg' | 'xl';

const sizeMap: Record<ImageSize, number> = {
  sm: 200,
  md: 300,
  lg: 400,
  xl: 560,
};

interface DualImageBlockProps {
  primarySrc: string;
  primaryAlt: string;
  primaryCaption?: string;
  primarySize?: ImageSize;
  secondarySrc: string;
  secondaryAlt: string;
  secondaryCaption?: string;
  secondarySize?: ImageSize;
  primaryPosition?: 'left' | 'right';
  children: React.ReactNode;
}

export function DualImageBlock({
  primarySrc,
  primaryAlt,
  primaryCaption,
  primarySize = 'lg',
  secondarySrc,
  secondaryAlt,
  secondaryCaption,
  secondarySize = 'md',
  primaryPosition = 'right',
  children,
}: DualImageBlockProps) {
  const primaryMaxWidth = sizeMap[primarySize];
  const secondaryMaxWidth = sizeMap[secondarySize];

  const primaryImage = (
    <Box className={classes.primaryImage} style={{ maxWidth: primaryMaxWidth, flexShrink: 0 }}>
      <Image
        src={primarySrc}
        alt={primaryAlt}
        width={primaryMaxWidth}
        height={Math.round(primaryMaxWidth * 0.75)}
        className={classes.image}
        style={{ width: '100%', height: 'auto' }}
        loading="lazy"
      />
      {primaryCaption && (
        <Text size="sm" c="dimmed" fs="italic" ta="center" mt={4}>
          {primaryCaption}
        </Text>
      )}
    </Box>
  );

  const sideContent = (
    <Stack gap="md" style={{ flex: 1 }}>
      <Box className={classes.textContainer}>{children}</Box>
      <Box className={classes.secondaryImage} style={{ maxWidth: secondaryMaxWidth }}>
        <Image
          src={secondarySrc}
          alt={secondaryAlt}
          width={secondaryMaxWidth}
          height={Math.round(secondaryMaxWidth * 0.75)}
          className={classes.image}
          style={{ width: '100%', height: 'auto' }}
          loading="lazy"
        />
        {secondaryCaption && (
          <Text size="sm" c="dimmed" fs="italic" ta="center" mt={4}>
            {secondaryCaption}
          </Text>
        )}
      </Box>
    </Stack>
  );

  return (
    <Flex
      className={classes.block}
      direction={{ base: 'column', md: primaryPosition === 'right' ? 'row-reverse' : 'row' }}
      gap="lg"
      align="flex-start"
      my="xl"
    >
      {primaryImage}
      {sideContent}
    </Flex>
  );
}
