'use client';

import { Box, Title, Text } from '@mantine/core';
import { SkillBar } from './SkillBar';
import { SkillCategory } from '@/types';
import classes from './SkillsSidebar.module.css';

interface SkillsSidebarProps {
  categories: SkillCategory[];
}

export function SkillsSidebar({ categories }: SkillsSidebarProps) {
  return (
    <Box className={classes.sidebar}>
      <Title order={2} mb="sm">
        Technical Skills
      </Title>

      {categories.map((cat) => (
        <Box key={cat.category} mt="xl">
          <Text size="lg" fw={600} c="rust.6" mb="md">
            {cat.category}
          </Text>
          {cat.skills.map((skill) => (
            <SkillBar key={skill.name} skill={skill} />
          ))}
        </Box>
      ))}
    </Box>
  );
}
