import Hero from "../components/marketing/hero";
import Footer from "../components/footer";
import Services from "@/components/marketing/services";
import Main from "@/components/marketing/main";
import Featured from "@/components/blog/featured";
import Subscribe from "@/components/blog/subscribe";
import ScrollLogger from "@/components/scroll-logger";
import { categoryWithPriority as cp } from "@/content/blog/categories";

const FEATURED_POST_CATEGORIES = [
  cp.knowledgeManagement2,
  cp.organizationalCulture1,
  cp.technologyIntegration3,
];

export default function Page() {
  return (
    <div className="relative">
      <ScrollLogger eventName="page.scroll" data={{ page: "home" }} />
      <Hero />
      <Main />
      <Services />
      <Featured
        postCategories={FEATURED_POST_CATEGORIES}
        afterHeading={
          <div className="pl-6">
            <Subscribe />
          </div>
        }
      />
      <Footer />
    </div>
  );
}
