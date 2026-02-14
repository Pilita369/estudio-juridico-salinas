import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

/*
  ✅ Acá importo las páginas con ruta RELATIVA.
  Esto evita el error de build cuando Vite no resuelve el alias "@/..."
*/
import Index from "./pages/Index";
import Coworking from "./pages/Coworking";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <>
      {/*
        Acá defino las rutas.
        Como en main.tsx estoy usando HashRouter, en GitHub Pages va a funcionar.
      */}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/coworking" element={<Coworking />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/*
        Acá dejo el toaster global de Sonner.
        Si no lo usás, lo podés borrar.
      */}
      <Toaster richColors position="top-right" />
    </>
  );
};

export default App;
