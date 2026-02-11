"use client";

import {
  createContext,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getPublishedPosts } from "@/lib/post-filters";
import {
  filterSortAndPaginatePosts,
  getAllCategoriesFromPosts,
} from "@/lib/client-post-filters";
import { Post } from "@/content/blog/posts";

// ---------------------------------------------------------------------------
// Context interface (state / actions / meta)
// ---------------------------------------------------------------------------
interface BlogState {
  posts: Post[];
  selectedCategories: string[];
  currentPage: number;
  sortDateAsc: boolean;
  totalPages: number;
  totalPosts: number;
  loading: boolean;
}

interface BlogActions {
  toggleCategory: (categorySlug: string) => void;
  setCategories: (categorySlugs: string[]) => void;
  changePage: (page: number) => void;
  toggleSort: () => void;
}

interface BlogMeta {
  availableCategories: string[];
}

export interface BlogContextValue {
  state: BlogState;
  actions: BlogActions;
  meta: BlogMeta;
}

export const BlogContext = createContext<BlogContextValue | null>(null);

export function useBlog(): BlogContextValue {
  const ctx = use(BlogContext);
  if (!ctx) throw new Error("useBlog must be used within a BlogProvider");
  return ctx;
}

// ---------------------------------------------------------------------------
// Provider — owns all blog state, URL sync, and filtering logic
// ---------------------------------------------------------------------------
const POSTS_PER_PAGE = 5;

export function BlogProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [allPublishedPosts, setAllPublishedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Derive filter state directly from URL params (single source of truth)
  const categoriesParam = searchParams.get("categories");
  const pageParam = searchParams.get("page");
  const sortParam = searchParams.get("sort");

  const selectedCategories = useMemo(
    () => (categoriesParam ? categoriesParam.split(",").filter(Boolean) : []),
    [categoriesParam]
  );
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  const sortDateAsc = sortParam !== "desc";

  // Derived data
  const availableCategories = useMemo(
    () => getAllCategoriesFromPosts(allPublishedPosts),
    [allPublishedPosts]
  );

  const { posts, totalPages, totalPosts } = useMemo(
    () =>
      filterSortAndPaginatePosts(
        allPublishedPosts,
        selectedCategories,
        currentPage,
        POSTS_PER_PAGE,
        sortDateAsc
      ),
    [allPublishedPosts, selectedCategories, currentPage, sortDateAsc]
  );

  // Centralised URL builder
  const updateUrl = useCallback(
    (
      newCategories: string[],
      newPage: number = 1,
      newSortDateAsc?: boolean
    ) => {
      const params = new URLSearchParams();

      if (newCategories.length > 0) {
        params.set("categories", newCategories.join(","));
      }
      if (newPage > 1) {
        params.set("page", newPage.toString());
      }
      const sort = newSortDateAsc !== undefined ? newSortDateAsc : sortDateAsc;
      if (!sort) {
        params.set("sort", "desc");
      }

      router.push(`/blog${params.toString() ? `?${params.toString()}` : ""}`);
    },
    [router, sortDateAsc]
  );

  // Actions
  const toggleCategory = useCallback(
    (categorySlug: string) => {
      const newCategories = selectedCategories.includes(categorySlug)
        ? selectedCategories.filter((s) => s !== categorySlug)
        : [...selectedCategories, categorySlug];
      updateUrl(newCategories, 1);
    },
    [selectedCategories, updateUrl]
  );

  const setCategories = useCallback(
    (categorySlugs: string[]) => {
      updateUrl(categorySlugs, 1);
    },
    [updateUrl]
  );

  const changePage = useCallback(
    (page: number) => {
      updateUrl(selectedCategories, page);
    },
    [selectedCategories, updateUrl]
  );

  const toggleSort = useCallback(() => {
    updateUrl(selectedCategories, 1, !sortDateAsc);
  }, [selectedCategories, sortDateAsc, updateUrl]);

  // Load published posts on mount
  useEffect(() => {
    let cancelled = false;

    getPublishedPosts()
      .then((publishedPosts) => {
        if (!cancelled) setAllPublishedPosts(publishedPosts);
      })
      .catch((error) => {
        console.error("Error loading published posts:", error);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo<BlogContextValue>(
    () => ({
      state: {
        posts,
        selectedCategories,
        currentPage,
        sortDateAsc,
        totalPages,
        totalPosts,
        loading,
      },
      actions: { toggleCategory, setCategories, changePage, toggleSort },
      meta: { availableCategories },
    }),
    [
      posts,
      selectedCategories,
      currentPage,
      sortDateAsc,
      totalPages,
      totalPosts,
      loading,
      toggleCategory,
      setCategories,
      changePage,
      toggleSort,
      availableCategories,
    ]
  );

  return <BlogContext value={value}>{children}</BlogContext>;
}
