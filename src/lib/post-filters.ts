import { postsData, getMarkdownContent, Post, Category } from "@/content/blog/posts";

export const getPostsWithMarkdown = async (posts: Post[]) => {
  const fullPosts = posts.map((post) => ({
    ...post,
    body: getMarkdownContent(post.href) || post.body,
  }));
  return fullPosts;
};

export const getPostWithMarkdown = async (slug: string): Promise<Post | undefined> => {
  const post = postsData.find((post) => post.href === `/blog/${slug}`);
  if (!post) {
    return undefined;
  }
  // Check if the post is in the future
  const postDate = new Date(post.datetime);
  const currentDate = new Date();
  if (postDate > currentDate) {
    return undefined;
  }
  // Fetch the markdown content
  const body = await getMarkdownContent(post.href) || post.body;
  const fullPost = { ...post, body };
  return fullPost;
};

export const getPost = async (slug: string): Promise<Post | undefined> => {
  const post = postsData.find((post) => post.href === slug);
  if (!post) {
    return undefined;
  }
  const fullPost = { ...post, body: await getMarkdownContent(post.href) || post.body };
  return fullPost;
};

/**
 * Get featured posts based on categories and their priorities.
 * @param categories - Array of categories with optional priorities (defaults to 1).
 * @returns Array of featured posts.
 */
export const getFeaturedPosts = async (
  categories: Category[],
  limit: number,
) => {
  const categoryWeights = Object.fromEntries(
    categories.map((cat) => [
      cat.title,
      cat.priority ?? 1,
    ]), // Use nullish coalescing
  );
  // first filter out future posts
  const currentPosts = postsData.filter((post) => {
    const postDate = new Date(post.datetime);
    const currentDate = new Date();
    return postDate <= currentDate;
  });

  const filteredPosts = categories.length > 0 ? currentPosts.filter((post) =>
    post.categories.some((cat) =>
      categories.some(
        (c) => c.title === cat.title,
      ),
    ),
  ) : currentPosts;

  return filteredPosts
    .sort((a, b) => {
      const aScore = a.categories.reduce(
        (score, cat) =>
          score +
          (categoryWeights[cat.title] || 0),
        0,
      );
      const bScore = b.categories.reduce(
        (score, cat) =>
          score +
          (categoryWeights[cat.title] || 0),
        0,
      );
      return bScore - aScore;
    })
    .slice(0, limit);
};
