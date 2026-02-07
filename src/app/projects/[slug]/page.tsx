import { Box, Title, Text, Anchor } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getProjectMDX } from '@/lib/mdx';
import { getProjectBySlug, projects } from '@/data/projects';
import { TechStack } from '@/components/project/TechStack';
import { ProjectFeatures } from '@/components/project/ProjectFeatures';
import { ChallengesList } from '@/components/project/ChallengesList';

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.name} | MVW Portfolio`,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const mdx = await getProjectMDX(slug);

  return (
    <Box p="xl" maw={1400} mx="auto">
      <Anchor
        href="/projects"
        c="navy.6"
        mb="lg"
        display="inline-flex"
        style={{ alignItems: 'center', gap: '0.25rem', textDecoration: 'none' }}
      >
        <IconArrowLeft size={16} /> Back to Projects
      </Anchor>

      <Title order={1}>{project.name}</Title>
      <Box style={{ borderBottom: '2px solid var(--mantine-color-dark-6)', borderRadius: 0 }} pb={0} mb="xl">
        <Text fs="italic">{project.dateRange}</Text>
      </Box>

      {project.comingSoon ? (
        <Box
          ta="center"
          p="2rem"
          style={{
            border: '2px dashed var(--mantine-color-dark-6)',
            borderRadius: 'var(--mantine-radius-sm)',
          }}
        >
          <Title order={3}>Coming Soon</Title>
          <Text mt="md">
            This project write-up is coming soon. Check back for updates!
          </Text>
        </Box>
      ) : (
        <>
          {project.technologies.length > 0 && <TechStack technologies={project.technologies} />}
          {project.features.length > 0 && <ProjectFeatures features={project.features} />}
          {project.challenges.length > 0 && <ChallengesList challenges={project.challenges} />}

          {mdx ? (
            <Box mt="xl">{mdx.content}</Box>
          ) : (
            <Box
              ta="center"
              p="2rem"
              mt="xl"
              style={{
                border: '2px dashed var(--mantine-color-dark-6)',
                borderRadius: 'var(--mantine-radius-sm)',
              }}
            >
              <Title order={3}>Detailed Write-up Coming Soon</Title>
              <Text mt="md">
                A detailed project report is being prepared. Check back for updates!
              </Text>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
