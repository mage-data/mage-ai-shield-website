/**
 * Count-up animation utility.
 * The main animation logic is inlined in StatCard.astro for Astro island compatibility.
 * This file exists as a reference/utility for future use.
 */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}
