import { Axiom } from "@axiomhq/js";

// Fail fast in production if the token is missing
const token = process.env.NEXT_PUBLIC_AXIOM_TOKEN;
if (!token && process.env.NODE_ENV === "production") {
  throw new Error(
    "NEXT_PUBLIC_AXIOM_TOKEN is required in production. Set it in your environment variables."
  );
}

/** Lazily-initialized Axiom client singleton */
let axiomInstance: Axiom | null = null;

export function getAxiom(): Axiom {
  if (!axiomInstance) {
    axiomInstance = new Axiom({ token: token || "" });
  }
  return axiomInstance;
}

// Eager export for backward compatibility
export const axiom = getAxiom();

export const dataset =
  process.env.NEXT_PUBLIC_AXIOM_DATASET || "smart-knowledge-systems";

export const environment =
  process.env.VERCEL_ENV || process.env.NODE_ENV || "development";

export const service = "smart-knowledge-systems";

/** Core fields included with every event */
export interface CoreEventFields {
  eventId: string;
  timestamp: number;
  environment: string;
  service: string;
}

export function getCoreEventFields(): CoreEventFields {
  return {
    eventId: crypto.randomUUID(),
    timestamp: Date.now(),
    environment,
    service,
  };
}
