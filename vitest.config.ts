import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    projects: [
      {
        test: {
          name: { label: 'dom', color: 'white' },
          environment: 'happy-dom',
          include: ['./src/**/*.test.{ts,tsx}'],
          exclude: ['./src/**/*.node.test.{ts,tsx}'],
          setupFiles: ['./src/test/vitest.dom.setup.ts'],
        },
      },
      {
        test: {
          name: { label: 'node', color: 'green' },
          environment: 'node',
          include: ['./src/**/*.node.test.{ts,tsx}'],
          fileParallelism: false,
          setupFiles: ['./src/test/vitest.node.setup.ts'],
        },
      },
    ],
    globals: true,
    env: {
      SESSION_SECRET: 'test-secret-key-at-least-32-chars-long',
    },
    coverage: {
      provider: 'v8',
    },
  },
  resolve: {
    tsconfigPaths: true,
    alias: {
      'server-only': fileURLToPath(
        new URL('./src/test/stubs/server-only.ts', import.meta.url),
      ),
    },
  },
})
