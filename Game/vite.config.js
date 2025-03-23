import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

const isProduction = process.env.NODE_ENV === 'production';

const phasermsg = () => ({
    name: 'phasermsg',
    buildStart() {
        process.stdout.write(`Building for production...\n`);
    },
    buildEnd() {
        const line = "---------------------------------------------------------";
        const msg = `Sa arrive att 2 spi`;
        process.stdout.write(`${line}\n${msg}\n${line}\n`);
        process.stdout.write(`✨ Done ✨\n`);
    }
});

export default defineConfig({
    base: isProduction ? './' : '/alice_guy_react/',
    plugins: [
        react(),
        viteStaticCopy({
            targets: [
                {
                    src: 'src/assets/fonts/*', // Dossier source des polices
                    dest: 'assets/fonts' // Destination dans dist/
                }
            ]
        }),
        isProduction ? phasermsg() : null
    ].filter(Boolean),
    server: {
        port: 8080
    },
    build: {
        assetsInlineLimit: 0,  // ✅ Ajout ici pour empêcher Vite d'inliner les polices
        ...(isProduction
            ? {
                rollupOptions: {
                    output: {
                        manualChunks: {
                            phaser: ['phaser']
                        }
                    }
                },
                minify: 'terser',
                terserOptions: {
                    compress: {
                        passes: 2
                    },
                    mangle: true,
                    format: {
                        comments: false
                    }
                }
            }
            : {})
    }
});
