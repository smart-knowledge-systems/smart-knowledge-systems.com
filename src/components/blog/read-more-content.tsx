"use client";

import { useState, useRef, useEffect } from "react";
import ChevronDownIcon from "@heroicons/react/24/outline/ChevronDownIcon";
import { logClientEvent } from "@/lib/axiom/client";

const COLLAPSED_HEIGHT = 480;
const OVERFLOW_BUFFER = 60;

interface ReadMoreContentProps {
  slug: string;
  title: string;
  children: React.ReactNode;
}

export default function ReadMoreContent({
  slug,
  title,
  children,
}: ReadMoreContentProps) {
  const [expanded, setExpanded] = useState(false);
  const [needsExpansion, setNeedsExpansion] = useState(true);
  const [fullHeight, setFullHeight] = useState<number | null>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (innerRef.current) {
      const h = innerRef.current.scrollHeight;
      setNeedsExpansion(h > COLLAPSED_HEIGHT + OVERFLOW_BUFFER);
    }
  }, []);

  const handleReadMore = () => {
    const h = innerRef.current?.scrollHeight ?? null;
    setFullHeight(h);
    setExpanded(true);
    logClientEvent("blog.post.read_more", {
      post_slug: slug,
      post_title: title,
    });
  };

  return (
    <div className="relative">
      <div
        className="overflow-hidden transition-[max-height] duration-700 ease-in-out"
        style={{
          maxHeight:
            !needsExpansion || expanded
              ? fullHeight !== null
                ? `${fullHeight}px`
                : "none"
              : `${COLLAPSED_HEIGHT}px`,
        }}
      >
        <div ref={innerRef}>{children}</div>
      </div>

      {needsExpansion && !expanded && (
        <>
          {/* Gradient fade over the bottom of the text */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-white via-white/70 to-transparent"
          />
          {/* Read more button floating above the fade */}
          <div className="absolute inset-x-0 bottom-5 flex justify-center">
            <button
              onClick={handleReadMore}
              className="group inline-flex items-center gap-2 rounded-full bg-indigo-600 px-7 py-2.5 text-sm font-semibold text-white shadow-lg ring-1 ring-indigo-500/20 transition-all hover:bg-indigo-500 hover:shadow-indigo-200 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Read more
              <ChevronDownIcon
                aria-hidden="true"
                className="size-4 transition-transform duration-200 group-hover:translate-y-0.5"
              />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
