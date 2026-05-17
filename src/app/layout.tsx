import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://miguelacm.es/tools/css-box-shadow";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Generador CSS Box Shadow Gratis Online",
    template: "%s | CSS Box Shadow Generator",
  },
  description:
    "Crea y previsualiza sombras CSS box-shadow en tiempo real. Múltiples capas, presets, control de offset, blur, spread, color y opacidad. Copia el CSS listo para usar.",
  keywords: [
    "css box shadow generator",
    "generador box shadow",
    "box shadow online",
    "css shadow generator",
    "sombra css",
    "box shadow editor",
    "css shadow online free",
    "multiple box shadow",
    "inset shadow css",
    "shadow css gratis",
  ],
  authors: [{ name: "Miguel Ángel Colorado Marin", url: "https://miguelacm.es" }],
  creator: "Miguel Ángel Colorado Marin",
  openGraph: {
    title: "Generador CSS Box Shadow Gratis Online",
    description:
      "Crea sombras CSS con múltiples capas, presets y previsualización en tiempo real. Sin registro. Por MACM.",
    url: SITE_URL,
    siteName: "CSS Box Shadow Generator — MACM",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Generador CSS Box Shadow Gratis Online",
    description: "Genera CSS box-shadow con múltiples capas y previsualización en vivo. Sin registro. Por MACM · miguelacm.es",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="author" href="https://miguelacm.es" />
        <meta name="author" content="Miguel Ángel Colorado Marin" />
        <meta name="copyright" content="Miguel Ángel Colorado Marin — miguelacm.es" />
      </head>
      <body className="antialiased">
        {children}
        <footer className="pb-8 text-center text-xs text-text-muted/40">
          ⚡ por{" "}
          <a
            href="https://miguelacm.es"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted/60 transition-colors hover:text-text-muted underline-offset-2 hover:underline"
          >
            MACM · miguelacm.es
          </a>
          {" · "}
          <a
            href="https://github.com/m-a-c-m/CssBoxShadowGenerator"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted/60 transition-colors hover:text-text-muted underline-offset-2 hover:underline"
          >
            Código abierto
          </a>
        </footer>
      </body>
    </html>
  );
}
