import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import { mdxComponents } from './mdx-components';

const contentDir = path.join(process.cwd(), 'src', 'content', 'projects');

export function getProjectSlugs(): string[] {
  if (!fs.existsSync(contentDir)) return [];
  return fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace(/\.mdx$/, ''));
}

export async function getProjectMDX(slug: string) {
  const filePath = path.join(contentDir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, 'utf-8');
  const { data: frontmatter, content: rawContent } = matter(source);

  const { content } = await compileMDX({
    source: rawContent,
    components: mdxComponents,
    options: {
      parseFrontmatter: false,
    },
  });

  return {
    content,
    frontmatter,
  };
}
