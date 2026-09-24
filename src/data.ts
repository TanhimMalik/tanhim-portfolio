import soldraShot from './assets/projects/soldra-dashboard.webp'
import storeAdminShot from './assets/projects/store-admin.webp'
import typescript from './assets/logos/typescript.svg'
import javascript from './assets/logos/javascript.svg'
import java from './assets/logos/java.svg'
import python from './assets/logos/python.svg'
import html5 from './assets/logos/html5.svg'
import css3 from './assets/logos/css3.svg'
import rLang from './assets/logos/r.svg'
import react from './assets/logos/react.svg'
import nextjs from './assets/logos/nextjs.svg'
import tailwind from './assets/logos/tailwindcss.svg'
import nodejs from './assets/logos/nodejs.svg'
import spring from './assets/logos/spring.svg'
import flask from './assets/logos/flask.svg'
import kafka from './assets/logos/apachekafka.svg'
import postgres from './assets/logos/postgresql.svg'
import supabase from './assets/logos/supabase.svg'
import firebase from './assets/logos/firebase.svg'
import aws from './assets/logos/amazonwebservices.svg'
import docker from './assets/logos/docker.svg'
import git from './assets/logos/git.svg'
import prometheus from './assets/logos/prometheus.svg'
import grafana from './assets/logos/grafana.svg'

export const profile = {
  name: 'Tanhim Malik',
  firstName: 'Tanhim',
  role: 'Software Engineer',
  email: 'tanhimmalik321@gmail.com',
  linkedin: 'https://www.linkedin.com/in/tanhimmalik/',
  github: 'https://github.com/TanhimMalik',
  resume: '/Tanhim-Malik-Resume.pdf',
}

export const impact = [
  {
    value: '85%',
    qualifier: 'over',
    label: 'less time spent on analysis after I automated the data-pull tasks',
    where: 'Jefferies',
  },
  {
    value: '60%',
    label: 'faster incident detection after I launched an internal monitoring platform',
    where: 'Jefferies',
  },
  {
    value: '40%',
    qualifier: 'up to',
    label: 'faster queries after helping migrate kdb+ databases to AWS',
    where: 'Jefferies',
  },
  {
    value: '100%',
    label: 'of products with a team owner after I automated system cataloging',
    where: 'Tripadvisor',
  },
]

export const soldra = {
  name: 'Soldra',
  tagline: 'Profit and tax tracking for online resellers.',
  status: 'Beta coming soon',
  problem:
    'Resellers know what they sold, not what they kept. Payouts look like income until the fees, shipping and cost of the item come off, and the self-employment tax bill shows up in April.',
  solution:
    "Soldra imports sales from six marketplaces, takes off every fee and what you paid for the item, and shows the profit that's actually yours, plus what to set aside each tax quarter.",
  screenshot: soldraShot,
  details: [
    {
      title: 'One importer, six CSV formats',
      body: "eBay, Poshmark, Mercari, Whatnot, Depop and Etsy all export differently. Rows that can't be parsed get skipped instead of failing the file, and overlapping exports never double count.",
    },
    {
      title: 'Fees modeled per platform',
      body: "eBay's final value fee plus the per-order charge, Poshmark's 20% (or $2.95 under $15), Mercari's 10%. When an export reports the real fee, that number wins.",
    },
    {
      title: 'Tax math you can act on',
      body: 'Self-employment tax is 15.3% of 92.35% of net profit, split across the real IRS quarterly deadlines.',
    },
    {
      title: 'Tested where it counts',
      body: 'Every marketplace parser, the fee math and the tax math have their own test suites.',
    },
  ],
  stack: ['Next.js', 'TypeScript', 'Supabase', 'Postgres', 'Drizzle', 'Stripe', 'Tailwind CSS', 'Vitest'],
}

export const projects = [
  {
    name: 'Store Admin Dashboard',
    description:
      'An admin dashboard for an online store: product management backed by Firestore, sign-in-gated editing, an orders table, and sales charts.',
    screenshot: storeAdminShot,
    stack: ['React', 'Vite', 'Tailwind CSS', 'Firebase', 'Recharts', 'Framer Motion'],
    live: 'https://store-admin-dashboard-eight.vercel.app',
    source: 'https://github.com/TanhimMalik/Store-Admin-Dashboard',
  },
]

export const thisSite = {
  name: 'This site',
  description: 'Built with React, Vite and Tailwind CSS, and deployed on Vercel.',
  source: 'https://github.com/TanhimMalik/tanhim-portfolio',
}

export const experience = [
  {
    company: 'Tripadvisor',
    role: 'Apprentice Software Engineer',
    period: 'Mar 2024 – Oct 2024',
    location: 'New York, NY',
    points: [
      'Built a developer-facing web app, shipped as a Cortex plugin, that streamlines common ops like creating a new service or a Snowflake database.',
      'Automated system cataloging and owner identification, leading to 100% team ownership of products.',
      'Built Cortex plugins and templates in TypeScript and React, and managed infrastructure deployments with AWS CDK.',
    ],
    stack: ['TypeScript', 'React', 'AWS CDK', 'Cortex'],
  },
  {
    company: 'Jefferies',
    role: 'Software Engineer Intern',
    period: 'Feb 2023 – Aug 2023',
    location: 'New York, NY',
    points: [
      'Built a risk aggregation app for the mortgage trading desks, used by the COO, CFO and dozens of traders, with Java Spring Boot and Kafka.',
      'Launched an internal logging, alerting and observability platform: 7 new dashboards and 60% faster incident detection.',
      'Automated data-pull tasks for an over 85% cut in analysis time, and helped migrate kdb+ databases to AWS for up to 40% faster queries.',
    ],
    stack: ['Java', 'Spring Boot', 'Kafka', 'Python', 'Grafana', 'Prometheus', 'AWS'],
  },
]

export const education = [
  { school: 'Western Governors University', credential: 'B.S. Computer Science', period: 'Expected May 2027' },
  { school: 'Year Up NY', credential: 'Technical Diploma, Software Development', period: 'Aug 2023' },
]

export type StackItem = { name: string; logo: string; note?: string }

export const stack: { group: string; items: StackItem[] }[] = [
  {
    group: 'Languages',
    items: [
      { name: 'TypeScript', logo: typescript },
      { name: 'JavaScript', logo: javascript },
      { name: 'Java', logo: java },
      { name: 'Python', logo: python },
      { name: 'HTML', logo: html5 },
      { name: 'CSS', logo: css3 },
      { name: 'R', logo: rLang },
    ],
  },
  {
    group: 'Frontend',
    items: [
      { name: 'React', logo: react },
      { name: 'Next.js', logo: nextjs },
      { name: 'Tailwind CSS', logo: tailwind },
    ],
  },
  {
    group: 'Backend & data',
    items: [
      { name: 'Node.js', logo: nodejs },
      { name: 'Spring Boot', logo: spring },
      { name: 'Flask', logo: flask },
      { name: 'Kafka', logo: kafka },
      { name: 'PostgreSQL', logo: postgres },
      { name: 'Supabase', logo: supabase },
      { name: 'Firebase', logo: firebase },
    ],
  },
  {
    group: 'Cloud & tools',
    items: [
      { name: 'AWS', logo: aws, note: 'S3, EC2, Lambda, CDK, Redshift' },
      { name: 'Docker', logo: docker },
      { name: 'Git', logo: git },
      { name: 'Prometheus', logo: prometheus },
      { name: 'Grafana', logo: grafana },
    ],
  },
]
