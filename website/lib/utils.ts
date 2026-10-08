import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function for conditional className join (tailwind friendly), using clsx and tailwind-merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
