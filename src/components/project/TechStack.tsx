import { Box, Badge, Title, Group } from '@mantine/core';

interface TechStackProps {
  technologies: string[];
}

export function TechStack({ technologies }: TechStackProps) {
  if (technologies.length === 0) return null;

  return (
    <Box
      mt="xl"
      p="md"
      style={{
        border: '2px solid var(--mantine-color-dark-6)',
        borderRadius: 'var(--mantine-radius-sm)',
        width: 'fit-content',
      }}
    >
      <Title order={3}>Technologies Used</Title>
      <Group gap="md" mt="md" justify="center">
        {technologies.map((tech) => (
          <Badge
            key={tech}
            size="lg"
            radius="xl"
            variant="filled"
            color="navy.6"
            className="hover-close"
            styles={{
              root: {
                boxShadow: '6px 6px 4px rgba(0, 0, 0, 0.3)',
                border: '1px solid var(--mantine-color-navy-4)',
                textTransform: 'none',
                fontWeight: 400,
              },
            }}
          >
            {tech}
          </Badge>
        ))}
      </Group>
    </Box>
  );
}
