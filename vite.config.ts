// vite.config.ts
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({command}) => {
    const base = command === 'build' ? '/lofi-ver-2/' : '/';
    return {
        plugins: [react(), svgr()],
        base,
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        build: {
            assetsInlineLimit: 0, // This ensures SVGs are always kept as separate files
        },
    };
});