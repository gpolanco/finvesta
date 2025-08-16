/// <reference types="vitest" />

const config = {
  test: {
    environment: "jsdom",
    globals: true,
    alias: {
      "@/": new URL("./src/", import.meta.url).pathname,
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "tests/",
        "**/*.d.ts",
        "**/*.config.*",
        "**/coverage/**",
        ".next/**",
        "**/.next/**",
        "**/dist/**",
        "**/build/**",
        "**/*.min.js",
        "**/*.bundle.js",
        "src/app/**",
        "src/features/**",
        "src/lib/**",
        "src/types/**",
        "src/middleware.ts",
        "src/app-config.ts",
      ],
      include: ["src/core/**/*.{ts,tsx}"],
      all: false,
      clean: true,
      cleanOnRerun: true,
    },
  },
};

export default config;
