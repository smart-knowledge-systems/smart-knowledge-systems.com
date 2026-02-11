import Hero from "../components/marketing/hero";
import Footer from "../components/footer";
import Services from "@/components/marketing/services";
import Main from "@/components/marketing/main";
import Featured from "@/components/blog/featured";
import { categories } from "@/content/blog/posts";

const FEATURED_POST_CATEGORIES = [
  { ...categories.knowledgeManagement, priority: 2 },
  { ...categories.organizationalCulture, priority: 1 },
  { ...categories.technologyIntegration, priority: 3 },
];

export default function Page() {
  return (
    <div className="relative">
      <Hero />
      <Main />
      <Services />
      <Featured postCategories={FEATURED_POST_CATEGORIES} />
      <Footer />
    </div>
  );
}
