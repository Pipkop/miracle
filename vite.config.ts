import { defineConfig, type ServerOptions } from 'vite';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { readFileSync } from 'node:fs';

export default defineConfig(() => {
  const dir = dirname(fileURLToPath(import.meta.url));

  return {
    server: {
      // port: 80,
      https: {
        // Certificate returned by mkcert.
        cert: readFileSync(resolve(dir, './localhost.pem')),
        // Private key returned by mkcert.
        key: readFileSync(resolve(dir, './localhost.key.pem')),
      },
      host: '192.168.1.39',
    }
  };
});