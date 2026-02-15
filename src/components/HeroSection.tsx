import heroBg from "@/assets/fotos/oficina-amplia.jpg";
import logoSalinas from "@/assets/fotos/logo.salinas.png";
import { Link } from "react-router-dom";
import { useScrollToSection } from "@/hooks/useScrollToSection";

const HeroSection = () => {
  const { goToSection } = useScrollToSection();

  return (
    <section
      id="inicio"
      /*
        ✅ Acá fijo el hero a una pantalla exacta para que el fondo NO “crezca”.
        Si quiero un poco más alto: cambio h-screen por min-h-screen.
      */
      className="relative h-screen overflow-hidden"
    >
      {/* ✅ Fondo */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="h-full w-full object-cover" />
        {/* ✅ Acá ajusto el tinte del fondo */}
        <div className="absolute inset-0 bg-primary/55" />
      </div>

      {/* ✅ Logo grande arriba */}
      <div className="pointer-events-none absolute left-1/2 top-24 z-10 w-full -translate-x-1/2">
        <div className="mx-auto flex justify-center px-6">
          <img
            src={logoSalinas}
            alt="Estudio Jurídico Salinas"
            /*
              ✅ Acá agrando el logo sin romper el layout:
              - max-h limita el alto para que no choque con el texto
              Si querés MÁS grande: subí los max-h.
            */
            className="
              w-auto
              max-h-[240px]
              md:max-h-[320px]
              lg:max-h-[380px]
              drop-shadow-[0_12px_35px_rgba(0,0,0,0.55)]
            "
            loading="eager"
          />
        </div>
      </div>

      {/* ✅ Texto + botones abajo */}
      <div className="absolute inset-x-0 bottom-12 z-10 px-6 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mx-auto mb-6 h-px w-20 bg-gold" />

          <p className="font-body text-lg font-light tracking-widest text-primary-foreground/80 uppercase">
            Neuquén · Argentina
          </p>

          <p className="mx-auto mt-6 max-w-2xl font-body text-base leading-relaxed text-primary-foreground/90 md:text-lg">
            Asesoramiento legal integral con amplia experiencia. Confianza, compromiso y excelencia profesional.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 pb-10 sm:flex-row sm:justify-center">
            {/* ✅ Botón scroll SIN href="#..." */}
            <button
              type="button"
              onClick={() => goToSection("juridica")}
              className="rounded bg-gold px-10 py-3 font-body text-sm font-semibold tracking-wider text-gold-foreground uppercase transition-opacity hover:opacity-90"
            >
              Nuestros Servicios
            </button>

            {/* ✅ Ruta real con Link (no href) */}
            <Link
              to="/coworking"
              className="rounded border border-primary-foreground/30 px-10 py-3 font-body text-sm font-semibold tracking-wider text-primary-foreground uppercase transition-colors hover:border-primary-foreground/60"
            >
              Coworking
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
