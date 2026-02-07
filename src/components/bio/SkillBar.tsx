'use client';

import { useEffect, useRef, useState } from 'react';
import { Progress, Text, Box } from '@mantine/core';
import { Skill } from '@/types';

interface SkillBarProps {
  skill: Skill;
}

export function SkillBar({ skill }: SkillBarProps) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setAnimated(true), 200);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const percentage = (skill.rating / skill.maxRating) * 100;

  return (
    <Box ref={ref} mb="md">
      <Text size="sm" fw={600} mb={4}>
        {skill.name}
      </Text>
      <Box
        style={{
          position: 'relative',
          border: '1px solid var(--mantine-color-navy-6)',
          borderRadius: 'var(--mantine-radius-sm)',
          overflow: 'hidden',
        }}
      >
        <Progress
          value={animated ? percentage : 0}
          size="xl"
          radius="sm"
          color="navy.4"
          styles={{
            root: { backgroundColor: 'var(--mantine-color-navy-0)' },
            section: {
              transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
              background: 'linear-gradient(to right, var(--mantine-color-navy-4), #2ecc71)',
            },
          }}
        />
        <Text
          size="xs"
          fw={600}
          c="white"
          style={{
            position: 'absolute',
            right: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 1,
            textShadow: '0 1px 2px rgba(0,0,0,0.5)',
          }}
        >
          {skill.rating}/{skill.maxRating}
        </Text>
      </Box>
    </Box>
  );
}
