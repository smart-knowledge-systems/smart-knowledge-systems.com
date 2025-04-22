import Featured from "@/components/blog/featured";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default async function Page() {
  return (
    <div className="h-full pt-12">
      <Header />
      <Featured postCategories={[]} />
      <Footer />
    </div>
  );
}
