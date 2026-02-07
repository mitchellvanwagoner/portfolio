import { Box, Title, Flex } from '@mantine/core';
import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactMethodCard } from '@/components/contact/ContactMethodCard';
import { contactMethods } from '@/data/contact';

export const metadata: Metadata = {
  title: 'Contact | MVW Portfolio',
  description: 'Get in touch with Mitchell Van Wagoner.',
};

export default function ContactPage() {
  return (
    <Box p="xl" maw={1400} mx="auto">
      <Title order={1}>Contact</Title>

      <Flex
        gap="xl"
        justify="center"
        wrap="wrap"
        mt="lg"
        direction={{ base: 'column', sm: 'row' }}
        align={{ base: 'center', sm: 'stretch' }}
      >
        {contactMethods.map((method) => (
          <ContactMethodCard key={method.title} method={method} />
        ))}
      </Flex>

      <ContactForm />
    </Box>
  );
}
