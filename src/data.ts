import soldraShot from './assets/projects/soldra-dashboard.webp'
import soldraShotSmall from './assets/projects/soldra-dashboard-800.webp'
import soldraMark from './assets/projects/soldra-mark.svg'
import storeAdminShot from './assets/projects/store-admin.webp'
import storeAdminShotSmall from './assets/projects/store-admin-800.webp'
import typescript from './assets/logos/typescript.svg'
import javascript from './assets/logos/javascript.svg'
import java from './assets/logos/java.svg'
import python from './assets/logos/python.svg'
import html5 from './assets/logos/html5.svg'
import css3 from './assets/logos/css3.svg'
import rLang from './assets/logos/r.svg'
import sql from './assets/logos/sql.svg'
import kdb from './assets/logos/kdb.svg'
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
    label: 'less analysis time after I automated kdb+ data extraction and analysis',
    where: 'Jefferies',
  },
  {
    value: '60%',
    label: 'less time to detect incidents after I built an internal observability platform',
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
    label: 'documented ownership across cataloged products, which I helped reach by automating catalog submissions',
    where: 'Tripadvisor',
  },
]

export const soldra = {
  name: 'Soldra',
  tagline: 'Profit and tax tracking for online resellers.',
  status: 'In development',
  note: 'Private repo, happy to walk through the code.',
  problem:
    'Resellers know what they sold, not what they kept. Payouts look like income until the fees, shipping and cost of the item come off, and the self-employment tax bill shows up in April.',
  solution:
    "Soldra imports sales from six marketplaces, takes off every fee and what you paid for the item, and shows the profit that's actually yours, plus what to set aside each tax quarter.",
  screenshot: soldraShot,
  screenshotSmall: soldraShotSmall,
  logo: soldraMark,
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
    name: 'E-Commerce Admin Dashboard',
    description:
      'An admin dashboard for an online store: product management backed by Firestore, sign-in-gated editing, an orders table, and sales charts.',
    screenshot: storeAdminShot,
    screenshotSmall: storeAdminShotSmall,
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
      'Built internal developer platform features as TypeScript and React plugins for Cortex, automating service creation, resource management and engineering workflows.',
      'Built a GitLab-to-GitHub migration assistant with API integrations, async status polling, validation and error handling, so teams could migrate their own repos.',
      'Automated AWS infrastructure provisioning and deployments with AWS CDK and TypeScript across the monitoring, scaffolding and migration tool stacks.',
      'Moved service-catalog workflows from file-based processes to bulk Cortex API submissions, helping reach 100% documented ownership across cataloged products.',
    ],
    stack: ['TypeScript', 'React', 'Node.js', 'AWS CDK', 'Cortex', 'Docker'],
  },
  {
    company: 'Jefferies',
    role: 'Software Engineer Intern',
    period: 'Feb 2023 – Aug 2023',
    location: 'New York, NY',
    points: [
      'Developed and supported Java applications for the ION Trading Platform, integrating custom APIs to improve trader workflows.',
      'Built a risk aggregation app for the mortgage trading desks with Java, Spring Boot and Kafka, supporting the COO, CFO and dozens of traders.',
      'Built an internal observability platform with Python, Prometheus, Grafana, Loki and Promtail: seven dashboards and critical alerts that cut incident detection time by 60%.',
      'Automated kdb+ data extraction and analysis with Python and Unix scripting, cutting analysis time by more than 85%, and helped migrate kdb+ databases to AWS for up to 40% faster queries.',
    ],
    stack: ['Java', 'Spring Boot', 'Kafka', 'Python', 'Prometheus', 'Grafana', 'Loki', 'kdb+', 'AWS'],
  },
]

export const education = [
  { school: 'Western Governors University', credential: 'B.S. Computer Science', period: 'In progress' },
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
      { name: 'R', logo: rLang },
      { name: 'SQL', logo: sql },
      { name: 'HTML', logo: html5 },
      { name: 'CSS', logo: css3 },
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
      { name: 'kdb+', logo: kdb, note: 'Time-series database' },
      { name: 'Supabase', logo: supabase },
      { name: 'Firebase', logo: firebase },
    ],
  },
  {
    group: 'Cloud & tools',
    items: [
      { name: 'AWS', logo: aws, note: 'EC2, S3, Lambda, Redshift, CDK' },
      { name: 'Docker', logo: docker },
      { name: 'Git', logo: git },
      { name: 'Prometheus', logo: prometheus },
      { name: 'Grafana', logo: grafana },
    ],
  },
]
