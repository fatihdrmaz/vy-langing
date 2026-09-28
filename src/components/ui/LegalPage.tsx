import { Nav } from "./Nav";
import { Footer } from "./Footer";

// Placeholder legal pages — final KVKK/GDPR text comes from legal counsel before launch.
const COPY = {
  privacy: {
    tr: { title: "Gizlilik Politikası ve Aydınlatma Metni", body: "Bu sayfa lansman öncesinde hukuk ekibi tarafından hazırlanan nihai metinle güncellenecektir. Voyola, kişisel verilerin işlenmesine ilişkin yürürlükteki mevzuata (KVKK, GDPR) uygun süreçler ve teknik/organizasyonel kontroller uygular." },
    en: { title: "Privacy Policy & Privacy Notice", body: "This page will be updated with the final text prepared by legal counsel before launch. Voyola applies processes and technical/organisational controls in line with applicable data protection legislation (KVKK, GDPR)." },
  },
  terms: {
    tr: { title: "Kullanım Koşulları", body: "Bu sayfa lansman öncesinde nihai kullanım koşullarıyla güncellenecektir." },
    en: { title: "Terms of Use", body: "This page will be updated with the final terms of use before launch." },
  },
} as const;

export function LegalPage({ kind, locale }: { kind: keyof typeof COPY; locale: string }) {
  const c = COPY[kind][locale === "tr" ? "tr" : "en"];
  return (
    <>
      <Nav />
      <main className="light" style={{ paddingTop: 140, minHeight: "70vh" }}>
        <article className="wrap" style={{ maxWidth: 820, paddingBottom: 120 }}>
          <h1 className="h2" style={{ marginBottom: 28 }}>{c.title}</h1>
          <p className="lede muted">{c.body}</p>
        </article>
      </main>
      <Footer />
    </>
  );
}
