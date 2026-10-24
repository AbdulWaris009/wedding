import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Full website address is needed for the WhatsApp preview image.
// Order: SITE_URL (Vercel env) -> Vercel's own production URL -> the fallback below.
const FALLBACK = "https://wedding-bicy.vercel.app"; // <- change if you use your own domain
const site = (
  process.env.SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
  FALLBACK
).replace(/\/$/, "");

export default defineConfig({
  plugins: [
    react(),
    { name: "site-url", transformIndexHtml: (html) => html.replaceAll("__SITE_URL__", site) },
  ],
});