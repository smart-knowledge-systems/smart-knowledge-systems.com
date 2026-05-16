import Image from "next/image";
import { fetchDocument } from "@/lib/atproto-feed";
import { getMarkdownContent } from "@/content/blog/get-markdown";
import NotFound from "@/app/not-found";
import MarkdownContent from "@/components/markdown-content";
import ReadMoreContent from "@/components/blog/read-more-content";
import Featured from "@/components/blog/featured";
import Author from "@/components/blog/author";
import CollapsibleComments from "@/components/blog/collapsible-comments";
import Subscribe from "@/components/blog/subscribe";
import { coverImages } from "@/lib/cover-images";

export default async function Post({ slug }: { slug: string }) {
  const post = await fetchDocument(slug);
  const body = post?.body || (await getMarkdownContent(`/blog/${slug}`)) || "";

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

  const localImage = coverImages[slug];

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
        {localImage ? (
          <Image
            src={localImage}
            alt={post.title}
            className="mt-6 w-full rounded-lg"
            priority
            sizes="(max-width: 768px) 100vw, 768px"
          />
        ) : post.coverImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImageUrl}
            alt={post.title}
            className="mt-6 w-full rounded-lg"
          />
        ) : null}
        <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          {post.title}
        </h1>
        <div className="mt-6">
          <ReadMoreContent slug={slug} title={post.title}>
            <MarkdownContent content={body} />
          </ReadMoreContent>
        </div>
      </article>

      {post.atUri ? (
        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[3fr_2fr] lg:gap-12">
            <CollapsibleComments atUri={post.atUri} />
            <Featured
              postCategories={post.categories}
              excludeHrefs={[post.href]}
              variant="sidebar"
              afterHeading={<Subscribe />}
            />
          </div>
        </div>
      ) : (
        <Featured
          postCategories={post.categories}
          excludeHrefs={[post.href]}
          afterHeading={<Subscribe />}
        />
      )}
    </div>
  );
}
