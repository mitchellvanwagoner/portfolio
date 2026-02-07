import { Paper, Title, Text } from '@mantine/core';
import { Hobby } from '@/types';

interface HobbyCardProps {
  hobby: Hobby;
}

export function HobbyCard({ hobby }: HobbyCardProps) {
  return (
    <Paper
      withBorder
      p="lg"
      shadow="sm"
      className="hover-close"
      style={{
        borderColor: 'var(--mantine-color-dark-6)',
        borderWidth: 2,
        backgroundColor: 'var(--mantine-color-cream-0)',
      }}
    >
      <Title order={3} c="rust.6" mb="md">
        {hobby.emoji} {hobby.title}
      </Title>
      <Text mb="sm" style={{ textAlign: 'left' }}>
        {hobby.description}
      </Text>
      <ul style={{ paddingLeft: '1.5rem', margin: 0 }}>
        {hobby.items.map((item, index) => (
          <li key={index} style={{ marginBottom: '0.25rem' }}>
            <Text component="span" size="sm">{item}</Text>
          </li>
        ))}
      </ul>
    </Paper>
  );
}
