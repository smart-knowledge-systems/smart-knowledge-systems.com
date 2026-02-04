import Post from "@/components/blog/post";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { getPostWithMarkdown } from "@/lib/post-filters";
import { logEvent, logger } from "@/lib/axiom/server";
import { getCategorySlug } from "@/lib/category-utils";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch post data for logging
  const post = await getPostWithMarkdown(slug);

  if (post) {
    // Log the blog post view
    logEvent("blog.post.view", {
      post_slug: slug,
      post_title: post.title,
      post_id: post.id,
      categories: post.categories.map((cat) => getCategorySlug(cat.title)),
    });

    // Flush logs for the server request
    await logger.flush();
  }

  return (
    <>
      <Header />
      <Post slug={slug} />;
      <Footer />
    </>
  );
}
