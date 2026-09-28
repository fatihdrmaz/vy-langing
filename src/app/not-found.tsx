import Link from "next/link";
import { Archivo, Inter } from "next/font/google";
import { Logo } from "@/components/ui/Logo";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin", "latin-ext"], weight: ["700", "800"], variable: "--font-archivo" });
const inter = Inter({ subsets: ["latin", "latin-ext"], weight: ["400", "600"], variable: "--font-inter" });

// Brand 404: a departures-board line for a gate that doesn't exist.
export default function NotFound() {
  return (
    <html lang="en" className={`${archivo.variable} ${inter.variable}`}>
      <body style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "radial-gradient(80% 60% at 70% 0%, rgba(171,4,242,0.25), transparent 60%), #100535", padding: 24 }}>
        <main style={{ maxWidth: 560, width: "100%", textAlign: "left" }}>
          <Link href="/" aria-label="Voyola" style={{ color: "#fff", display: "inline-flex" }}>
            <Logo height={30} ink="#fff" />
          </Link>
          <div style={{ marginTop: 40, padding: "18px 22px", borderRadius: 18, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 18, alignItems: "center", fontVariantNumeric: "tabular-nums" }}>
            <b style={{ fontFamily: "var(--font-display)", fontSize: 28, letterSpacing: "-0.03em" }}>404</b>
            <span style={{ color: "#c9c5da", fontSize: 14 }}>
              GATE NOT FOUND
              <br />
              <small style={{ color: "#a5acbf" }}>Kapı bulunamadı</small>
            </span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#ef2ef2", letterSpacing: "0.12em" }}>RE-ROUTE</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 7vw, 64px)", lineHeight: 1, letterSpacing: "-0.04em", marginTop: 32 }}>
            Bu kapı yok.
            <br />
            <span style={{ color: "#ef2ef2" }}>Ana terminale dönün.</span>
          </h1>
          <p style={{ color: "#c9c5da", marginTop: 18, maxWidth: "34em" }}>The page you are looking for is not on the board. Head back to the terminal and we will get you where you need to be.</p>
          <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
            <Link href="/" className="btn btn-primary">Ana sayfa · Home</Link>
            <Link href="/#sss" className="btn btn-ghost">SSS · FAQ</Link>
          </div>
        </main>
      </body>
    </html>
  );
}
