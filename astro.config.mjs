// @ts-check

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
    site: "https://example.com",
    integrations: [mdx(), sitemap(), react()],

    devToolbar: {
        enabled: false,
    },
    vite: {
        plugins: [tailwindcss()],
    },

    adapter: vercel(),
});
