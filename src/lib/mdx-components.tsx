import { ImageTextBlock } from '@/components/content/ImageTextBlock';
import { DualImageBlock } from '@/components/content/DualImageBlock';
import { CarouselGallery } from '@/components/content/CarouselGallery';
import { VideoEmbed } from '@/components/content/VideoEmbed';
import { TechStack } from '@/components/project/TechStack';
import { ChallengesList } from '@/components/project/ChallengesList';
import { ProjectFeatures } from '@/components/project/ProjectFeatures';
import type { MDXComponents } from 'mdx/types';

export const mdxComponents: MDXComponents = {
  // Custom components
  ImageTextBlock,
  DualImageBlock,
  CarouselGallery,
  VideoEmbed,
  TechStack,
  ChallengesList,
  ProjectFeatures,

  // HTML element overrides (plain HTML for RSC compatibility)
  h1: (props) => <h1 style={{ fontFamily: 'var(--font-architects-daughter), cursive', marginBottom: '1rem' }} {...props} />,
  h2: (props) => <h2 style={{ fontFamily: 'var(--font-architects-daughter), cursive', marginBottom: '0.5rem', marginTop: '2rem' }} {...props} />,
  h3: (props) => <h3 style={{ fontFamily: 'var(--font-architects-daughter), cursive', marginBottom: '0.25rem', marginTop: '1.5rem' }} {...props} />,
  p: (props) => <p style={{ lineHeight: 1.6, textAlign: 'justify', marginBottom: '1rem' }} {...props} />,
  ul: (props) => <ul style={{ paddingLeft: '1.5rem', marginBottom: '1rem' }} {...props} />,
  li: (props) => <li style={{ marginBottom: '0.25rem' }} {...props} />,
  hr: () => <hr style={{ margin: '0.5rem 0', border: 'none', borderTop: '2px solid var(--mantine-color-dark-6)' }} />,
  a: (props) => <a style={{ color: 'var(--mantine-color-rust-6)', textDecoration: 'underline' }} {...props} />,
  strong: (props) => <strong style={{ fontWeight: 800 }} {...props} />,
  section: (props) => (
    <section
      style={{
        marginBottom: '1rem',
        padding: '2rem',
        border: '2px solid var(--mantine-color-dark-6)',
        borderRadius: 'var(--mantine-radius-sm)',
      }}
      {...props}
    />
  ),
};
