import {
  Logger,
  AxiomJSTransport,
  ConsoleTransport,
  type Transport,
} from "@axiomhq/logging";
import { nextJsFormatters } from "@axiomhq/nextjs";
import { axiom, dataset, getCoreEventFields } from "./axiom";

/** JSON-serializable event data values */
type EventValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | string[]
  | number[];
export type EventData = Record<string, EventValue>;

// Extract transport array to a constant (rule 5.4)
const transports: [Transport, ...Transport[]] =
  process.env.NODE_ENV === "development"
    ? [
        new AxiomJSTransport({ axiom, dataset, ...nextJsFormatters }),
        new ConsoleTransport(),
      ]
    : [new AxiomJSTransport({ axiom, dataset, ...nextJsFormatters })];

export const logger = new Logger({ transports });

/** Wide event logging helper for server-side events */
export function logEvent(eventName: string, data: EventData): void {
  const coreFields = getCoreEventFields();
  logger.info(eventName, {
    ...coreFields,
    eventName,
    data,
  });
}

/** Async version that flushes immediately (use for request handlers) */
export async function logEventAsync(
  eventName: string,
  data: EventData
): Promise<void> {
  logEvent(eventName, data);
  try {
    await logger.flush();
  } catch (error) {
    console.error("Failed to flush logs:", error);
  }
}

export { logger as serverLogger };
