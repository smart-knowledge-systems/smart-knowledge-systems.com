"use client";

import { useEffect } from "react";
import { logClientEvent, flushLogs } from "@/lib/axiom/client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to Axiom
    logClientEvent("infra.error.boundary", {
      error_name: error.name,
      error_message: error.message,
      error_digest: error.digest || "none",
      error_stack: error.stack?.slice(0, 500), // Truncate stack to avoid large payloads
      path:
        typeof window !== "undefined" ? window.location.pathname : "unknown",
    });

    // Flush logs immediately for error events
    flushLogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Something went wrong
        </h2>
        <p className="text-gray-600 mb-6">
          We apologize for the inconvenience. An error has occurred and our team
          has been notified.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
