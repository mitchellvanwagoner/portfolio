import { Experience, Education } from '@/types';

export const experiences: Experience[] = [
  {
    company: 'Sunrun',
    title: 'CAD Technician / Software Developer',
    location: 'Lehi, UT / Remote',
    period: 'June 2017 - Present',
    color: '#008aff',
    duties: [
      'Create permit-able designs using the AutoCAD CAD program',
      'Balance customer and company constraints',
      'Analyze architectural documents',
      'Monitor designs and data entry for accuracy',
      'Build QA tools for effective production',
      'Write SOPs and training documents',
    ],
  },
  {
    company: 'Lazarus3D',
    title: '3D Print Technician / Mechanical Engineer Intern',
    location: 'Albany, OR',
    period: 'September 2022 - December 2022',
    color: '#2c5ca8',
    duties: [
      'Maintain 3D printers for optimal performance',
      'Schedule print jobs to meet project deadlines',
      'Organize shop floor for efficient inventory and equipment access',
      'Develop SOPs to improve processes',
      'Design and build solutions for process improvements',
    ],
  },
  {
    company: 'Vivint Solar',
    title: 'Team Lead',
    location: 'Lehi, UT',
    period: 'September 2016 - June 2017',
    color: '#e9902f',
    duties: [
      'Foster an open and friendly work environment',
      'Facilitate growth through trainings and shadow sessions',
      'Monitor employee success through 1 on 1 guidance',
      'Collaborate with field personnel on design decisions',
      'Check designer work to ensure quality',
      'Present industry leading processes to design departments',
    ],
  },
  {
    company: 'Virticus',
    title: 'Mechanical Designer / Product Assembler',
    location: 'Beaverton, OR',
    period: 'May 2011 - August 2014',
    color: '#b84a1f',
    duties: [
      'Design weather proof sheet metal enclosures to house electronics',
      'Outline and design new products using the Solidworks CAD program',
      'Collaborate with team members on design requirements',
      'Interface with manufacturing to streamline processes and ensure quality',
      'Update existing product designs to meet company standards',
    ],
  },
];

export const education: Education[] = [
  {
    institution: 'Oregon State University',
    degree: 'Bachelor of Science in Mechanical Engineering',
    graduated: 'June 2025',
    gpa: '3.15',
    color: '#DC4405',
    details: [
      'Focus: Robotic Control - SLAM/Kinematics',
      'Robotics Lab - OVH Group: Human-Robot Interactions',
      'Capstone Project: Robot Comedy (Audience Interaction with AI Feedback)',
    ],
  },
];
