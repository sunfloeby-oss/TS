// TODO: replace the fallback with the production domain once it's finalized.
// Mirrors the value app/layout.tsx uses for metadataBase — kept in one
// place so anything that needs an absolute site URL (canonical product
// links, share/CTA links, etc.) can't drift from what metadata uses.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://terrashop20.com";

/** Canonical, trailing-slash-free site origin — e.g. for building absolute product links. */
export function getSiteUrl(): string {
  return SITE_URL.replace(/\/+$/, "");
}
