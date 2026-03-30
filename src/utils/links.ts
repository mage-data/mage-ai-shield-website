/**
 * Prepend the Astro base path to internal links.
 * This is needed when deploying to a subpath (e.g., GitHub Pages project sites).
 */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function url(path: string): string {
  if (path.startsWith('http') || path.startsWith('#') || path.startsWith('mailto:')) {
    return path;
  }
  return `${BASE}${path}`;
}
