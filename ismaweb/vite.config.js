import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  plugins: [
    mode === "test"
      ? react()
      : remix({
          ignoredRouteFiles: ["**/.*"],
        })
  ],
  test: {
    environment: "jsdom",
    env: loadEnv("test", process.cwd(), ""),
    setupFiles: "./vitest.setup.ts"
  },
  ssr: {
    noExternal: ["@remix-run/vercel"]
  }
}));
