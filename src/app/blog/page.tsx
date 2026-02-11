"use client";

import { Suspense } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CategoryFilter from "@/components/blog/category-filter";
import PostList from "@/components/blog/post-list";
import BlogPagination from "@/components/blog/blog-pagination";
import SortButton from "@/components/blog/sort-button";
import { getCategoryTitle } from "@/lib/category-utils";
import { BlogProvider, useBlog } from "@/contexts/blog-context";

// ---------------------------------------------------------------------------
// Loading skeleton (shown while Suspense resolves searchParams)
// ---------------------------------------------------------------------------
function BlogLoading() {
  return (
    <div className="h-full pt-12">
      <Header />
      <div className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blog...</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Inline loading indicator (shown while posts are being fetched)
// ---------------------------------------------------------------------------
function BlogContentLoading() {
  return (
    <div className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading posts...</p>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// BlogContent — pure UI consumer of BlogContext
// ---------------------------------------------------------------------------
function BlogContent() {
  const { state, actions, meta } = useBlog();
  const {
    posts,
    selectedCategories,
    currentPage,
    sortDateAsc,
    totalPages,
    totalPosts,
    loading,
  } = state;

  if (loading) {
    return <BlogContentLoading />;
  }

  return (
    <>
      <div className="bg-white py-4 border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">Sort posts by date</div>
            <SortButton
              sortDateAsc={sortDateAsc}
              onSortToggle={actions.toggleSort}
            />
          </div>
        </div>
      </div>

      <CategoryFilter
        availableCategories={meta.availableCategories}
        selectedCategories={selectedCategories}
        onCategoryToggle={actions.setCategories}
      />

      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <p className="mt-2 text-lg leading-8 text-gray-600">
              {totalPosts} {totalPosts === 1 ? "post" : "posts"} found
            </p>
            {selectedCategories.length > 0 ? (
              <p className="mt-2 text-lg leading-8 text-gray-600">
                Filtered by:{" "}
                {selectedCategories
                  .map((slug) => getCategoryTitle(slug))
                  .join(", ")}
              </p>
            ) : (
              <p className="mt-2 text-lg leading-8 text-gray-600">
                All categories
              </p>
            )}
          </div>
        </div>
      </div>

      <PostList
        posts={posts}
        onCategoryClick={actions.toggleCategory}
        selectedCategories={selectedCategories}
      />

      <BlogPagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalPosts={totalPosts}
        onPageChange={actions.changePage}
      />
    </>
  );
}

// ---------------------------------------------------------------------------
// Page — wires provider around UI
// ---------------------------------------------------------------------------
export default function BlogPage() {
  return (
    <Suspense fallback={<BlogLoading />}>
      <BlogProvider>
        <div className="h-full pt-12">
          <Header />

          <div className="bg-white pt-24 sm:pt-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:mx-0">
                <h1 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                  From the blog
                </h1>
              </div>
            </div>
          </div>

          <BlogContent />

          <Footer />
        </div>
      </BlogProvider>
    </Suspense>
  );
}
