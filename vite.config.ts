import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { readFileSync } from "node:fs";

export default defineConfig(() => {
  const dir = dirname(fileURLToPath(import.meta.url));

  return {
    server: {
      https: {
        // Certificate returned by mkcert.
        cert: readFileSync(resolve(dir, "./localhost.pem")),
        // Private key returned by mkcert.
        key: readFileSync(resolve(dir, "./localhost.key.pem")),
      },
    },
  };
});
