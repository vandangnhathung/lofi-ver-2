import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({command}) => {

    const base = command === 'build' ? '/lofi-ver-2/' : '/';

    return {
        plugins: [react()],
        base,
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
    }
});
