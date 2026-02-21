import { after } from "next/server";
import Post from "@/components/blog/post";
import Footer from "@/components/footer";
import Header from "@/components/header";
import ScrollLogger from "@/components/scroll-logger";
import { getPostWithMarkdown } from "@/lib/post-filters";
import { logEvent, logger } from "@/lib/axiom/server";
import { getCategorySlug } from "@/lib/category-utils";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch post for logging — uses cached getPostWithMarkdown (same as Post component)
  const post = await getPostWithMarkdown(slug);

  if (post) {
    // Log after response is sent (non-blocking)
    after(async () => {
      logEvent("blog.post.view", {
        post_slug: slug,
        post_title: post.title,
        post_id: post.id,
        categories: post.categories.map((cat) => getCategorySlug(cat.title)),
      });
      await logger.flush();
    });
  }

  return (
    <>
      <Header />
      <ScrollLogger
        eventName="blog.post.scroll"
        data={{
          post_slug: slug,
          post_title: post?.title ?? slug,
        }}
      />
      <Post slug={slug} />
      <Footer />
    </>
  );
}
