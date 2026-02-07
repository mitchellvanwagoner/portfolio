import { Box, Title, Text } from '@mantine/core';

interface ProjectFeaturesProps {
  features: string[];
}

export function ProjectFeatures({ features }: ProjectFeaturesProps) {
  if (features.length === 0) return null;

  return (
    <Box my="xl">
      <Title order={3}>Key Features</Title>
      <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
        {features.map((feature, index) => (
          <li key={index} style={{ marginBottom: '0.25rem' }}>
            <Text component="span">{feature}</Text>
          </li>
        ))}
      </ul>
    </Box>
  );
}
