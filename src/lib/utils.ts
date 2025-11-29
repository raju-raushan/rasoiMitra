import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getEmojiForRecipe(recipeName: string): string {
  const lowerCaseName = recipeName.toLowerCase();
  if (lowerCaseName.includes('pasta') || lowerCaseName.includes('spaghetti')) return '🍝';
  if (lowerCaseName.includes('salad')) return '🥗';
  if (lowerCaseName.includes('pizza')) return '🍕';
  if (lowerCaseName.includes('burger')) return '🍔';
  if (lowerCaseName.includes('taco')) return '🌮';
  if (lowerCaseName.includes('sushi')) return '🍣';
  if (lowerCaseName.includes('soup')) return '🍲';
  if (lowerCaseName.includes('stew')) return '🍲';
  if (lowerCaseName.includes('curry')) return '🍛';
  if (lowerCaseName.includes('chicken')) return '🍗';
  if (lowerCaseName.includes('beef') || lowerCaseName.includes('steak')) return '🥩';
  if (lowerCaseName.includes('fish') || lowerCaseName.includes('salmon')) return '🐟';
  if (lowerCaseName.includes('cake') || lowerCaseName.includes('cupcake')) return '🍰';
  if (lowerCaseName.includes('pie')) return '🥧';
  if (lowerCaseName.includes('ice cream')) return '🍨';
  if (lowerCaseName.includes('cookie')) return '🍪';
  if (lowerCaseName.includes('bread') || lowerCaseName.includes('bruschetta')) return '🥖';
  if (lowerCaseName.includes('tomato')) return '🍅';
  if (lowerCaseName.includes('lemon')) return '🍋';
  if (lowerCaseName.includes('egg')) return '🥚';
  if (lowerCaseName.includes('pancake')) return '🥞';
  if (lowerCaseName.includes('waffle')) return '🧇';
  return '🍽️';
}
