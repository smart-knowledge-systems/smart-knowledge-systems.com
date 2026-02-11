import AcademicCapIcon from "@heroicons/react/24/outline/AcademicCapIcon";
import ClipboardDocumentCheckIcon from "@heroicons/react/24/outline/ClipboardDocumentCheckIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import CpuChipIcon from "@heroicons/react/24/outline/CpuChipIcon";
import {
  BlueskyIcon,
  LinkedInIcon,
  GitHubIcon,
  YouTubeIcon,
} from "@/components/icons/social-icons";

// Centralized profile URLs
export const BLUESKY_PROFILE_URL =
  "https://bsky.app/profile/russ-fugal.smart-knowledge-systems.com";

// --- Navigation ---

export const navigation = [
  { name: "Services", href: "/#services" },
  { name: "Approach", href: "/#approach" },
  { name: "Resources", href: "/#resources" },
  { name: "About", href: "/about" },
  { name: "Portfolio", href: "/portfolio" },
];

// --- Hero Content ---

export const heroContent = {
  logo: {
    src: "/sks-logo.svg",
    alt: "Smart Knowledge Systems",
    width: 643,
    height: 386,
  },
  headline: "Smart Systems",
  description:
    "Stop losing time, money and opportunities to information silos. Create an organization where information flows, teams collaborate, and knowledge grows so your best insights drive innovation.",
  ctaPrimary: {
    text: "Get Started",
    href: "https://calendly.com/saras-books/smart-knowledge-systems-consultation",
  },
  ctaSecondary: {
    text: "Schedule a Free Consultation",
    href: "https://calendly.com/saras-books/smart-knowledge-systems-consultation",
  },
  heroImage: {
    src: "/photo-1567532900872-f4e906cbf06a.avif",
    alt: "Professional consulting environment with collaborative team discussion",
    width: 671,
    height: 447,
  },
  loginText: "Client Portal",
};

// --- Main Content ---

export const mainContent = {
  intro: {
    tagline: "Knowledge Management Expert",
    title: "Transforming Organizations Through Knowledge Sharing",
    subtitle:
      "I help organizations build smart knowledge-sharing systems that combine the best of human expertise with smart technology (e.g. collaborative IT and generative AI), empowering them to overcome information silos and unleash innovation. Drawing on my background in project management, information science, and organizational transformation, I develop environments for knowledge growth and sharing.",
  },
  mainContent: {
    paragraph1:
      "Organizations waste valuable resources daily through duplicated efforts, missed opportunities for innovation, and fragmented and stagnant knowledge. My approach delivers immediate returns by redesigning how your teams collaborate — without requiring expensive new software that nobody uses. Instead of digital tools gathering dust, I create sustainable knowledge sharing that becomes part of your organizational DNA. The result? Measurable gains — in innovation speed, decision quality, and team productivity — that drive bottom-line results.",
    featuresList: [
      {
        id: "silo-assessment",
        title: "Silo Assessment",
        description:
          "Identify exactly where and why information gets stuck in your organization, map information flows and critical connection points between teams.",
      },
      {
        id: "collaboration-design",
        title: "Collaboration Design",
        description:
          "Transform how teams communicate across departmental and technical boundaries by creating healthy work environments with shared language and frameworks.",
      },
      {
        id: "technology-integration",
        title: "Technology Integration",
        description:
          "Select and implement knowledge management tools that enhance rather than replace human connection and align with how people actually work.",
      },
    ],
    paragraph2:
      "With certifications in Project Management and Organizational Transformation, backed by real-world experience leading multi-million dollar projects, I bring both the strategic vision and practical know-how to transform how your organization shares, leverages, and builds its most valuable asset — knowledge.",
  },
  secondSection: {
    title: "From Information Silos to Shared Knowledge",
    paragraph:
      "I'm Russ Fugal, a professional who helps organizations overcome the barriers that prevent information from flowing where it's needed for knowledge growth. With over a decade leading complex projects and teams, I've seen firsthand how information silos create frustration, waste resources, and block innovation.",
    testimonial: {
      quote:
        '"The meeting format Russ designed completely transformed how our teams share information. What used to get stuck in departmental silos now flows to the people who need it most. We\'ve eliminated duplicate work and seen an improvement in cross-team innovation."',
      author: {
        name: "Director of Operations",
        title: "Manufacturing Client",
        image: {
          src: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
          width: 256,
          height: 256,
          alt: "Testimonial author headshot",
        },
      },
    },
    paragraph2:
      "My approach combines best practices and practical project management expertise with deep insights into how organizations actually develop shared knowledge and make decisions. Rather than focusing solely on technology solutions or abstract theories, I help clients create sustainable and dynamic systems where both formal processes and informal communications work together.",
  },
  imageSection: {
    image: {
      src: "/russ.jpg",
      width: 2000,
      height: 1333,
      alt: "Russ Fugal, MBA, PMP, Organizational Transformation Specialist",
    },
    caption: "Russ Fugal, MBA, PMP, Organizational Transformation Specialist",
  },
  finalSection: {
    title: "Create Information Flow in Your Organization",
    paragraph1:
      "My background includes managing physical builds worth over $100 million, integrating information-sharing systems across diverse teams, and studying the intersections of information technology, epistemology, and social collaboration. This unique perspective allows me to see opportunities for improvement that others miss.",
    paragraph2:
      "Whether you're dealing with cross-departmental collaboration challenges, integration of specialized expertise, or simply trying to make better use of what your organization already knows, I can help you create an environment where information flows.",
  },
};

// --- Services Content ---

export const servicesData = {
  heading: "Break Down Information Silos, Build Knowledge Bridges",
  services: [
    {
      id: "silo-assessment",
      name: "Silo Assessment & Strategy",
      description:
        "Eliminate costly duplicate work and reduce project delays by pinpointing exactly where critical information breaks down between teams and creating targeted solutions that get information flowing again.",
      icon: ClipboardDocumentCheckIcon,
    },
    {
      id: "team-collaboration",
      name: "Team Collaboration Design",
      description:
        "Transform how teams communicate across departmental and technical boundaries by creating shared vocabularies and frameworks. Thoughtfully integrate generative AI as a navigator that bridges domains while promoting the human conversations essential for building shared knowledge and driving innovation.",
      icon: UsersIcon,
    },
    {
      id: "technology-integration",
      name: "Technology Integration",
      description:
        "Maximize ROI on your technology investments by implementing systems people actually use, turning your knowledge management tools into productivity multipliers rather than expensive digital filing cabinets.",
      icon: CpuChipIcon,
    },
    {
      id: "leadership-development",
      name: "Leadership Development",
      description:
        "Transform managers into knowledge catalysts who create healthy team environments where innovations emerge naturally, problems get solved faster, and expertise is automatically shared with those who need it most — all while supporting employee wellbeing and reducing workplace stress.",
      icon: AcademicCapIcon,
    },
  ],
};

// --- Footer Content ---

export const footerData = {
  logo: {
    src: "/sks-logo.svg",
    alt: "Smart Knowledge Systems",
    width: 36,
    height: 36,
  },
  tagline: "build knowledge together",
  copyright: "© 2025 Russ Fugal. All rights reserved.",
  navigation: {
    solutions: [
      { name: "Silo Assessment", href: "/#services" },
      { name: "Collaboration Design", href: "/#services" },
      { name: "Technology Integration", href: "/#services" },
      { name: "Leadership Development", href: "/#services" },
      { name: "Healthy Work", href: "/#services" },
    ],
    support: [
      {
        name: "Schedule Consultation",
        href: "https://calendly.com/saras-books/smart-knowledge-systems-consultation",
      },
      { name: "Resources", href: "/#resources" },
      { name: "Knowledge Base", href: "/blog" },
    ],
    company: [
      { name: "About Russ", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Portfolio", href: "/portfolio" },
      {
        name: "Contact",
        href: "https://calendly.com/saras-books/smart-knowledge-systems-consultation",
      },
    ],
    legal: [
      { name: "Terms of service", href: "/terms" },
      { name: "Privacy policy", href: "/privacy" },
      { name: "Cookie policy", href: "/cookies" },
    ],
    social: [
      {
        name: "Bluesky",
        href: "https://russ-fugal.smart-knowledge-systems.com",
        icon: BlueskyIcon,
      },
      {
        name: "LinkedIn",
        href: "https://linkedin.com/in/rfugal",
        icon: LinkedInIcon,
      },
      {
        name: "GitHub",
        href: "https://github.com/smart-knowledge-systems",
        icon: GitHubIcon,
      },
      {
        name: "YouTube",
        href: "#",
        icon: YouTubeIcon,
      },
    ],
  },
  categories: {
    solutions: "Services",
    support: "Resources",
    company: "About",
    legal: "Legal",
  },
};
