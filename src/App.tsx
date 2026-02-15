import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

/*
  ✅ Acá importo las páginas de forma relativa.
  Yo hago esto para evitar problemas de build si el alias @ no está bien configurado.
*/
import Index from "./pages/Index";
import Coworking from "./pages/Coworking";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <>
      {/*
        ✅ Acá defino mis rutas.
        - Estoy usando HashRouter en main.tsx, entonces en GitHub Pages funciona perfecto.
        - "/" es el home
        - "/coworking" es la página de coworking
        - "*" es cualquier cosa que no exista -> NotFound (404 interno de la app)
      */}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/coworking" element={<Coworking />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/*
        ✅ Acá dejo el toaster global de Sonner.
        Yo lo puedo borrar si no lo uso.
      */}
      <Toaster richColors position="top-right" />
    </>
  );
};

export default App;
