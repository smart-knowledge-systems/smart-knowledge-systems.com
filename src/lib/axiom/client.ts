"use client";

import {
  Logger,
  AxiomJSTransport,
  ConsoleTransport,
  type Transport,
} from "@axiomhq/logging";
import { createUseLogger, createWebVitalsComponent } from "@axiomhq/react";
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
    ? [new AxiomJSTransport({ axiom, dataset }), new ConsoleTransport()]
    : [new AxiomJSTransport({ axiom, dataset })];

export const clientLogger = new Logger({ transports });

export const useLogger = createUseLogger(clientLogger);

export const WebVitals = createWebVitalsComponent(clientLogger);

/** Client-side wide event logging helper */
export function logClientEvent(eventName: string, data: EventData): void {
  const coreFields = getCoreEventFields();
  clientLogger.info(eventName, {
    ...coreFields,
    eventName,
    data,
  });
}

/** Flush logs (use on page unload or session end) */
export async function flushLogs(): Promise<void> {
  try {
    await clientLogger.flush();
  } catch (error) {
    console.error("Failed to flush logs:", error);
  }
}

export { clientLogger as logger };
