import type { PortfolioData } from "./types";

export const PORTFOLIO_DATA: PortfolioData = {
  identity: {
    firstName: "Fehizoro",
    lastName: "Andriantsarafara",
    role: { fr: "Développeur Mobile", en: "Mobile Developer" },
    stack: "Flutter · JavaScript · Next.js",
    location: "Antananarivo, Madagascar",
    tagline: {
      fr: "Je conçois des applications mobiles cross-platform en Flutter - du prototype à la production.",
      en: "I build cross-platform mobile apps with Flutter - from prototype to production.",
    },
    availability: {
      fr: "Disponible pour des missions Flutter ambitieuses",
      en: "Open to ambitious Flutter missions",
    },
  },
  contact: {
    email: "fehizoroandriantsarafara@gmail.com",
    phone: "+261 34 02 579 82",
    linkedin: "linkedin.com/in/fehizoro-andriantsarafara-064b82217",
    linkedinUrl: "https://www.linkedin.com/in/fehizoro-andriantsarafara-064b82217",
    github: "Fehizoro496",
    githubUrl: "https://github.com/Fehizoro496",
    cvUrl: "https://drive.google.com/uc?export=download&id=1fKpqavTyymDhrry9C7gRjyly5-7fYgqn",
    address: "Lot 267 A I bis Antanambao, Ambohimangakely",
  },
  about: {
    fr: "Développeur passionné par le mobile et le web, j'ai consolidé mes compétences à travers des stages en entreprise, un poste de développeur mobile et plusieurs projets personnels. Aujourd'hui spécialisé en Flutter, je m'investis pleinement dans chaque projet avec l'envie de progresser et de contribuer efficacement au travail d'équipe.",
    en: "Developer passionate about mobile and web engineering, I sharpened my skills through company internships, a full-time mobile developer role, and several personal projects. Now specialized in Flutter, I invest fully in every project - eager to grow and contribute meaningfully to the team.",
  },
  skills: [
    {
      category: { fr: "Mobile", en: "Mobile" },
      icon: "phone",
      items: ["Flutter", "Dart", "Riverpod", "Drift / SQLite", "SQFlite"],
    },
    {
      category: { fr: "Frontend Web", en: "Web Frontend" },
      icon: "browser",
      items: ["Next.js", "React", "TypeScript", "Tailwind", "Shadcn", "Zustand", "TanStack Query"],
    },
    {
      category: { fr: "Backend & Data", en: "Backend & Data" },
      icon: "server",
      items: ["Node.js", "NestJS", "Express", "SpringBoot", "Python", "PostgreSQL", "Prisma", "MongoDB"],
    },
    {
      category: { fr: "Temps réel & Auth", en: "Realtime & Auth" },
      icon: "bolt",
      items: ["Socket.IO", "JWT", "OAuth 2.0 (Google / GitHub)"],
    },
  ],
  softSkills: {
    fr: ["Sérieux", "Adaptable", "Débrouillard", "Persévérant"],
    en: ["Reliable", "Adaptable", "Resourceful", "Persistent"],
  },
  experience: [
    {
      title: { fr: "Lead Développeur Flutter", en: "Lead Flutter Developer" },
      company: "Victus",
      period: { fr: "Avr. 2026 - Présent", en: "Apr 2026 - Present" },
      current: true,
      description: {
        fr: "Promotion au poste de Lead, avec la responsabilité de l'architecture Flutter et de l'encadrement technique de l'équipe mobile.",
        en: "Promoted to Lead role, taking ownership of the Flutter architecture and technical mentoring of the mobile team.",
      },
      bullets: {
        fr: [
          "Définition et mise en place de l'architecture Flutter (state management, navigation, persistence)",
          "Encadrement technique et revue de code de l'équipe mobile",
          "Pilotage des choix technologiques et bonnes pratiques",
        ],
        en: [
          "Defining and implementing the Flutter architecture (state management, navigation, persistence)",
          "Technical mentoring and code review of the mobile team",
          "Driving technology choices and best practices",
        ],
      },
      stack: ["Flutter", "Dart", "Riverpod", "REST"],
    },
    {
      title: { fr: "Développeur Mobile", en: "Mobile Developer" },
      company: "Victus",
      period: { fr: "Nov. 2025 - Mars 2026", en: "Nov 2025 - Mar 2026" },
      current: false,
      description: {
        fr: "Conception et développement d'applications mobiles cross-platform en Flutter, du prototype à la mise en production, en collaboration étroite avec les équipes design et backend.",
        en: "Design and development of cross-platform mobile applications in Flutter, from prototype to production, in close collaboration with design and backend teams.",
      },
      bullets: {
        fr: [
          "Développement d'applications mobiles cross-platform avec Flutter",
          "Mise en place d'architectures côté client robustes (state management, persistance locale)",
          "Intégration d'API REST et collaboration avec les équipes design et backend",
        ],
        en: [
          "Cross-platform mobile app development with Flutter",
          "Setup of robust client-side architectures (state management, local persistence)",
          "REST API integration and collaboration with design & backend teams",
        ],
      },
      stack: ["Flutter", "Dart", "REST"],
    },
    {
      title: { fr: "Développeur Next.js / Flutter - Stage", en: "Next.js / Flutter Developer - Internship" },
      company: "Nexitia Technologies",
      period: { fr: "Mai 2025 - Sept. 2025", en: "May 2025 - Sep 2025" },
      description: {
        fr: "Participation à plusieurs projets clients durant le stage, sur le mobile comme sur le web.",
        en: "Contributed to several client projects during the internship, both mobile and web.",
      },
      bullets: {
        fr: [
          "Migration d'une marketplace depuis React.js vers Next.js",
          "Développement de la partie mobile Flutter de la marketplace",
          "Conception du frontend d'une plateforme dédiée aux grands acteurs du tourisme avec Next.js",
        ],
        en: [
          "Migrated a marketplace from React.js to Next.js",
          "Built the Flutter mobile side of the marketplace",
          "Designed the frontend of a platform for major tourism players with Next.js",
        ],
      },
      stack: ["Next.js", "React", "Flutter"],
    },
    {
      title: { fr: "Développeur Flutter / Python - Stage", en: "Flutter / Python Developer - Internship" },
      company: "Caisse d'Épargne de Madagascar",
      period: { fr: "Juil. 2022 - Oct. 2022", en: "Jul 2022 - Oct 2022" },
      description: {
        fr: "Collaboration en binôme pour la conception et la mise en œuvre d'un ETL de migration de données Oracle vers PostgreSQL.",
        en: "Pair-collaboration on the design and implementation of an ETL pipeline migrating data from Oracle to PostgreSQL.",
      },
      bullets: { fr: [], en: [] },
      stack: ["Flutter", "Python", "Oracle", "PostgreSQL"],
    },
  ],
  projects: [
    {
      title: "AI Task Manager",
      status: { fr: "En cours", en: "In progress" },
      role: { fr: "Fullstack", en: "Fullstack" },
      summary: {
        fr: "Application fullstack de gestion de projets agile inspirée de Jira, assistée par IA : un assistant capable de générer la structure d'un projet (epics, stories, tâches) à partir d'un cahier des charges.",
        en: "Fullstack agile project management app inspired by Jira, AI-assisted: an assistant that generates a full project structure (epics, stories, tasks) from a brief.",
      },
      highlights: {
        fr: [
          "Kanban board, chat temps réel et notifications",
          "Auth OAuth Google / GitHub",
          "Tableau de bord analytique et intégration GitHub",
          "Assistant IA en cours d'intégration",
        ],
        en: [
          "Kanban board, realtime chat and notifications",
          "OAuth Google / GitHub authentication",
          "Analytics dashboard and GitHub integration",
          "AI assistant currently being integrated",
        ],
      },
      stack: ["Flutter", "Node.js", "Express", "PostgreSQL", "Prisma", "Socket.IO", "Riverpod", "Drift"],
      accent: "violet",
    },
    {
      title: "In My Bush",
      status: null,
      role: { fr: "Frontend Web & Mobile", en: "Frontend Web & Mobile" },
      summary: {
        fr: "Marketplace de produits bio sur web et mobile : enregistrement des revenus / dépenses, génération de factures et exportation sécurisée des données pour les analyses.",
        en: "Organic-products marketplace on web and mobile: revenue/expense tracking, invoice generation, and secure data export for analytics.",
      },
      highlights: {
        fr: [
          "Enregistrement des revenus et dépenses",
          "Génération de factures pour les ventes",
          "Exportation sécurisée des données pour analyse",
        ],
        en: [
          "Revenue and expense tracking",
          "Sales invoice generation",
          "Secure data export for analytics",
        ],
      },
      stack: ["Next.js", "Flutter", "SpringBoot", "PostgreSQL"],
      accent: "teal",
    },
    {
      title: "Global Travel Planner",
      status: null,
      role: { fr: "Frontend", en: "Frontend" },
      summary: {
        fr: "Plateforme complète B2B & B2C dédiée au secteur touristique, pensée pour des Tour Opérateurs ambitieux.",
        en: "Full B2B & B2C platform for the tourism industry, designed for ambitious Tour Operators.",
      },
      highlights: {
        fr: [
          "Tableau de programme façon Excel pour les quotations",
          "Génération de devis, voucher, feuille de route, facture, suivi prestataire",
          "Site vitrine de circuits & excursions, modifiable sans dev",
        ],
        en: [
          "Excel-style program board for quotations",
          "Generation of quotes, vouchers, roadbooks, invoices, supplier tracking",
          "Tours & excursions storefront, editable without a developer",
        ],
      },
      stack: ["Next.js", "SpringBoot"],
      accent: "amber",
    },
    {
      title: { fr: "Application Caisse", en: "Cash Register App" },
      status: { fr: "Projet perso", en: "Personal project" },
      role: { fr: "Mobile", en: "Mobile" },
      summary: {
        fr: "Plateforme de gestion financière avec frontoffice pour les opérations courantes et backoffice admin pour la supervision et l'analyse.",
        en: "Personal finance management platform with a frontoffice for daily operations and an admin backoffice for supervision and analysis.",
      },
      highlights: {
        fr: [
          "Enregistrement revenus / dépenses",
          "Génération de factures",
          "Backoffice admin de supervision",
          "Import / export chiffré entre les deux parties",
        ],
        en: [
          "Revenue / expense tracking",
          "Invoice generation",
          "Admin supervision backoffice",
          "Encrypted import / export between sides",
        ],
      },
      stack: ["Flutter", "SQFlite", "Drift"],
      accent: "rose",
    },
    {
      title: { fr: "Chat Temps Réel", en: "Realtime Chat App" },
      status: { fr: "Projet perso", en: "Personal project" },
      role: { fr: "Fullstack", en: "Fullstack" },
      summary: {
        fr: "Application de chat multiplateforme (mobile et desktop) avec authentification et envoi de messages texte ou image en temps réel.",
        en: "Multiplatform chat app (mobile + desktop) with authentication and realtime text/image messaging.",
      },
      highlights: { fr: [], en: [] },
      stack: ["Flutter", "Node.js", "Express", "Socket.IO", "MongoDB"],
      accent: "indigo",
    },
    {
      title: { fr: "Dashboard Produits", en: "Products Dashboard" },
      status: { fr: "Projet perso", en: "Personal project" },
      role: { fr: "Frontend", en: "Frontend" },
      summary: {
        fr: "Dashboard interactif pour afficher, ajouter, modifier et supprimer des produits via l'API FakeStore.",
        en: "Interactive dashboard to list, create, edit and delete products via the FakeStore API.",
      },
      highlights: { fr: [], en: [] },
      stack: ["Next.js", "NestJS", "Tailwind", "Shadcn", "Zustand", "TanStack Query"],
      accent: "emerald",
    },
  ],
  education: [
    {
      degree: {
        fr: "Master II en Informatique et Télécommunication",
        en: "Master II in Computer Science & Telecommunications",
      },
      pending: true,
      school: "Institut Supérieur Polytechnique de Madagascar (ISPM)",
      period: "2022 - 2023",
    },
    {
      degree: {
        fr: "Licence en Informatique et Télécommunication",
        en: "Bachelor in Computer Science & Telecommunications",
      },
      pending: false,
      school: "Institut Supérieur Polytechnique de Madagascar (ISPM)",
      period: "2020 - 2021",
    },
  ],
  github: {
    username: "Fehizoro496",
    publicRepos: 18,
    contributions: 420,
    starred: 24,
    languages: [
      { name: "Dart", pct: 42, color: "#0EA5E9" },
      { name: "TypeScript", pct: 28, color: "#6366F1" },
      { name: "JavaScript", pct: 16, color: "#F59E0B" },
      { name: "Python", pct: 8, color: "#10B981" },
      { name: "Other", pct: 6, color: "#A78BFA" },
    ],
  },
};
