import CssBoxShadowGenerator from "@/components/CssBoxShadowGenerator";
import { MdLayers } from "react-icons/md";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://miguelacm.es/tools/css-box-shadow";
const EMBED_URL = process.env.NEXT_PUBLIC_EMBED_URL || "https://miguelacm.es/embed/css-box-shadow";

export const metadata = {
  title: "Generador CSS Box Shadow Gratis Online",
  description:
    "Crea y previsualiza sombras CSS box-shadow en tiempo real. Múltiples capas, presets, control de offset, blur, spread, color y opacidad. Gratis, sin registro.",
  alternates: { canonical: SITE_URL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Generador CSS Box Shadow Gratis Online",
  url: SITE_URL,
  description:
    "Crea y previsualiza sombras CSS box-shadow con múltiples capas. Control total de offset, blur, spread, color y opacidad. Sin registro, 100% en el navegador.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  inLanguage: "es-ES",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  author: {
    "@type": "Person",
    name: "Miguel Ángel Colorado Marin",
    url: "https://miguelacm.es",
  },
  featureList: [
    "Previsualización en tiempo real",
    "Múltiples capas de sombra (hasta 6)",
    "Presets: Soft, Hard, Neon, Inset, 3D",
    "Control de offset X/Y, blur, spread",
    "Color y opacidad por capa",
    "Sombras inset",
    "Color de fondo y caja personalizables",
    "Copia CSS con un clic",
    "Sin registro",
    "Código abierto",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
              <MdLayers className="text-base" />
              Herramienta gratuita · Código abierto
            </div>
            <h1 className="mb-3 text-4xl font-bold text-white md:text-5xl">
              CSS Box Shadow Generator
            </h1>
            <p className="mb-2 text-lg text-text-muted">
              Crea sombras CSS con múltiples capas y previsualización en tiempo real.
            </p>
            <p className="text-sm text-text-muted/60">
              Hecho por{" "}
              <a
                href="https://miguelacm.es"
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-text font-medium hover:opacity-80 transition-opacity"
              >
                MACM
              </a>{" "}
              · Sin registro · Sin anuncios · 100% en el navegador
            </p>
          </div>

          <div className="glass rounded-2xl border border-border/20 p-6 md:p-8">
            <CssBoxShadowGenerator />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                icon: "🎨",
                title: "Previsualización en vivo",
                desc: "Ve el resultado de tu sombra CSS al instante sobre una caja de previsualización. Ajusta el color de fondo y la caja para simular tu diseño real.",
              },
              {
                icon: "📐",
                title: "Múltiples capas",
                desc: "Apila hasta 6 capas de sombra independientes, cada una con su propio offset, blur, spread, color y opacidad. Ideal para efectos neon o 3D.",
              },
              {
                icon: "⚡",
                title: "Presets listos",
                desc: "Elige entre 5 presets predefinidos (Soft, Hard, Neon, Inset, 3D) como punto de partida y personalízalos a tu gusto.",
              },
            ].map((item) => (
              <div
                key={item.icon}
                className="glass rounded-xl border border-border/15 p-5"
              >
                <span className="mb-3 block text-2xl">{item.icon}</span>
                <h3 className="mb-1 font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-border/20 bg-white/3 p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">
              Cómo usar el generador de box shadow
            </h2>
            <ol className="space-y-3">
              {[
                { n: 1, text: "Selecciona un preset como punto de partida o ajusta los valores manualmente desde cero." },
                { n: 2, text: "Modifica offset X/Y, blur, spread, color y opacidad de cada capa. Activa 'inset' para sombras internas." },
                { n: 3, text: "Añade más capas con el botón '+ Añadir capa' para crear efectos complejos de varias sombras." },
                { n: 4, text: "Copia el CSS generado con el botón copiar y pégalo directamente en tu hoja de estilos." },
              ].map((step) => (
                <li key={step.n} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                    {step.n}
                  </span>
                  <p className="text-sm text-text-muted leading-relaxed">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 space-y-4">
            <h2 className="text-lg font-semibold text-white">Preguntas frecuentes</h2>
            {[
              {
                q: "¿Cuántas capas de sombra puedo usar en CSS?",
                a: "CSS permite usar múltiples capas de box-shadow separadas por comas. No existe un límite técnico estricto, pero más de 5-6 capas pueden afectar el rendimiento de renderizado. Este generador permite hasta 6 capas.",
              },
              {
                q: "¿Qué diferencia hay entre blur y spread?",
                a: "El blur (desenfoque) controla qué tan difusa es la sombra — a mayor valor, más suave y expandida. El spread (extensión) controla si la sombra crece o se encoge antes de aplicar el blur — un valor positivo la agranda, un negativo la encoge.",
              },
              {
                q: "¿Para qué sirve la sombra inset?",
                a: "La propiedad inset mueve la sombra hacia el interior del elemento en lugar del exterior. Es útil para simular elementos hundidos, campos de formulario con apariencia 3D o efectos de botón presionado.",
              },
              {
                q: "¿El CSS generado es compatible con todos los navegadores?",
                a: "Sí. La propiedad box-shadow es compatible con todos los navegadores modernos (Chrome, Firefox, Safari, Edge) desde hace más de 10 años y no requiere prefijos de proveedor.",
              },
              {
                q: "¿Puedo usar este generador de box shadow en mi web?",
                a: "Sí, puedes embeber esta herramienta en tu web con un iframe. Es completamente gratuita, con atribución a MACM · miguelacm.es.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="rounded-xl border border-border/20 bg-white/3 p-5"
              >
                <h3 className="mb-2 font-medium text-white">{item.q}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-border/20 bg-white/3 p-6">
            <h2 className="mb-2 font-semibold text-white">
              Integra el generador en tu web
            </h2>
            <p className="mb-4 text-sm text-text-muted">
              Puedes embeber este generador de box-shadow en cualquier web con un simple iframe.
            </p>
            <div className="mb-3 rounded-lg bg-black/40 p-3">
              <p className="mb-1 text-xs text-text-muted/60">Iframe (integración directa):</p>
              <code className="text-xs text-green-400 break-all">
                {`<iframe src="${EMBED_URL}" width="100%" height="700" style="border:none;border-radius:12px;" title="CSS Box Shadow Generator — miguelacm.es" loading="lazy"></iframe>`}
              </code>
            </div>
            <div className="rounded-lg bg-black/40 p-3">
              <p className="mb-1 text-xs text-text-muted/60">
                Enlace con atribución (recomendado para backlink):
              </p>
              <code className="text-xs text-green-400 break-all">
                {`<a href="${SITE_URL}" target="_blank" rel="noopener">Generador CSS box-shadow gratis por MACM</a>`}
              </code>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
