import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

export function formatRelativeTime(date: string): string {
  const now = new Date();
  const past = new Date(date);
  const diff = now.getTime() - past.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return formatDate(date);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function getPetImage(species: string, index = 0): string {
  const petImages: Record<string, string[]> = {
    dog: [
      "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/356378/pexels-photo-356378.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/2253275/pexels-photo-2253275.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
    cat: [
      "https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/596590/pexels-photo-596590.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
    bird: [
      "https://images.pexels.com/photos/349758/hummingbird-bird-birds-349758.jpeg?auto=compress&cs=tinysrgb&w=400",
      "https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
    rabbit: [
      "https://images.pexels.com/photos/326012/pexels-photo-326012.jpeg?auto=compress&cs=tinysrgb&w=400",
    ],
  };
  const images = petImages[species.toLowerCase()] || petImages.dog;
  return images[index % images.length];
}

export function getAvatarUrl(name: string, size = 40): string {
  const initials = getInitials(name);
  const colors = [
    "F97316", "0EA5E9", "22C55E", "A855F7", "EC4899", "EF4444", "F59E0B",
  ];
  const colorIndex = name.charCodeAt(0) % colors.length;
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=${size}&background=${colors[colorIndex]}&color=fff&bold=true`;
}
