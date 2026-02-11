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

// Build O(1) lookup maps for tags (Issue #19, #24)
const tagsByName = new Map(availableTags.map((t) => [t.name, t]));
const tagsBySlug = new Map(availableTags.map((t) => [t.slug, t]));

// Build O(1) lookup maps for schools (Issue #19, #24)
const schoolsByName = new Map(availableSchools.map((s) => [s.name, s]));
const schoolsBySlug = new Map(availableSchools.map((s) => [s.slug, s]));

// Helper function to get tag slug from name - now O(1) instead of O(n)
export const getTagSlug = (tagName: string): string => {
  const tag = tagsByName.get(tagName);
  return tag ? tag.slug : tagName.toLowerCase().replace(/\s+/g, "-");
};

// Helper function to get tag name from slug - now O(1) instead of O(n)
export const getTagName = (slug: string): string => {
  const tag = tagsBySlug.get(slug);
  return tag ? tag.name : slug;
};

// Helper function to get school slug from name - now O(1) instead of O(n)
export const getSchoolSlug = (schoolName: string): string => {
  const school = schoolsByName.get(schoolName);
  return school ? school.slug : schoolName.toLowerCase().replace(/\s+/g, "-");
};

// Helper function to get school name from slug - now O(1) instead of O(n)
export const getSchoolName = (slug: string): string => {
  const school = schoolsBySlug.get(slug);
  return school ? school.name : slug;
};
