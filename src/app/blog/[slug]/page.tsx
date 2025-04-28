import type { Metadata } from "next";
import Post from "@/components/blog/post";
import Footer from "@/components/footer";
import Header from "@/components/header";
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
