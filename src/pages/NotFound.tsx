import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-primary text-primary-foreground flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <p className="font-body text-sm tracking-[0.3em] text-primary-foreground/70 uppercase">
          Error 404
        </p>

        <h1 className="mt-4 font-heading text-4xl font-bold md:text-5xl">
          Esta página no existe
        </h1>

        <p className="mt-4 font-body text-base text-primary-foreground/80">
          Yo probablemente llegué acá por un link mal escrito o porque la URL no corresponde a una ruta válida.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="rounded bg-gold px-6 py-3 font-body text-sm font-semibold tracking-wider text-gold-foreground uppercase transition-opacity hover:opacity-90"
          >
            Volver al inicio
          </button>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="rounded border border-primary-foreground/30 px-6 py-3 font-body text-sm font-semibold tracking-wider text-primary-foreground uppercase transition-colors hover:border-primary-foreground/60"
          >
            Volver atrás
          </button>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
