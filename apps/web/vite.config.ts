import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import path from "path"
import dotenv from "dotenv"

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    // proxy: {
    //   "/api": {
    //     target: "http://api:3000",
    //     changeOrigin: true,
    //   },
    // },
  },
  preview: {
    port: 5173,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
})
