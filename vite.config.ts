import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from 'node:url'
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {'@': fileURLToPath(new URL('./src', import.meta.url))}
    },
    server: {
        // 阶段 1 再决定要不要代理，MSW 方案则不需要
        // proxy: { '/ele': 'http://localhost:3000' },
    }
})