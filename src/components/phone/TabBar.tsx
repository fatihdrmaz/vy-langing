import s from "./screens.module.css";

// Mirrors the real app's bottom bar (Dashboard/Campaigns screens): light pill, outline icons,
// Home · Services · [QR] · Purchases · Campaigns. `active` = highlighted tab.
const ico = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const I = {
  home: <svg {...ico}><path d="M3 11 12 4l9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" /></svg>,
  services: <svg {...ico}><rect x="3" y="3" width="7" height="7" rx="2" /><rect x="14" y="3" width="7" height="7" rx="2" /><rect x="3" y="14" width="7" height="7" rx="2" /><rect x="14" y="14" width="7" height="7" rx="2" /></svg>,
  qr: <svg {...ico} stroke="#fff" strokeWidth={2}><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><path d="M14 14h2v2h-2zM18 14h2M20 16v4M14 18v2h2" /></svg>,
  purchases: <svg {...ico}><path d="M4 7h16v4a2 2 0 0 0 0 4v4H4v-4a2 2 0 0 0 0-4z" /><path d="M12 7v13" strokeDasharray="2 2" /></svg>,
  campaigns: <svg {...ico}><path d="M20 12v8H4v-8M2 7h20v5H2zM12 22V7M12 7c-2-3-6-3-6-1s3 1 6 1zm0 0c2-3 6-3 6-1s-3 1-6 1z" /></svg>,
};

export function TabBar({ active = "home" }: { active?: "home" | "services" | "purchases" | "campaigns" }) {
  const item = (key: keyof typeof I, label: string) => (
    <span key={key} className={`${s.tab} ${active === key ? s.tabOn : ""}`}>
      {I[key]}
      <small>{label}</small>
    </span>
  );
  return (
    <div className={s.tabbar}>
      {item("home", "Home")}
      {item("services", "Services")}
      <span className={s.tabFab} aria-hidden="true">{I.qr}</span>
      {item("purchases", "Purchases")}
      {item("campaigns", "Campaigns")}
    </div>
  );
}
