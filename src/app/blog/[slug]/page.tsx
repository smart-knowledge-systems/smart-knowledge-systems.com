import { after } from "next/server";
import Post from "@/components/blog/post";
import Footer from "@/components/footer";
import Header from "@/components/header";
import ScrollLogger from "@/components/scroll-logger";
import { fetchAllDocuments, fetchDocument } from "@/lib/atproto-feed";
import { logEvent, logger } from "@/lib/axiom/server";
import { getCategorySlug } from "@/lib/category-utils";

// 7-day ISR — on-demand revalidation via /api/revalidate clears the cache on publish.
export const revalidate = 604800;

export async function generateStaticParams() {
  const posts = await fetchAllDocuments();
  return posts.map((p) => ({ slug: p.href.replace("/blog/", "") }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchDocument(slug);

  if (post) {
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
