// 單顆馬卡龍 SVG，可透過 props 控制顏色與尺寸
export default function Macaron({
  color = "#FFB3C6",
  width = 52,
  height = 34,
  opacityTop = 0.95,
  opacityBottom = 0.9,
}: {
  color?: string;
  width?: number;
  height?: number;
  opacityTop?: number;
  opacityBottom?: number;
}) {
  return (
    <svg width={width} height={height} viewBox="0 0 56 36">
      <ellipse cx="28" cy="8" rx="26" ry="8" fill={color} opacity={opacityTop} />
      <rect x="4" y="14" width="48" height="6" rx="3" fill="white" opacity="0.7" />
      <ellipse cx="28" cy="28" rx="26" ry="8" fill={color} opacity={opacityBottom} />
    </svg>
  );
}
