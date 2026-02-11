/**
 * Blog author definitions
 * Centralized author data for reuse across posts and pages
 */

export type Author = {
  name: string;
  role: string;
  href: string;
  imageUrl: string;
};

export const russAuthor: Author = {
  name: "Russ Fugal",
  role: "Organizational Transformation Specialist",
  href: "/#about",
  imageUrl: "/avatar.jpg",
};
