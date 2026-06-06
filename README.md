# Saumya Jain Portfolio

Recruiter-facing portfolio for Saumya Jain, a Lead Frontend Engineer focused on Angular, React, TypeScript, AI product systems, and production-grade web architecture.

The site is intentionally built as more than a visual landing page. It presents project case studies that explain engineering judgment: problem framing, architecture, tradeoffs, production risks, and next improvements.

## Featured Case Studies

- Human vs Bot: real-time Turing Test game with Angular, Socket.IO, Node middleware, FastAPI AI service, prompt iteration, evals, and deployment hardening.
- The Last Land Analytics: real-data OCR analytics workflow using React, Python, computer vision, Firebase, and a dashboard built around protected domain logic.
- Arcade Stack: browser gaming and learning platform combining React, TypeScript, Vite, and Python-in-browser experimentation.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Three.js and WebGL visual systems
- Vercel Analytics

## Production Checks

```bash
npm.cmd run lint
npm.cmd run build
```

The Vite build removes the unused `public/python` submodule payload from `dist` after bundling so the deployed portfolio remains focused on the current site.

## Local Development

```bash
npm.cmd install
npm.cmd run dev
```

## Portfolio Intent

This portfolio is designed to help recruiters and hiring managers quickly answer:

- What kinds of systems has Saumya built?
- How does she think about architecture and tradeoffs?
- Which projects are strongest interview anchors?
- Where is she growing next across AI systems, frontend architecture, and production readiness?
