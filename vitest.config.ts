import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: './src/test/vitest.setup.ts',
    env: {
      SESSION_SECRET: 'test-secret-key-at-least-32-chars-long',
    },
  },
  resolve: {
    tsconfigPaths: true,
    alias: {
      'server-only': fileURLToPath(
        new URL('./src/test/stubs/empty.ts', import.meta.url),
      ),
    },
  },
})
