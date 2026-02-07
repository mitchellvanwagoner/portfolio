'use client';

import { Card, Text, Title, Box } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/types';
import classes from './ProjectCard.module.css';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card
      component={Link}
      href={`/projects/${project.slug}`}
      className={classes.card}
      withBorder
      padding="lg"
      style={{ borderColor: 'var(--mantine-color-dark-6)', borderWidth: 2, textDecoration: 'none' }}
    >
      <Title order={3} mb={4}>
        {project.name}
      </Title>
      <Text size="sm" c="dark" lineClamp={3} style={{ textAlign: 'left' }}>
        {project.description}
      </Text>
      <Card.Section mt="sm" style={{ flex: 1, position: 'relative', minHeight: 160 }}>
        <Box className={classes.imageWrapper}>
          <Image
            src={project.thumbnail}
            alt={project.thumbnailAlt}
            fill
            className={classes.image}
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
        </Box>
      </Card.Section>
    </Card>
  );
}
