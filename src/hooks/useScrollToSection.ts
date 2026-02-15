import { useLocation, useNavigate } from "react-router-dom";

/*
  ✅ Acá creo un helper para scrollear a secciones del HOME sin romper HashRouter.
  IMPORTANTE: yo NO uso window.location.hash, porque HashRouter usa el hash para las rutas.
*/
export const useScrollToSection = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const goToSection = (id: string) => {
    // ✅ Acá acepto "juridica" o "#juridica" y lo convierto siempre a "juridica"
    const cleanId = id.replace("#", "");

    // ✅ Si ya estoy en el HOME, scrolleo directo
    if (location.pathname === "/") {
      const el = document.getElementById(cleanId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    // ✅ Si estoy en otra ruta (ej: /coworking), primero vuelvo al HOME
    navigate("/");

    // ✅ Espero un poquito a que el HOME renderice y ahí scrolleo
    setTimeout(() => {
      const el = document.getElementById(cleanId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 250);
  };

  return { goToSection };
};
