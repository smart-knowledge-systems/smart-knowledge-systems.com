/**
 * Blog category definitions
 * Centralized category data for reuse across posts, filtering, and navigation
 */

export type Category = {
  title: string;
  href: string;
  priority?: number;
};

export const categories = {
  knowledgeManagement: {
    title: "Knowledge",
    href: "/categories/knowledge-management",
  },
  organizationalCulture: {
    title: "Culture",
    href: "/categories/organizational-culture",
  },
  leadership: {
    title: "Leadership",
    href: "/categories/leadership",
  },
  projectManagement: {
    title: "Projects",
    href: "/categories/project-management",
  },
  technologyIntegration: {
    title: "Technology",
    href: "/categories/technology-integration",
  },
  teamCollaboration: {
    title: "Collaboration",
    href: "/categories/team-collaboration",
  },
} as const;

export type CategoryKey = keyof typeof categories;

/**
 * Pre-defined category+priority combinations to avoid creating
 * duplicate object references in the posts array (rule 5.4)
 */
export const categoryWithPriority = {
  knowledgeManagement1: { ...categories.knowledgeManagement, priority: 1 },
  knowledgeManagement2: { ...categories.knowledgeManagement, priority: 2 },
  knowledgeManagement3: { ...categories.knowledgeManagement, priority: 3 },
  organizationalCulture1: {
    ...categories.organizationalCulture,
    priority: 1,
  },
  organizationalCulture2: {
    ...categories.organizationalCulture,
    priority: 2,
  },
  organizationalCulture3: {
    ...categories.organizationalCulture,
    priority: 3,
  },
  organizationalCulture4: {
    ...categories.organizationalCulture,
    priority: 4,
  },
  leadership1: { ...categories.leadership, priority: 1 },
  leadership2: { ...categories.leadership, priority: 2 },
  leadership4: { ...categories.leadership, priority: 4 },
  projectManagement: { ...categories.projectManagement },
  technologyIntegration: { ...categories.technologyIntegration },
  technologyIntegration1: { ...categories.technologyIntegration, priority: 1 },
  technologyIntegration2: { ...categories.technologyIntegration, priority: 2 },
  technologyIntegration3: { ...categories.technologyIntegration, priority: 3 },
  technologyIntegration4: { ...categories.technologyIntegration, priority: 4 },
  teamCollaboration: { ...categories.teamCollaboration },
  teamCollaboration1: { ...categories.teamCollaboration, priority: 1 },
  teamCollaboration2: { ...categories.teamCollaboration, priority: 2 },
  teamCollaboration4: { ...categories.teamCollaboration, priority: 4 },
} as const;
