"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface PortfolioMarkdownProps {
  content: string;
  className?: string;
}

export default function PortfolioMarkdown({
  content,
  className = "",
}: PortfolioMarkdownProps) {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom components to maintain our styling
          h1: ({ children }) => (
            <h1 className="text-2xl font-bold text-gray-900">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-xl font-semibold text-gray-900">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold text-gray-900">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="text-gray-600 leading-relaxed">{children}</p>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          strong: ({ children }) => (
            <strong className="font-semibold">{children}</strong>
          ),
          code: ({ children }) => (
            <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">
              {children}
            </code>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-indigo-600 hover:text-indigo-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
