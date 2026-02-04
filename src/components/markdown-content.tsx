"use server";

import { MarkdownAsync } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

export default async function MarkdownContent({
  content,
}: {
  content: string;
}) {
  return (
    <div className="prose prose-pretty max-w-none">
      <MarkdownAsync
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypePrettyCode]}
      >
        {content}
      </MarkdownAsync>
    </div>
  );
}
