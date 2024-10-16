import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
export default defineConfig(function (_a) {
    var command = _a.command;
    var base = command === 'build' ? '/lofi-ver-2/' : '/';
    return {
        plugins: [react()],
        base: base,
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        define: {
            global: {
                basename: base,
            },
        },
    };
});
