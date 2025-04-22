import Hero from "../components/marketing/hero";
import Footer from "../components/footer";
import Services from "@/components/marketing/services";
import Main from "@/components/marketing/main";
import Featured from "@/components/blog/featured";
import { categories } from "@/content/blog/posts";

export default function Page() {
  return (
    <div className="relative">
      <Hero />
      <Main />
      <Services />
      <Featured
        postCategories={[
          { ...categories.knowledgeManagement, priority: 2 },
          { ...categories.organizationalCulture, priority: 1 },
          { ...categories.technologyIntegration, priority: 3 },
        ]}
      />
      <Footer />
    </div>
  );
}
