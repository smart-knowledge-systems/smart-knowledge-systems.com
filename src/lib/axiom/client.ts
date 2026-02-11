"use client";

import { Logger, AxiomJSTransport, ConsoleTransport } from "@axiomhq/logging";
import { createUseLogger, createWebVitalsComponent } from "@axiomhq/react";
import { axiom, dataset, getCoreEventFields } from "./axiom";

// Create client-side logger with Axiom transport
export const clientLogger = new Logger({
  transports: [
    new AxiomJSTransport({ axiom, dataset }),
    // Also log to console in development
    ...(process.env.NODE_ENV === "development" ? [new ConsoleTransport()] : []),
  ],
});

// Create the useLogger hook for components
export const useLogger = createUseLogger(clientLogger);

// Create the WebVitals component for performance monitoring
export const WebVitals = createWebVitalsComponent(clientLogger);

// Client-side wide event logging helper
export function logClientEvent(
  eventName: string,
  data: Record<string, unknown>
): void {
  const coreFields = getCoreEventFields();
  clientLogger.info(eventName, {
    ...coreFields,
    eventName,
    data,
  });
}

// Flush logs (use on page unload or session end) - with error handling (Issue #25)
export async function flushLogs(): Promise<void> {
  try {
    await clientLogger.flush();
  } catch (error) {
    console.error("Failed to flush logs:", error);
  }
}

// Re-export for convenience
export { clientLogger as logger };
