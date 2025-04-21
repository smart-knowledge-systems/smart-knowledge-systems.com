import { getPostWithMarkdown } from "@/lib/post-filters";
import NotFound from "@/app/not-found";
import MarkdownContent from "@/components/markdown-content";
import Featured from "@/components/blog/featured";
import Image from "next/image";

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
        {/* <div> */}
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

interface AuthorProps {
  name: string;
  href: string;
  imageUrl: string;
  role: string;
}

const Author = ({ author }: { author: AuthorProps }) => {
  return (
    <div className="relative mt-8 flex items-center gap-x-4">
      <Image
        alt=""
        src={author.imageUrl}
        className="size-10 rounded-full bg-gray-50"
        width={40}
        height={40}
      />
      <div className="text-sm/6">
        <p className="font-semibold text-gray-900">
          <a href={author.href}>
            <span className="absolute inset-0" />
            {author.name}
          </a>
        </p>
        <p className="text-gray-600">{author.role}</p>
      </div>
    </div>
  );
};
