import { useState, type FormEvent } from "react";
import { MapPin, Mail, Phone } from "lucide-react";

const ContactSection = () => {
  // ✅ Yo controlo si el mensaje se envió correctamente
  const [sent, setSent] = useState(false);

  // ✅ Yo controlo si está cargando (para evitar doble envío)
  const [loading, setLoading] = useState(false);

  // ✅ Yo controlo si hubo error
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const form = e.currentTarget;

    // ✅ Yo obtengo los valores del formulario
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    try {
      /*
        ✅ Acá envío los datos al archivo send.php
        IMPORTANTE: send.php debe estar en la raíz del hosting (mismo nivel que index.html)
      */
      const response = await fetch("/send.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Error enviando mensaje");
      }

      // ✅ Si todo salió bien, muestro mensaje de éxito
      setSent(true);
      form.reset();
    } catch (err: any) {
      // ✅ Si algo falla, muestro error elegante
      setError(err.message || "Ocurrió un error. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contacto" className="section-padding bg-background">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <p className="font-body text-xs font-semibold tracking-[0.3em] text-gold uppercase">
            Contacto
          </p>
          <h2 className="mt-3 font-heading text-3xl font-bold text-foreground md:text-4xl">
            Estamos para ayudarlo
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-gold" />
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          {/* ================= INFO ================= */}
          <div className="flex flex-col justify-center gap-8">
            <div className="flex items-start gap-4">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
              <div>
                <h4 className="font-heading text-base font-semibold text-foreground">
                  Dirección
                </h4>
                <p className="font-body text-sm text-muted-foreground">
                  Neuquén, Argentina
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="mt-1 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
              <div>
                <h4 className="font-heading text-base font-semibold text-foreground">
                  Email
                </h4>

                {/* ✅ Acá dejo el mail clickeable */}
                <a
                  href="mailto:contacto@estudiosalinas.com.ar"
                  className="font-body text-sm text-muted-foreground hover:text-gold transition-colors"
                >
                  contacto@estudiosalinas.com.ar
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
              <div>
                <h4 className="font-heading text-base font-semibold text-foreground">
                  Teléfono
                </h4>

                {/* ✅ Teléfono clickeable en móviles */}
                <a
                  href="tel:+542990000000"
                  className="font-body text-sm text-muted-foreground hover:text-gold transition-colors"
                >
                  (0299) 000-0000
                </a>
              </div>
            </div>
          </div>

          {/* ================= FORM ================= */}
          {sent ? (
            <div className="flex items-center justify-center rounded-lg border border-border bg-card p-12">
              <div className="text-center">
                <p className="font-heading text-xl font-semibold text-foreground">
                  ¡Mensaje enviado correctamente!
                </p>
                <p className="mt-2 font-body text-sm text-muted-foreground">
                  Nos pondremos en contacto a la brevedad.
                </p>

                <button
                  onClick={() => setSent(false)}
                  className="mt-6 font-body text-sm font-medium text-gold underline underline-offset-4"
                >
                  Enviar otro mensaje
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 rounded-lg border border-border bg-card p-8"
            >
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block font-body text-sm font-medium text-foreground"
                >
                  Nombre
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full rounded border border-input bg-background px-4 py-2.5 font-body text-sm text-foreground outline-none transition-colors focus:border-gold"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block font-body text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full rounded border border-input bg-background px-4 py-2.5 font-body text-sm text-foreground outline-none transition-colors focus:border-gold"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block font-body text-sm font-medium text-foreground"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full rounded border border-input bg-background px-4 py-2.5 font-body text-sm text-foreground outline-none transition-colors focus:border-gold resize-none"
                />
              </div>

              {/* ✅ Mensaje de error elegante */}
              {error && (
                <p className="text-sm text-red-600 font-body">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 rounded bg-primary px-6 py-3 font-body text-sm font-semibold tracking-wider text-primary-foreground uppercase transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "Enviando..." : "Enviar Mensaje"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
