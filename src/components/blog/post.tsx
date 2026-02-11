import { getPostWithMarkdown } from "@/lib/post-filters";
import NotFound from "@/app/not-found";
import MarkdownContent from "@/components/markdown-content";
import Featured from "@/components/blog/featured";
import Author from "@/components/blog/author";

export default async function Post({ slug }: { slug: string }) {
  const post = await getPostWithMarkdown(slug);
  if (!post) {
    // return 404 if post not found
    return (
      <NotFound
        msg={{
          heading: "Post not Found",
          message: `The post you are looking for,  ${slug}, does not exist.`,
        }}
      />
    );
  }
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-gray-700">
        <p className="text-base/7 font-semibold text-indigo-600">
          {post.datetime.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <Author author={post.author} />
        <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          {post.title}
        </h1>
        <div className="mt-6">
          <MarkdownContent content={post.body} />
        </div>
      </div>
      <Featured postCategories={post.categories} excludePosts={[post.id]} />
    </div>
  );
}
