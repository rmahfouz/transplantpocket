import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from "vite-plugin-singlefile"
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ mode }) => {
    // If we specify SINGLE_FILE=true in the environment, build a single HTML file.
    // Otherwise, build a standard PWA.
    const isSingleFile = process.env.SINGLE_FILE === 'true';

    const plugins = [react()];

    if (isSingleFile) {
        plugins.push(viteSingleFile());
    } else {
        plugins.push(VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
            manifest: {
                name: 'Transplant Nephrology Pocket',
                short_name: 'Tx Nephrology',
                description: 'A clinical pocket guide for transplant nephrology fellows and practitioners.',
                theme_color: '#1E40AF',
                background_color: '#F8FAFC',
                display: 'standalone',
                icons: [
                    {
                        src: 'pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable'
                    }
                ]
            },
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg}']
            }
        }));
    }

    return {
        plugins,
    }
})
