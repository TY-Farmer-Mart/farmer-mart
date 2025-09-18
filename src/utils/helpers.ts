import clsx from "clsx";
import { ClassValue } from "clsx";


export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
}


export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}