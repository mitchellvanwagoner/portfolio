import { Box, Title, Text } from '@mantine/core';
import { Challenge } from '@/types';

interface ChallengesListProps {
  challenges: Challenge[];
}

export function ChallengesList({ challenges }: ChallengesListProps) {
  if (challenges.length === 0) return null;

  return (
    <Box my="lg">
      <Title order={3}>Challenges & Solutions</Title>
      <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
        {challenges.map((item, index) => (
          <li key={index} style={{ lineHeight: 1.5, marginBottom: '1rem' }}>
            <Text component="span">
              <Text component="span" fw={600} c="navy.6">
                Challenge:
              </Text>{' '}
              {item.challenge}
            </Text>
            <br />
            <Text component="span">
              <Text component="span" fw={600} c="navy.6">
                Solution:
              </Text>{' '}
              {item.solution}
            </Text>
          </li>
        ))}
      </ul>
    </Box>
  );
}
