import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTime = (time: string) => new Date(time).toLocaleTimeString();

export const getISOTimeStamp = () => new Date().toISOString();
