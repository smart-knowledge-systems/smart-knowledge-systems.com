import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose prose-pretty max-w-none">
      <Markdown rehypePlugins={[remarkGfm]}>{content}</Markdown>
    </div>
  );
}
