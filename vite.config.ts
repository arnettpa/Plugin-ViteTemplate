import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'plugin',
            fileName: () => 'plugin.mjs',
            formats: ['es'],
        },
        rollupOptions: {
            external: ['express', 'body-parser', 'chalk'],
            output: {
                format: 'es',
            }
        },
        sourcemap: true,
        target: 'node16',
        outDir: 'dist',
        emptyOutDir: true,
    },
    plugins: [dts()],
});