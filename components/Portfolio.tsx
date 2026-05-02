"use client";

import * as React from "react";
import Image from "next/image";
import { PORTFOLIO_DATA } from "@/lib/data";
import { I18N, localized } from "@/lib/i18n";
import type { Lang } from "@/lib/types";
import { PALETTES, type CardStyle, type PaletteName } from "@/lib/palettes";
import { Icon, type IconName } from "./Icon";
import { Reveal, SectionHead } from "./Reveal";
import { TweaksPanel, TweaksToggle } from "./TweaksPanel";
import type { GitHubStats } from "@/lib/github";

const SECTION_IDS = ["hero", "about", "skills", "experience", "projects", "github", "education", "contact"] as const;

function useLocalStorage<T>(key: string, initial: T): [T, (v: T) => void] {
  const [v, setV] = React.useState<T>(initial);
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw != null) setV(JSON.parse(raw) as T);
    } catch {}
  }, [key]);
  const set = React.useCallback(
    (next: T) => {
      setV(next);
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {}
    },
    [key]
  );
  return [v, set];
}

export function Portfolio({ githubStats }: { githubStats: GitHubStats }) {
  const [lang, setLang] = useLocalStorage<Lang>("portfolio.lang", "fr");
  const [theme, setTheme] = useLocalStorage<"dark" | "light">("portfolio.theme", "dark");
  const [palette, setPalette] = useLocalStorage<PaletteName>("portfolio.palette", "Indigo / Violet");
  const [cardStyle, setCardStyle] = useLocalStorage<CardStyle>("portfolio.cardStyle", "Glass");
  const [tweaksOpen, setTweaksOpen] = React.useState(false);

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  React.useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  React.useEffect(() => {
    const p = PALETTES[palette];
    const root = document.documentElement;
    root.style.setProperty("--primary", p.primary);
    root.style.setProperty("--primary-2", p.primary2);
    root.style.setProperty("--accent", p.accent);
    root.style.setProperty("--glow", p.glow);
    root.style.setProperty("--grad", p.grad);
  }, [palette]);

  const t = I18N[lang];
  const D = PORTFOLIO_DATA;
  const L = React.useCallback(<T,>(v: T | { fr: T; en: T }) => localized(v, lang), [lang]);

  const [activeSec, setActiveSec] = React.useState<string>("hero");
  React.useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSec(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const [scrollPct, setScrollPct] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)) * 100;
      setScrollPct(pct);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="scrollbar" aria-hidden>
        <div className="scrollbar-fill" style={{ width: `${scrollPct}%` }} />
      </div>

      <Nav t={t} activeSec={activeSec} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />

      <main className="page-root">
        <Hero D={D} t={t} L={L} lang={lang} />
        <About D={D} t={t} L={L} />
        <Skills D={D} t={t} L={L} lang={lang} />
        <Experience D={D} t={t} L={L} />
        <Projects D={D} t={t} L={L} cardStyle={cardStyle} />
        <GitHubBlock D={D} t={t} githubStats={githubStats} />
        <Education D={D} t={t} L={L} />
        <Contact D={D} t={t} L={L} />
        <Footer D={D} t={t} />
      </main>

      <TweaksToggle onClick={() => setTweaksOpen((o) => !o)} />
      <TweaksPanel
        open={tweaksOpen}
        onClose={() => setTweaksOpen(false)}
        title={t.tweaks.title}
        paletteLabel={t.tweaks.palette}
        cardsLabel={t.tweaks.cards}
        paletteOptions={t.tweaks.paletteOptions as readonly PaletteName[]}
        cardOptions={t.tweaks.cardOptions as readonly CardStyle[]}
        palette={palette}
        cardStyle={cardStyle}
        onPalette={setPalette}
        onCard={setCardStyle}
      />
    </>
  );
}

type T = (typeof I18N)[Lang];
type D = typeof PORTFOLIO_DATA;
type Loc = <V>(v: V | { fr: V; en: V }) => V;

function Nav({
  t,
  activeSec,
  lang,
  setLang,
  theme,
  setTheme,
}: {
  t: T;
  activeSec: string;
  lang: Lang;
  setLang: (l: Lang) => void;
  theme: "dark" | "light";
  setTheme: (v: "dark" | "light") => void;
}) {
  const items: [string, string][] = [
    ["about", t.nav.about],
    ["skills", t.nav.skills],
    ["experience", t.nav.experience],
    ["projects", t.nav.projects],
    ["education", t.nav.education],
    ["contact", t.nav.contact],
  ];
  return (
    <nav className="nav">
      <a href="#hero" className="nav-brand">
        <span className="nav-brand-dot" />
        <span className="nav-brand-text">
          FA<span className="nav-brand-suffix">.dev</span>
        </span>
      </a>
      <div className="nav-links">
        {items.map(([id, label]) => (
          <a key={id} href={`#${id}`} className={`nav-link ${activeSec === id ? "is-active" : ""}`}>
            <span>{label}</span>
          </a>
        ))}
      </div>
      <div className="nav-actions">
        <div className="lang-toggle" role="group" aria-label="Language">
          <span className={`lang-toggle-thumb${lang === "en" ? " to-en" : ""}`} aria-hidden />
          <button
            className={`lang-toggle-btn ${lang === "fr" ? "is-on" : ""}`}
            onClick={() => setLang("fr")}
            aria-pressed={lang === "fr"}
          >
            FR
          </button>
          <button
            className={`lang-toggle-btn ${lang === "en" ? "is-on" : ""}`}
            onClick={() => setLang("en")}
            aria-pressed={lang === "en"}
          >
            EN
          </button>
        </div>
        <button
          className="nav-iconbtn"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
          title="Theme"
        >
          <Icon name={theme === "dark" ? "sun" : "moon"} size={16} />
        </button>
      </div>
    </nav>
  );
}

function Hero({ D, t, L, lang }: { D: D; t: T; L: Loc; lang: Lang }) {
  return (
    <section id="hero" className="hero">
      <div className="hero-bg" aria-hidden>
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="hero-blob hero-blob-3" />
        <div className="hero-grid" />
      </div>
      <div className="hero-inner hero-with-portrait">
        <div className="hero-text">
          <Reveal className="hero-status">
            <span className="status-dot" />
            <span>{t.hero.available}</span>
            <span className="status-sep">·</span>
            <Icon name="map" size={13} />
            <span>{D.identity.location}</span>
          </Reveal>

          <h1 className="hero-name">
            <Reveal as="span" className="hero-line" delay={60}>
              <span className="hero-greeting">{lang === "fr" ? "Bonjour, je suis" : "Hi, I'm"}</span>
            </Reveal>
            <Reveal as="span" className="hero-line hero-fullname" delay={140}>
              <span className="hero-first">{D.identity.firstName}</span>{" "}
              <span className="hero-last gradient-text">{D.identity.lastName}</span>
            </Reveal>
          </h1>

          <Reveal as="div" className="hero-role" delay={220}>
            <span className="hero-role-dot" />
            <span>{L(D.identity.role)}</span>
            <span className="hero-role-sep">·</span>
            <span className="hero-role-stack">{D.identity.stack}</span>
          </Reveal>

          <Reveal as="p" className="hero-tagline" delay={300}>
            {L(D.identity.tagline)}
          </Reveal>

          <Reveal as="div" className="hero-ctas" delay={380}>
            <a href="#projects" className="btn btn-primary">
              <span>{t.cta.viewProjects}</span>
              <Icon name="arrow-right" size={16} />
            </a>
            <a href="#contact" className="btn btn-ghost">
              <Icon name="mail" size={16} />
              <span>{t.cta.contact}</span>
            </a>
            <a href={D.contact.cvUrl} target="_blank" rel="noopener noreferrer" className="btn btn-link">
              <Icon name="download" size={15} />
              <span>{t.cta.cv}</span>
            </a>
          </Reveal>

          <Reveal as="div" className="hero-meta" delay={460}>
            <a href={D.contact.githubUrl} target="_blank" rel="noopener noreferrer" className="hero-meta-link">
              <Icon name="github" size={15} /> <span>github.com/{D.contact.github}</span>
            </a>
            <span className="hero-meta-sep">·</span>
            <a href={D.contact.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hero-meta-link">
              <Icon name="linkedin" size={15} /> <span>LinkedIn</span>
            </a>
            <span className="hero-meta-sep">·</span>
            <a href={`mailto:${D.contact.email}`} className="hero-meta-link">
              <Icon name="mail" size={15} /> <span>{D.contact.email}</span>
            </a>
          </Reveal>
        </div>

        <Reveal as="div" className="hero-portrait" delay={200}>
          <div className="hero-portrait-frame">
            <Image
              src="/portrait.png"
              alt={`${D.identity.firstName} ${D.identity.lastName}`}
              width={600}
              height={600}
              priority
            />
            <div className="hero-portrait-glow" aria-hidden />
          </div>
          <div className="hero-portrait-badge">
            <Icon name="spark" size={14} />
            <span>{lang === "fr" ? "Développeur Mobile" : "Mobile Developer"}</span>
          </div>
          <div className="hero-portrait-card hero-portrait-card-1">
            <div className="hpc-row">
              <span className="hpc-emoji">⚡</span> Flutter
            </div>
            <div className="hpc-meta">{lang === "fr" ? "Spécialité" : "Specialty"}</div>
          </div>
          <div className="hero-portrait-card hero-portrait-card-2">
            <div className="hpc-row">
              <span className="hpc-pulse" />
              <span>{lang === "fr" ? "Disponible" : "Available"}</span>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="hero-scroll" aria-hidden>
        <span>{t.hero.scroll}</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}

function About({ D, t, L }: { D: D; t: T; L: Loc }) {
  return (
    <section id="about" className="section section-about">
      <div className="section-inner about-grid">
        <SectionHead tag={t.sections.about.tag} title={t.sections.about.title} lead={t.sections.about.lead} num="01" />
        <div className="about-body">
          <Reveal as="p" className="about-lead">
            {L(D.about)}
          </Reveal>
          <div className="about-stats">
            <Reveal className="stat" delay={80}>
              <div className="stat-num gradient-text">3+</div>
              <div className="stat-label">{L({ fr: "années d'expérience", en: "years of experience" })}</div>
            </Reveal>
            <Reveal className="stat" delay={140}>
              <div className="stat-num gradient-text">6</div>
              <div className="stat-label">{L({ fr: "projets livrés", en: "shipped projects" })}</div>
            </Reveal>
            <Reveal className="stat" delay={200}>
              <div className="stat-num gradient-text">3</div>
              <div className="stat-label">{L({ fr: "langues parlées", en: "spoken languages" })}</div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills({ D, t, L, lang }: { D: D; t: T; L: Loc; lang: Lang }) {
  return (
    <section id="skills" className="section">
      <div className="section-inner">
        <SectionHead tag={t.sections.skills.tag} title={t.sections.skills.title} lead={t.sections.skills.lead} num="02" />
        <div className="skills-grid">
          {D.skills.map((cat, i) => {
            const iconName: IconName = cat.icon === "phone" ? "phone-icon" : (cat.icon as IconName);
            return (
              <Reveal key={i} className="skill-card" delay={i * 80}>
                <div className="skill-icon">
                  <Icon name={iconName} size={20} />
                </div>
                <div className="skill-cat">{L(cat.category)}</div>
                <div className="skill-tags">
                  {cat.items.map((s) => (
                    <span key={s} className="tag">
                      {s}
                    </span>
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>
        <div className="soft-row">
          <Reveal className="soft-block">
            <div className="soft-label">{t.labels.softSkills}</div>
            <div className="soft-tags">
              {D.softSkills[lang].map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal className="soft-block" delay={120}>
            <div className="soft-label">{t.labels.languages}</div>
            <div className="lang-tags">
              {D.languages.map((l, i) => (
                <div key={i} className="lang-row">
                  <span className="lang-name">{L(l.name)}</span>
                  <span className="lang-dots">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <span key={j} className={`lang-dot ${j < l.dots ? "is-on" : ""}`} />
                    ))}
                  </span>
                  <span className="lang-level">{L(l.level)}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Experience({ D, t, L }: { D: D; t: T; L: Loc }) {
  return (
    <section id="experience" className="section section-alt">
      <div className="section-inner">
        <SectionHead
          tag={t.sections.experience.tag}
          title={t.sections.experience.title}
          lead={t.sections.experience.lead}
          num="03"
        />
        <div className="xp-timeline">
          {D.experience.map((x, i) => {
            const bullets = L(x.bullets);
            return (
              <Reveal key={i} className="xp-card" delay={i * 90}>
                <div className="xp-time">
                  <span className="xp-time-dot" />
                  <span className="xp-time-text">{L(x.period)}</span>
                  {x.current && <span className="xp-pill">{t.labels.current}</span>}
                </div>
                <div className="xp-body">
                  <h3 className="xp-title">{L(x.title)}</h3>
                  <div className="xp-org">{x.company}</div>
                  <p className="xp-desc">{L(x.description)}</p>
                  {bullets.length > 0 && (
                    <ul className="xp-bullets">
                      {bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  )}
                  <div className="xp-stack">
                    {x.stack.map((s) => (
                      <span key={s} className="tag tag-sm">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Projects({ D, t, L, cardStyle }: { D: D; t: T; L: Loc; cardStyle: CardStyle }) {
  return (
    <section id="projects" className="section">
      <div className="section-inner">
        <SectionHead
          tag={t.sections.projects.tag}
          title={t.sections.projects.title}
          lead={t.sections.projects.lead}
          num="04"
        />
        <div className={`proj-grid card-style-${cardStyle.toLowerCase()}`}>
          {D.projects.map((p, i) => {
            const highlights = L(p.highlights);
            const isActive = p.status?.fr === "En cours";
            return (
              <Reveal key={i} className={`proj-card accent-${p.accent}`} delay={(i % 3) * 80}>
                <div className="proj-card-bg" aria-hidden />
                <div className="proj-card-head">
                  <div className="proj-card-role">{L(p.role)}</div>
                  {p.status && (
                    <div className={`proj-card-status ${isActive ? "is-active" : ""}`}>{L(p.status)}</div>
                  )}
                </div>
                <h3 className="proj-card-title">{L(p.title)}</h3>
                <p className="proj-card-summary">{L(p.summary)}</p>
                {highlights.length > 0 && (
                  <ul className="proj-card-bullets">
                    {highlights.map((h, j) => (
                      <li key={j}>
                        <span className="dash" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="proj-card-stack">
                  {p.stack.map((s) => (
                    <span key={s} className="tag tag-sm">
                      {s}
                    </span>
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];
const LEVEL_OPACITIES = [0, 0.22, 0.42, 0.65, 1] as const;

function buildMonthCols(startDate: string): { col: number; label: string }[] {
  const start = new Date(startDate + "T00:00:00Z");
  const cols: { col: number; label: string }[] = [];
  // Walk each month boundary within the 53-week window
  for (let m = 0; m < 14; m++) {
    const d = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth() + m, 1));
    const diffDays = Math.round((d.getTime() - start.getTime()) / 86400000);
    if (diffDays < 0) continue;
    const col = Math.floor(diffDays / 7);
    if (col >= 53) break;
    cols.push({ col, label: MONTH_NAMES[d.getUTCMonth()] });
  }
  return cols;
}

function GitHubBlock({ D, t, githubStats }: { D: D; t: T; githubStats: GitHubStats }) {
  const { contribLevels, startDate, publicRepos, contributions, stars } = githubStats;
  const numWeeks = Math.ceil(contribLevels.length / 7);

  const monthCols = buildMonthCols(startDate);
  const monthRow = Array<string>(numWeeks).fill("");
  monthCols.forEach(({ col, label }) => { monthRow[col] = label; });

  return (
    <section id="github" className="section section-alt">
      <div className="section-inner">
        <SectionHead
          tag={t.sections.github.tag}
          title={t.sections.github.title}
          lead={t.sections.github.lead}
          num="05"
        />
        <div className="gh-grid">
          <Reveal className="gh-card gh-profile">
            <div className="gh-avatar">
              <Icon name="github" size={28} />
            </div>
            <div>
              <div className="gh-username">@{D.github.username}</div>
              <a className="gh-link" href={D.contact.githubUrl} target="_blank" rel="noopener noreferrer">
                github.com/{D.github.username} <Icon name="arrow-up-right" size={14} />
              </a>
            </div>
          </Reveal>
          <Reveal className="gh-card gh-stat" delay={60}>
            <div className="gh-stat-num gradient-text">{publicRepos}</div>
            <div className="gh-stat-label">{t.labels.publicRepos}</div>
          </Reveal>
          <Reveal className="gh-card gh-stat" delay={120}>
            <div className="gh-stat-num gradient-text">{contributions}+</div>
            <div className="gh-stat-label">{t.labels.contributions}</div>
          </Reveal>
          <Reveal className="gh-card gh-stat" delay={180}>
            <div className="gh-stat-num gradient-text">{stars}</div>
            <div className="gh-stat-label">{t.labels.starred}</div>
          </Reveal>

          {/* Contribution grid */}
          <Reveal className="gh-card gh-contrib" delay={240}>
            <div className="gh-contrib-label">Contribution activity</div>
            <div className="gh-contrib-wrap">
              <div className="gh-contrib-inner">
                {/* Month labels */}
                <div className="gh-contrib-months" style={{ gridTemplateColumns: `repeat(${numWeeks}, 13px)` }}>
                  {monthRow.map((lbl, i) => (
                    <div key={i} className="gh-contrib-month-lbl">{lbl}</div>
                  ))}
                </div>
                {/* Day labels + grid */}
                <div className="gh-contrib-body">
                  <div className="gh-contrib-days">
                    {DAY_LABELS.map((d, i) => (
                      <div key={i} className="gh-contrib-day-lbl">{d}</div>
                    ))}
                  </div>
                  <div
                    className="gh-contrib-grid"
                    role="grid"
                    aria-label="Contribution grid"
                    style={{ gridTemplateColumns: `repeat(${numWeeks}, 13px)` }}
                  >
                    {contribLevels.map((level, i) => (
                      <div
                        key={i}
                        className="gh-contrib-cell"
                        data-level={level}
                        role="gridcell"
                        aria-label={`${level} contribution${level !== 1 ? "s" : ""}`}
                      />
                    ))}
                  </div>
                </div>
                {/* Footer */}
                <div className="gh-contrib-footer">
                  <span>{contributions} contributions in the last year</span>
                  <div className="gh-contrib-legend">
                    <span style={{ marginRight: 4 }}>Less</span>
                    {([0, 1, 2, 3, 4] as const).map((lvl) => (
                      <div
                        key={lvl}
                        className="gh-contrib-legend-cell"
                        style={
                          lvl === 0
                            ? { background: "var(--surface-2)" }
                            : lvl === 4
                            ? { background: "var(--primary)" }
                            : { background: `rgba(var(--glow), ${LEVEL_OPACITIES[lvl]})` }
                        }
                      />
                    ))}
                    <span style={{ marginLeft: 4 }}>More</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Education({ D, t, L }: { D: D; t: T; L: Loc }) {
  return (
    <section id="education" className="section">
      <div className="section-inner">
        <SectionHead
          tag={t.sections.education.tag}
          title={t.sections.education.title}
          lead={t.sections.education.lead}
          num="06"
        />
        <div className="edu-list">
          {D.education.map((e, i) => (
            <Reveal key={i} className="edu-card" delay={i * 100}>
              <div className="edu-icon">
                <Icon name="cap" size={22} />
              </div>
              <div className="edu-body">
                <div className="edu-period">{e.period}</div>
                <h3 className="edu-degree">
                  {L(e.degree)}
                  {e.pending && <span className="edu-pending"> · {t.labels.pending}</span>}
                </h3>
                <div className="edu-school">{e.school}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact({ D, t, L }: { D: D; t: T; L: Loc }) {
  const [copied, setCopied] = React.useState(false);
  const onCopy = () => {
    navigator.clipboard.writeText(D.contact.email).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  return (
    <section id="contact" className="section section-contact">
      <div className="section-inner">
        <SectionHead
          tag={t.sections.contact.tag}
          title={t.sections.contact.title}
          lead={t.sections.contact.lead}
          num="07"
        />
        <div className="contact-card">
          <div className="contact-bg" aria-hidden />
          <div className="contact-text">
            <div className="contact-availability">
              <span className="status-dot" />
              <span>{L(D.identity.availability)}</span>
            </div>
            <h3 className="contact-headline">{L({ fr: "Une idée à concrétiser ?", en: "Got an idea to ship?" })}</h3>
            <p className="contact-sub">
              {L({
                fr: "Écrivez-moi : je réponds rapidement aux opportunités Flutter, Next.js et fullstack.",
                en: "Drop me a line — I reply quickly to Flutter, Next.js and fullstack opportunities.",
              })}
            </p>
            <div className="contact-ctas">
              <a href={`mailto:${D.contact.email}`} className="btn btn-primary">
                <Icon name="mail" size={16} />
                <span>{t.labels.sendEmail}</span>
              </a>
              <button className="btn btn-ghost" onClick={onCopy}>
                <Icon name={copied ? "check" : "copy"} size={16} />
                <span>{copied ? t.cta.copied : t.cta.copy}</span>
              </button>
            </div>
          </div>
          <div className="contact-channels">
            <a className="contact-channel" href={`mailto:${D.contact.email}`}>
              <div className="contact-channel-icon">
                <Icon name="mail" size={18} />
              </div>
              <div>
                <div className="contact-channel-label">Email</div>
                <div className="contact-channel-value">{D.contact.email}</div>
              </div>
              <Icon name="arrow-up-right" size={14} />
            </a>
            <a className="contact-channel" href={`tel:${D.contact.phone.replace(/\s/g, "")}`}>
              <div className="contact-channel-icon">
                <Icon name="phone" size={18} />
              </div>
              <div>
                <div className="contact-channel-label">{t.labels.callMe}</div>
                <div className="contact-channel-value">{D.contact.phone}</div>
              </div>
              <Icon name="arrow-up-right" size={14} />
            </a>
            <a className="contact-channel" href={D.contact.linkedinUrl} target="_blank" rel="noopener noreferrer">
              <div className="contact-channel-icon">
                <Icon name="linkedin" size={18} />
              </div>
              <div>
                <div className="contact-channel-label">{t.labels.onLinkedin}</div>
                <div className="contact-channel-value">in/fehizoro-andriantsarafara</div>
              </div>
              <Icon name="arrow-up-right" size={14} />
            </a>
            <a className="contact-channel" href={D.contact.githubUrl} target="_blank" rel="noopener noreferrer">
              <div className="contact-channel-icon">
                <Icon name="github" size={18} />
              </div>
              <div>
                <div className="contact-channel-label">{t.labels.onGithub}</div>
                <div className="contact-channel-value">@{D.contact.github}</div>
              </div>
              <Icon name="arrow-up-right" size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ D, t }: { D: D; t: T }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="nav-brand-dot" />
          <span>
            FA<span className="nav-brand-suffix">.dev</span>
          </span>
        </div>
        <div className="footer-text">
          {t.footer.year} · {t.footer.built}
        </div>
        <div className="footer-links">
          <a href={D.contact.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Icon name="github" size={16} />
          </a>
          <a href={D.contact.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Icon name="linkedin" size={16} />
          </a>
          <a href={`mailto:${D.contact.email}`} aria-label="Email">
            <Icon name="mail" size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
