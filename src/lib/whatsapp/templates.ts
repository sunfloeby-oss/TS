/**
 * WhatsApp message templates.
 *
 * Pure string builders only — no API calls, no database access. Callers
 * (e.g. lib/whatsapp/client.ts's sendWhatsAppMessage) are responsible for
 * actually delivering the message this returns.
 */

import { formatCurrency } from "@/lib/utils";

/** Input for newOrderAdmin(). Plain data in, plain string out. */
export type NewOrderAdminData = {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  /** Order total, in the smallest-unit-free numeric amount (e.g. 150000 for Rp150.000). */
  total: number;
  /** Human-readable payment status, e.g. "Menunggu Pembayaran", "Lunas". */
  paymentStatus: string;
  /** Currency code for formatting the total. Defaults to "IDR". */
  currency?: string;
};

/**
 * Formats a number as currency for display in the message.
 * Defaults to Indonesian Rupiah formatting (no decimal places).
 */
function formatAmount(amount: number, currency: string): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Builds the Indonesian-language WhatsApp notification sent to the admin
 * whenever a new Terrashop20 order comes in.
 */
export function newOrderAdmin(data: NewOrderAdminData): string {
  const { orderNumber, customerName, customerPhone, total, paymentStatus } = data;
  const currency = data.currency ?? "IDR";

  return [
    "🔔 *Pesanan Baru - Terrashop20*",
    "",
    `No. Pesanan: *${orderNumber}*`,
    `Nama Pelanggan: ${customerName}`,
    `No. HP Pelanggan: ${customerPhone}`,
    `Total: *${formatAmount(total, currency)}*`,
    `Status Pembayaran: ${paymentStatus}`,
    "",
    "Mohon segera diperiksa dan ditindaklanjuti. Terima kasih 🙏",
  ].join("\n");
}

/** Input for productNegotiation(). Plain data in, plain string out. */
export type ProductNegotiationData = {
  productName: string;
  /** Product price, in the smallest-unit-free numeric amount (e.g. 150000 for Rp150.000). */
  price: number;
  /** Currency code for formatting the price. Defaults to "IDR". */
  currency?: string;
  /** Full, absolute URL of the product detail page the customer is viewing. */
  productUrl: string;
  /** Product SKU, when the product has one assigned — omitted from the message otherwise. */
  sku?: string | null;
};

/**
 * Builds the pre-filled WhatsApp message sent when a customer taps the
 * "Chat via WhatsApp" button on a product detail page (see
 * components/shop/product-negotiate-button.tsx). The SKU line is only
 * included when one is available, so the message never shows a blank/"—"
 * SKU for products that don't have one assigned.
 */
export function productNegotiation(data: ProductNegotiationData): string {
  const { productName, price, productUrl, sku } = data;
  const currency = data.currency ?? "IDR";

  const lines = [
    "Hi! I'm interested in this product.",
    "",
    "Product:",
    productName,
    "",
    "Price:",
    formatCurrency(price, currency),
  ];

  if (sku) {
    lines.push("", "SKU:", sku);
  }

  lines.push(
    "",
    "Product Link:",
    productUrl,
    "",
    "I'd like to:",
    "✅ Negotiate the price",
    "✅ Request more detailed photos",
    "✅ Request a product video",
    "",
    "Is this item still available?",
    "",
    "Thank you!"
  );

  return lines.join("\n");
}
