'use client';

import { AppShell, Burger, Group, Title, UnstyledButton, Box } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import classes from './AppShellLayout.module.css';

const navLinks = [
  { label: 'BIO', href: '/bio' },
  { label: 'RESUME', href: '/resume' },
  { label: 'PROJECTS', href: '/projects' },
  { label: 'HOBBIES', href: '/hobbies' },
  { label: 'CONTACT', href: '/contact' },
];

export function AppShellLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const pathname = usePathname();

  return (
    <AppShell
      header={{ height: { base: 60, sm: 80 } }}
      navbar={{
        width: { base: 160, sm: 130 },
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding={0}
    >
      <AppShell.Header className="blueprint-header" style={{ borderBottom: '2px solid var(--mantine-color-dark-6)' }}>
        <Group h="100%" px="md" justify="center" pos="relative">
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
            color="var(--mantine-color-cream-0)"
            pos="absolute"
            left="var(--mantine-spacing-md)"
            aria-label="Toggle navigation"
          />
          <Title
            order={1}
            style={{
              fontFamily: 'var(--font-architects-daughter), cursive',
              fontSize: 'clamp(1.2rem, 4vw, 2.5rem)',
              color: 'var(--mantine-color-cream-0)',
              fontWeight: 400,
              letterSpacing: '0.02em',
            }}
          >
            MITCHELL VAN WAGONER
          </Title>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar className={classes.navbar}>
        <Box className={classes.navLinks}>
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

            return (
              <UnstyledButton
                key={link.href}
                component={Link}
                href={link.href}
                className={classes.navLink}
                data-active={isActive || undefined}
                onClick={close}
              >
                {link.label}
              </UnstyledButton>
            );
          })}
        </Box>
      </AppShell.Navbar>

      <AppShell.Main className={classes.main}>{children}</AppShell.Main>
    </AppShell>
  );
}
