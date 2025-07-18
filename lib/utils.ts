import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs))
}

export const Parsestringify = (param: unknown) => {
  return JSON.parse(JSON.stringify(param));
} 