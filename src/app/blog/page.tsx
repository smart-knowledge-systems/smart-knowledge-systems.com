"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CategoryFilter from "@/components/blog/category-filter";
import PostList from "@/components/blog/post-list";
import BlogPagination from "@/components/blog/blog-pagination";
import SortButton from "@/components/blog/sort-button";
import { getPublishedPostsMetadata } from "@/lib/post-filters";
import { filterSortAndPaginatePosts, getAllCategoriesFromPosts } from "@/lib/client-post-filters";
import { getCategoryTitle } from "@/lib/category-utils";
import { Post } from "@/content/blog/posts";

function BlogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [allPublishedPosts, setAllPublishedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Parse URL parameters
  const categoriesParam = searchParams.get("categories");
  const pageParam = searchParams.get("page");
  const sortParam = searchParams.get("sort");

  const selectedCategories = useMemo(() =>
    categoriesParam ? categoriesParam.split(",").filter(Boolean) : [],
    [categoriesParam]
  );
  const currentPage = useMemo(() =>
    pageParam ? parseInt(pageParam, 10) : 1,
    [pageParam]
  );
  const sortDateAsc = useMemo(() =>
    sortParam === "desc" ? false : true, // Default to ascending, only false when explicitly "desc"
    [sortParam]
  );

  // Derived state from client-side filtering
  const availableCategories = useMemo(() =>
    getAllCategoriesFromPosts(allPublishedPosts),
    [allPublishedPosts]
  );

  const { posts, totalPages, totalPosts } = useMemo(() =>
    filterSortAndPaginatePosts(allPublishedPosts, selectedCategories, currentPage, 5, sortDateAsc),
    [allPublishedPosts, selectedCategories, currentPage, sortDateAsc]
  );

  // Update URL when filters, page, or sort changes
  const updateUrl = (newCategories: string[], newPage: number = 1, newSortDateAsc?: boolean) => {
    const params = new URLSearchParams();

    if (newCategories.length > 0) {
      params.set("categories", newCategories.join(","));
    }

    if (newPage > 1) {
      params.set("page", newPage.toString());
    }

    const sortToUse = newSortDateAsc !== undefined ? newSortDateAsc : sortDateAsc;
    if (!sortToUse) {
      params.set("sort", "desc");
    }
    // Don't set anything for ascending (default)

    const url = `/blog${params.toString() ? `?${params.toString()}` : ""}`;
    router.push(url);
  };

  // Handle category toggle
  const handleCategoryToggle = (newCategories: string[]) => {
    updateUrl(newCategories, 1); // Reset to page 1 when categories change
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    updateUrl(selectedCategories, newPage);
  };

  // Handle sort toggle
  const handleSortToggle = () => {
    updateUrl(selectedCategories, 1, !sortDateAsc); // Reset to page 1 when sort changes
  };

  // Handle individual category click from post list
  const handleCategoryClick = (categorySlug: string) => {
    if (selectedCategories.includes(categorySlug)) {
      // Remove category if already selected
      const newCategories = selectedCategories.filter(slug => slug !== categorySlug);
      handleCategoryToggle(newCategories);
    } else {
      // Add category if not selected
      const newCategories = [...selectedCategories, categorySlug];
      handleCategoryToggle(newCategories);
    }
  };

  // Load published posts once on mount
  useEffect(() => {
    const loadPublishedPosts = async () => {
      setLoading(true);
      try {
        const publishedPosts = await getPublishedPostsMetadata();
        setAllPublishedPosts(publishedPosts);
      } catch (error) {
        console.error("Error loading published posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPublishedPosts();
  }, []); // Only run once on mount

  return (
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
      <div className="bg-white py-4 border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Sort posts by date
            </div>
            <SortButton
              sortDateAsc={sortDateAsc}
              onSortToggle={handleSortToggle}
            />
          </div>
        </div>
      </div>
      <CategoryFilter
        availableCategories={availableCategories}
        selectedCategories={selectedCategories}
        onCategoryToggle={handleCategoryToggle}
      />

      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <p className="mt-2 text-lg leading-8 text-gray-600">
              {totalPosts} {totalPosts === 1 ? 'post' : 'posts'} found
            </p>
            {selectedCategories.length > 0 ? (
              <p className="mt-2 text-lg leading-8 text-gray-600">
                Filtered by: {selectedCategories.map(slug => getCategoryTitle(slug)).join(", ")}
              </p>
            )
              : (
                <p className="mt-2 text-lg leading-8 text-gray-600">
                  All categories
                </p>
              )}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading posts...</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          <PostList posts={posts} onCategoryClick={handleCategoryClick} selectedCategories={selectedCategories} />

          <BlogPagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalPosts={totalPosts}
            categorySlugs={selectedCategories}
            onPageChange={handlePageChange}
          />
        </>
      )}

      <Footer />
    </div>
  );
}

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

export default function BlogPage() {
  return (
    <Suspense fallback={<BlogLoading />}>
      <BlogContent />
    </Suspense>
  );
}
