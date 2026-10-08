/**
 * Single source of truth for everything that names the project on the site.
 * Change it here and every page, the sitemap and the OG metadata follow.
 */
export const site = {
  name: "Oneko v2",
  tagline: "A web-based version of the classic Oneko - a cat that follows your mouse pointer.",
  description:
    "This project adds a new skin, along with a playground to test Oneko and a simple guide for integrating it into your own website.",
  // Set NEXT_PUBLIC_SITE_URL at build time to the real domain; it drives
  // metadataBase, robots.txt and sitemap.xml.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  github: "https://github.com/sahilmishra03/oneko-v2",
  releases: "https://github.com/sahilmishra03/oneko-v2/releases",
  portfolio: "https://sahilmishra.dev",
  author: "Sahil Mishra",
  installCommand:
    "<script src=\"js/oneko.js\"></script>",
} as const;
