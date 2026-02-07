import { Paper, Title, Text, Anchor } from '@mantine/core';
import { ContactMethod } from '@/types';

interface ContactMethodCardProps {
  method: ContactMethod;
}

export function ContactMethodCard({ method }: ContactMethodCardProps) {
  return (
    <Paper
      withBorder
      p="lg"
      ta="center"
      shadow="sm"
      className="hover-close"
      style={{
        borderColor: 'var(--mantine-color-dark-6)',
        borderWidth: 2,
        width: '26em',
        maxWidth: '100%',
        backgroundColor: 'var(--mantine-color-cream-0)',
      }}
    >
      <Title order={3} c="rust.6" mb="md">
        {method.emoji} {method.title}
      </Title>
      <Anchor
        href={method.url}
        target={method.url.startsWith('mailto') ? undefined : '_blank'}
        c="navy.6"
        fw={500}
        underline="hover"
      >
        {method.label}
      </Anchor>
    </Paper>
  );
}
