import { Axiom } from "@axiomhq/js";

// Initialize Axiom client with environment variables
// NEXT_PUBLIC_ prefix is required for client-side access
// Token is optional in development (logs go to console only)
export const axiom = new Axiom({
  token: process.env.NEXT_PUBLIC_AXIOM_TOKEN || "",
});

export const dataset =
  process.env.NEXT_PUBLIC_AXIOM_DATASET || "smart-knowledge-systems";

export const environment =
  process.env.VERCEL_ENV || process.env.NODE_ENV || "development";

export const service = "smart-knowledge-systems";

// Core fields that should be included with every event
export interface CoreEventFields {
  eventId: string;
  timestamp: number;
  environment: string;
  service: string;
}

// Generate core fields for wide events
export function getCoreEventFields(): CoreEventFields {
  return {
    eventId: crypto.randomUUID(),
    timestamp: Date.now(),
    environment,
    service,
  };
}
