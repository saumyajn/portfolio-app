import { motion } from 'framer-motion';
import { FiArrowUpRight, FiCpu, FiDatabase, FiGitBranch, FiShield, FiTrendingUp } from 'react-icons/fi';

type CaseStudy = {
  id: string;
  title: string;
  role: string;
  summary: string;
  stack: string[];
  problem: string;
  architecture: string[];
  tradeoffs: string[];
  impact: string[];
  improve: string[];
  liveLink?: string;
  githubLink?: string;
  accent: 'emerald' | 'sapphire' | 'amethyst';
};

const accentClasses = {
  emerald: {
    text: 'text-[var(--accent-emerald)]',
    border: 'border-[var(--accent-emerald)]/30',
    bg: 'bg-[var(--accent-emerald)]/10',
    shadow: 'shadow-[0_0_30px_var(--accent-emerald-glow)]',
  },
  sapphire: {
    text: 'text-[var(--accent-sapphire)]',
    border: 'border-[var(--accent-sapphire)]/30',
    bg: 'bg-[var(--accent-sapphire)]/10',
    shadow: 'shadow-[0_0_30px_var(--accent-sapphire-glow)]',
  },
  amethyst: {
    text: 'text-[var(--accent-amethyst)]',
    border: 'border-[var(--accent-amethyst)]/30',
    bg: 'bg-[var(--accent-amethyst)]/10',
    shadow: 'shadow-[0_0_30px_rgba(139,92,246,0.25)]',
  },
};

const caseStudies: CaseStudy[] = [
  {
    id: 'turing-test',
    title: 'Human vs Bot',
    role: 'AI product architecture, real-time orchestration, production hardening',
    summary:
      'A real-time Turing Test game that pairs humans with either another person or an AI persona, then challenges players to infer who they were speaking with.',
    stack: ['Angular', 'Socket.IO', 'Node.js', 'FastAPI', 'Gemini', 'Evals'],
    problem:
      'The project needed to feel like a game while still proving serious AI engineering: session lifecycle, model latency, prompt control, room safety, and clear deployment boundaries.',
    architecture: [
      'Angular client owns game state, timer, verdict flow, and responsive chat UX.',
      'Node middleware coordinates rooms, Socket.IO events, rate limits, origin checks, and backend handoff.',
      'Python FastAPI service isolates model access, persona prompting, evals, and AI timeout handling.',
      'Docs now explain production deployment, game rules, eval strategy, and architecture decisions.',
    ],
    tradeoffs: [
      'Kept provider logic isolated so Gemini can be swapped without rewriting the game client.',
      'Chose explicit production origin config over permissive CORS to avoid silent deployment risk.',
      'Used focused eval cases first instead of pretending a tiny game needs a giant benchmark suite on day one.',
    ],
    impact: [
      'Turns a simple chat idea into a recruiter-readable AI systems case study.',
      'Shows microservice boundaries, prompt iteration, observability thinking, and end-to-end testing.',
      'Creates a platform for future agent trust, deception, and human-likeness experiments.',
    ],
    improve: [
      'Add hosted Redis adapter for multi-instance Socket.IO scaling.',
      'Add Playwright browser E2E and CI checks across frontend, middleware, and backend.',
      'Track model quality with live eval dashboards and versioned prompts.',
    ],
    liveLink: 'https://humanorbot.vercel.app/',
    githubLink: 'https://github.com/saumyajn/humanorbot',
    accent: 'emerald',
  },
  {
    id: 'last-land',
    title: 'The Last Land Analytics',
    role: 'Real-data product UI, OCR workflow, analytics dashboard',
    summary:
      'A screenshot-to-dashboard workflow for game data that converts image evidence into synchronized, color-coded analytics used with real data.',
    stack: ['React', 'Python', 'OCR', 'OpenCV', 'Firebase', 'Data UX'],
    problem:
      'The application has to support real user data, so credibility depends on preserving the domain logic while making extraction and review workflows easier to trust.',
    architecture: [
      'React dashboard presents extracted data, comparisons, and status-oriented views.',
      'OCR and image-processing services turn screenshots into structured game signals.',
      'Firebase-backed persistence supports continuity across sessions and real usage.',
      'Visual encoding helps users scan differences without manually reconciling every screenshot.',
    ],
    tradeoffs: [
      'Business rules are intentionally treated as protected logic because the app is used with real data.',
      'Data correctness matters more than decorative UI changes or speculative feature rewrites.',
      'Future work should add validation and test harnesses around existing behavior before changing workflows.',
    ],
    impact: [
      'Demonstrates product empathy around a real workflow, not a toy dashboard.',
      'Shows applied computer vision, data transformation, and frontend analytics presentation.',
      'Creates a strong interview story around protecting domain behavior while improving production quality.',
    ],
    improve: [
      'Add non-invasive regression fixtures using representative screenshots.',
      'Improve deployment documentation and environment setup without changing parsing behavior.',
      'Add observability around extraction failures and confidence thresholds.',
    ],
    liveLink: 'https://the-last-land-analytics.vercel.app',
    githubLink: 'https://github.com/saumyajn/the-last-land',
    accent: 'amethyst',
  },
  {
    id: 'arcade-stack',
    title: 'Arcade Stack',
    role: 'Interactive systems, browser runtime experimentation, Python-in-browser UX',
    summary:
      'A modular browser gaming platform that combines React state patterns with Python micro-games running in the browser.',
    stack: ['React', 'TypeScript', 'Vite', 'Pyodide', 'Game UX'],
    problem:
      'The app needed to make practice projects feel cohesive: low-friction gameplay, reusable game shell patterns, and a bridge between frontend interaction and Python learning.',
    architecture: [
      'React components provide the shared shell, routing, game surfaces, and interaction states.',
      'Vite keeps iteration fast while supporting production deployment.',
      'Python scripts run client-side for lightweight exercises without a server dependency.',
      'Project cards and game modules make each exercise feel part of a larger platform.',
    ],
    tradeoffs: [
      'Client-side Python is great for learning UX, but production games still need careful bundle and worker management.',
      'The platform favors small reusable game modules over a single large game engine.',
      'The next step is stronger testing and accessibility rather than adding more games immediately.',
    ],
    impact: [
      'Shows curiosity across React, TypeScript, and Python instead of isolated practice files.',
      'Gives recruiters a concrete example of turning learning artifacts into a product surface.',
      'Supports interview prep by exposing state, events, runtime loading, and UI polish decisions.',
    ],
    improve: [
      'Add keyboard-first controls and accessibility checks for each game.',
      'Move game definitions into typed metadata and add route-level lazy loading.',
      'Add a short engineering note per game explaining the state model and edge cases.',
    ],
    liveLink: 'https://arcade-stack.vercel.app',
    githubLink: 'https://github.com/saumyajn/arcade-stack',
    accent: 'sapphire',
  },
];

const SectionList = ({ title, items }: { title: string; items: string[] }) => (
  <div>
    <h4 className="mb-3 text-xs font-mono uppercase tracking-[0.25em] text-white/45">{title}</h4>
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/68">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/35" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default function CaseStudies() {
  return (
    <section className="relative w-full bg-[#050505] px-5 py-24 text-white sm:px-8 md:px-12 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-4xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-[var(--accent-emerald)]">
            Recruiter case studies
          </p>
          <h2 className="text-4xl font-extrabold tracking-tight md:text-6xl">Proof beyond the cards.</h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-white/62 md:text-lg">
            These are the projects I would talk through in an interview: the problem, the system shape,
            the tradeoffs, and where I would take each product next.
          </p>
        </div>

        <div className="grid gap-6">
          {caseStudies.map((study, index) => {
            const accent = accentClasses[study.accent];

            return (
              <motion.article
                key={study.id}
                id={`case-${study.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: true, amount: 0.2 }}
                className={`rounded-3xl border ${accent.border} bg-black/55 p-5 backdrop-blur-md md:p-8 ${accent.shadow}`}
              >
                <div className="grid gap-8 lg:grid-cols-[0.9fr_1.35fr]">
                  <div className="flex flex-col justify-between gap-8">
                    <div>
                      <div className={`mb-5 inline-flex items-center gap-2 rounded-full border ${accent.border} ${accent.bg} px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] ${accent.text}`}>
                        <FiGitBranch />
                        Case {index + 1}
                      </div>
                      <h3 className="text-3xl font-extrabold tracking-tight md:text-5xl">{study.title}</h3>
                      <p className={`mt-3 font-mono text-xs uppercase tracking-[0.2em] ${accent.text}`}>
                        {study.role}
                      </p>
                      <p className="mt-5 text-base leading-relaxed text-white/68">{study.summary}</p>
                    </div>

                    <div className="space-y-5">
                      <div className="flex flex-wrap gap-2">
                        {study.stack.map((item) => (
                          <span key={item} className="rounded-full border border-white/10 bg-white/7 px-3 py-1.5 font-mono text-[11px] text-white/78">
                            {item}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-3">
                        {study.liveLink && (
                          <a
                            href={study.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-black transition-colors hover:bg-[var(--accent-emerald)] hover:text-white"
                          >
                            View live <FiArrowUpRight />
                          </a>
                        )}
                        {study.githubLink && (
                          <a
                            href={study.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white transition-colors hover:border-white/35 hover:bg-white/10"
                          >
                            Source <FiArrowUpRight />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="md:col-span-2 rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                      <div className={`mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.24em] ${accent.text}`}>
                        <FiCpu />
                        Problem
                      </div>
                      <p className="text-sm leading-relaxed text-white/70 md:text-base">{study.problem}</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                      <div className={`mb-4 inline-flex items-center gap-2 ${accent.text}`}>
                        <FiDatabase />
                        <span className="font-mono text-xs uppercase tracking-[0.24em]">Architecture</span>
                      </div>
                      <SectionList title="System shape" items={study.architecture} />
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                      <div className={`mb-4 inline-flex items-center gap-2 ${accent.text}`}>
                        <FiShield />
                        <span className="font-mono text-xs uppercase tracking-[0.24em]">Judgment</span>
                      </div>
                      <SectionList title="Tradeoffs" items={study.tradeoffs} />
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                      <div className={`mb-4 inline-flex items-center gap-2 ${accent.text}`}>
                        <FiTrendingUp />
                        <span className="font-mono text-xs uppercase tracking-[0.24em]">Signal</span>
                      </div>
                      <SectionList title="Impact" items={study.impact} />
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                      <SectionList title="Next production pass" items={study.improve} />
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
