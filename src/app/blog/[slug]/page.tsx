import Post from "@/components/blog/post";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <>
      <Post slug={slug} />;
    </>
  );
}
