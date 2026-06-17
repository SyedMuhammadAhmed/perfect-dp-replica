import { useEffect, useRef, useState } from "react";
import { Dropzone } from "@/components/Dropzone";
import { Download, RefreshCw } from "lucide-react";

type Frame = { name: string; category: string; draw: (ctx: CanvasRenderingContext2D, s: number) => void };

const ring = (ctx: CanvasRenderingContext2D, s: number, fill: CanvasGradient | string, width = 28) => {
  ctx.lineWidth = width;
  ctx.strokeStyle = fill;
  ctx.beginPath();
  ctx.arc(s / 2, s / 2, s / 2 - width / 2, 0, Math.PI * 2);
  ctx.stroke();
};

const grad = (ctx: CanvasRenderingContext2D, s: number, c1: string, c2: string) => {
  const g = ctx.createLinearGradient(0, 0, s, s);
  g.addColorStop(0, c1); g.addColorStop(1, c2); return g;
};

const FRAMES: Frame[] = [
  { name: "Emerald Glow", category: "Gradient", draw: (c, s) => ring(c, s, grad(c, s, "#10b981", "#059669")) },
  { name: "Sunset", category: "Gradient", draw: (c, s) => ring(c, s, grad(c, s, "#f97316", "#ec4899")) },
  { name: "Ocean", category: "Gradient", draw: (c, s) => ring(c, s, grad(c, s, "#06b6d4", "#3b82f6")) },
  { name: "Purple Haze", category: "Gradient", draw: (c, s) => ring(c, s, grad(c, s, "#a855f7", "#ec4899")) },
  { name: "Aurora", category: "Gradient", draw: (c, s) => ring(c, s, grad(c, s, "#22d3ee", "#a855f7")) },
  { name: "Gold", category: "Gold", draw: (c, s) => ring(c, s, grad(c, s, "#fde047", "#a16207"), 30) },
  { name: "Rose Gold", category: "Gold", draw: (c, s) => ring(c, s, grad(c, s, "#fda4af", "#be185d"), 30) },
  { name: "Neon Mint", category: "Neon", draw: (c, s) => { c.shadowBlur = 30; c.shadowColor = "#34d399"; ring(c, s, "#34d399", 12); c.shadowBlur = 0; } },
  { name: "Neon Pink", category: "Neon", draw: (c, s) => { c.shadowBlur = 30; c.shadowColor = "#ec4899"; ring(c, s, "#ec4899", 12); c.shadowBlur = 0; } },
  { name: "Neon Cyan", category: "Neon", draw: (c, s) => { c.shadowBlur = 30; c.shadowColor = "#22d3ee"; ring(c, s, "#22d3ee", 12); c.shadowBlur = 0; } },
  { name: "Dots", category: "Pattern", draw: (c, s) => {
    const r = s / 2 - 18;
    for (let i = 0; i < 60; i++) {
      const a = (i / 60) * Math.PI * 2;
      c.fillStyle = "#10b981";
      c.beginPath();
      c.arc(s / 2 + Math.cos(a) * r, s / 2 + Math.sin(a) * r, 6, 0, Math.PI * 2);
      c.fill();
    }
  }},
  { name: "Stars", category: "Pattern", draw: (c, s) => {
    const r = s / 2 - 22; c.fillStyle = "#fbbf24";
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2;
      const x = s / 2 + Math.cos(a) * r, y = s / 2 + Math.sin(a) * r;
      c.beginPath();
      for (let k = 0; k < 5; k++) {
        const ang = (k / 5) * Math.PI * 2 - Math.PI / 2;
        c.lineTo(x + Math.cos(ang) * 10, y + Math.sin(ang) * 10);
        const ang2 = ang + Math.PI / 5;
        c.lineTo(x + Math.cos(ang2) * 4, y + Math.sin(ang2) * 4);
      }
      c.closePath(); c.fill();
    }
  }},
];

const CATS = ["All", "Gradient", "Gold", "Neon", "Pattern"];
const SIZE = 800;

export function CircleFrame() {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [frame, setFrame] = useState(0);
  const [cat, setCat] = useState("All");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const loadFile = (f: File) => {
    const url = URL.createObjectURL(f);
    const i = new Image();
    i.onload = () => setImg(i);
    i.src = url;
  };

  const render = (c: HTMLCanvasElement, s: number) => {
    if (!img) return;
    const ctx = c.getContext("2d")!;
    c.width = s; c.height = s;
    ctx.clearRect(0, 0, s, s);
    ctx.save();
    ctx.beginPath();
    ctx.arc(s / 2, s / 2, s / 2 - 30, 0, Math.PI * 2);
    ctx.clip();
    const scale = s / Math.min(img.width, img.height);
    const w = img.width * scale, h = img.height * scale;
    ctx.drawImage(img, (s - w) / 2, (s - h) / 2, w, h);
    ctx.restore();
    FRAMES[frame].draw(ctx, s);
  };

  useEffect(() => { if (canvasRef.current && img) render(canvasRef.current, 500); }, [img, frame]);

  const download = () => {
    if (!img) return;
    const c = document.createElement("canvas");
    render(c, SIZE);
    const a = document.createElement("a");
    a.href = c.toDataURL("image/png");
    a.download = "circle-frame-dp.png";
    a.click();
  };

  if (!img) return <Dropzone onFile={loadFile} />;

  const visible = FRAMES.map((f, i) => ({ ...f, i })).filter((f) => cat === "All" || f.category === cat);

  return (
    <div className="grid md:grid-cols-[1fr_360px] gap-6">
      <div className="rounded-3xl bg-card border border-border p-6">
        <div className="mx-auto aspect-square w-full max-w-[480px]">
          <canvas ref={canvasRef} className="h-full w-full" />
        </div>
      </div>
      <div className="rounded-3xl bg-card border border-border p-6 space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`px-3 py-1.5 text-xs font-medium rounded-full border ${cat === c ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border"}`}>{c}</button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 max-h-[340px] overflow-y-auto pr-1">
          {visible.map((f) => (
            <button key={f.name} onClick={() => setFrame(f.i)} className={`aspect-square rounded-xl border-2 p-1 transition ${frame === f.i ? "border-primary" : "border-transparent hover:border-border"}`}>
              <FramePreview frame={f} />
              <div className="text-[10px] mt-1 truncate">{f.name}</div>
            </button>
          ))}
        </div>
        <button onClick={download} className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-3 rounded-xl hover:bg-primary/90">
          <Download className="h-4 w-4" /> Download HD
        </button>
        <button onClick={() => setImg(null)} className="w-full inline-flex items-center justify-center gap-2 bg-secondary py-2.5 rounded-xl text-sm">
          <RefreshCw className="h-4 w-4" /> New photo
        </button>
      </div>
    </div>
  );
}

function FramePreview({ frame }: { frame: Frame }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const s = 80; c.width = s; c.height = s;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#e5e7eb";
    ctx.beginPath(); ctx.arc(s / 2, s / 2, s / 2 - 4, 0, Math.PI * 2); ctx.fill();
    const scale = 80 / 800;
    ctx.save(); ctx.scale(scale, scale); frame.draw(ctx, 800); ctx.restore();
  }, [frame]);
  return <canvas ref={ref} className="w-full h-full" />;
}
