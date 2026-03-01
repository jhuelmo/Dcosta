// @ts-check

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import path from "path";
import { fileURLToPath } from "url";

import vercel from "@astrojs/vercel";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
    site: "https://example.com",
    integrations: [mdx(), sitemap(), react()],

    devToolbar: {
        enabled: false,
    },
    vite: {
        plugins: [tailwindcss()],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
                "@components": path.resolve(__dirname, "./src/components"),
                "@pages": path.resolve(__dirname, "./src/pages"),
                "@layouts": path.resolve(__dirname, "./src/layouts"),
            },
        },
    },

    adapter: vercel(),
});
