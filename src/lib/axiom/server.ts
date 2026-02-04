import { Logger, AxiomJSTransport, ConsoleTransport } from "@axiomhq/logging";
import { nextJsFormatters } from "@axiomhq/nextjs";
import { axiom, dataset, getCoreEventFields } from "./axiom";

// Create server-side logger with Axiom transport
export const logger = new Logger({
  transports: [
    new AxiomJSTransport({ axiom, dataset, ...nextJsFormatters }),
    // Also log to console in development
    ...(process.env.NODE_ENV === "development" ? [new ConsoleTransport()] : []),
  ],
});

// Wide event logging helper for server-side events
export function logEvent(
  eventName: string,
  data: Record<string, unknown>
): void {
  const coreFields = getCoreEventFields();
  logger.info(eventName, {
    ...coreFields,
    eventName,
    data,
  });
}

// Async version that flushes immediately (use for request handlers)
export async function logEventAsync(
  eventName: string,
  data: Record<string, unknown>
): Promise<void> {
  logEvent(eventName, data);
  await logger.flush();
}

// Re-export for convenience
export { logger as serverLogger };
