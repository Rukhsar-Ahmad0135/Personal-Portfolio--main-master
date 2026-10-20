import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";
import tailwindcss from "@tailwindcss/vite";
import { imagetools } from "vite-imagetools";
import Sitemap from "vite-plugin-sitemap";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Enable CORS for API calls
    cors: true,
  },
  plugins: [
    tailwindcss(),
    react(),
    imagetools(),
    mode === "development" && componentTagger(),
    Sitemap({
      hostname: 'https://www.rukhsarahmad.dev',
      dynamicRoutes: [
        '/portfolio',
        '/services',
        '/blog',
        '/about',
        '/contact',
        '/blog/ai-reshaping-developer-landscape',
        '/blog/will-ai-replace-software-engineers',
        '/blog/ai-proof-developer-skills',
        '/blog/web-dev-not-enough-nowadays',
        '/project/prx-research',
        '/project/zyra',
      ],
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      // Ensure client-side only build
      external: [],
    },
  },
  define: {
    // Make API base URL configurable
    __API_BASE_URL__: JSON.stringify('/api'),
  },
}));
