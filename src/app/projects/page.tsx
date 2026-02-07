import { Box, Title, Text, SimpleGrid, Divider } from '@mantine/core';
import type { Metadata } from 'next';
import { ProjectCard } from '@/components/project/ProjectCard';
import { projects } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Projects | MVW Portfolio',
  description: 'Explore engineering projects in software, hardware, and design.',
};

export default function ProjectsPage() {
  const workProjects = projects.filter((p) => p.category === 'work' || p.category === 'school');
  const personalProjects = projects.filter((p) => p.category === 'personal');

  return (
    <Box p="xl" maw={1400} mx="auto">
      <Title order={1}>Projects</Title>

      <Box mt="lg" mb="2rem">
        <Text style={{ textAlign: 'left' }}>
          Welcome to my project portfolio! Here you&apos;ll find a collection of my engineering
          projects that showcase my skills in design, programming, and problem-solving.
        </Text>
        <Text mt="md" fw={700} style={{ textAlign: 'left' }}>
          Click on any project below to view detailed information →
        </Text>
      </Box>

      {/* Work and School Projects */}
      <Box mb="2rem">
        <Title
          order={2}
          c="rust.6"
          mb="lg"
          pb="sm"
          style={{ borderBottom: '2px solid var(--mantine-color-dark-6)', borderRadius: 0 }}
        >
          Work and School Projects
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg" mt="xl">
          {workProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </SimpleGrid>
      </Box>

      {/* Personal Projects */}
      <Box mb="2rem">
        <Title
          order={2}
          c="rust.6"
          mb="lg"
          pb="sm"
          style={{ borderBottom: '2px solid var(--mantine-color-dark-6)', borderRadius: 0 }}
        >
          Personal Projects
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg" mt="xl">
          {personalProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
}
