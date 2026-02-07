import { Project } from '@/types';

export const projects: Project[] = [
  {
    slug: 'qatools',
    name: 'QA Tools',
    description:
      'Comprehensive quality assurance tools and utilities designed to streamline testing processes, automate repetitive tasks, and improve overall software quality in professional development environments.',
    category: 'work',
    thumbnail: '/images/projects/qatools/qatools-1.webp',
    thumbnailAlt: 'QA Tools interface',
    dateRange: 'January 2024 - Current',
    technologies: ['Python', 'Salesforce', 'AutoCAD', 'Excel'],
    features: [
      'Automated QA checklists',
      'Analytics and reporting dashboards',
      'Integration with Salesforce',
      'Streamlined design review process',
    ],
    challenges: [
      {
        challenge: 'Automating complex multi-step QA workflows',
        solution:
          'Built modular Python scripts that integrate with Salesforce API and AutoCAD automation',
      },
    ],
    links: [],
    galleryPrefix: 'qatools',
    galleryCount: 4,
    galleryStart: 1,
  },
  {
    slug: 'capstone',
    name: 'Capstone Project',
    description:
      'Senior engineering capstone project focusing on advanced engineering principles, design methodology, and real-world application. Represents the culmination of undergraduate engineering studies.',
    category: 'school',
    thumbnail: '/images/projects/capstone/capstone-46.webp',
    thumbnailAlt: 'Capstone project design and implementation',
    dateRange: 'September 2024 - June 2025',
    technologies: ['ROS2', 'Python', 'Machine Learning', 'Raspberry Pi', 'Arduino'],
    features: [
      'Robot comedy performance system',
      'Audience interaction with AI feedback',
      'Natural language processing',
      'Real-time sentiment analysis',
    ],
    challenges: [
      {
        challenge: 'Real-time audience interaction processing',
        solution: 'Implemented streaming NLP pipeline with low-latency response generation',
      },
    ],
    links: [],
    galleryPrefix: 'capstone',
    galleryCount: 46,
    galleryStart: 1,
  },
  {
    slug: 'dogapult',
    name: 'Dog-a-pult',
    description:
      'A fun engineering project combining mechanical design with electronics to create an automated ball launcher for dogs.',
    category: 'personal',
    thumbnail: '/images/projects/dogapult/dogapult-1.webp',
    thumbnailAlt: 'Dog-a-pult ball launcher',
    dateRange: 'Coming Soon',
    technologies: [],
    features: [],
    challenges: [],
    comingSoon: true,
    galleryPrefix: 'dogapult',
    galleryCount: 0,
    galleryStart: 1,
  },
  {
    slug: 'keyboard',
    name: 'Console (Custom Keyboard)',
    description:
      'A custom mechanical keyboard inspired by 50\'s NASA console design, featuring integrated display, volume controls, and a left-side numpad. 3D Printed and Hand-wired.',
    category: 'personal',
    thumbnail: '/images/projects/keyboard/keyboard-0.01.webp',
    thumbnailAlt: 'Custom NASA-inspired keyboard',
    dateRange: 'April 2024 - Current',
    technologies: [
      'Raspberry Pi 3B+',
      'RaspberryPi Micro - RP2040',
      '3D Printing - PLA/PETG Filament',
      'Kailh Box White/Jade Mechanical Switches',
    ],
    features: [
      'Keyboard inspired by 50\'s NASA console',
      'Display to show computer statistics',
      'Linear volume control sliders',
      'Upgradeable design',
      'Left side Numpad / Macropad',
    ],
    challenges: [
      {
        challenge:
          'Achieving authentic retro aesthetic while maintaining modern functionality',
        solution:
          'Researched original NASA console designs and adapted color schemes and button layouts for modern PCB constraints',
      },
      {
        challenge:
          'Integrating display and volume controls with keyboard matrix',
        solution:
          'Used separate microcontroller for peripheral functions with USB HID communication',
      },
    ],
    links: [],
    galleryPrefix: 'keyboard',
    galleryCount: 41,
    galleryStart: 1,
  },
  {
    slug: 'printer',
    name: 'Custom 3D Printer',
    description:
      'Modifications and improvements to 3D printer hardware and software. Includes custom enclosures, upgraded components, and optimized printing profiles for enhanced performance.',
    category: 'personal',
    thumbnail: '/images/projects/printer/printer-24.webp',
    thumbnailAlt: 'Modified 3D printer setup',
    dateRange: 'Coming Soon',
    technologies: [],
    features: [],
    challenges: [],
    comingSoon: true,
    galleryPrefix: 'printer',
    galleryCount: 27,
    galleryStart: 1,
  },
  {
    slug: 'trebuchet',
    name: 'Trebuchet',
    description:
      'A custom trebuchet designed for a renaissance party. Designed, simulated, and optimized then constructed with lumber and 3D printed parts.',
    category: 'personal',
    thumbnail: '/images/projects/trebuchet/trebuchet-0.1.webp',
    thumbnailAlt: 'Trebuchet',
    dateRange: 'August 2023 - September 2023',
    technologies: [
      'SolidWorks',
      'MATLAB',
      '3D Printing',
      'Wood Working',
    ],
    features: [
      'Physics-based simulation and optimization',
      'Custom counterweight system',
      '3D printed sling release mechanism',
      'Modular lumber construction',
    ],
    challenges: [
      {
        challenge: 'Optimizing release angle for maximum distance',
        solution:
          'Developed MATLAB simulation to model trebuchet physics and iterate on sling length and release pin geometry',
      },
    ],
    links: [],
    galleryPrefix: 'trebuchet',
    galleryCount: 11,
    galleryStart: 1,
  },
  {
    slug: 'greenhouse',
    name: 'Automated Greenhouse',
    description:
      'Smart greenhouse monitoring and control system with automated watering, climate control, and remote monitoring capabilities for optimal plant growth.',
    category: 'personal',
    thumbnail: '/images/projects/greenhouse/greenhouse-7.webp',
    thumbnailAlt: 'Smart greenhouse system',
    dateRange: 'Coming Soon',
    technologies: [],
    features: [],
    challenges: [],
    comingSoon: true,
    galleryPrefix: 'greenhouse',
    galleryCount: 10,
    galleryStart: 1,
  },
  {
    slug: 'miscellaneous',
    name: 'Miscellaneous Projects',
    description:
      'Collection of various smaller projects including bench power supply modifications, rotary encoder interfaces, controller hangers, board games, bed frame designs, and camping gear.',
    category: 'personal',
    thumbnail: '/images/projects/miscellaneous/bench_psu-1.webp',
    thumbnailAlt: 'Various miscellaneous projects',
    dateRange: 'Various',
    technologies: ['3D Printing', 'Wood Working', 'Electronics', 'Design'],
    features: [],
    challenges: [],
    links: [],
    miscImages: [
      'bedframe',
      'bench_psu',
      'controller_hanger',
      'dice_box',
      'disc_charger',
      'drill_press',
      'headphone_holder',
      'rotary_encoder',
      'shave_stand',
      'silverware_tray',
      'supercheesi',
      'underquilt',
    ],
    galleryPrefix: 'miscellaneous',
    galleryCount: 0,
    galleryStart: 1,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: Project['category']): Project[] {
  return projects.filter((p) => p.category === category);
}
