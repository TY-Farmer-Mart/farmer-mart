import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import vitePluginSvgr from "vite-plugin-svgr";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), vitePluginSvgr()],
  server: {
    host: true, // 👈 exposes to LAN
    port: 5173, // optional: fix the port
  },
  resolve: {
    alias: {
      "@constants": path.resolve(__dirname, "src/constants"),
      "@components": path.resolve(__dirname, "src/components"),
      "@features": path.resolve(__dirname, "src/features"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@services": path.resolve(__dirname, "src/services"),
      "@appTypes": path.resolve(__dirname, "src/types"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@api": path.resolve(__dirname, "src/api"),
      "@app": path.resolve(__dirname, "src/app"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@store": path.resolve(__dirname, "src/store"),
      "@": path.resolve(__dirname, "src"),
      "@schemas": path.resolve(__dirname, "src/schemas"),
      "@types": path.resolve(__dirname, "src/types"),
    },
  },
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
