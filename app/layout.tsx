import type { Metadata } from "next";
import { Inter, Fraunces, Instrument_Serif } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// The studio's actual brand font — Umar has the licensed desktop family,
// but only the Roman (regular) weight has a redistributable file on hand,
// so this is self-hosted at 400 only rather than the full weight range.
// Lives in public/fonts/ (not app/fonts/) so the same file is also directly
// fetchable as a static asset — the standalone tuning tools (padding-tool.html
// etc.) load it via a plain @font-face, since they're outside Next's font
// pipeline and have no access to next/font's generated CSS variable.
const neueHaas = localFont({
  src: "../public/fonts/NeueHaasDisplayRoman.ttf",
  variable: "--font-neue-haas",
  weight: "400",
  style: "normal",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "BIFLUX",
  description: "A proposal from BIFLUX Studio.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${instrumentSerif.variable} ${neueHaas.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-ink">
        {children}
      </body>
    </html>
  );
}
