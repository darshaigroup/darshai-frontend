import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  base:"/",
  plugins:[react()],
  resolve:{alias:{"@":path.resolve(import.meta.dirname,"./src")}},
  build:{
    chunkSizeWarningLimit:1000,
    rollupOptions:{
      output:{
        manualChunks(id){
          if(!id.includes("node_modules")) return;
          if(id.includes("react-router")) return "router";
          if(id.includes("react")) return "react";
          if(id.includes("recharts")) return "charts";
          if(id.includes("jspdf")||id.includes("html2canvas")||id.includes("html2pdf")||id.includes("pdfjs")) return "pdf";
          if(id.includes("tsparticles")||id.includes("@tsparticles")) return "particles";
          if(id.includes("framer-motion")||id.includes("motion")) return "motion";
          return "vendor";
        }
      }
    }
  }
});