import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig(({ command }) => {
  return {
    plugins: [react()],

    /*
      ✅ Acá arreglo el alias "@"
      Ahora puedo importar así: import X from "@/pages/Index"
      y va a funcionar en DEV y en BUILD.
    */
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    /*
      ✅ Acá hago que el base SOLO aplique en build (GitHub Pages).
      En DEV queda base="/" para que no te aparezca /etudio... en localhost.
    */
    base: command === "build" ? "/etudio.juridico.salinas/" : "/",
  };
});
