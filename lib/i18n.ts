import type { Lang, Localized } from "./types";

export const I18N = {
  fr: {
    nav: {
      about: "À propos",
      skills: "Compétences",
      experience: "Expérience",
      projects: "Projets",
      education: "Formation",
      contact: "Contact",
    },
    cta: {
      contact: "Me contacter",
      cv: "Télécharger le CV",
      viewProjects: "Voir les projets",
      email: "Écrire un email",
      copy: "Copier",
      copied: "Copié",
    },
    hero: {
      available: "Disponible",
      basedIn: "Basé à",
      scroll: "Faites défiler",
    },
    sections: {
      about: { tag: "À propos", title: "Quelques mots", lead: "Qui je suis." },
      skills: { tag: "Compétences", title: "Stack & savoir-faire", lead: "Les outils avec lesquels je construis." },
      experience: { tag: "Expérience", title: "Parcours professionnel", lead: "Là où j'ai contribué." },
      projects: { tag: "Projets", title: "Sélection de projets", lead: "Ce que j'ai conçu et livré." },
      education: { tag: "Formation", title: "Diplômes", lead: "Mon parcours académique." },
      github: { tag: "Open source", title: "Activité GitHub", lead: "Aperçu de ma présence open source." },
      contact: { tag: "Contact", title: "Travaillons ensemble", lead: "Toujours partant pour une bonne discussion technique." },
    },
    labels: {
      current: "En poste",
      stack: "Stack",
      role: "Rôle",
      highlights: "Points clés",
      languages: "Langues",
      softSkills: "Soft skills",
      pending: "en attente de validation",
      sendEmail: "Envoyer un email",
      callMe: "Appelez-moi",
      onLinkedin: "Sur LinkedIn",
      onGithub: "Sur GitHub",
      publicRepos: "Repos publics",
      contributions: "Contributions cette année",
      starred: "Repos starred",
      topLanguages: "Langages principaux",
    },
    footer: {
      built: "Conçu et développé par Fehizoro Andriantsarafara",
      year: "© 2026",
    },
    tweaks: {
      title: "Tweaks",
      palette: "Palette",
      cards: "Cartes projets",
      paletteOptions: ["Indigo / Violet", "Teal / Cyan", "Amber / Rose", "Slate / Mint"],
      cardOptions: ["Glass", "Minimal", "Bordered", "Tilted"],
    },
  },
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      experience: "Experience",
      projects: "Projects",
      education: "Education",
      contact: "Contact",
    },
    cta: {
      contact: "Get in touch",
      cv: "Download CV",
      viewProjects: "View projects",
      email: "Send email",
      copy: "Copy",
      copied: "Copied",
    },
    hero: {
      available: "Available",
      basedIn: "Based in",
      scroll: "Scroll",
    },
    sections: {
      about: { tag: "About", title: "A few words", lead: "Who I am." },
      skills: { tag: "Skills", title: "Stack & craft", lead: "The tools I build with." },
      experience: { tag: "Experience", title: "Professional journey", lead: "Where I contributed." },
      projects: { tag: "Projects", title: "Selected projects", lead: "What I designed and shipped." },
      education: { tag: "Education", title: "Degrees", lead: "My academic path." },
      github: { tag: "Open source", title: "GitHub activity", lead: "A glimpse of my open-source presence." },
      contact: { tag: "Contact", title: "Let's work together", lead: "Always up for a good technical chat." },
    },
    labels: {
      current: "Current",
      stack: "Stack",
      role: "Role",
      highlights: "Highlights",
      languages: "Languages",
      softSkills: "Soft skills",
      pending: "pending validation",
      sendEmail: "Send an email",
      callMe: "Call me",
      onLinkedin: "On LinkedIn",
      onGithub: "On GitHub",
      publicRepos: "Public repos",
      contributions: "Contributions this year",
      starred: "Starred repos",
      topLanguages: "Top languages",
    },
    footer: {
      built: "Designed and built by Fehizoro Andriantsarafara",
      year: "© 2026",
    },
    tweaks: {
      title: "Tweaks",
      palette: "Palette",
      cards: "Project cards",
      paletteOptions: ["Indigo / Violet", "Teal / Cyan", "Amber / Rose", "Slate / Mint"],
      cardOptions: ["Glass", "Minimal", "Bordered", "Tilted"],
    },
  },
} as const;

export type Dict = (typeof I18N)[Lang];

export function localized<T>(val: Localized<T> | T, lang: Lang): T {
  if (val && typeof val === "object" && "fr" in (val as object) && "en" in (val as object)) {
    return (val as Localized<T>)[lang];
  }
  return val as T;
}
