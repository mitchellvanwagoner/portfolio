import { SkillCategory } from '@/types';

export const skillCategories: SkillCategory[] = [
  {
    category: 'Programming',
    skills: [
      { name: 'Python', rating: 6, maxRating: 10 },
      { name: 'JavaScript', rating: 5, maxRating: 10 },
      { name: 'MATLAB', rating: 5, maxRating: 10 },
      { name: 'Excel', rating: 8, maxRating: 10 },
      { name: 'Salesforce', rating: 4, maxRating: 10 },
    ],
  },
  {
    category: 'Design & CAD',
    skills: [
      { name: 'AutoCAD', rating: 8, maxRating: 10 },
      { name: 'SolidWorks', rating: 8, maxRating: 10 },
      { name: 'Siemens NX', rating: 6, maxRating: 10 },
      { name: 'Creo', rating: 5, maxRating: 10 },
      { name: 'Rhino 3D', rating: 4, maxRating: 10 },
      { name: 'Blender', rating: 3, maxRating: 10 },
      { name: 'KiCAD', rating: 3, maxRating: 10 },
      { name: 'GD&T', rating: 5, maxRating: 10 },
    ],
  },
  {
    category: 'Manufacturing',
    skills: [
      { name: '3D Printing', rating: 8, maxRating: 10 },
      { name: 'Wood Working & General Fabrication', rating: 7, maxRating: 10 },
      { name: 'Sheet Metal Design', rating: 4, maxRating: 10 },
      { name: 'Quality Assurance', rating: 6, maxRating: 10 },
    ],
  },
];
