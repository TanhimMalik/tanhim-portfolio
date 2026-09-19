export const profile = {
  name: 'Tanhim Malik',
  role: 'Software Engineer',
  tagline: 'I build developer tools, cloud infrastructure, and web apps that get out of the way.',
  email: 'tanhimmalik321@gmail.com',
  linkedin: 'https://www.linkedin.com/in/tanhimmalik/',
  github: 'https://github.com/TanhimMalik',
}

export const skills = {
  'Languages & Frameworks': ['JavaScript', 'TypeScript', 'Java', 'Python', 'SQL', 'HTML/CSS', 'R', 'React', 'Node.js', 'Flask', 'SpringBoot'],
  'Developer Tools': ['AWS (S3, EC2, Lambda, CDK, Redshift)', 'Git', 'Docker', 'Prometheus', 'Grafana'],
}

export const experience = [
  {
    role: 'Apprentice Software Engineer',
    company: 'Tripadvisor',
    location: 'New York, NY',
    period: 'Mar 2024 – Oct 2024',
    points: [
      'Developed a developer-facing web application deployed as a plugin to Cortex for streamlining common developer operations like new service creation, Snowflake database creation, etc.',
      'Enhanced cloud infrastructure and developer tooling across TripAdvisor using Cortex, focusing on automation and efficiency.',
      'Used TypeScript and React to build scalable, maintainable Cortex plugins and templates, boosting developer productivity.',
      'Managed cloud infrastructure deployments with AWS CDK, ensuring scalability and robust performance.',
      'Automated system cataloging and owner identification, leading to 100% team ownership of products.',
    ],
  },
  {
    role: 'Software Engineer Intern',
    company: 'Jefferies Group',
    location: 'New York, NY',
    period: 'Feb 2023 – Aug 2023',
    points: [
      'Developed and supported Java applications for the ION Trading Platform, integrating custom APIs for trader functionality.',
      'Built a risk aggregation app for mortgage trading desks used by the COO, CFO, and dozens of traders, using Java Spring Boot and Kafka.',
      'Automated data-pull tasks, achieving an over 85% reduction in time required for analysis.',
      'Launched an internal logging, alerting, and observability platform using Python, Grafana, and Prometheus — 7 new dashboards, 60% faster incident detection.',
      'Assisted in migrating kdb+ databases to AWS, cutting on-premise costs and improving query performance up to 40%.',
    ],
  },
]

export const projects = [
  {
    name: 'React Ecommerce Store Admin',
    description: 'A responsive, multi-page admin dashboard mimicking the management of an e-commerce store’s operations.',
    points: [
      'Built a complete frontend with React, Vite, and Tailwind CSS around a clean, component-based architecture.',
      'Implemented CRUD functionality for products and a dynamic data table for tracking orders.',
      'Managed app-wide and local state (auth, theme) with React Hooks.',
    ],
    tags: ['React', 'Vite', 'Tailwind CSS'],
    link: 'https://store-admin-dashboard-eight.vercel.app',
  },
]

export const education = [
  { school: 'Western Governors University', degree: 'B.S. in Computer Science', period: 'May 2027' },
  { school: 'Year Up NY', degree: 'Technical Diploma in Software Development', period: 'Aug 2023' },
]

export type PanelTheme = {
  bg: string
  fg: string
  accent: string
  soft: string
}

export const panelThemes: PanelTheme[] = [
  { bg: '#FF5A2E', fg: '#FFFFFF', accent: '#0B0B0D', soft: 'rgba(255,255,255,0.15)' },
  { bg: '#7C3AED', fg: '#FFFFFF', accent: '#0B0B0D', soft: 'rgba(255,255,255,0.18)' },
  { bg: '#1D4ED8', fg: '#FFFFFF', accent: '#FFC53D', soft: 'rgba(255,255,255,0.15)' },
  { bg: '#FFC53D', fg: '#101010', accent: '#0B0B0D', soft: 'rgba(16,16,16,0.1)' },
  { bg: '#F3F1EA', fg: '#101010', accent: '#FF5A2E', soft: 'rgba(16,16,16,0.08)' },
  { bg: '#FF5FA2', fg: '#101010', accent: '#0B0B0D', soft: 'rgba(16,16,16,0.1)' },
  { bg: '#0B0B0D', fg: '#F3F1EA', accent: '#C8FF4D', soft: 'rgba(255,255,255,0.1)' },
]
