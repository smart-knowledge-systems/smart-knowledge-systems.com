export type StudentWork = {
  title: string;
  date: string;
  abstract: string;
  url: string;
  course: string;
  school: string;
  tags: string[];
};

export type School = {
  name: string;
  slug: string;
};

export type Course = {
  code: string;
  title: string;
  school: string;
};

export type Tag = {
  name: string;
  slug: string;
};

export type PortfolioData = {
  essays: StudentWork[];
};

// Available tags for filtering
export const availableTags: Tag[] = [
  { name: "Film Studies", slug: "film-studies" },
  { name: "Philosophy", slug: "philosophy" },
  { name: "Education", slug: "education" },
  { name: "Rhetoric", slug: "rhetoric" },
  { name: "Writing Studies", slug: "writing-studies" },
  { name: "Indigenous Studies", slug: "indigenous-studies" },
  { name: "Literacy", slug: "literacy" },
  { name: "Environmental", slug: "environmental" },
  { name: "Colonial Studies", slug: "colonial-studies" },
  { name: "Identity", slug: "identity" },
  { name: "Neurodiversity", slug: "neurodiversity" },
  { name: "Technology", slug: "technology" },
  { name: "Organizational", slug: "organizational" },
  { name: "Poetry", slug: "poetry" },
  { name: "Biography", slug: "biography" },
  { name: "Social Justice", slug: "social-justice" },
  { name: "Methodology", slug: "methodology" },
  { name: "Interdisciplinary", slug: "interdisciplinary" },
];

// Available schools
export const availableSchools: School[] = [
  { name: "Salt Lake Community College", slug: "slcc" },
  { name: "University of Utah", slug: "u-of-u" },
  { name: "University at Albany, SUNY", slug: "suny-albany" },
];

// --- Lookup helpers ---

const WHITESPACE_RE = /\s+/g;

/** Generic lookup factory for name/slug pairs */
function createLookup<T extends { name: string; slug: string }>(items: T[]) {
  const byName = new Map(items.map((item) => [item.name, item]));
  const bySlug = new Map(items.map((item) => [item.slug, item]));
  return {
    getSlug: (name: string): string =>
      byName.get(name)?.slug ?? name.toLowerCase().replace(WHITESPACE_RE, "-"),
    getName: (slug: string): string => bySlug.get(slug)?.name ?? slug,
  };
}

const tagLookup = createLookup(availableTags);
const schoolLookup = createLookup(availableSchools);

export const getTagSlug = tagLookup.getSlug;
export const getTagName = tagLookup.getName;
export const getSchoolSlug = schoolLookup.getSlug;
export const getSchoolName = schoolLookup.getName;
