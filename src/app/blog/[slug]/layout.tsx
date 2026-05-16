import type { Metadata } from "next";
import { fetchDocument } from "@/lib/atproto-feed";
import { metadata as rootMetadata } from "@/app/layout";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchDocument(slug);
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
      ...(post.coverImageUrl && {
        images: [{ url: post.coverImageUrl }],
      }),
    },
  };
}

export default async function BlogPostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchDocument(slug);
  const atUri = post?.atUri;
  return (
    <>
      {atUri && <link rel="site.standard.document" href={atUri} />}
      {children}
    </>
  );
}
