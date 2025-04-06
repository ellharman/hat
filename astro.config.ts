// @ts-check
import { storyblok } from "@storyblok/astro";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

import cloudflare from "@astrojs/cloudflare";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

const env = loadEnv("", process.cwd(), "STORYBLOK");

// https://astro.build/config
export default defineConfig({
  integrations: [storyblok({
    accessToken: env.STORYBLOK_TOKEN,
    components: {
      page: "storyblok/Page",
      blogPost: "storyblok/BlogPost",
      blogPostList: "storyblok/BlogPostList",
    },
    apiOptions: {
      // Choose your Storyblok space region
      region: "eu",
    },
  }), react()],

  adapter: cloudflare(),

  vite: {
    plugins: [tailwindcss()],
  },
});