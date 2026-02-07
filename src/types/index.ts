export interface Project {
  slug: string;
  name: string;
  description: string;
  category: 'work' | 'school' | 'personal';
  thumbnail: string;
  thumbnailAlt: string;
  dateRange: string;
  technologies: string[];
  features: string[];
  challenges: Challenge[];
  links?: ProjectLink[];
  galleryPrefix?: string;
  galleryCount?: number;
  galleryStart?: number;
  comingSoon?: boolean;
  miscImages?: string[];
}

export interface Challenge {
  challenge: string;
  solution: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Skill {
  name: string;
  rating: number;
  maxRating: number;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Experience {
  company: string;
  title: string;
  location: string;
  period: string;
  color: string;
  duties: string[];
}

export interface Education {
  institution: string;
  degree: string;
  graduated: string;
  gpa: string;
  color: string;
  details: string[];
}

export interface Hobby {
  emoji: string;
  title: string;
  description: string;
  items: string[];
}

export interface ContactMethod {
  emoji: string;
  title: string;
  label: string;
  url: string;
}
