/**
 * Minimal client-side event dispatcher.
 *
 * There's no analytics SDK wired into this project yet — the only
 * existing "analytics" is src/lib/admin/analytics.ts, which is unrelated:
 * it's a server-side dashboard that reads completed orders straight from
 * the database, not a client event tracker.
 *
 * Rather than hard-code a specific vendor, this pushes onto
 * `window.dataLayer` (the de-facto convention most tag managers already
 * listen on — GTM, GA4, many others) and calls `window.gtag` when either
 * is present, and always logs to the console outside production so events
 * are visible while testing. When a real analytics client (Segment,
 * PostHog, Meta Pixel, etc.) gets wired in, swap the implementation here —
 * every call site stays the same.
 */

type EventPayload = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(name: string, payload: EventPayload = {}): void {
  if (typeof window === "undefined") return;

  try {
    window.dataLayer?.push({ event: name, ...payload });
    window.gtag?.("event", name, payload);
  } catch (error) {
    console.error(`[analytics] failed to send "${name}":`, error);
  }

  if (process.env.NODE_ENV !== "production") {
    console.debug(`[analytics] ${name}`, payload);
  }
}
