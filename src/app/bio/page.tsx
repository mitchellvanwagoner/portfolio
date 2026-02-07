import { Box, Title, Text } from '@mantine/core';
import Image from 'next/image';
import type { Metadata } from 'next';
import { SkillsSidebar } from '@/components/bio/SkillsSidebar';
import { ExperienceCard } from '@/components/bio/ExperienceCard';
import { EducationCard } from '@/components/bio/EducationCard';
import { skillCategories } from '@/data/skills';
import { experiences, education } from '@/data/experience';
import { bioIntro, areasOfInterest, engineeringPhilosophy, historyContent } from '@/data/bio';

export const metadata: Metadata = {
  title: 'Bio | MVW Portfolio',
  description: 'Learn about Mitchell Van Wagoner - Mechanical Engineer, Software Developer, and Maker.',
};

export default function BioPage() {
  return (
    <Box p="xl" maw={1400} mx="auto">
      {/* Two-column layout: main + sidebar */}
      <Box style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        {/* Main Content */}
        <Box style={{ flex: '2 1 500px', minWidth: 0 }}>
          <Title order={1}>Bio</Title>

          {/* Intro with photo */}
          <Box mt="md" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <Box style={{ flexShrink: 0, alignSelf: 'flex-start' }}>
              <Image
                src="/images/site/me.webp"
                alt="Mitchell Van Wagoner"
                width={250}
                height={300}
                style={{
                  width: 250,
                  maxWidth: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  border: '2px solid var(--mantine-color-dark-6)',
                  borderRadius: 'var(--mantine-radius-sm)',
                }}
                priority
              />
            </Box>
            <Box style={{ flex: 1, minWidth: 280 }}>
              {bioIntro.paragraphs.map((p, i) => (
                <Text key={i} mb="md" style={{ textAlign: 'justify' }}>
                  {p}
                </Text>
              ))}
            </Box>
          </Box>

          {/* Areas of Interest */}
          <Box mt="xl">
            <Title order={2}>Areas of Interest</Title>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
              {areasOfInterest.map((item, i) => (
                <li key={i}><Text component="span">{item}</Text></li>
              ))}
            </ul>
          </Box>

          {/* Engineering Philosophy */}
          <Box mt="xl">
            <Title order={2}>Engineering Philosophy</Title>
            <Text mt="sm" style={{ textAlign: 'justify' }}>
              {engineeringPhilosophy}
            </Text>
          </Box>

          {/* Experience */}
          <Box mt="xl">
            <Title order={2}>Experience</Title>
            <Box mt="md">
              {experiences.map((exp) => (
                <ExperienceCard key={exp.company} experience={exp} />
              ))}
            </Box>
          </Box>

          {/* Education */}
          <Box mt="xl">
            <Title order={2}>Education</Title>
            <Box mt="md">
              {education.map((edu) => (
                <EducationCard key={edu.institution} education={edu} />
              ))}
            </Box>
          </Box>
        </Box>

        {/* Skills Sidebar */}
        <Box style={{ flex: '1 1 280px', minWidth: 280 }}>
          <SkillsSidebar categories={skillCategories} />
        </Box>
      </Box>

      {/* History Section - Full Width Below */}
      <Box mt="xl">
        <Title order={2}>History</Title>
        {historyContent.map((section, i) => (
          <Box key={i} mt={section.title ? 'lg' : 'md'}>
            {section.title && <Title order={4}>{section.title}</Title>}
            <Text mt="sm" style={{ textAlign: 'justify' }}>
              {section.text}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
