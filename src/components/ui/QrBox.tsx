import QRCode from "qrcode";
import { SITE_URL } from "@/lib/seo";

// Server-rendered QR that points at /dl — the smart link that sends phones to the right store once URLs exist.
export async function QrBox({ label, locale }: { label: string; locale: string }) {
  const url = `${SITE_URL}${locale === "en" ? "" : `/${locale}`}/dl?src=qr`;
  const svg = await QRCode.toString(url, { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark: "#100535", light: "#ffffff" } });
  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        padding: 14,
        borderRadius: 20,
        background: "#fff",
        color: "#100535",
        boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
      }}
    >
      <div style={{ width: 112, height: 112 }} dangerouslySetInnerHTML={{ __html: svg }} aria-label={url} role="img" />
      <small style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#545454" }}>{label}</small>
    </div>
  );
}
