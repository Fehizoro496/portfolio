export type Lang = "fr" | "en";
export type Localized<T = string> = { fr: T; en: T };

export type Accent = "violet" | "teal" | "amber" | "rose" | "indigo" | "emerald";

export interface SkillCategory {
  category: Localized;
  icon: "phone" | "browser" | "server" | "bolt";
  items: string[];
}

export interface Experience {
  title: Localized;
  company: string;
  period: Localized;
  current?: boolean;
  description: Localized;
  bullets: Localized<string[]>;
  stack: string[];
}

export interface Project {
  title: string | Localized;
  status: Localized | null;
  role: Localized;
  summary: Localized;
  highlights: Localized<string[]>;
  stack: string[];
  accent: Accent;
}

export interface Education {
  degree: Localized;
  pending: boolean;
  school: string;
  period: string;
}

export interface PortfolioData {
  identity: {
    firstName: string;
    lastName: string;
    role: Localized;
    stack: string;
    location: string;
    tagline: Localized;
    availability: Localized;
  };
  contact: {
    email: string;
    phone: string;
    linkedin: string;
    linkedinUrl: string;
    github: string;
    githubUrl: string;
    cvUrl: string;
    address: string;
  };
  about: Localized;
  skills: SkillCategory[];
  softSkills: Localized<string[]>;
  experience: Experience[];
  projects: Project[];
  education: Education[];
  github: {
    username: string;
    publicRepos: number;
    contributions: number;
    starred: number;
    languages: { name: string; pct: number; color: string }[];
  };
}
