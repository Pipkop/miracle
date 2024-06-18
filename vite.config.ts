import { defineConfig, type ServerOptions } from "vite";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { readFileSync } from "node:fs";

export default defineConfig(() => {
  const dir = dirname(fileURLToPath(import.meta.url));

  return {
    base: "/miracle",
    server: {
      port: 3005,
    },
  };
});
