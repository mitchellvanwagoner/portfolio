import { Box, Flex, Stack, Button } from '@mantine/core';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume | MVW Portfolio',
  description: "Download Mitchell Van Wagoner's resume and view credentials.",
};

export default function ResumePage() {
  return (
    <Flex
      p={{ base: 'md', sm: 'xl' }}
      justify="center"
      align="flex-start"
      maw={1400}
      mx="auto"
      direction={{ base: 'column', md: 'row' }}
      gap="lg"
    >
      {/* Mobile Download Buttons */}
      <Flex gap="sm" justify="center" wrap="wrap" hiddenFrom="md" mb="sm">
        <Button
          component="a"
          href="/files/resume.pdf"
          download="MitchellVanWagoner_Resume.pdf"
          color="navy.6"
          className="hover-close"
        >
          Download Resume
        </Button>
      </Flex>

      {/* Desktop Sidebar Download Buttons (vertical) */}
      <Box
        visibleFrom="md"
        style={{
          writingMode: 'sideways-lr',
          textOrientation: 'sideways',
          alignSelf: 'start',
        }}
      >
        <Flex gap="md" mr="sm">
          <Button
            component="a"
            href="/files/resume.pdf"
            download="MitchellVanWagoner_Resume.pdf"
            color="navy.6"
            size="lg"
            className="hover-close"
            styles={{
              root: {
                padding: '1.5rem 1rem',
                border: '2px solid var(--mantine-color-dark-6)',
              },
            }}
          >
            Download Resume
          </Button>
        </Flex>
      </Box>

      {/* Resume Content */}
      <Stack gap="xl" align="center">
        <Image
          src="/images/site/resume.webp"
          alt="Mitchell Van Wagoner Resume"
          width={800}
          height={1035}
          className="hover-far zoomable-image"
          style={{
            maxWidth: '100%',
            height: 'auto',
            maxHeight: 'calc(100vh - 120px)',
            border: '2px solid var(--mantine-color-dark-6)',
            borderRadius: 'var(--mantine-radius-sm)',
            boxShadow: '12px 10px 10px rgba(0, 0, 0, 0.5)',
          }}
          priority
        />

        <Image
          src="/images/site/diploma.webp"
          alt="Oregon State University Diploma 2025"
          width={800}
          height={600}
          className="hover-far"
          style={{
            maxWidth: '90%',
            height: 'auto',
            maxHeight: '50vh',
            border: '2px solid var(--mantine-color-dark-6)',
            borderRadius: 'var(--mantine-radius-sm)',
            boxShadow: '12px 10px 10px rgba(0, 0, 0, 0.5)',
          }}
          loading="lazy"
        />
      </Stack>
    </Flex>
  );
}
