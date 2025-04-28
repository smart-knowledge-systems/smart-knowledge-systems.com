import type { Metadata } from "next";
import { getPost } from "@/lib/post-filters";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    return {
      title: "Post not found",
      description: "The post you are looking for does not exist.",
    };
  }
  const dynamicMetadata: Metadata = {
    title: `${post.title} | Smart Systems`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: "https://smart-knowledge-systems.com/blog/" + slug,
    },
  };
  return dynamicMetadata;
};
