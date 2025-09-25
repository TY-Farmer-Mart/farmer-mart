import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

export const formatCurrency = (value?: number | string) => {
  if (value == null) return "--";
  const n = Number(value);
  if (!Number.isFinite(n)) return "--";
  return currencyFormatter.format(n);
};
