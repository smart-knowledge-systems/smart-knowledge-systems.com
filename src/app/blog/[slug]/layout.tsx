import type { Metadata } from "next";
import { getPost } from "@/lib/post-filters";
import { metadata as rootMetadata } from "@/app/layout";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(`/blog/${slug}`);
  if (!post) {
    return {
      title: "Post not found",
      description: "The post you are looking for does not exist.",
    };
  }
  return {
    ...rootMetadata,
    title: `${post.title} | Smart Systems`,
    description: post.description,
    openGraph: {
      ...rootMetadata.openGraph,
      title: post.title,
      description: post.description,
      url: "https://smart-knowledge-systems.com/blog/" + slug,
    },
  };
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
