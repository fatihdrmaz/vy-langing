import { useTranslations } from "next-intl";
import { StatusBar } from "./Phone";
import { Icon, type IconName } from "./Icons";
import s from "./screens.module.css";

export const DASH_ROWS: { key: "food" | "premium" | "pay" | "benefits" | "discover"; icon: IconName }[] = [
  { key: "food", icon: "food" },
  { key: "premium", icon: "lounge" },
  { key: "pay", icon: "qr" },
  { key: "benefits", icon: "gift" },
  { key: "discover", icon: "pin" },
];

// The app home screen — shared by the hero hand-off and the Journey section so the transition reads as one object.
export function DashboardScreen({ rowAttr }: { rowAttr?: Record<string, string> }) {
  const t = useTranslations("journey");
  return (
    <>
      <StatusBar />
      <div className={s.app}>
        <div className={s.top}>
          <div>
            <small>Istanbul Airport · IST</small>
            <b>{t("greeting")}</b>
          </div>
          <span className={s.pill}>Voyola</span>
        </div>
        <div className={s.hero}>
          <small>TK 1985 · IST → LHR</small>
          <span className={s.big}>02:45</span>
          <div className={s.tags}>
            <span>Gate F7</span>
            <span>Boarding 18:05</span>
          </div>
        </div>
        <div className={s.label}>{t("eyebrow")}</div>
        {DASH_ROWS.map((c) => (
          <div key={c.key} className={s.row} {...rowAttr}>
            <span className={s.ic}>{Icon[c.icon]()}</span>
            <span className={s.tx}>
              <b>{t(`cards.${c.key}.t`)}</b>
              <span>{t(`cards.${c.key}.d`)}</span>
            </span>
            <span className={s.go}>›</span>
          </div>
        ))}
        <div className={s.tabbar}>
          <span className={s.tabOn}><i />Home</span>
          <span><i />Services</span>
          <span><i className={s.fab} />Pay</span>
          <span><i />Purchases</span>
          <span><i />Wallet</span>
        </div>
      </div>
    </>
  );
}
