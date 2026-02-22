import Image from "next/image";
import { getPostWithMarkdown } from "@/lib/post-filters";
import NotFound from "@/app/not-found";
import MarkdownContent from "@/components/markdown-content";
import ReadMoreContent from "@/components/blog/read-more-content";
import Featured from "@/components/blog/featured";
import Author from "@/components/blog/author";
import CollapsibleComments from "@/components/blog/collapsible-comments";
import Subscribe from "@/components/blog/subscribe";
import { coverImages } from "@/lib/cover-images";
import { getAtprotoUri } from "@/lib/atproto-uris";

export default async function Post({ slug }: { slug: string }) {
  const [post, atUri] = await Promise.all([
    getPostWithMarkdown(slug),
    getAtprotoUri(slug),
  ]);

  if (!post) {
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
      <article className="mx-auto max-w-3xl text-gray-700">
        <p className="text-base/7 font-semibold text-indigo-600">
          {post.datetime.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <Author author={post.author} />
        {coverImages[slug] && (
          <Image
            src={coverImages[slug]}
            alt={post.title}
            className="mt-6 w-full rounded-lg"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        )}
        <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          {post.title}
        </h1>
        <div className="mt-6">
          <ReadMoreContent slug={slug} title={post.title}>
            <MarkdownContent content={post.body} />
          </ReadMoreContent>
        </div>
      </article>

      {atUri ? (
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[3fr_2fr] lg:gap-12">
            <CollapsibleComments atUri={atUri} />
            <Featured
              postCategories={post.categories}
              excludePosts={[post.id]}
              variant="sidebar"
              afterHeading={<Subscribe />}
            />
          </div>
        </div>
      ) : (
        <Featured
          postCategories={post.categories}
          excludePosts={[post.id]}
          afterHeading={<Subscribe />}
        />
      )}
    </div>
  );
}
