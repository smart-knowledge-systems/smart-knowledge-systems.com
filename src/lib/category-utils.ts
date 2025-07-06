/**
 * Convert category title to URL-friendly slug
 */
export const getCategorySlug = (title: string): string => {
  return title.toLowerCase().replace(/\s+/g, '-');
};

/**
 * Convert category slug back to title
 */
export const getCategoryTitle = (slug: string): string => {
  const titleMap: Record<string, string> = {
    'knowledge': 'Knowledge',
    'culture': 'Culture', 
    'leadership': 'Leadership',
    'projects': 'Projects',
    'technology': 'Technology',
    'collaboration': 'Collaboration'
  };
  return titleMap[slug] || slug;
};