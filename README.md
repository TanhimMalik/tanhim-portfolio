# Tanhim Malik — Portfolio

Personal portfolio site, live at **[tanhim-portfolio.vercel.app](https://tanhim-portfolio.vercel.app)**.

A horizontally-scrolling, single-page portfolio: each section (Intro, About, Experience, Projects, Skills, Contact) is its own full-screen panel, navigated by scrolling vertically. Scroll input is free and continuous while you're actively scrolling, then eases to the nearest section once it settles — no hard snapping mid-motion.

## Features

- **Horizontal scroll navigation** — vertical wheel/trackpad input drives horizontal panel movement, with a hover-expandable nav that shows section names and updates live as you scroll
- **Physics-driven decoration** — each section has bouncing shapes (Matter.js) that collide with each other, avoid the text content, and get pushed away by the cursor; the intro section has a one-time gravity "drop-in" animation on load
- **Scroll-triggered content reveals** — text and list items animate in as their section becomes active
- Responsive: falls back to natural vertical scrolling and stacked sections on mobile

## Tech stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) for build tooling
- [Tailwind CSS v4](https://tailwindcss.com/) for styling
- [GSAP](https://gsap.com/) for the intro text animation and scroll easing
- [Matter.js](https://brm.io/matter-js/) for the physics decorations

## Running locally

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```
