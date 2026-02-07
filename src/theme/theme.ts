'use client';

import { createTheme, MantineColorsTuple, rem } from '@mantine/core';

const navy: MantineColorsTuple = [
  '#e8efff',
  '#cdd6f5',
  '#9aabe6',
  '#647dd8',
  '#3856cc',
  '#1e3fc3',
  '#1f3b8a', // primary - index 6
  '#142f7a',
  '#0c296e',
  '#032262',
];

const orange: MantineColorsTuple = [
  '#fff4e0',
  '#fce8ca',
  '#f5cf98',
  '#efb462',
  '#ea9e35',
  '#e79118',
  '#e58b06', // secondary - index 6
  '#cc7800',
  '#b56a00',
  '#9d5a00',
];

const rust: MantineColorsTuple = [
  '#ffeae5',
  '#fdd4cc',
  '#f4a799',
  '#ec7762',
  '#e54f35',
  '#e13617',
  '#a12a14', // accent - index 6
  '#c42206',
  '#af1c03',
  '#991200',
];

const cream: MantineColorsTuple = [
  '#fefef4', // neutral-pale
  '#fbfbe9', // neutral-light
  '#f5f5c4', // neutral
  '#efefa0',
  '#eaea7d',
  '#e6e660',
  '#e2e24a',
  '#c8c834',
  '#b2b228',
  '#999916',
];

const dark: MantineColorsTuple = [
  '#f5f0eb',
  '#e0d8d1',
  '#c4b8ab',
  '#a89684',
  '#8d7963',
  '#79654d',
  '#1a0f06', // dark - index 6
  '#170d05',
  '#140b04',
  '#100903',
];

export const theme = createTheme({
  primaryColor: 'navy',
  colors: {
    navy,
    orange,
    rust,
    cream,
    dark,
  },

  fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  headings: {
    fontFamily: 'var(--font-architects-daughter), cursive',
    fontWeight: '600',
    sizes: {
      h1: { fontSize: rem(36), lineHeight: '1.25' },
      h2: { fontSize: rem(24), lineHeight: '1.25' },
      h3: { fontSize: rem(20), lineHeight: '1.25' },
      h4: { fontSize: rem(18), lineHeight: '1.25' },
      h5: { fontSize: rem(16), lineHeight: '1.25' },
      h6: { fontSize: rem(14), lineHeight: '1.25' },
    },
  },

  spacing: {
    xs: rem(4),
    sm: rem(8),
    md: rem(16),
    lg: rem(24),
    xl: rem(32),
  },

  radius: {
    xs: rem(4),
    sm: rem(8),
    md: rem(12),
    lg: rem(20),
    xl: rem(32),
  },

  shadows: {
    xs: '4px 4px 3px rgba(0, 0, 0, 0.2)',
    sm: '6px 6px 4px rgba(0, 0, 0, 0.3)',
    md: '8px 8px 8px rgba(0, 0, 0, 0.4)',
    lg: '12px 10px 10px rgba(0, 0, 0, 0.5)',
    xl: '20px 16px 32px rgba(0, 0, 0, 0.7)',
  },

  breakpoints: {
    xs: '30em',
    sm: '48em',
    md: '64em',
    lg: '75em',
    xl: '88em',
  },

  other: {
    headerHeight: '10vh',
    sidebarWidth: '8em',
    contentWidth: rem(1400),
    blueprintNavy: '#1e3a8a',
    blueprintGridPrimary: 'rgba(255, 255, 255, 0.1)',
    blueprintGridSecondary: 'rgba(255, 255, 255, 0.09)',
    blueprintDots: 'rgba(255, 255, 255, 0.1)',
    green: '#2ecc71',
  },

  components: {
    Button: {
      defaultProps: {
        radius: 'sm',
      },
      styles: {
        root: {
          fontWeight: 500,
          boxShadow: '6px 6px 4px rgba(0, 0, 0, 0.3)',
          transition: 'all 0.15s ease',
        },
      },
    },
    Paper: {
      defaultProps: {
        radius: 'sm',
        shadow: 'sm',
      },
    },
    Anchor: {
      styles: {
        root: {
          color: 'var(--mantine-color-rust-6)',
          transition: 'color 0.15s ease',
          '&:hover': {
            color: 'var(--mantine-color-rust-4)',
          },
        },
      },
    },
    Card: {
      defaultProps: {
        radius: 'sm',
        shadow: 'sm',
      },
    },
  },
});
