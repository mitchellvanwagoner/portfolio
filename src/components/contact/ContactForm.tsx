'use client';

import { useState } from 'react';
import { TextInput, Textarea, Button, Alert, Box, Title, Text, Paper } from '@mantine/core';
import { useForm } from '@mantine/form';
import { formspreeEndpoint, contactEmail } from '@/data/contact';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },
    validate: {
      name: (value) => {
        if (!value.trim()) return 'Name is required.';
        if (!/^[a-zA-Z\s]{2,50}$/.test(value))
          return 'Name must be 2-50 characters long and contain only letters and spaces.';
        return null;
      },
      email: (value) => {
        if (!value.trim()) return 'Email is required.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          return 'Please enter a valid email address.';
        return null;
      },
      message: (value) => {
        if (!value.trim()) return 'Message is required.';
        if (value.length < 10 || value.length > 5000)
          return 'Message must be between 10 and 5000 characters long.';
        return null;
      },
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    setStatus('loading');
    setStatusMessage('');

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Network response was not ok');

      setStatus('success');
      setStatusMessage("Message sent successfully! I'll get back to you as soon as possible.");
      form.reset();
    } catch {
      // Fallback to mailto
      const subject = encodeURIComponent(`Contact Form Message from ${values.name}`);
      const body = encodeURIComponent(
        `Name: ${values.name}\nEmail: ${values.email}\nMessage:\n${values.message}`
      );
      window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;

      setStatus('success');
      setStatusMessage(
        'Your email client should open with the message pre-filled. Please send it from there!'
      );
    }
  };

  return (
    <Paper
      withBorder
      p="xl"
      mt="xl"
      shadow="lg"
      style={{ borderColor: 'var(--mantine-color-dark-6)', borderWidth: 2, maxWidth: 1200, margin: '2rem auto 0' }}
    >
      <Title order={3} c="rust.6" mb="lg">
        Send a Message
      </Title>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Name"
          required
          mb="lg"
          styles={{
            input: {
              backgroundColor: 'var(--mantine-color-cream-0)',
              border: '2px solid var(--mantine-color-dark-6)',
            },
          }}
          {...form.getInputProps('name')}
        />

        <TextInput
          label="Email"
          type="email"
          required
          mb="lg"
          styles={{
            input: {
              backgroundColor: 'var(--mantine-color-cream-0)',
              border: '2px solid var(--mantine-color-dark-6)',
            },
          }}
          {...form.getInputProps('email')}
        />

        <Textarea
          label="Message"
          required
          minRows={5}
          mb="lg"
          placeholder="Tell me about your project or just say hello!"
          styles={{
            input: {
              backgroundColor: 'var(--mantine-color-cream-0)',
              border: '2px solid var(--mantine-color-dark-6)',
            },
          }}
          {...form.getInputProps('message')}
        />

        <Box ta="center" mt="xl">
          <Button
            type="submit"
            size="md"
            color="navy.6"
            loading={status === 'loading'}
            className="hover-close"
          >
            Send Message
          </Button>
        </Box>

        {status === 'success' && (
          <Alert color="green" mt="lg" ta="center">
            {statusMessage}
          </Alert>
        )}
        {status === 'error' && (
          <Alert color="red" mt="lg" ta="center">
            Unable to send message automatically. Please email me directly at {contactEmail}
          </Alert>
        )}
      </form>

      <Text ta="center" size="sm" c="dimmed" fs="italic" mt="md">
        Your message will be sent directly to my email. I&apos;ll get back to you as soon as
        possible!
      </Text>
    </Paper>
  );
}
