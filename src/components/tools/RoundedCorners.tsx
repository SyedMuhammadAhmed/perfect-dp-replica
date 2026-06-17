import { useEffect, useRef, useState } from "react";
import { Dropzone } from "@/components/Dropzone";
import { Download, RefreshCw } from "lucide-react";

const BG_PRESETS = ["transparent", "#ffffff", "#0f172a", "#10b981", "gradient", "blur"] as const;
type Bg = (typeof BG_PRESETS)[number];

export function RoundedCorners() {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [radius, setRadius] = useState(48);
  const [shadow, setShadow] = useState(30);
  const [bg, setBg] = useState<Bg>("blur");
  const [padding, setPadding] = useState(48);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const loadFile = (f: File) => {
    const url = URL.createObjectURL(f);
    const i = new Image();
    i.onload = () => setImg(i);
    i.src = url;
  };

  const render = (c: HTMLCanvasElement, s: number) => {
    if (!img) return;
    c.width = s; c.height = s;
    const ctx = c.getContext("2d")!;
    ctx.clearRect(0, 0, s, s);
    if (bg === "blur") {
      ctx.filter = "blur(40px) brightness(0.9)";
      const sc = (s / Math.min(img.width, img.height)) * 1.2;
      ctx.drawImage(img, (s - img.width * sc) / 2, (s - img.height * sc) / 2, img.width * sc, img.height * sc);
      ctx.filter = "none";
    } else if (bg === "gradient") {
      const g = ctx.createLinearGradient(0, 0, s, s);
      g.addColorStop(0, "#10b981"); g.addColorStop(1, "#3b82f6");
      ctx.fillStyle = g; ctx.fillRect(0, 0, s, s);
    } else if (bg !== "transparent") {
      ctx.fillStyle = bg; ctx.fillRect(0, 0, s, s);
    }
    const p = padding * (s / 600);
    const r = radius * (s / 600);
    const iw = s - p * 2, ih = s - p * 2;
    if (shadow > 0) {
      ctx.shadowColor = "rgba(0,0,0,0.35)"; ctx.shadowBlur = shadow * (s / 600); ctx.shadowOffsetY = 12 * (s / 600);
    }
    ctx.beginPath();
    roundRect(ctx, p, p, iw, ih, r);
    ctx.closePath();
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.shadowColor = "transparent"; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
    ctx.save();
    ctx.beginPath(); roundRect(ctx, p, p, iw, ih, r); ctx.clip();
    const scale = Math.max(iw / img.width, ih / img.height);
    const w = img.width * scale, h = img.height * scale;
    ctx.drawImage(img, p + (iw - w) / 2, p + (ih - h) / 2, w, h);
    ctx.restore();
  };

  useEffect(() => { if (canvasRef.current && img) render(canvasRef.current, 500); }, [img, radius, shadow, bg, padding]);

  const download = () => {
    if (!img) return;
    const c = document.createElement("canvas");
    render(c, 1200);
    const a = document.createElement("a");
    a.href = c.toDataURL("image/png");
    a.download = "rounded.png";
    a.click();
  };

  if (!img) return <Dropzone onFile={loadFile} />;

  return (
    <div className="grid md:grid-cols-[1fr_340px] gap-6">
      <div className="rounded-3xl bg-card border border-border p-6 flex items-center justify-center">
        <canvas ref={canvasRef} className="max-w-full" style={{ width: 500 }} />
      </div>
      <div className="rounded-3xl bg-card border border-border p-6 space-y-5">
        <Slider label={`Corner Radius · ${radius}px`} value={radius} min={0} max={300} onChange={setRadius} />
        <Slider label={`Shadow · ${shadow}`} value={shadow} min={0} max={80} onChange={setShadow} />
        <Slider label={`Padding · ${padding}px`} value={padding} min={0} max={120} onChange={setPadding} />
        <div>
          <div className="text-sm font-semibold mb-2">Background</div>
          <div className="grid grid-cols-3 gap-2">
            {BG_PRESETS.map((b) => (
              <button key={b} onClick={() => setBg(b)} className={`px-3 py-2 rounded-lg text-xs font-medium border capitalize ${bg === b ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border"}`}>{b}</button>
            ))}
          </div>
        </div>
        <button onClick={download} className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-3 rounded-xl"><Download className="h-4 w-4" /> Download</button>
        <button onClick={() => setImg(null)} className="w-full inline-flex items-center justify-center gap-2 bg-secondary py-2.5 rounded-xl text-sm"><RefreshCw className="h-4 w-4" /> New photo</button>
      </div>
    </div>
  );
}

function Slider({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="text-sm font-semibold mb-1">{label}</div>
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(+e.target.value)} className="w-full accent-[oklch(0.68_0.16_160)]" />
    </div>
  );
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  r = Math.min(r, w / 2, h / 2);
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
}
