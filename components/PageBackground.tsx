import Macaron from "./Macaron";

type Bokeh = { w: number; top: string; left: string; color: string; opacity: number };
type FloatMac = {
  anim: "float-a" | "float-b" | "float-c";
  top: string;
  left: string;
  rotate?: number;
  color: string;
  width: number;
};

const DEFAULT_BOKEH: Bokeh[] = [
  { w: 360, top: "15%", left: "12%", color: "#FFAEC4", opacity: 0.55 },
  { w: 280, top: "20%", left: "75%", color: "#C9B8FF", opacity: 0.45 },
  { w: 220, top: "70%", left: "20%", color: "#B8E8D0", opacity: 0.4 },
  { w: 180, top: "75%", left: "80%", color: "#FFD6A0", opacity: 0.38 },
  { w: 150, top: "50%", left: "50%", color: "#FFC8D8", opacity: 0.3 },
];

const DEFAULT_MACARONS: FloatMac[] = [
  { anim: "float-a", top: "18%", left: "4%", color: "#FFB3C6", width: 52 },
  { anim: "float-b", top: "55%", left: "2%", rotate: 20, color: "#B8E8D0", width: 44 },
  { anim: "float-c", top: "75%", left: "5%", rotate: -15, color: "#FFE082", width: 40 },
  { anim: "float-a", top: "22%", left: "90%", rotate: 10, color: "#C9B8FF", width: 48 },
  { anim: "float-b", top: "60%", left: "92%", rotate: -20, color: "#FFD6A0", width: 36 },
  { anim: "float-c", top: "80%", left: "85%", rotate: 30, color: "#FF8FAB", width: 42 },
];

export default function PageBackground({
  variant = "vivid",
  bokeh = DEFAULT_BOKEH,
  macarons,
}: {
  variant?: "vivid" | "soft";
  bokeh?: Bokeh[];
  macarons?: FloatMac[];
}) {
  const macs = macarons ?? (variant === "soft" ? [] : DEFAULT_MACARONS);

  return (
    <>
      <div className={variant === "soft" ? "page-bg page-bg--soft" : "page-bg"} />

      {bokeh.map((b, i) => (
        <div
          key={i}
          className="bokeh"
          style={{
            width: b.w,
            height: b.w,
            top: b.top,
            left: b.left,
            background: b.color,
            opacity: b.opacity,
          }}
        />
      ))}

      {macs.map((m, i) => (
        <div
          key={i}
          className={m.anim}
          style={{
            position: "fixed",
            top: m.top,
            left: m.left,
            zIndex: 2,
            transform: m.rotate ? `rotate(${m.rotate}deg)` : undefined,
          }}
        >
          <Macaron color={m.color} width={m.width} height={Math.round(m.width * 0.65)} />
        </div>
      ))}
    </>
  );
}
