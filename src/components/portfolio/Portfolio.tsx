import { useEffect, useMemo, useState } from "react";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Download,
  ArrowDown,
  ExternalLink,
  Search,
  Sparkles,
  Brain,
  Code2,
  Database,
  Wrench,
  Trophy,
  GraduationCap,
  Send,
  Cpu,
  Layers,
  Grid3x3,
  Route,
  CalendarCheck,
  Zap,
  Building2,
  Bot,
  Swords,
} from "lucide-react";
import { useReveal, useTyping, useCountUp } from "./hooks";

/* ------------------------------- DATA ------------------------------- */

const NAV = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#achievements", label: "Achievements" },
  { href: "#contact", label: "Contact" },
];

const SOCIALS = {
  github: "https://github.com/WajeehaSajid",
  linkedin: "https://www.linkedin.com/in/wajeehasajid/",
  email: "wajeehasajid622@gmail.com",
};

const SKILL_GROUPS = [
  {
    title: "Programming Languages",
    tab: "Languages",
    icon: Code2,
    accent: "from-[color:var(--neon-cyan)] to-[color:var(--neon-violet)]",
    items: [
      { name: "Python", level: 92 },
      { name: "C++", level: 88 },
      { name: "C", level: 82 },
      { name: "JavaScript", level: 85 },
      { name: "SQL", level: 86 },
      { name: "x86 Assembly", level: 75 },
    ],
  },
  {
    title: "AI & Data",
    tab: "AI & Data",
    icon: Brain,
    accent: "from-[color:var(--neon-violet)] to-[color:var(--neon-pink)]",
    items: [
      { name: "Machine Learning", level: 88 },
      { name: "Artificial Intelligence", level: 90 },
      { name: "Scikit-Learn", level: 85 },
      { name: "Pandas", level: 88 },
      { name: "Data Analysis", level: 86 },
      { name: "Propositional Logic", level: 84 },
    ],
  },
  {
    title: "Databases",
    tab: "Databases",
    icon: Database,
    accent: "from-[color:var(--neon-green)] to-[color:var(--neon-cyan)]",
    items: [
      { name: "PostgreSQL", level: 86 },
      { name: "Oracle 11g", level: 80 },
      { name: "PL/SQL", level: 78 },
    ],
  },
  {
    title: "Tools",
    tab: "Tools",
    icon: Wrench,
    accent: "from-[color:var(--neon-pink)] to-[color:var(--neon-violet)]",
    items: [
      { name: "Git", level: 90 },
      { name: "GitHub", level: 92 },
      { name: "VS Code", level: 95 },
      { name: "Linux", level: 80 },
      { name: "VMware", level: 75 },
      { name: "DOSBox / NASM", level: 78 },
    ],
  },
];

type Project = {
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  github: string;
  category: "Full-Stack" | "AI" | "Systems";
  accent: string;
  icon: typeof Layers;
};

const PROJECTS: Project[] = [
  {
    title: "HostelHub",
    tagline: "Full-Stack Hostel Management Platform",
    description:
      "Role-based hostel management platform featuring student and administrator dashboards, marketplace functionality, maintenance ticketing, lost-and-found services, and safety alerts. Includes secure authentication, PostgreSQL integration, and scalable backend architecture.",
    tech: ["Next.js", "FastAPI", "PostgreSQL", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/WajeehaSajid/Hostel-Hub",
    category: "Full-Stack",
    accent: "from-cyan-400/30 via-blue-500/20 to-violet-500/30",
    icon: Layers,
  },
  {
    title: "WumpusLogic",
    tagline: "Knowledge-Based AI Agent",
    description:
      "An intelligent AI agent that navigates the Wumpus World using logical inference, Resolution Refutation, and a dynamic knowledge base to identify safe paths in real time.",
    tech: ["JavaScript", "HTML", "CSS", "Propositional Logic"],
    github: "https://github.com/WajeehaSajid/wumpus-agent",
    category: "AI",
    accent: "from-violet-500/30 via-fuchsia-500/20 to-pink-500/30",
    icon: Brain,
  },
  {
    title: "Algorithmic Bias & Fairness Auditor",
    tagline: "AI Fairness Evaluation Platform",
    description:
      "An AI fairness auditing platform that evaluates demographic bias using fairness metrics such as Demographic Parity, Disparate Impact, and Equalized Odds. Generates professional audit reports using Gemini AI.",
    tech: ["Python", "Streamlit", "Scikit-Learn", "Pandas", "Plotly"],
    github: "https://github.com/WajeehaSajid/Algo-Bias-Auditor",
    category: "AI",
    accent: "from-emerald-400/30 via-cyan-400/20 to-blue-500/30",
    icon: Sparkles,
  },
  {
    title: "Atari Breakout",
    tagline: "x86 Assembly Arcade Game",
    description:
      "Classic Breakout game implemented entirely in Assembly Language featuring graphics rendering, interrupt-driven controls, power-ups, level progression, and increasing difficulty.",
    tech: ["x86 Assembly", "NASM", "DOSBox"],
    github: "https://github.com/WajeehaSajid/Atari-Breakout",
    category: "Systems",
    accent: "from-pink-500/30 via-orange-400/20 to-amber-400/30",
    icon: Cpu,
  },
  {
    title: "Sudoku CSP Solver",
    tagline: "AI-Powered Constraint Satisfaction Solver",
    description:
      "An AI-powered Sudoku solver combining a Python CLI engine with a playable web UI. Uses AC-3 arc consistency, backtracking search, and MRV/LCV heuristics to solve puzzles across four difficulty levels.",
    tech: ["Python", "AI Search", "Constraint Satisfaction", "HTML/CSS/JS"],
    github: "https://github.com/WajeehaSajid/Sudoku-CSP",
    category: "AI",
    accent: "from-amber-400/30 via-orange-400/20 to-rose-400/30",
    icon: Grid3x3,
  },
  {
    title: "Dynamic Pathfinding Agent",
    tagline: "Real-Time A* & Greedy Search Visualizer",
    description:
      "A real-time pathfinding visualizer built with Pygame, implementing A* and Greedy Best-First Search across a dynamic grid with live obstacle spawning and re-planning. Includes an interactive map editor and metrics dashboard.",
    tech: ["Python", "Pygame", "A* Search", "Heuristics"],
    github: "https://github.com/WajeehaSajid/Dynamic-Pathfinding-Agent",
    category: "AI",
    accent: "from-cyan-400/30 via-sky-500/20 to-blue-500/30",
    icon: Route,
  },
  {
    title: "Automated Exam Management System",
    tagline: "K-Means Powered Seating & Faculty Allocation",
    description:
      "An automated exam seating and faculty allocation system that clusters 1,800+ students using K-Means and the Elbow Method, then assigns seats across three shifts. Includes a full Tkinter dashboard with live charts.",
    tech: ["Python", "Scikit-Learn", "Tkinter", "Pandas"],
    github: "https://github.com/WajeehaSajid/Exam-Management-System",
    category: "AI",
    accent: "from-emerald-400/30 via-teal-400/20 to-cyan-500/30",
    icon: CalendarCheck,
  },
  {
    title: "Perceptron & Gradient Descent Learning",
    tagline: "ML Algorithms Built From Scratch",
    description:
      "Implements and compares the Perceptron Learning Rule and Gradient Descent Delta Rule from scratch on the UCI Iris dataset for binary classification, tracking accuracy and error curves across linear and sigmoid activations.",
    tech: ["Python", "NumPy", "Scikit-Learn", "Matplotlib"],
    github: "https://github.com/WajeehaSajid/Preceptron-Learning",
    category: "AI",
    accent: "from-violet-500/30 via-purple-500/20 to-fuchsia-500/30",
    icon: Zap,
  },
  {
    title: "University Management System",
    tagline: "Data Structures Console Application",
    description:
      "A console-based university management system built in C++ using linked lists, stacks, queues, and trees to handle student records, course enrollment, and faculty assignment with full search and sort support.",
    tech: ["C++", "Data Structures", "STL"],
    github: "https://github.com/WajeehaSajid/University-Management-System",
    category: "Systems",
    accent: "from-slate-400/30 via-blue-400/20 to-indigo-500/30",
    icon: Building2,
  },
  {
    title: "Intelligent Urban Delivery Robot",
    tagline: "Search Algorithm Delivery Simulator",
    description:
      "Simulates a delivery robot navigating a 15×15 city grid using six search algorithms — BFS, DFS, UCS, Greedy, and A* with two heuristics — tracking path cost, execution time, and nodes explored with comparison charts.",
    tech: ["Python", "NumPy", "Matplotlib", "Search Algorithms"],
    github: "https://github.com/WajeehaSajid/Urban-Delivery-Robot",
    category: "AI",
    accent: "from-lime-400/30 via-green-400/20 to-emerald-500/30",
    icon: Bot,
  },
  {
    title: "Stronghold Kingdoms",
    tagline: "OOP Kingdom Simulation Game",
    description:
      "A five-day kingdom simulation built in C++ with OOP principles, modeling armies, politics, economy, and banking through randomized events like battles, coups, and famines, ending in a full kingdom report.",
    tech: ["C++", "OOP", "Windows Console API"],
    github: "https://github.com/WajeehaSajid/StrongHold-Kingdoms",
    category: "Systems",
    accent: "from-amber-600/30 via-red-500/20 to-orange-600/30",
    icon: Swords,
  },
];

const STATS = [
  { label: "AI Projects Built", value: 6, suffix: "+" },
  { label: "GitHub Repositories", value: 12, suffix: "+" },
  { label: "Technologies Used", value: 20, suffix: "+" },
  { label: "Academic Projects", value: 15, suffix: "+" },
];

const ACHIEVEMENTS = [
  {
    icon: Trophy,
    title: "Hackathon 101 Battle Participant",
    desc: "Collaborated on time-boxed engineering challenges, prototyping intelligent solutions under pressure.",
  },
  {
    icon: Sparkles,
    title: "Multiple AI & Software Projects",
    desc: "Built end-to-end systems spanning ML fairness auditing, logical agents, and full-stack platforms.",
  },
  {
    icon: GraduationCap,
    title: "FAST-NUCES Computer Science",
    desc: "Strong academic foundation in AI, ML, Data Structures, OS, Databases, and Software Design.",
  },
];

/* ------------------------------- UI BITS ------------------------------- */

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-[0.2em] text-[color:var(--neon-cyan)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--neon-cyan)] glow-cyan" />
        {eyebrow}
      </div>
      <h2 className="text-balance text-4xl font-bold sm:text-5xl">
        <span className="text-gradient">{title}</span>
      </h2>
      {subtitle && (
        <p className="mt-4 text-pretty text-base text-muted-foreground sm:text-lg">{subtitle}</p>
      )}
    </div>
  );
}

/* ------------------------------- SECTIONS ------------------------------- */

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5">
        <a href="#home" className="group flex items-center gap-2 font-display text-lg font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-[color:var(--neon-cyan)] to-[color:var(--neon-violet)] text-[color:var(--background)] glow-cyan transition-transform group-hover:rotate-12">
            W
          </span>
          <span className="hidden sm:inline">
            Wajeeha Sajid<span className="text-[color:var(--neon-cyan)]">.</span>
          </span>
        </a>
        <nav
          className={`hidden items-center gap-1 rounded-full glass-strong px-2 py-1.5 md:flex ${
            scrolled ? "glow-cyan" : ""
          }`}
        >
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-full px-3.5 py-1.5 text-sm text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href={SOCIALS.linkedin}
          target="_blank"
          rel="noreferrer"
          className="hidden rounded-full bg-gradient-to-r from-[color:var(--neon-cyan)] to-[color:var(--neon-violet)] px-4 py-2 text-sm font-semibold text-[color:var(--background)] transition hover:scale-105 sm:inline-block"
        >
          Let's Connect
        </a>
        <button
          aria-label="Menu"
          onClick={() => setOpen((s) => !s)}
          className="grid h-10 w-10 place-items-center rounded-lg glass md:hidden"
        >
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-5 bg-foreground transition ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-foreground transition ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-foreground transition ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>
      {open && (
        <div className="mx-5 mt-3 rounded-2xl glass-strong p-3 md:hidden">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

function Hero() {
  const typed = useTyping(
    [
      "AI & Machine Learning Engineer",
      "Computer Science Student",
      "Full-Stack Builder",
      "Problem Solver",
    ],
    65,
    1600,
  );

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-28">
      {/* glow orbs */}
      <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-[color:var(--neon-violet)]/30 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-[color:var(--neon-cyan)]/30 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-10 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[color:var(--neon-pink)]/20 blur-[100px]" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[1.3fr_1fr] lg:items-center">
        <div>
          <Reveal>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--neon-green)] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--neon-green)]" />
              </span>
              <span className="text-muted-foreground">Available for opportunities</span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="text-balance font-display text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
              Hi, I'm <span className="text-gradient">Wajeeha Sajid</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-5 flex items-center gap-2 text-xl font-medium sm:text-2xl">
              <span className="text-muted-foreground">I'm an</span>
              <span className="text-[color:var(--neon-cyan)]">{typed}</span>
              <span className="inline-block h-6 w-[3px] animate-blink bg-[color:var(--neon-cyan)]" />
            </div>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              Transforming ideas into intelligent systems through Artificial Intelligence,
              Machine Learning, and Software Engineering.
            </p>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/resume.pdf"
                download
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[color:var(--neon-cyan)] to-[color:var(--neon-violet)] px-6 py-3 text-sm font-semibold text-[color:var(--background)] transition hover:scale-105 hover:shadow-[0_0_40px_oklch(0.85_0.18_200/0.5)]"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
              <a
                href={SOCIALS.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full glass-strong px-6 py-3 text-sm font-semibold transition hover:bg-white/5"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
              <a
                href={SOCIALS.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full glass-strong px-6 py-3 text-sm font-semibold transition hover:bg-white/5"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </Reveal>
        </div>

        {/* Visual */}
        <Reveal delay={200}>
          <div className="relative mx-auto aspect-square w-full max-w-md">
            <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-[color:var(--neon-cyan)]/30" />
            <div
              className="absolute inset-6 animate-spin-slow rounded-full border border-dashed border-[color:var(--neon-violet)]/30"
              style={{ animationDirection: "reverse", animationDuration: "24s" }}
            />
            <div className="absolute inset-12 rounded-full bg-gradient-to-br from-[color:var(--neon-cyan)]/20 via-[color:var(--neon-violet)]/20 to-[color:var(--neon-pink)]/20 blur-2xl" />
            <div className="absolute inset-16 grid place-items-center rounded-full glass-strong">
              <div className="text-center">
                <div className="font-display text-7xl font-bold text-gradient">WS</div>
                <div className="mt-2 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  AI · ML · SWE
                </div>
              </div>
            </div>
            {/* orbit dots */}
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="absolute inset-0 animate-spin-slow"
                style={{ animationDuration: `${14 + i * 4}s`, animationDirection: i % 2 ? "reverse" : "normal" }}
              >
                <div
                  className="absolute h-3 w-3 rounded-full bg-[color:var(--neon-cyan)] glow-cyan"
                  style={{ top: "0%", left: "50%", transform: "translateX(-50%)" }}
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground transition hover:text-foreground"
        aria-label="Scroll"
      >
        <div className="flex h-10 w-6 justify-center rounded-full border border-foreground/30 p-1">
          <span className="block h-2 w-1 animate-scroll-hint rounded-full bg-[color:var(--neon-cyan)]" />
        </div>
      </a>
    </section>
  );
}

function About() {
  const subjects = [
    "Artificial Intelligence",
    "Machine Learning",
    "Data Structures",
    "Operating Systems",
    "Databases",
    "Software Design",
  ];
  return (
    <section id="about" className="section-pad relative">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="About Me"
          title="Curious mind, engineering hands"
          subtitle="I build intelligent systems that combine analytical thinking with modern software craft."
        />
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <div className="glass-strong relative overflow-hidden rounded-3xl p-8 sm:p-10">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[color:var(--neon-violet)]/20 blur-3xl" />
              <div className="relative">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-[color:var(--neon-cyan)]">
                  <GraduationCap className="h-3.5 w-3.5" />
                  FAST-NUCES · Batch 2024
                </div>
                <h3 className="text-2xl font-bold sm:text-3xl">
                  Computer Science student passionate about intelligent systems.
                </h3>
                <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">
                  I am a Computer Science student at FAST-NUCES with a passion for Artificial
                  Intelligence, Machine Learning, and intelligent problem-solving. My work combines
                  software engineering principles with AI-driven thinking to create practical,
                  impactful solutions. From knowledge-based agents and fairness auditing systems to
                  scalable web platforms, I enjoy building technology that is both innovative and
                  meaningful.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="glass rounded-3xl p-8">
              <div className="mb-4 text-sm uppercase tracking-[0.2em] text-muted-foreground">
                Academic Foundation
              </div>
              <div className="flex flex-wrap gap-2">
                {subjects.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm transition hover:border-[color:var(--neon-cyan)]/50 hover:bg-[color:var(--neon-cyan)]/10 hover:text-[color:var(--neon-cyan)]"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  { Icon: Brain, label: "AI Thinking" },
                  { Icon: Code2, label: "Software Craft" },
                  { Icon: Sparkles, label: "Innovation" },
                  { Icon: Database, label: "Data Driven" },
                ].map(({ Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-xl glass p-3 transition hover:-translate-y-0.5"
                  >
                    <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-[color:var(--neon-cyan)]/30 to-[color:var(--neon-violet)]/30">
                      <Icon className="h-4 w-4 text-[color:var(--neon-cyan)]" />
                    </div>
                    <span className="text-sm font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SkillStatCard({ name, level, delay }: { name: string; level: number; delay: number }) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="rounded-2xl border border-white/10 glass p-5 transition hover:-translate-y-1 hover:border-[color:var(--neon-cyan)]/40"
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      <div className="flex items-center justify-between">
        <span className="font-bold">{name}</span>
        <span className="font-mono text-sm text-[color:var(--neon-cyan)]">{level}%</span>
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[color:var(--neon-cyan)] to-[color:var(--neon-violet)]"
          style={{
            width: shown ? `${level}%` : "0%",
            transition: `width 1s cubic-bezier(0.22,1,0.36,1) ${delay + 150}ms`,
          }}
        />
      </div>
    </div>
  );
}

function Skills() {
  const [active, setActive] = useState(0);
  const group = SKILL_GROUPS[active];
  return (
    <section id="skills" className="section-pad relative">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Skills"
          title="Tech I work with"
          subtitle="A growing toolkit spanning AI, software engineering, and systems-level craft."
        />
        <Reveal>
          <div className="mb-8 flex flex-wrap gap-3">
            {SKILL_GROUPS.map((g, i) => (
              <button
                key={g.title}
                onClick={() => setActive(i)}
                className={`rounded-full px-5 py-2.5 font-mono text-sm font-medium transition ${
                  active === i
                    ? "bg-gradient-to-r from-[color:var(--neon-cyan)] to-[color:var(--neon-violet)] text-[color:var(--background)]"
                    : "glass-strong text-muted-foreground hover:text-foreground"
                }`}
              >
                {g.tab}
              </button>
            ))}
          </div>
        </Reveal>

        <div key={group.title} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {group.items.map((s, i) => (
            <SkillStatCard key={s.name} name={s.name} level={s.level} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p }: { p: Project }) {
  const Icon = p.icon;
  return (
    <div
      data-cursor="hover"
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl glass-strong p-1 transition hover:-translate-y-1.5 hover:glow-cyan"
    >
      {/* hero panel */}
      <div className={`relative h-32 overflow-hidden rounded-[1.1rem] bg-gradient-to-br ${p.accent}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent_60%)]" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur">
          {p.category}
        </div>
        <div className="absolute bottom-4 left-4 flex items-center gap-2.5">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-black/40 backdrop-blur">
            <Icon className="h-4 w-4 text-white" />
          </div>
          <div>
            <div className="font-display text-base font-bold leading-tight text-white">{p.title}</div>
            <div className="text-[11px] text-white/80">{p.tagline}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">{p.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.tech.map((t) => (
            <span
              key={t}
              className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-[color:var(--neon-cyan)]"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between pt-4">
          <a
            href={p.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition hover:text-[color:var(--neon-cyan)]"
          >
            <Github className="h-4 w-4" />
            View Code
            <ExternalLink className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </a>
          <span className="font-mono text-[10px] text-muted-foreground">/{p.title.toLowerCase().replace(/\s+/g, "-")}</span>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<"All" | Project["category"]>("All");
  const categories: Array<"All" | Project["category"]> = ["All", "AI", "Full-Stack", "Systems"];
  const filtered = useMemo(
    () =>
      PROJECTS.filter(
        (p) =>
          (cat === "All" || p.category === cat) &&
          (q.trim() === "" ||
            (p.title + p.description + p.tech.join(" ")).toLowerCase().includes(q.toLowerCase())),
      ),
    [q, cat],
  );

  return (
    <section id="projects" className="section-pad relative">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          subtitle="A snapshot of things I've designed, engineered, and shipped."
        />
        <Reveal>
          <div className="mb-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search projects, tech…"
                className="w-full rounded-full glass-strong py-2.5 pl-10 pr-4 text-sm outline-none transition focus:ring-2 focus:ring-[color:var(--neon-cyan)]/50"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                    cat === c
                      ? "bg-gradient-to-r from-[color:var(--neon-cyan)] to-[color:var(--neon-violet)] text-[color:var(--background)]"
                      : "glass hover:bg-white/5"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="grid items-stretch gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((p, i) => (
            <Reveal key={p.title} delay={i * 80} className="h-full">
              <ProjectCard p={p} />
            </Reveal>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full rounded-2xl glass p-10 text-center text-muted-foreground">
              No projects match your search.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div
          ref={ref}
          className="grid gap-4 rounded-3xl glass-strong p-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {STATS.map((s, i) => (
            <StatTile key={s.label} {...s} start={shown} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  );
}
function StatTile({
  value,
  label,
  suffix,
  start,
  delay,
}: {
  value: number;
  label: string;
  suffix: string;
  start: boolean;
  delay: number;
}) {
  const v = useCountUp(value, 1500 + delay, start);
  return (
    <div className="text-center">
      <div className="font-display text-5xl font-bold text-gradient">
        {v}
        {suffix}
      </div>
      <div className="mt-2 text-sm uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
    </div>
  );
}

function Achievements() {
  return (
    <section id="achievements" className="section-pad relative">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow="Achievements" title="Highlights & milestones" />
        <div className="grid gap-6 md:grid-cols-3">
          {ACHIEVEMENTS.map((a, i) => (
            <Reveal key={a.title} delay={i * 100}>
              <div className="group h-full rounded-3xl glass-strong p-7 transition hover:-translate-y-1">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[color:var(--neon-cyan)] to-[color:var(--neon-violet)] text-[color:var(--background)] transition group-hover:rotate-6">
                  <a.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold">{a.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{a.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Portfolio inquiry from ${data.get("name") || "visitor"}`);
    const body = encodeURIComponent(`${data.get("message") || ""}\n\n— ${data.get("name") || ""} (${data.get("email") || ""})`);
    window.location.href = `mailto:${SOCIALS.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="section-pad relative">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Contact"
          title="Let's build something intelligent"
          subtitle="Have a project, role, or idea in mind? I'd love to hear from you."
        />
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="space-y-4">
              <div className="rounded-2xl glass-strong p-6">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[color:var(--neon-cyan)]/15 text-[color:var(--neon-cyan)]">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Email</div>
                    <a href={`mailto:${SOCIALS.email}`} className="font-medium hover:text-[color:var(--neon-cyan)]">
                      {SOCIALS.email}
                    </a>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl glass-strong p-6">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-[color:var(--neon-violet)]/15 text-[color:var(--neon-violet)]">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">Location</div>
                    <div className="font-medium">Faisalabad, Pakistan</div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <a
                  href={SOCIALS.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[color:var(--neon-cyan)] to-[color:var(--neon-violet)] px-5 py-3 text-sm font-semibold text-[color:var(--background)] transition hover:scale-[1.02]"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
                <a
                  href={SOCIALS.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl glass-strong px-5 py-3 text-sm font-semibold transition hover:bg-white/5"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form
              onSubmit={onSubmit}
              className="rounded-3xl glass-strong p-7"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">
                    Name
                  </span>
                  <input
                    required
                    name="name"
                    maxLength={100}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-[color:var(--neon-cyan)]/60 focus:ring-2 focus:ring-[color:var(--neon-cyan)]/30"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">
                    Email
                  </span>
                  <input
                    required
                    type="email"
                    name="email"
                    maxLength={255}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-[color:var(--neon-cyan)]/60 focus:ring-2 focus:ring-[color:var(--neon-cyan)]/30"
                  />
                </label>
              </div>
              <label className="mt-4 block">
                <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted-foreground">
                  Message
                </span>
                <textarea
                  required
                  name="message"
                  rows={5}
                  maxLength={1000}
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-[color:var(--neon-cyan)]/60 focus:ring-2 focus:ring-[color:var(--neon-cyan)]/30"
                />
              </label>
              <button
                type="submit"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[color:var(--neon-cyan)] to-[color:var(--neon-violet)] px-5 py-3 text-sm font-semibold text-[color:var(--background)] transition hover:scale-[1.01]"
              >
                <Send className="h-4 w-4" />
                {sent ? "Opening your mail app…" : "Send Message"}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 sm:flex-row">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Wajeeha Sajid. Crafted with curiosity & code.
        </div>
        <div className="flex items-center gap-3">
          <a href={SOCIALS.github} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-lg glass transition hover:bg-white/5">
            <Github className="h-4 w-4" />
          </a>
          <a href={SOCIALS.linkedin} target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-lg glass transition hover:bg-white/5">
            <Linkedin className="h-4 w-4" />
          </a>
          <a href={`mailto:${SOCIALS.email}`} className="grid h-9 w-9 place-items-center rounded-lg glass transition hover:bg-white/5">
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------- LOADER ------------------------------- */

export function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1100);
    return () => clearTimeout(t);
  }, []);
  if (done) return null;
  return (
    <div className="fixed inset-0 z-[200] grid place-items-center bg-[color:var(--background)] transition-opacity duration-500">
      <div className="text-center">
        <div className="relative mx-auto h-20 w-20">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-[color:var(--neon-cyan)] border-r-[color:var(--neon-violet)]" />
          <div className="absolute inset-2 grid place-items-center rounded-full glass-strong">
            <span className="font-display text-xl font-bold text-gradient">WS</span>
          </div>
        </div>
        <div className="mt-5 font-mono text-xs uppercase tracking-[0.4em] text-muted-foreground">
          initializing<span className="animate-blink">_</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- ROOT ------------------------------- */

export function Portfolio() {
  return (
    <div className="dark relative min-h-screen overflow-hidden">
      <Loader />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Stats />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
