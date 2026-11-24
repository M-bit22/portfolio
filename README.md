# Muhammad Ali Waqas — AI Engineer Portfolio

A high-quality, responsive portfolio website built with **Next.js (App Router), React, TypeScript, and Tailwind CSS**.

Live content is real only: no invented company employment, degrees, or contact details. See `src/data/portfolio.ts` for all content and TODO placeholders.

## Sections

- Hero — name, title, key stats (TruthLens 98.7%, 7,765 articles, 3 projects)
- About — what I do, and learning under Sir Iqbal Gill
- Skills — AI/ML, Data, Web, Tools
- Projects — TruthLens, Job Application Tracker, Gemini Travel Advisor (live demo + GitHub links)
- Learning Journey — honest timeline, no invented jobs
- Contact — GitHub, plus LinkedIn / email placeholders

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Build / test

```bash
npm run build
npm start
```

## Update your details (TODO)

Edit `src/data/portfolio.ts` and replace:

- `linkedin` — your real LinkedIn profile URL (currently a placeholder)
- `email` — your real public email (currently a placeholder)
- `photoPath` — add a photo at `public/photo.jpg` and set it to `"/photo.jpg"` (currently no photo)

## Deploy on Vercel

Option A — Vercel dashboard (easiest, recommended):

1. Push this folder to GitHub (e.g. `M-bit22/portfolio-nextjs`).
2. Go to https://vercel.com/new and import that repository.
3. Vercel auto-detects Next.js. Leave the defaults (Framework: Next.js, Build Command: `npm run build`).
4. Click **Deploy**. You get a live URL like `https://portfolio-nextjs.vercel.app`.
5. Optional: in Vercel → Settings → Domains, add a custom domain.

Option B — Vercel CLI:

```bash
npm install -g vercel
vercel login
vercel
# follow the prompts, then:
vercel --prod
```

Then share the live Vercel URL on LinkedIn so recruiters can open it.

## Tech

- Next.js 16.4.6, React 19.3.0, TypeScript
- Tailwind CSS 4.3.3
- Node v24
