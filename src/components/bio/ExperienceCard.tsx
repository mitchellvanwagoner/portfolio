import { Paper, Title, Text, Divider } from '@mantine/core';
import { Experience } from '@/types';

interface ExperienceCardProps {
  experience: Experience;
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <Paper
      withBorder
      p="lg"
      mb="md"
      shadow="sm"
      className="hover-close"
      style={{ borderColor: 'var(--mantine-color-dark-6)', borderWidth: 2 }}
    >
      <Title order={2} style={{ color: experience.color }}>
        {experience.company}
      </Title>
      <Text fw={700}>{experience.title}</Text>
      <Text size="sm">
        <strong>Location:</strong> {experience.location} &nbsp;&nbsp; <strong>Period:</strong>{' '}
        {experience.period}
      </Text>
      <Divider my="xs" />
      {experience.duties.map((duty, index) => (
        <Text key={index} size="sm" fs="italic">
          &nbsp; • {duty}
        </Text>
      ))}
    </Paper>
  );
}
