import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body style={{ display: "grid", placeItems: "center", minHeight: "100vh", fontFamily: "system-ui", background: "#100535", color: "#fff", margin: 0 }}>
        <div style={{ textAlign: "center" }}>
          <h1>404</h1>
          <p><Link href="/" style={{ color: "#ef2ef2" }}>voyola.com</Link></p>
        </div>
      </body>
    </html>
  );
}
