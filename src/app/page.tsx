import { JOURNEY, PROFILE, PROJECTS, SKILLS } from "@/data/portfolio";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

function SectionHeading({ kicker, title, intro }: { kicker: string; title: string; intro?: string }) {
  return (
    <div className="max-w-2xl">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-cyan-400">
        {kicker}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
      {intro ? <p className="mt-3 text-base leading-relaxed text-slate-400">{intro}</p> : null}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#070b12] text-slate-200">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070b12]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#top" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-emerald-400 font-mono text-sm font-bold text-[#06202a]">
              MA
            </span>
            <span className="leading-tight">
              <span className="block font-semibold text-white">Muhammad Ali Waqas</span>
              <span className="block text-xs text-slate-400">AI Engineer</span>
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-cyan-300">
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:border-cyan-400/60 hover:text-cyan-300"
          >
            GitHub
          </a>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.16),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(52,211,153,0.12),transparent_50%)]" />
          <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pt-24">
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Open to junior AI Engineer / ML roles
            </p>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl">
              Muhammad Ali Waqas
              <span className="mt-3 block bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                AI Engineer
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">{PROFILE.tagline}</p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-500">
              TruthLens reached <strong className="font-semibold text-slate-200">98.7% accuracy</strong> on
              7,765 unseen articles. I build with Python and ML — and ship full-stack apps with React and Node.js.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-[#06202a] transition hover:bg-cyan-300"
              >
                View my projects
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-400/60 hover:text-cyan-300"
              >
                GitHub — @{PROFILE.githubUsername}
              </a>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-4 max-w-xl">
              {[
                { value: "98.7%", label: "TruthLens accuracy" },
                { value: "7,765", label: "Unseen articles tested" },
                { value: "3", label: "Shipped projects" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-2xl font-bold text-white sm:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-xs leading-snug text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:px-8">
          <SectionHeading
            kicker="About"
            title="An engineer who learns by shipping"
            intro="I am an AI Engineer focused on machine learning and practical products. I learn by building end to end: data, model, app, deployment — and measuring the result honestly."
          />
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-[#0d1524] p-6">
              <h3 className="font-semibold text-white">What I do</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-400">
                <li>• Train and evaluate ML models with Scikit-learn, Pandas, and NLTK.</li>
                <li>• Turn models into usable apps with Streamlit, React, and Next.js.</li>
                <li>• Build full-stack apps with Node.js, Express, and SQLite, including auth and file uploads.</li>
                <li>• Ship with Git, GitHub, and Docker — and publish a live demo, not just code.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#0d1524] p-6">
              <h3 className="font-semibold text-white">How I learned</h3>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                I built these projects while learning under my instructor,{" "}
                <strong className="font-semibold text-slate-200">{PROFILE.instructor}</strong>. Each project
                taught a different skill: NLP and model evaluation, full-stack development, and voice AI with
                large language models.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate-400">
                I am now looking for a junior AI / ML role where I can keep learning, contribute to real
                products, and grow into a strong engineer.
              </p>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="border-y border-white/5 bg-white/[0.02]">
          <div className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:px-8">
            <SectionHeading kicker="Skills" title="Tools I use every day" />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {SKILLS.map((group) => (
                <div key={group.group} className="rounded-2xl border border-white/10 bg-[#0d1524] p-6">
                  <h3 className="text-sm font-semibold text-cyan-300">{group.group}</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:px-8">
          <SectionHeading
            kicker="Projects"
            title="Work you can open and try"
            intro="Every project below is real, with code and — where available — a live demo. Click through and test it."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {PROJECTS.map((project, index) => (
              <article
                key={project.name}
                className="flex flex-col rounded-2xl border border-white/10 bg-[#0d1524] p-6 transition hover:border-cyan-400/40"
              >
                <p className="font-mono text-xs uppercase tracking-wider text-cyan-400">
                  {String(index + 1).padStart(2, "0")} — {project.category}
                </p>
                <h3 className="mt-3 text-2xl font-bold text-white">{project.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{project.description}</p>
                <ul className="mt-5 space-y-2">
                  {project.results.map((result) => (
                    <li key={result} className="flex gap-2 text-sm text-slate-300">
                      <span className="text-emerald-400">✓</span>
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="rounded-md bg-white/[0.06] px-2 py-1 font-mono text-[11px] text-slate-300">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3 border-t border-white/10 pt-5">
                  {project.live ? (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-cyan-400 px-4 py-2 text-xs font-semibold text-[#06202a] transition hover:bg-cyan-300"
                    >
                      Live demo →
                    </a>
                  ) : null}
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white transition hover:border-cyan-400/60 hover:text-cyan-300"
                    >
                      GitHub →
                    </a>
                  ) : null}
                  {project.extra?.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white transition hover:border-cyan-400/60 hover:text-cyan-300"
                    >
                      {link.label} →
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-500">
            TruthLens live demo:{" "}
            <a className="text-cyan-300 underline" href="https://truthlens.streamlit.app" target="_blank" rel="noopener noreferrer">
              truthlens.streamlit.app
            </a>{" "}
            · Gemini Travel Advisor:{" "}
            <a className="text-cyan-300 underline" href="https://gemini-travel-advisor-1.streamlit.app" target="_blank" rel="noopener noreferrer">
              gemini-travel-advisor-1.streamlit.app
            </a>
          </p>
        </section>

        {/* Journey */}
        <section id="journey" className="border-y border-white/5 bg-white/[0.02]">
          <div className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:px-8">
            <SectionHeading
              kicker="Learning journey"
              title="How I got here"
              intro="No invented job titles. This is the honest path: learning, building, shipping, and now looking for a role."
            />
            <ol className="mt-10 space-y-6 border-l border-white/10 pl-6">
              {JOURNEY.map((step) => (
                <li key={step.title} className="relative">
                  <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-cyan-400 bg-[#070b12]" />
                  <h3 className="font-semibold text-white">{step.title}</h3>
                  <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-400">{step.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16 sm:px-8">
          <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-[#0d1524] to-[#0a1f1c] p-8 sm:p-12">
            <SectionHeading
              kicker="Contact"
              title="Let’s talk about an AI / ML role"
              intro="I would love to hear about junior AI Engineer or ML roles, internships, or freelance projects. The fastest way to reach me is GitHub — LinkedIn and email links below are being updated."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-[#06202a] transition hover:bg-cyan-300"
              >
                GitHub — @{PROFILE.githubUsername}
              </a>
              {PROFILE.linkedinIsPlaceholder ? (
                <span className="rounded-full border border-dashed border-white/20 px-6 py-3 text-sm text-slate-400">
                  LinkedIn — link coming soon
                </span>
              ) : (
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-400/60"
                >
                  LinkedIn
                </a>
              )}
              {PROFILE.emailIsPlaceholder ? (
                <span className="rounded-full border border-dashed border-white/20 px-6 py-3 text-sm text-slate-400">
                  Email — coming soon
                </span>
              ) : (
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-400/60"
                >
                  {PROFILE.email}
                </a>
              )}
            </div>
            <p className="mt-6 text-xs text-slate-500">
              To update LinkedIn / email, edit <code className="font-mono text-slate-400">src/data/portfolio.ts</code> — search for TODO.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© 2026 Muhammad Ali Waqas — AI Engineer</p>
          <p>
            Built with Next.js, React &amp; Tailwind CSS ·{" "}
            <a className="text-cyan-300" href={PROFILE.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
