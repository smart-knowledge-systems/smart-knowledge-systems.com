"use client";

import Image from "next/image";
import { Post } from "@/content/blog/posts";
import { getCategorySlug } from "@/lib/category-utils";
import { Button } from "@/components/ui/button";

interface PostListProps {
  posts: Post[];
  onCategoryClick: (categorySlug: string) => void;
  selectedCategories: string[];
}

export default function PostList({
  posts,
  onCategoryClick,
  selectedCategories,
}: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900">
              No posts found
            </h3>
            <p className="mt-2 text-gray-600">
              Try adjusting your category filters or check back later for new
              content.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid gap-16 lg:gap-y-20">
            {posts.map((post) => (
              <article
                key={post.id}
                className="flex max-w-none flex-col lg:flex-row lg:items-start lg:gap-x-8"
              >
                <div className="flex flex-1 flex-col">
                  <div className="flex items-center gap-x-4 text-xs">
                    <time
                      dateTime={post.datetime.toISOString()}
                      className="text-gray-500"
                    >
                      {post.datetime.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                    {post.categories
                      .toSorted((a, b) => (a.priority ?? 1) - (b.priority ?? 1))
                      .map((category) => {
                        const categorySlug = getCategorySlug(category.title);
                        const isSelected =
                          selectedCategories.includes(categorySlug);

                        return (
                          <Button
                            key={category.title}
                            variant={isSelected ? "toggled" : "outline"}
                            onClick={() => onCategoryClick(categorySlug)}
                            className="relative z-10 rounded-full px-3 py-1.5 font-medium"
                          >
                            {category.title}
                          </Button>
                        );
                      })}
                  </div>

                  <div className="group relative mt-3">
                    <h2 className="text-2xl font-semibold tracking-tight text-gray-900 group-hover:text-gray-600 lg:text-3xl">
                      <a href={post.href}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </a>
                    </h2>
                    <p className="mt-4 text-lg leading-7 text-gray-600 lg:mt-5">
                      {post.description}
                    </p>
                  </div>

                  <div className="relative mt-6 flex items-center gap-x-4">
                    <Image
                      alt=""
                      src={post.author.imageUrl}
                      className="size-10 rounded-full bg-gray-50"
                      width={40}
                      height={40}
                    />
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">
                        <a href={post.author.href}>
                          <span className="absolute inset-0" />
                          {post.author.name}
                        </a>
                      </p>
                      <p className="text-gray-600">{post.author.role}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
