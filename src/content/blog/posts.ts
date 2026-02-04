type Author = {
  name: string;
  role: string;
  href: string;
  imageUrl: string;
};

export type Category = {
  title: string;
  href: string;
  priority?: number;
};

export type Post = {
  id: number;
  title: string;
  href: string;
  description: string;
  datetime: Date;
  categories: Category[];
  author: Author;
  body: string; // markdown content
};

// Common author data
const russAuthor: Author = {
  name: "Russ Fugal",
  role: "Organizational Transformation Specialist",
  href: "/#about",
  imageUrl: "/avatar.jpg",
};

// Categories
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
};

export const postsData: Post[] = [
  {
    id: 22,
    title: "The Door Is Open: AI-Powered Entrepreneurship and the Start School Promise",
    href: "/blog/start-school-ai-entrepreneurship",
    description:
      "At SUMMIT 2026, Clint Betts asked a question that cuts to the heart of entrepreneurship: 'Who gets to be an entrepreneur?' The answer should be anyone. But that's not how it's worked. Until now. Start School and AI tools like Claude Code are opening doors that were locked for decades.",
    datetime: new Date("2026-02-04"),
    categories: [
      { ...categories.technologyIntegration, priority: 1 },
      { ...categories.leadership, priority: 2 },
      { ...categories.organizationalCulture, priority: 3 },
    ],
    author: russAuthor,
    body: "",
  },
  {
    id: 21,
    title: "The Friction Paradox",
    href: "/blog/friction",
    description:
      "The resistance we typically try to eliminate – the difficulty of translating between departments, the effort of integration, the discomfort of changing workflows – isn't a barrier to organizational learning. It's the mechanism through which real knowledge emerges. When organizations embrace productive friction rather than seeking frictionless solutions, they create the conditions for genuine transformation.",
    datetime: new Date("2025-09-04"),
    categories: [
      { ...categories.knowledgeManagement, priority: 2 },
      { ...categories.technologyIntegration, priority: 3 },
      { ...categories.organizationalCulture, priority: 1 },
      { ...categories.teamCollaboration, priority: 4 },
    ],
    author: russAuthor,
    body: "",
  },
  {
    id: 20,
    title: "Crossing the GenAI Divide",
    href: "/blog/crossing-the-divide",
    description:
      "The recently released State of AI in Business 2025 report has been making waves with its stark conclusion: despite billions of dollars invested, 95% of organizations are realizing little to no measurable impact from generative AI initiatives.",
    datetime: new Date("2025-08-24"),
    categories: [
      { ...categories.knowledgeManagement, priority: 1 },
      { ...categories.technologyIntegration, priority: 2 },
    ],
    author: russAuthor,
    body: "# What AI in Business Teaches Us About Knowledge Systems",
  },
  {
    id: 19,
    title: "Dialog, Parlay, and the Art of Structured Conversation",
    href: "/blog/dialog-and-parlay",
    description:
      "Exploring how structured dialogue tools like Dialog, Synthialog, and Parlay Ideas can transform organizational conversations from isolated posts to meaningful knowledge creation through democratic, context-rich collaboration.",
    datetime: new Date("2025-07-05"),
    categories: [
      { ...categories.teamCollaboration, priority: 1 },
      { ...categories.knowledgeManagement, priority: 2 },
      { ...categories.technologyIntegration, priority: 3 },
      { ...categories.organizationalCulture, priority: 4 },
    ],
    author: russAuthor,
    body: "# From Posts to Knowledge: The Power of Structured Dialogue",
  },
  {
    id: 18,
    title: "My AI Research Assistant",
    href: "/blog/my-ai-research-assistant",
    description:
      "Generative AI is transforming the workplace, but its impact on knowledge management is often misunderstood. Learn how AI can help organize your “academic dinner party” by identifying relevant literature while ensuring human expertise remains central to knowledge creation and analysis.",
    datetime: new Date("2025-05-05"),
    categories: [
      { ...categories.knowledgeManagement, priority: 3 },
      { ...categories.technologyIntegration, priority: 4 },
      { ...categories.teamCollaboration, priority: 2 },
      { ...categories.organizationalCulture, priority: 1 },
    ],
    author: russAuthor,
    body: `## How I Use AI in Creating Knowledge-Sharing Ecosystems

In today's academic environment, we're flooded with an overwhelming amount of information. With millions of articles published yearly, finding and prioritizing relevant content has become increasingly challenging. Over the past year, I've been experimenting with AI tools to help me navigate this landscape, using them as research assistants while maintaining my human judgment and scholarly approach.`,
  },
  {
    id: 17,
    title: "Knowledge Emerges Through Conversation",
    href: "/blog/knowledge-emerges",
    description:
      "Organizations invest millions in sophisticated information systems yet struggle to leverage what they collectively know. Discover why knowledge emerges through conversation and how to create environments where valuable insights naturally develop.",
    datetime: new Date("2025-03-14"),
    categories: [
      {
        ...categories.knowledgeManagement,
        priority: 1,
      },
      { ...categories.teamCollaboration, priority: 2 },
      {
        ...categories.organizationalCulture,
        priority: 3,
      },
      { ...categories.leadership, priority: 4 },
    ],
    author: russAuthor,
    body: `# Beyond Information Overload

  In today's digital environment, we're drowning in information while starving for knowledge. Organizations invest millions in sophisticated information systems and vast data repositories, yet continue to struggle with the same problems: duplicate efforts, missed opportunities, and an inability to leverage what the organization collectively "knows."

  Why does this disconnect persist?

  ## Information Flows, Knowledge Grows

  The fundamental mistake many organizations make is treating information and knowledge as interchangeable. They're not.`,
  },
  {
    id: 1,
    title: "The Cost of Information Silos",
    href: "/blog/hidden-cost-information-silos",
    description:
      "Information silos might seem like just an annoyance, but their true cost extends far beyond frustration. Learn about the four hidden costs that are impacting your organization’s performance and innovation.",
    datetime: new Date("2025-03-21"),
    categories: [
      {
        ...categories.knowledgeManagement,
        priority: 2,
      },
      {
        ...categories.organizationalCulture,
        priority: 1,
      },
    ],
    author: russAuthor,
    body: `# The Hidden Cost of Information Silos: What They're Really Costing Your Business

Information silos might seem like just an annoyance—that moment when you discover another team has been working on the same problem, or when critical knowledge fails to reach decision-makers. But the true cost extends far beyond frustration.

## The Four Hidden Costs...`, // Truncated for brevity
  },
  {
    id: 2,
    title: "Beyond the Tech Fix",
    href: "/blog/beyond-tech-fix",
    description:
      "Despite significant investments in knowledge management systems, many organizations struggle with adoption and effectiveness. Discover why technology alone can’t solve your information silo problems.",
    datetime: new Date("2025-03-28"),
    categories: [
      {
        ...categories.knowledgeManagement,
        priority: 1,
      },
      {
        ...categories.technologyIntegration,
        priority: 2,
      },
    ],
    author: russAuthor,
    body: `# Beyond the Tech Fix: Why Your Knowledge Management System Isn't Working

"We spent a fortune on a knowledge management system that nobody uses."

I hear some version of this lament from nearly every client I work with. The pattern is distressingly familiar: An organization recognizes its information silo problem, invests in a technology solution, and then watches in disappointment as adoption languishes and information remains stubbornly stuck.`,
  },
  {
    id: 3,
    title: "Specialists vs. Generalists",
    href: "/blog/specialists-vs-generalists",
    description:
      "Modern organizations need both specialists and generalists, but communication barriers between them can create significant challenges. Learn how to build connective tissue between expert domains.",
    datetime: new Date("2025-04-05"),
    categories: [
      { ...categories.teamCollaboration, priority: 2 },
      {
        ...categories.knowledgeManagement,
        priority: 1,
      },
    ],
    author: russAuthor,
    body: `# Specialists vs. Generalists: Building Teams That Speak Each Other's Language

Modern organizations face a fundamental tension. On one hand, the complexity of today's business environment demands deep specialists—people with expertise in increasingly narrow domains. On the other hand, solving complex problems requires integration across these specialized domains, which becomes more difficult as the knowledge gaps between specialists widen.`,
  },
  {
    id: 4,
    title: "Leading for Information Flow",
    href: "/blog/leading-information-flow",
    description:
      "Leadership isn’t just about making decisions — it’s about ensuring people have the information they need to execute effectively. Discover practical leadership behaviors that improve information flow throughout your organization.",
    datetime: new Date("2025-04-21"),
    categories: [
      { ...categories.leadership, priority: 1 },
      {
        ...categories.knowledgeManagement,
        priority: 1,
      },
    ],
    author: russAuthor,
    body: `# Simple Practices That Break Down Barriers

Leadership isn't just about making decisions—it's about ensuring people have the information they need to execute effectively. Yet many leaders unintentionally create or maintain information silos through their everyday behaviors and practices.`,
  },
  {
    id: 5,
    title: "When AI Meets Human Expertise",
    href: "/blog/ai-meets-human-expertise",
    description:
      "Artificial intelligence is transforming knowledge management, but it's not a magic solution. Learn how to thoughtfully integrate AI capabilities with human judgment for more effective knowledge systems.",
    datetime: new Date("2025-05-05"),
    categories: [
      { ...categories.technologyIntegration },
      { ...categories.knowledgeManagement },
    ],
    author: russAuthor,
    body: `# Practical Approaches to Smart Knowledge Systems

Artificial intelligence is transforming how organizations manage knowledge. But AI isn't a magic solution for information silos—it's a powerful tool that must be thoughtfully integrated with human expertise and organizational processes.`,
  },
  {
    id: 6,
    title: "Creating Conversations That Matter",
    href: "/blog/conversations-that-matter",
    description:
      "Meetings are often maligned as wasteful, but they can be powerful tools for breaking down information silos when designed correctly. Discover five meeting formats specifically designed to promote knowledge exchange.",
    datetime: new Date("2025-05-26"),
    categories: [
      { ...categories.teamCollaboration },
      { ...categories.organizationalCulture },
    ],
    author: russAuthor,
    body: `# The Meeting That Changed Everything: Creating Conversations That Matter

Meetings are the primary forum for knowledge exchange in most organizations. Yet they're also among the most maligned aspects of organizational life—criticized as wasteful, boring, and ineffective. This paradox reveals a crucial insight: the problem isn't meetings themselves, but how we structure and conduct them.`,
  },
  {
    id: 7,
    title: "Break Down Any Information Silo",
    href: "/blog/break-down-any-silo",
    description:
      "Information silos persist because they're structural, built into how organizations divide work. Discover three simple questions that can begin breaking down even the most entrenched information barriers.",
    datetime: new Date("2025-06-02"),
    categories: [
      { ...categories.knowledgeManagement },
      { ...categories.organizationalCulture },
    ],
    author: russAuthor,
    body: `# Three Questions That Break Down Any Information Silo

Information silos are persistent because they're structural—built into how organizations divide work, specialize roles, and separate functions. While comprehensive solutions often require systematic change, I've found that three simple questions can begin breaking down even the most entrenched information barriers.`,
  },
  {
    id: 8,
    title: "Lessons From the Field",
    href: "/blog/lessons-from-the-field",
    description:
      "Traditional project management focuses on scope, schedule, and resources, but success depends more on how effectively information flows. Learn how to evolve your approach to unlock higher performance.",
    datetime: new Date("2025-06-10"),
    categories: [
      { ...categories.projectManagement },
      { ...categories.leadership },
    ],
    author: russAuthor,
    body: `# From Project Management to Knowledge Leadership: Lessons From the Field

My journey from traditional project management to knowledge leadership wasn't planned. It evolved naturally as I recognized a pattern across projects: success depended less on formal processes and more on how effectively information flowed between team members and stakeholders.`,
  },
  {
    id: 9,
    title: "The Collaboration Toolkit",
    href: "/blog/collaboration-toolkit",
    description:
      "Cross-functional teams hold enormous potential, but often struggle with miscommunication and ineffective knowledge sharing. Discover practical tools that can help your team unlock its full collaborative potential.",
    datetime: new Date("2025-06-17"),
    categories: [
      { ...categories.teamCollaboration },
      { ...categories.knowledgeManagement },
    ],
    author: russAuthor,
    body: `# The Collaboration Toolkit: Practical Tools for Cross-Functional Teams

Cross-functional teams hold enormous potential. By bringing together diverse perspectives and expertise, they can solve complex problems, drive innovation, and create integrated solutions that siloed approaches can't match.`,
  },
  {
    id: 10,
    title: "One Organization Transformed Its Information Flow",
    href: "/blog/case-study-information-flow",
    description:
      "Organizations often approach knowledge management as a years-long transformation requiring extensive investments. Learn how one manufacturing company achieved significant improvements in just 90 days with targeted interventions.",
    datetime: new Date("2027-10-24"),
    categories: [
      { ...categories.knowledgeManagement },
      { ...categories.organizationalCulture },
    ],
    author: russAuthor,
    body: `# Case Study: How One Organization Transformed Its Information Flow in 90 Days

Organizations often approach knowledge management as a years-long transformation requiring extensive technology investments and cultural change. While comprehensive transformation certainly takes time, significant improvements in information flow can happen remarkably quickly with targeted interventions.`,
  },
  {
    id: 11,
    title: "Creating Psychosocial Safety",
    href: "/blog/creating-psychosocial-safety",
    description:
      "In today's knowledge economy, an organization's most valuable asset is the minds of its people. Learn why small organizations need to prioritize psychosocial safety to thrive.",
    datetime: new Date("2027-11-01"),
    categories: [
      { ...categories.organizationalCulture },
      { ...categories.leadership },
    ],
    author: russAuthor,
    body: `# Creating Psychosocial Safety: Why Small Organizations Need to Prioritize Mental Wellbeing

In today's knowledge economy, an organization's most valuable asset isn't its technology, physical infrastructure, or even intellectual property—it's the minds of its people. Yet many small organizations continue to focus primarily on physical safety while neglecting the psychosocial environment that determines whether those minds thrive or struggle.`,
  },
  {
    id: 12,
    title: "The Dialogue Difference",
    href: "/blog/dialogue-difference",
    description:
      "When organizations attempt to improve psychosocial safety, they often start with formal assessments and policies. Discover how changing conversations can transform organizational reality more effectively.",
    datetime: new Date("2027-11-08"),
    categories: [
      { ...categories.organizationalCulture },
      { ...categories.teamCollaboration },
    ],
    author: russAuthor,
    body: `# The Dialogue Difference: Transforming Psychosocial Safety Through Conversation

When organizations attempt to improve psychosocial safety, they often start with formal assessments, policies, and procedures. While these structures are important, they miss something essential: the power of dialogue to transform organizational reality.`,
  },
  {
    id: 13,
    title: "Psychosocial Safety in Small Organizations",
    href: "/blog/beyond-assessment",
    description:
      "Small organizations face challenges when addressing psychosocial safety, but their size creates opportunities for more collaborative approaches. Learn about participatory action approaches to psychosocial safety.",
    datetime: new Date("2027-11-15"),
    categories: [
      { ...categories.organizationalCulture },
      { ...categories.teamCollaboration },
    ],
    author: russAuthor,
    body: `# Beyond Assessment: Participatory Approaches to Psychosocial Safety in Small Organizations

Small organizations face a dual challenge when addressing psychosocial safety. On one hand, their limited resources make formal assessment and intervention programs difficult to implement. On the other hand, their smaller size creates opportunities for more collaborative, participatory approaches that can be even more effective than traditional methods.`,
  },
  {
    id: 14,
    title: "The Knowledge-Safety Connection",
    href: "/blog/knowledge-safety-connection",
    description:
      "The relationship between information flow and psychological wellbeing is often overlooked. Discover how information silos directly impact the psychological health of everyone in your organization.",
    datetime: new Date("2027-11-22"),
    categories: [
      { ...categories.knowledgeManagement },
      { ...categories.organizationalCulture },
    ],
    author: russAuthor,
    body: `# The Knowledge-Safety Connection: How Information Silos Impact Psychological Health

The relationship between information flow and psychological wellbeing remains one of the most overlooked connections in organizational health. While we often treat knowledge management and psychosocial safety as separate concerns, the reality is that they're deeply intertwined—information silos don't just impede operational efficiency; they directly impact the psychological health of everyone in your organization.`,
  },
  {
    id: 15,
    title: "Expanding Your Leadership Impact",
    href: "/blog/project-manager-wellbeing-catalyst",
    description:
      "Project managers have always been more than just schedulers and task trackers. Learn how to leverage your project management superpowers to become a catalyst for psychosocial safety.",
    datetime: new Date("2027-11-29"),
    categories: [
      { ...categories.projectManagement },
      { ...categories.leadership },
      { ...categories.organizationalCulture },
    ],
    author: russAuthor,
    body: `# From Project Manager to Wellbeing Catalyst: Expanding Your Leadership Impact

Project managers have always been more than just schedulers and task trackers. At their best, they're integrators who connect people, resources, and objectives to deliver meaningful outcomes. Today, this integration role has never been more important—particularly when it comes to fostering environments where psychological wellbeing and performance can coexist.`,
  },
  {
    id: 16,
    title: "Psychosocial Risk Assessment for Resource-Constrained Teams",
    href: "/blog/measuring-what-matters",
    description:
      "Organizations need to assess psychosocial risks, but formal processes can overwhelm small teams. Learn practical approaches that provide valuable insights without breaking the bank.",
    datetime: new Date("2027-12-06"),
    categories: [
      { ...categories.organizationalCulture },
      { ...categories.leadership },
    ],
    author: russAuthor,
    body: `# Measuring What Matters: Simple Approaches to Psychosocial Risk Assessment for Resource-Constrained Teams

The message is clear: organizations need to assess and address psychosocial risks in the workplace. But for small organizations with limited resources, the prospect of implementing formal assessment processes often feels overwhelming. Between tight budgets, minimal HR support, and leaders already wearing multiple hats, comprehensive assessments can seem like a luxury rather than a necessity.`,
  },
];
