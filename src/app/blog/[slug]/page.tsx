import Post from "@/components/blog/post";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <>
      <Header />
      <Post slug={slug} />;
      <Footer />
    </>
  );
}
