'use client';

import { useState, useCallback } from 'react';
import { Carousel } from '@mantine/carousel';
import { Modal, Box, Text, ActionIcon, Group, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconMaximize, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';
import Image from 'next/image';
import classes from './CarouselGallery.module.css';

interface GalleryImage {
  src: string;
  alt: string;
}

interface CarouselGalleryProps {
  images: GalleryImage[];
  title?: string;
}

export function CarouselGallery({ images, title }: CarouselGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreenOpened, { open: openFullscreen, close: closeFullscreen }] = useDisclosure(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);

  const handleSlideChange = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const handleOpenFullscreen = useCallback(() => {
    setFullscreenIndex(currentIndex);
    openFullscreen();
  }, [currentIndex, openFullscreen]);

  const handleFullscreenPrev = useCallback(() => {
    setFullscreenIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const handleFullscreenNext = useCallback(() => {
    setFullscreenIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <Box my="xl">
      {title && (
        <Text fw={600} size="lg" mb="sm">
          {title}
        </Text>
      )}

      <Box className={classes.carouselWrapper}>
        <Carousel
          withIndicators={images.length <= 20}
          withControls
          emblaOptions={{ loop: true }}
          classNames={{
            root: classes.carousel,
            slide: classes.slide,
            control: classes.control,
            indicator: classes.indicator,
          }}
          onSlideChange={handleSlideChange}
        >
          {images.map((image, index) => (
            <Carousel.Slide key={index}>
              <UnstyledButton
                className={classes.slideButton}
                onClick={handleOpenFullscreen}
                aria-label={`View ${image.alt} fullscreen`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={960}
                  height={400}
                  className={classes.slideImage}
                  loading={index < 3 ? 'eager' : 'lazy'}
                  style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                />
              </UnstyledButton>
            </Carousel.Slide>
          ))}
        </Carousel>

        {/* Counter */}
        <Box className={classes.counter}>
          {currentIndex + 1} / {images.length}
        </Box>

        {/* Fullscreen button */}
        <ActionIcon
          className={classes.fullscreenBtn}
          onClick={handleOpenFullscreen}
          variant="filled"
          color="dark"
          size="lg"
          aria-label="View fullscreen"
        >
          <IconMaximize size={18} />
        </ActionIcon>
      </Box>

      {/* Fullscreen Modal */}
      <Modal
        opened={fullscreenOpened}
        onClose={closeFullscreen}
        fullScreen
        withCloseButton
        classNames={{ body: classes.modalBody, content: classes.modalContent }}
        styles={{ body: { padding: 0, height: '100%' }, content: { background: 'rgba(0,0,0,0.95)' } }}
      >
        <Box className={classes.fullscreenContainer}>
          <ActionIcon
            className={classes.fullscreenNav}
            onClick={handleFullscreenPrev}
            variant="filled"
            color="gray"
            size="xl"
            radius="xl"
            style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)' }}
            aria-label="Previous image"
          >
            <IconChevronLeft size={24} />
          </ActionIcon>

          {images[fullscreenIndex] && (
            <Image
              src={images[fullscreenIndex].src}
              alt={images[fullscreenIndex].alt}
              fill
              className={classes.fullscreenImage}
              style={{ objectFit: 'contain', padding: '3rem' }}
            />
          )}

          <ActionIcon
            className={classes.fullscreenNav}
            onClick={handleFullscreenNext}
            variant="filled"
            color="gray"
            size="xl"
            radius="xl"
            style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)' }}
            aria-label="Next image"
          >
            <IconChevronRight size={24} />
          </ActionIcon>

          <Group className={classes.fullscreenCounter}>
            <Text c="white" size="sm">
              {fullscreenIndex + 1} / {images.length}
            </Text>
          </Group>
        </Box>
      </Modal>
    </Box>
  );
}
