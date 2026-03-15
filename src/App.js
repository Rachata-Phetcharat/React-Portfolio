import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReact,
  faVuejs,
  faPython,
  faJava,
  faSquareJs,
  faGithub,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import {
  faArrowUpRightFromSquare,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import portfolio_img from "./assets/portfolio_img2.png";
import Resume from "./assets/Resume.jpg";
import Transcript from "./assets/Transcript.jpg";

// ─── Shared Hook: Scroll Reveal ───────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ─── Section Header (shared pattern) ─────────────────────────────────────────
function SectionHeader({ eyebrow, title, accent, subtitle }) {
  const [ref, visible] = useReveal(0.2);
  return (
    <div
      ref={ref}
      className={`section-header ${visible ? "section-header--visible" : ""}`}
    >
      <span className="section-eyebrow">{eyebrow}</span>
      <h2 className="section-title">
        {title} <span className="section-title-accent">{accent}</span>
      </h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      <div className="section-divider" />
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const ids = ["connect", "projects", "overview", "home"];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const links = [
    { id: "home", label: "Home" },
    { id: "overview", label: "Overview" },
    { id: "projects", label: "Projects" },
    { id: "connect", label: "Connect" },
  ];

  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="nav__container">
        <span className="nav__logo" onClick={() => scrollTo("home")}>
          Rachata<span className="nav__logo-dot">.</span>
        </span>
        <ul className={`nav__links ${menuOpen ? "nav__links--open" : ""}`}>
          {links.map(({ id, label }) => (
            <li key={id}>
              <button
                className={`nav__link ${activeSection === id ? "nav__link--active" : ""}`}
                onClick={() => scrollTo(id)}
              >
                {label}
                <span className="nav__link-bar" />
              </button>
            </li>
          ))}
        </ul>
        <button
          className="nav__burger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span
            className={`burger-line ${menuOpen ? "burger-line--open" : ""}`}
          />
          <span
            className={`burger-line ${menuOpen ? "burger-line--open" : ""}`}
          />
          <span
            className={`burger-line ${menuOpen ? "burger-line--open" : ""}`}
          />
        </button>
      </div>
    </nav>
  );
}

// ─── Home Section ─────────────────────────────────────────────────────────────
function HomeSection() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="home" className="home">
      {/* Ambient glows */}
      <div className="home__glow home__glow--1" />
      <div className="home__glow home__glow--2" />

      {/* Floating tech icons */}
      <div className="tech-icons" aria-hidden="true">
        {[
          { icon: faReact, cls: "icon-1" },
          { icon: faVuejs, cls: "icon-2" },
          { icon: faPython, cls: "icon-3" },
          { icon: faJava, cls: "icon-4" },
          { icon: faSquareJs, cls: "icon-5" },
          { icon: faGithub, cls: "icon-6" },
        ].map(({ icon, cls }) => (
          <FontAwesomeIcon key={cls} icon={icon} className={`icon ${cls}`} />
        ))}
      </div>

      {/* Content */}
      <div className={`home__content ${loaded ? "home__content--loaded" : ""}`}>
        <span className="home__eyebrow">
          <span className="home__eyebrow-line" />
          Frontend Developer
        </span>

        <p className="home__greeting">
          Hi, I'm <span>Rachata Phetcharat</span>
        </p>

        <h1 className="home__headline">
          FRONT‑END
          <br />
          <span className="home__headline-outline">DEVELOPER</span>
        </h1>

        <div className="home__rule" />

        <p className="home__bio">
          I'm a final-year Electronics Computer Technology student at King
          Mongkut's University of Technology North Bangkok (KMUTNB).
        </p>

        <div className="home__social">
          <a
            href="https://github.com/Rachata-Phetcharat"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="social-btn"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a
            href="https://www.linkedin.com/in/rachata-phetcharat-b01ba029b/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="social-btn"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
      </div>

      <img
        src={portfolio_img}
        alt="Rachata Phetcharat"
        className={`home__portrait ${loaded ? "home__portrait--loaded" : ""}`}
      />

      <div className="scroll-hint">
        <div className="scroll-dot" />
        <span>Scroll</span>
      </div>
    </section>
  );
}

function DocCard({ label, src, alt, delay, onClick }) {
  const [ref, visible] = useReveal(0.1);
  return (
    <div
      ref={ref}
      className={`doc-card ${visible ? "doc-card--visible" : ""}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <span className="doc-card__label">{label}</span>
      <div className="doc-card__frame" onClick={onClick}>
        <img src={src} alt={alt} className="doc-card__img" />
        <div className="doc-card__overlay">
          <span className="doc-card__zoom-icon">⤢</span>
          <span>Click to enlarge</span>
        </div>
      </div>
    </div>
  );
}

// ─── Overview Section ─────────────────────────────────────────────────────────
const SKILLS = [
  {
    category: "Programming Languages",
    color: "#f7df1e",
    items: [
      "JavaScript",
      "TypeScript",
      "Python",
      "Java",
      "C/C++",
      "C#",
      "HTML5",
      "CSS3",
    ],
  },
  {
    category: "Frameworks & Libraries",
    color: "#61dafb",
    items: ["React", "Nuxt.js", "TailwindCSS"],
  },
  {
    category: "Tools & Platforms",
    color: "#f05032",
    items: ["Git", "GitHub", "VS Code", "Unity"],
  },
];

const HIGHLIGHTS = [
  { emoji: "🎓", text: "Final year student at KMUTNB" },
  {
    emoji: "💡",
    text: "Focused on Software Development & Modern Web Technologies",
  },
  {
    emoji: "🚀",
    text: "Passionate about clean code and scalable architecture",
  },
];

function OvBlock({ className, delay = 0, children }) {
  const [ref, visible] = useReveal(0.1);
  return (
    <div
      ref={ref}
      className={`ov-block ${className || ""} ${visible ? "ov-block--visible" : ""}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

function OverviewSection() {
  const [modalSrc, setModalSrc] = useState(null);

  useEffect(() => {
    document.body.style.overflow = modalSrc ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalSrc]);

  const docs = [
    { label: "Resume", src: Resume, alt: "Resume Preview" },
    { label: "Transcript", src: Transcript, alt: "Transcript Preview" },
  ];

  return (
    <section id="overview" className="section overview-section">
      <div className="section__inner">
        <SectionHeader
          eyebrow="About Me"
          title="My"
          accent="Overview"
          subtitle="Who I am, what I know, and what I have built."
        />

        {/* Row 1: About (left) + Docs (right) */}
        <div className="ov-row">
          <OvBlock className="ov-about" delay={0}>
            <div className="ov-label">
              <span className="ov-label__pip" style={{ "--pip": "#b300ff" }} />
              About Me
            </div>
            <p className="ov-para">
              I am a{" "}
              <strong>
                final-year Electronics Computer Technology student
              </strong>{" "}
              at King Mongkut's University of Technology North Bangkok (KMUTNB).
              My main focus and passion lie in{" "}
              <strong>Software Development</strong>, where I enjoy turning
              complex ideas into scalable and efficient solutions.
            </p>
            <p className="ov-para ov-para--dim">
              I love exploring modern frameworks, improving my coding practices,
              and solving challenging problems — always looking for
              opportunities to learn and build software that delivers a great
              user experience.
            </p>
            <ul className="ov-highlights">
              {HIGHLIGHTS.map(({ emoji, text }, i) => (
                <li key={i} className="ov-highlight">
                  <span className="ov-highlight__emoji">{emoji}</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </OvBlock>

          <OvBlock className="ov-docs" delay={0.13}>
            <div className="ov-label">
              <span className="ov-label__pip" style={{ "--pip": "#a78bfa" }} />
              Documents
            </div>
            <div className="ov-docs__grid">
              {docs.map(({ label, src, alt }, i) => (
                <DocCard
                  key={label}
                  label={label}
                  src={src}
                  alt={alt}
                  delay={i * 0.08}
                  onClick={() => setModalSrc(src)}
                />
              ))}
            </div>
            {/* Stat cards below docs */}
            <div className="ov-stat-row">
              <div className="ov-stat-card">
                <p className="ov-stat-card__value">B.Ind.Tech.</p>
                <p className="ov-stat-card__label">Electronic Technology</p>
                <p className="ov-stat-card__sub">Computer</p>
              </div>
              <div className="ov-stat-card ov-stat-card--gpa">
                <p className="ov-stat-card__value ov-stat-card__value--gpa">
                  3.21
                </p>
                <p className="ov-stat-card__label">GPA</p>
                <p className="ov-stat-card__sub">Cumulative</p>
              </div>
            </div>
          </OvBlock>
        </div>

        {/* Divider */}
        <div className="ov-sep" />

        {/* Row 2: Skills full width */}
        <OvBlock className="ov-skills" delay={0.06}>
          <div className="ov-label">
            <span className="ov-label__pip" style={{ "--pip": "#61dafb" }} />
            Technical Skills
          </div>
          <div className="ov-skills__grid">
            {SKILLS.map(({ category, color, items }) => (
              <div key={category} className="ov-skill-col">
                <p className="ov-skill-cat" style={{ color }}>
                  {category}
                </p>
                <div className="ov-skill-tags">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="ov-skill-tag"
                      style={{ "--tc": color }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </OvBlock>
      </div>

      {modalSrc && (
        <div className="modal-overlay" onClick={() => setModalSrc(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setModalSrc(null)}
              aria-label="Close"
            >
              ✕
            </button>
            <img src={modalSrc} alt="Full view" className="modal-img" />
          </div>
        </div>
      )}
    </section>
  );
}

// ─── Projects Section ─────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    title: "Multi-User RAG Chatbot Platform",
    subtitle: "Room & Document Management (Frontend)",
    description:
      "The frontend interface for a RAG-based chatbot platform — featuring room creation, document management, and real-time AI chat. Built with Nuxt.js and TailwindCSS for a responsive and modern user experience.",
    tags: ["Nuxt.js", "NuxtUI", "TailwindCSS"],
    github: "https://github.com/Rachata-Phetcharat",
    theme: "purple",
  },
  {
    id: 2,
    title: "Game Top-Up",
    subtitle: "Mobile Top-Up Application",
    description:
      "A mobile application for topping up in-game currency, allowing users to browse games, select top-up packages, and complete payments — built with Flutter and Firebase as the real-time backend.",
    tags: ["Flutter", "Firebase", "Dart", "Material Design"],
    github: "https://github.com/Rachata-Phetcharat/mini_project_mobile.git",
    theme: "cyan",
  },
  {
    id: 3,
    title: "to-do-list",
    subtitle: "A To-Do List Application",
    description:
      "A to-do list application that allows users to create, manage, and organize their tasks effectively, utilizing Firebase for real-time data synchronization.",
    tags: ["React", "tailwindcss", "express.js"],
    github: "https://github.com/Rachata-Phetcharat/To_DoList.git",
    theme: "orange",
  },
];

function ProjectCard({ project, index }) {
  const [ref, visible] = useReveal(0.12);
  const [hovered, setHovered] = useState(false);

  return (
    <article
      ref={ref}
      className={`proj-card proj-card--${project.theme} ${visible ? "proj-card--visible" : ""}`}
      style={{ transitionDelay: `${index * 0.14}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Body */}
      <div className="proj-card__body">
        <div>
          <h3 className="proj-card__title">{project.title}</h3>
          <p className="proj-card__subtitle">{project.subtitle}</p>
          <p className="proj-card__desc">{project.description}</p>
          <div className="proj-card__tags">
            {project.tags.map((t) => (
              <span key={t} className="proj-tag">
                {t}
              </span>
            ))}
          </div>
        </div>
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="proj-card__btn"
        >
          <FontAwesomeIcon icon={faGithub} />
          <span>View on GitHub</span>
        </a>
      </div>
    </article>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="section projects-section">
      <div className="projects-blob projects-blob--1" />
      <div className="projects-blob projects-blob--2" />
      <div className="section__inner">
        <SectionHeader
          eyebrow="My Work"
          title="Featured"
          accent="Projects"
          subtitle="A selection of recent work — each built with intention, crafted with modern technologies."
        />
        <div className="proj-grid">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Connect Section ──────────────────────────────────────────────────────────
const SOCIAL_CARDS = [
  {
    id: "github",
    platform: "GitHub",
    handle: "@Rachata-Phetcharat",
    desc: "Check out my repositories, projects and open-source contributions.",
    url: "https://github.com/Rachata-Phetcharat",
    icon: faGithub,
    color: "#e8eaf0",
    accent: "rgba(232,234,240,0.08)",
    glow: "rgba(232,234,240,0.12)",
  },
  {
    id: "linkedin",
    platform: "LinkedIn",
    handle: "Rachata Phetcharat",
    desc: "Connect with me professionally and view my work experience.",
    url: "https://www.linkedin.com/in/rachata-phetcharat-b01ba029b/",
    icon: faLinkedin,
    color: "#0a66c2",
    accent: "rgba(10,102,194,0.12)",
    glow: "rgba(10,102,194,0.28)",
  },
  {
    id: "email",
    platform: "Email",
    handle: "rachata.phetcharat@example.com",
    desc: "Feel free to reach out directly — I'll get back to you as soon as possible.",
    url: "mailto:rachata.phetcharat@example.com",
    icon: faEnvelope,
    color: "#b300ff",
    accent: "rgba(179,0,255,0.12)",
    glow: "rgba(179,0,255,0.28)",
  },
];

function SocialCard({ card, index }) {
  const [ref, visible] = useReveal(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <a
      ref={ref}
      href={card.url}
      target="_blank"
      rel="noreferrer"
      className={`connect-card ${visible ? "connect-card--visible" : ""}`}
      style={{
        transitionDelay: `${index * 0.13}s`,
        "--card-glow": card.glow,
        "--card-accent": card.accent,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background glow blob */}
      <div className="connect-card__blob" style={{ background: card.glow }} />

      {/* Top row */}
      <div className="connect-card__top">
        <div
          className="connect-card__icon-wrap"
          style={{ background: card.accent, borderColor: card.glow }}
        >
          <FontAwesomeIcon
            icon={card.icon}
            className="connect-card__icon"
            style={{ color: card.color }}
          />
        </div>
        <FontAwesomeIcon
          icon={faArrowUpRightFromSquare}
          className={`connect-card__arrow ${hovered ? "connect-card__arrow--on" : ""}`}
        />
      </div>

      {/* Info */}
      <div className="connect-card__info">
        <p className="connect-card__platform">{card.platform}</p>
        <p className="connect-card__handle">{card.handle}</p>
        <p className="connect-card__desc">{card.desc}</p>
      </div>

      {/* Bottom CTA */}
      <div className="connect-card__cta" style={{ color: card.color }}>
        <span>Visit Profile</span>
        <span
          className="connect-card__cta-line"
          style={{ background: card.color }}
        />
      </div>
    </a>
  );
}

function ConnectSection() {
  return (
    <section id="connect" className="section connect-section">
      <div className="connect-blob connect-blob--1" />
      <div className="connect-blob connect-blob--2" />
      <div className="section__inner">
        <SectionHeader
          eyebrow="Get In Touch"
          title="Let's"
          accent="Connect"
          subtitle="Feel free to reach out — whether it's about work, collaboration, or just a chat."
        />
        <div className="connect-grid">
          {SOCIAL_CARDS.map((card, i) => (
            <SocialCard key={card.id} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="app">
      <Navbar />
      <HomeSection />
      <OverviewSection />
      <ProjectsSection />
      <ConnectSection />
    </div>
  );
}
