import { Box, Title, Text, SimpleGrid } from '@mantine/core';
import type { Metadata } from 'next';
import { HobbyCard } from '@/components/hobbies/HobbyCard';
import { hobbies } from '@/data/hobbies';

export const metadata: Metadata = {
  title: 'Hobbies | MVW Portfolio',
  description: "Mitchell Van Wagoner's hobbies and interests beyond engineering.",
};

export default function HobbiesPage() {
  return (
    <Box p="xl" maw={1400} mx="auto">
      <Title order={1}>Hobbies & Interests</Title>
      <Text mt="md">
        Beyond engineering, I have a variety of interests that keep me creative and engaged. Here are
        some of the activities I enjoy in my free time:
      </Text>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl" mt="xl">
        {hobbies.map((hobby) => (
          <HobbyCard key={hobby.title} hobby={hobby} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
