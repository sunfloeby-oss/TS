"use client";

import { cn } from "@/lib/utils";
import { getSiteUrl } from "@/lib/site";
import { getWhatsAppLink } from "@/lib/whatsapp/config";
import { productNegotiation } from "@/lib/whatsapp/templates";
import { trackEvent } from "@/lib/analytics/track";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";

type ProductNegotiateButtonProps = {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    currency: string;
    sku: string | null;
  };
  className?: string;
  /** Shown by default; the compact mobile sticky-bar instance turns it off. */
  showCaption?: boolean;
};

const CAPTION =
  "Want to negotiate or see more photos/videos? Chat with us on WhatsApp.";

/**
 * Secondary CTA on the product detail page — opens WhatsApp (wa.me) with a
 * pre-filled message asking to negotiate the price and/or get more
 * photos/video, including the product name, price, SKU (when set) and its
 * canonical URL. Purely a `wa.me` deep link — it never touches the
 * cart/checkout flow.
 *
 * The product URL is built from the canonical `/shop/:slug` path + the
 * shared site origin (getSiteUrl(), the same value app/layout.tsx uses for
 * metadataBase) rather than `window.location.href`, so the href is
 * available on the very first server-rendered paint — no useEffect, no
 * post-hydration pop-in.
 *
 * Renders nothing if `NEXT_PUBLIC_WHATSAPP_NUMBER` isn't configured — same
 * fail-soft behavior as the checkout WhatsAppButton.
 */
export function ProductNegotiateButton({
  product,
  className,
  showCaption = true,
}: ProductNegotiateButtonProps) {
  const productUrl = `${getSiteUrl()}/shop/${product.slug}`;
  const message = productNegotiation({
    productName: product.name,
    price: product.price,
    currency: product.currency,
    productUrl,
    sku: product.sku,
  });
  const href = getWhatsAppLink(message);

  if (!href) return null;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackEvent("whatsapp_product_clicked", {
            productId: product.id,
            productName: product.name,
            sku: product.sku ?? undefined,
            price: product.price,
          })
        }
        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-line bg-transparent px-6 py-3.5 text-xs font-medium uppercase tracking-[0.12em] text-ink shadow-xs transition-all duration-200 hover:bg-cloud active:scale-[0.98]"
      >
        <WhatsAppIcon className="h-4 w-4 shrink-0" />
        Chat via WhatsApp
      </a>
      {showCaption ? <p className="text-xs text-slate">{CAPTION}</p> : null}
    </div>
  );
}
