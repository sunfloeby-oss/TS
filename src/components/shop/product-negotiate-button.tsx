"use client";

import { Camera, HelpCircle, Tag } from "lucide-react";

import { cn } from "@/lib/utils";
import { getWhatsAppLink } from "@/lib/whatsapp/config";
import {
  productPhotoRequest,
  productPriceNegotiation,
  productQuestion,
} from "@/lib/whatsapp/templates";
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
  /** Full layout (heading + caption) by default; the compact mobile
   *  sticky-bar instance turns this off for a condensed 3-up row instead. */
  showCaption?: boolean;
};

type ContactOption = {
  key: "question" | "photos" | "negotiate";
  label: string;
  /** Shorter label for the compact mobile row, where space is tight. */
  compactLabel: string;
  href: string | null;
  icon: typeof HelpCircle;
  /** Only "negotiate" gets the accent treatment — the other two stay as
   *  quiet, neutral secondary actions so they don't compete with it. */
  accent?: boolean;
};

/**
 * Secondary CTA group on the product detail page — three `wa.me` deep
 * links, each opening WhatsApp with a message pre-filled for a specific
 * reason to get in touch (general question, detailed photos, price
 * negotiation). Every link reuses the store's existing WhatsApp number via
 * getWhatsAppLink() (backed by NEXT_PUBLIC_WHATSAPP_NUMBER) — nothing here
 * hardcodes a different number. Purely `wa.me` deep links — this never
 * touches the cart/checkout flow.
 *
 * Renders nothing if NEXT_PUBLIC_WHATSAPP_NUMBER isn't configured — same
 * fail-soft behavior this component has always had.
 */
export function ProductNegotiateButton({
  product,
  className,
  showCaption = true,
}: ProductNegotiateButtonProps) {
  const questionHref = getWhatsAppLink(
    productQuestion({ productName: product.name })
  );
  const photosHref = getWhatsAppLink(
    productPhotoRequest({ productName: product.name })
  );
  const negotiateHref = getWhatsAppLink(
    productPriceNegotiation({
      productName: product.name,
      price: product.price,
      currency: product.currency,
    })
  );

  // Same fail-soft behavior as before: no WhatsApp number configured means
  // none of these links can work, so render nothing rather than three dead
  // buttons.
  if (!questionHref || !photosHref || !negotiateHref) return null;

  const options: ContactOption[] = [
    {
      key: "question",
      label: "Ask a Question",
      compactLabel: "Question",
      href: questionHref,
      icon: HelpCircle,
    },
    {
      key: "photos",
      label: "Request Detailed Photos",
      compactLabel: "Photos",
      href: photosHref,
      icon: Camera,
    },
    {
      key: "negotiate",
      label: "Negotiate Price",
      compactLabel: "Negotiate",
      href: negotiateHref,
      icon: Tag,
      accent: true,
    },
  ];

  const handleClick = (option: ContactOption) =>
    trackEvent("whatsapp_product_clicked", {
      productId: product.id,
      productName: product.name,
      sku: product.sku ?? undefined,
      price: product.price,
      contactType: option.key,
    });

  if (!showCaption) {
    // Compact mobile sticky-bar variant: a tight 3-up row of small pill
    // buttons. Equal-width grid columns (never a horizontal flex row) so
    // three options always fit the viewport with no overflow, regardless
    // of label length.
    return (
      <div className={cn("grid grid-cols-3 gap-2", className)}>
        {options.map((option) => (
          <a
            key={option.key}
            href={option.href ?? undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${option.label} via WhatsApp`}
            onClick={() => handleClick(option)}
            className={cn(
              "inline-flex min-h-9 items-center justify-center gap-1.5 rounded-full border px-2 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.08em] shadow-xs transition-all duration-200 active:scale-[0.97]",
              option.accent
                ? "border-signal/30 bg-signal/10 text-signal hover:bg-signal/15"
                : "border-line bg-transparent text-ink hover:bg-cloud"
            )}
          >
            <option.icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
            <span className="truncate">{option.compactLabel}</span>
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center gap-2">
        <WhatsAppIcon className="h-4 w-4 shrink-0 text-slate" />
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-slate">
          Have a question about this product?
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <a
            key={option.key}
            href={option.href ?? undefined}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleClick(option)}
            className={cn(
              "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border px-6 py-3.5 text-xs font-medium uppercase tracking-[0.12em] shadow-xs transition-all duration-200 active:scale-[0.98]",
              option.accent
                ? "border-signal/30 bg-signal/10 text-signal hover:bg-signal/15 hover:shadow-md"
                : "border-line bg-transparent text-ink hover:bg-cloud"
            )}
          >
            <option.icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
            {option.label}
          </a>
        ))}
      </div>
    </div>
  );
}
