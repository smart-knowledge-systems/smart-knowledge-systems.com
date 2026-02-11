// Centralized profile URLs
export const BLUESKY_PROFILE_URL =
  "https://bsky.app/profile/russ-fugal.smart-knowledge-systems.com";

// hero-content
import AcademicCapIcon from "@heroicons/react/24/outline/AcademicCapIcon";

export const navigation = [
  { name: "Services", href: "/#services" },
  { name: "Approach", href: "/#approach" },
  { name: "Resources", href: "/#resources" },
  { name: "About", href: "/about" },
  { name: "Portfolio", href: "/portfolio" },
];

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

// main-content
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

// services-content
import ClipboardDocumentCheckIcon from "@heroicons/react/24/outline/ClipboardDocumentCheckIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import CpuChipIcon from "@heroicons/react/24/outline/CpuChipIcon";

export const servicesData = {
  heading: "Break Down Information Silos, Build Knowledge Bridges",
  services: [
    {
      name: "Silo Assessment & Strategy",
      description:
        "Eliminate costly duplicate work and reduce project delays by pinpointing exactly where critical information breaks down between teams and creating targeted solutions that get information flowing again.",
      icon: ClipboardDocumentCheckIcon,
    },
    {
      name: "Team Collaboration Design",
      description:
        "Transform how teams communicate across departmental and technical boundaries by creating shared vocabularies and frameworks. Thoughtfully integrate generative AI as a navigator that bridges domains while promoting the human conversations essential for building shared knowledge and driving innovation.",
      icon: UsersIcon,
    },
    {
      name: "Technology Integration",
      description:
        "Maximize ROI on your technology investments by implementing systems people actually use, turning your knowledge management tools into productivity multipliers rather than expensive digital filing cabinets.",
      icon: CpuChipIcon,
    },
    {
      name: "Leadership Development",
      description:
        "Transform managers into knowledge catalysts who create healthy team environments where innovations emerge naturally, problems get solved faster, and expertise is automatically shared with those who need it most — all while supporting employee wellbeing and reducing workplace stress.",
      icon: AcademicCapIcon,
    },
  ],
};

// footer-content
import { SVGProps } from "react";

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
        icon: (props: SVGProps<SVGSVGElement>) => (
          <svg
            fill="currentColor"
            viewBox="0 0 600 530"
            width="24"
            height="24"
            {...props}
          >
            <path d="m135.72 44.03c66.496 49.921 138.02 151.14 164.28 205.46 26.262-54.316 97.782-155.54 164.28-205.46 47.98-36.021 125.72-63.892 125.72 24.795 0 17.712-10.155 148.79-16.111 170.07-20.703 73.984-96.144 92.854-163.25 81.433 117.3 19.964 147.14 86.092 82.697 152.22-122.39 125.59-175.91-31.511-189.63-71.766-2.514-7.3797-3.6904-10.832-3.7077-7.8964-0.0174-2.9357-1.1937 0.51669-3.7077 7.8964-13.714 40.255-67.233 197.36-189.63 71.766-64.444-66.128-34.605-132.26 82.697-152.22-67.108 11.421-142.55-7.4491-163.25-81.433-5.9562-21.282-16.111-152.36-16.111-170.07 0-88.687 77.742-60.816 125.72-24.795z" />
          </svg>
        ),
      },
      {
        name: "LinkedIn",
        href: "https://linkedin.com/in/rfugal",
        icon: (props: SVGProps<SVGSVGElement>) => (
          <svg
            fill="currentColor"
            viewBox="0 0 100 100"
            width="24"
            height="24"
            {...props}
          >
            <path d="M80.667,14H19.315C16.381,14,14,16.325,14,19.188v61.617C14,83.672,16.381,86,19.315,86h61.352 C83.603,86,86,83.672,86,80.805V19.188C86,16.325,83.603,14,80.667,14z M35.354,75.354H24.67V40.995h10.684V75.354z M30.012,36.297 c-3.423,0-6.19-2.774-6.19-6.194c0-3.415,2.767-6.189,6.19-6.189c3.415,0,6.189,2.774,6.189,6.189 C36.201,33.523,33.427,36.297,30.012,36.297z M75.35,75.354H64.683V58.646c0-3.986-0.078-9.111-5.551-9.111 c-5.558,0-6.405,4.341-6.405,8.822v16.998H42.052V40.995h10.245v4.692h0.146c1.426-2.7,4.91-5.549,10.106-5.549 c10.806,0,12.802,7.114,12.802,16.369V75.354z" />
          </svg>
        ),
      },
      {
        name: "GitHub",
        href: "https://github.com/smart-knowledge-systems",
        icon: (props: SVGProps<SVGSVGElement>) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
        ),
      },
      {
        name: "YouTube",
        href: "#",
        icon: (props: SVGProps<SVGSVGElement>) => (
          <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
            <path
              fillRule="evenodd"
              d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
              clipRule="evenodd"
            />
          </svg>
        ),
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
