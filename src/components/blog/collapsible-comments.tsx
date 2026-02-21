"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import BlueskyComments from "@/components/blog/bluesky-comments";

const COLLAPSED_HEIGHT = 500;
const COLLAPSE_BUFFER = 50;

export default function CollapsibleComments({ atUri }: { atUri: string }) {
  const [expanded, setExpanded] = useState(false);
  const [needsCollapse, setNeedsCollapse] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const [animating, setAnimating] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new ResizeObserver(() => {
      if (wrapperRef.current) {
        const height = wrapperRef.current.scrollHeight;
        setContentHeight(height);
        setNeedsCollapse(height > COLLAPSED_HEIGHT + COLLAPSE_BUFFER);
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleExpand = () => {
    setAnimating(true);
    setExpanded(true);
  };

  const handleCollapse = () => {
    setAnimating(true);
    setExpanded(false);
    containerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const maxHeight = needsCollapse
    ? expanded
      ? contentHeight
      : COLLAPSED_HEIGHT
    : undefined;

  return (
    <div ref={containerRef}>
      <div
        className={`relative overflow-hidden${animating ? " transition-[max-height] duration-500 ease-in-out motion-reduce:transition-none" : ""}`}
        style={{
          maxHeight: maxHeight !== undefined ? `${maxHeight}px` : undefined,
        }}
      >
        <div ref={wrapperRef}>
          <BlueskyComments atUri={atUri} />
        </div>
        {needsCollapse && !expanded && (
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
        )}
      </div>
      {needsCollapse && (
        <button
          onClick={expanded ? handleCollapse : handleExpand}
          className="mt-4 flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          {expanded ? (
            <>
              Show fewer <ChevronUp className="size-4" />
            </>
          ) : (
            <>
              Show all comments <ChevronDown className="size-4" />
            </>
          )}
        </button>
      )}
    </div>
  );
}
