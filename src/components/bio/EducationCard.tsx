import { Paper, Title, Text, Divider } from '@mantine/core';
import { Education } from '@/types';

interface EducationCardProps {
  education: Education;
}

export function EducationCard({ education }: EducationCardProps) {
  return (
    <Paper
      withBorder
      p="lg"
      shadow="sm"
      className="hover-close"
      style={{ borderColor: 'var(--mantine-color-dark-6)', borderWidth: 2 }}
    >
      <Title order={2} style={{ color: education.color }}>
        {education.institution}
      </Title>
      <Text fw={700}>{education.degree}</Text>
      <Text size="sm">
        <strong>Graduated:</strong> {education.graduated} &nbsp; <strong>GPA:</strong>{' '}
        {education.gpa}
      </Text>
      <Divider my="xs" />
      {education.details.map((detail, index) => (
        <Text key={index} size="sm" fs="italic">
          &nbsp; <strong>{detail.split(':')[0]}:</strong>
          {detail.split(':').slice(1).join(':')}
        </Text>
      ))}
    </Paper>
  );
}
