import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoSalinas from "@/assets/fotos/logo.salinas.png";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { Menu, X } from "lucide-react";

/*
  ✅ Acá defino el menú.
  - route=true: es una ruta real (/coworking)
  - route=false: es una sección del HOME (scroll)
*/
const navLinks = [
  { label: "Inicio", id: "inicio", route: false },
  { label: "Área Jurídica", id: "juridica", route: false },
  { label: "Coworking", href: "/coworking", route: true },
  { label: "Contacto", id: "contacto", route: false },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // ✅ Acá uso mi función para scrollear sin romper HashRouter (SIN href="#...")
  const { goToSection } = useScrollToSection();

  /*
    ✅ Acá detecto el scroll para el efecto vidrio.
    Si quiero que cambie antes o después, modifico el 50.
  */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      /*
        🔥 Acá controlo el efecto vidrio:
        - backdrop-blur-xl = desenfoque tipo vidrio
        - bg-white/10 = transparente arriba
        - bg-primary/60 = más sólido al hacer scroll
      */
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300
        backdrop-blur-xl
        border-b border-white/10
        ${scrolled ? "bg-primary/60 shadow-lg" : "bg-white/10"}
      `}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4 lg:px-12">
        {/* ✅ Acá muestro el logo a la izquierda y vuelvo al HOME */}
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src={logoSalinas}
            alt="Estudio Jurídico Salinas"
            /*
              ✅ Acá puedo modificar el tamaño del logo del header.
              Si lo quiero más grande: h-12
              Si lo quiero más chico: h-8
            */
            className="h-10 w-auto"
            loading="eager"
          />
        </Link>

        {/* ✅ Menú desktop */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => {
            // ✅ Ruta real (coworking)
            if (link.route) {
              return (
                <Link
                  key={link.label}
                  to={link.href!}
                  className="font-body text-sm font-medium tracking-wider text-white/80 uppercase transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              );
            }

            // ✅ Sección del HOME (scroll)
            return (
              <button
                key={link.label}
                type="button"
                /*
                  ✅ Importante: NO uso href="#..."
                  Yo hago scroll con JS para no romper HashRouter (y evitar 404)
                */
                onClick={() => goToSection(link.id!)}
                className="font-body text-sm font-medium tracking-wider text-white/80 uppercase transition-colors hover:text-gold"
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* ✅ Botón menú mobile */}
        <button
          className="text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ✅ Menú mobile desplegable */}
      {open && (
        <nav className="md:hidden flex flex-col gap-4 px-6 pb-6 bg-primary/70 backdrop-blur-xl border-t border-white/10">
          {navLinks.map((link) => {
            if (link.route) {
              return (
                <Link
                  key={link.label}
                  to={link.href!}
                  onClick={() => setOpen(false)}
                  className="font-body text-sm font-medium tracking-wider text-white/80 uppercase transition-colors hover:text-gold text-left"
                >
                  {link.label}
                </Link>
              );
            }

            return (
              <button
                key={link.label}
                type="button"
                onClick={() => {
                  setOpen(false);
                  goToSection(link.id!);
                }}
                className="font-body text-sm font-medium tracking-wider text-white/80 uppercase transition-colors hover:text-gold text-left"
              >
                {link.label}
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
};

export default Header;
