import s from "./screens.module.css";

// A real app screen (sanitized capture from the Design System export) filling the phone screen.
export function Shot({ name, alt = "" }: { name: "dashboard" | "dashboard-services" | "pay" | "campaigns" | "webauth" | "paysuccess" | "notifications"; alt?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={`/screens/${name}.webp`} alt={alt} className={s.shot} width={780} height={1688} loading="lazy" decoding="async" />;
}
