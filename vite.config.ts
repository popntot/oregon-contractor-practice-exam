import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// Static, offline-first PWA. No backend, no env, no secrets.
// `npm run build` emits a plain static bundle in dist/ deployable anywhere.
export default defineConfig({
  // Base path. Defaults to relative ("./") so the build works on any host or
  // self-hosted folder. The GitHub Pages workflow sets VITE_BASE to the project
  // subpath (e.g. "/oregon-contractor-practice-exam/") so the service worker
  // and assets resolve there.
  base: process.env.VITE_BASE ?? "./",
  // Tailwind is handled by @tailwindcss/vite below; pin an empty PostCSS config
  // so Vite doesn't walk up the filesystem and pick up an unrelated PostCSS config.
  css: { postcss: { plugins: [] } },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icon.svg"],
      manifest: {
        name: "Oregon CCB Study",
        short_name: "CCB Study",
        description:
          "Adaptive practice exams for the Oregon contractor license test.",
        theme_color: "#0f3d4a",
        background_color: "#0b1f26",
        display: "standalone",
        orientation: "portrait",
        start_url: "./",
        scope: "./",
        icons: [
          {
            src: "icon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  test: {
    globals: true,
    environment: "node",
  },
});
