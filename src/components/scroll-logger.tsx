"use client";

import { useEffect, useRef } from "react";
import { logClientEvent } from "@/lib/axiom/client";
import type { EventData } from "@/lib/axiom/client";

interface ScrollLoggerProps {
  eventName: string;
  data: EventData;
}

/** Fires a single logClientEvent on the user's first scroll. Renders nothing. */
export default function ScrollLogger({ eventName, data }: ScrollLoggerProps) {
  const fired = useRef(false);
  // Capture initial values so the effect runs only once on mount.
  const eventNameRef = useRef(eventName);
  const dataRef = useRef(data);

  useEffect(() => {
    const onScroll = () => {
      if (fired.current) return;
      fired.current = true;
      logClientEvent(eventNameRef.current, dataRef.current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}
