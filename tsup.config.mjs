import { defineConfig } from 'tsup'
export default defineConfig({
  target: 'es2020',
  format: ['cjs', 'esm'],
  entry: ['./src/**/*..ts', '!./src/**/*.test.ts', '!./src/**/test.ts'],
  clean: true,
  dts: true,
})
