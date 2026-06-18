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

const conic = (ctx: CanvasRenderingContext2D, s: number, stops: string[], width = 28) => {
  // simulate conic gradient via segmented arcs
  const r = s / 2 - width / 2;
  const segs = 120;
  ctx.lineWidth = width;
  for (let i = 0; i < segs; i++) {
    const t = i / segs;
    const idx = t * (stops.length - 1);
    const i0 = Math.floor(idx), i1 = Math.min(stops.length - 1, i0 + 1);
    const f = idx - i0;
    ctx.strokeStyle = mix(stops[i0], stops[i1], f);
    ctx.beginPath();
    ctx.arc(s / 2, s / 2, r, t * Math.PI * 2 - Math.PI / 2, ((i + 1) / segs) * Math.PI * 2 - Math.PI / 2);
    ctx.stroke();
  }
};

const mix = (a: string, b: string, f: number) => {
  const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
  const ar = (pa >> 16) & 255, ag = (pa >> 8) & 255, ab = pa & 255;
  const br = (pb >> 16) & 255, bg = (pb >> 8) & 255, bb = pb & 255;
  const r = Math.round(ar + (br - ar) * f), g = Math.round(ag + (bg - ag) * f), bl = Math.round(ab + (bb - ab) * f);
  return `rgb(${r},${g},${bl})`;
};

const FRAMES: Frame[] = [
  // Gradient
  { name: "Emerald Glow", category: "Gradient", draw: (c, s) => ring(c, s, grad(c, s, "#10b981", "#059669")) },
  { name: "Sunset", category: "Gradient", draw: (c, s) => ring(c, s, grad(c, s, "#f97316", "#ec4899")) },
  { name: "Ocean", category: "Gradient", draw: (c, s) => ring(c, s, grad(c, s, "#06b6d4", "#3b82f6")) },
  { name: "Purple Haze", category: "Gradient", draw: (c, s) => ring(c, s, grad(c, s, "#a855f7", "#ec4899")) },
  { name: "Aurora", category: "Gradient", draw: (c, s) => ring(c, s, grad(c, s, "#22d3ee", "#a855f7")) },
  { name: "Mint Lime", category: "Gradient", draw: (c, s) => ring(c, s, grad(c, s, "#86efac", "#facc15")) },
  { name: "Magenta Sky", category: "Gradient", draw: (c, s) => ring(c, s, grad(c, s, "#f472b6", "#60a5fa")) },
  { name: "Lava", category: "Gradient", draw: (c, s) => ring(c, s, grad(c, s, "#fde047", "#dc2626")) },
  { name: "Twilight", category: "Gradient", draw: (c, s) => ring(c, s, grad(c, s, "#312e81", "#7c3aed")) },
  { name: "Forest", category: "Gradient", draw: (c, s) => ring(c, s, grad(c, s, "#064e3b", "#22c55e")) },
  { name: "Peach Cream", category: "Gradient", draw: (c, s) => ring(c, s, grad(c, s, "#fed7aa", "#fb923c")) },
  { name: "Coral Reef", category: "Gradient", draw: (c, s) => ring(c, s, grad(c, s, "#fb7185", "#06b6d4")) },
  // Conic / Rainbow
  { name: "Rainbow", category: "Conic", draw: (c, s) => conic(c, s, ["#ef4444","#f59e0b","#eab308","#22c55e","#06b6d4","#6366f1","#a855f7","#ef4444"]) },
  { name: "Insta Story", category: "Conic", draw: (c, s) => conic(c, s, ["#f59e0b","#ec4899","#8b5cf6","#f59e0b"], 14) },
  { name: "Pastel Wheel", category: "Conic", draw: (c, s) => conic(c, s, ["#fecaca","#fde68a","#bbf7d0","#bae6fd","#ddd6fe","#fbcfe8","#fecaca"]) },
  { name: "Spectrum Thin", category: "Conic", draw: (c, s) => conic(c, s, ["#10b981","#06b6d4","#6366f1","#ec4899","#f59e0b","#10b981"], 10) },
  // Gold / Metallic
  { name: "Gold", category: "Gold", draw: (c, s) => ring(c, s, grad(c, s, "#fde047", "#a16207"), 30) },
  { name: "Rose Gold", category: "Gold", draw: (c, s) => ring(c, s, grad(c, s, "#fda4af", "#be185d"), 30) },
  { name: "Platinum", category: "Gold", draw: (c, s) => ring(c, s, grad(c, s, "#f8fafc", "#94a3b8"), 26) },
  { name: "Bronze", category: "Gold", draw: (c, s) => ring(c, s, grad(c, s, "#fcd34d", "#7c2d12"), 30) },
  { name: "Champagne", category: "Gold", draw: (c, s) => ring(c, s, grad(c, s, "#fef3c7", "#d97706"), 24) },
  { name: "Obsidian", category: "Gold", draw: (c, s) => ring(c, s, grad(c, s, "#1f2937", "#6b7280"), 26) },
  // Neon
  { name: "Neon Mint", category: "Neon", draw: (c, s) => { c.shadowBlur = 30; c.shadowColor = "#34d399"; ring(c, s, "#34d399", 12); c.shadowBlur = 0; } },
  { name: "Neon Pink", category: "Neon", draw: (c, s) => { c.shadowBlur = 30; c.shadowColor = "#ec4899"; ring(c, s, "#ec4899", 12); c.shadowBlur = 0; } },
  { name: "Neon Cyan", category: "Neon", draw: (c, s) => { c.shadowBlur = 30; c.shadowColor = "#22d3ee"; ring(c, s, "#22d3ee", 12); c.shadowBlur = 0; } },
  { name: "Neon Violet", category: "Neon", draw: (c, s) => { c.shadowBlur = 34; c.shadowColor = "#a855f7"; ring(c, s, "#a855f7", 12); c.shadowBlur = 0; } },
  { name: "Neon Lime", category: "Neon", draw: (c, s) => { c.shadowBlur = 34; c.shadowColor = "#a3e635"; ring(c, s, "#a3e635", 12); c.shadowBlur = 0; } },
  { name: "Neon Red", category: "Neon", draw: (c, s) => { c.shadowBlur = 34; c.shadowColor = "#ef4444"; ring(c, s, "#ef4444", 12); c.shadowBlur = 0; } },
  { name: "Neon Sun", category: "Neon", draw: (c, s) => { c.shadowBlur = 36; c.shadowColor = "#fbbf24"; ring(c, s, "#fbbf24", 12); c.shadowBlur = 0; } },
  { name: "Neon Sky", category: "Neon", draw: (c, s) => { c.shadowBlur = 36; c.shadowColor = "#38bdf8"; ring(c, s, "#38bdf8", 12); c.shadowBlur = 0; } },
  // Double / Stripes
  { name: "Double Ring", category: "Stripes", draw: (c, s) => { ring(c, s, "#10b981", 10); ring(c, s, "#10b981", 4); const r = s / 2 - 30; c.lineWidth = 4; c.strokeStyle = "#10b981"; c.beginPath(); c.arc(s/2, s/2, r, 0, Math.PI*2); c.stroke(); } },
  { name: "Triple Thin", category: "Stripes", draw: (c, s) => { [6, 18, 30].forEach((o) => { c.lineWidth = 3; c.strokeStyle = "#0f766e"; c.beginPath(); c.arc(s/2, s/2, s/2 - o, 0, Math.PI*2); c.stroke(); }); } },
  { name: "Mono Bold", category: "Stripes", draw: (c, s) => ring(c, s, "#111827", 36) },
  { name: "Cream Inset", category: "Stripes", draw: (c, s) => { ring(c, s, "#f5f5f4", 26); ring(c, s, "#a3a3a3", 2); } },
  { name: "Sunset Stripes", category: "Stripes", draw: (c, s) => { ring(c, s, "#f97316", 10); const r = s/2 - 22; c.lineWidth = 3; c.strokeStyle = "#ec4899"; c.beginPath(); c.arc(s/2, s/2, r, 0, Math.PI*2); c.stroke(); } },
  { name: "Forest Inset", category: "Stripes", draw: (c, s) => { ring(c, s, "#065f46", 20); ring(c, s, "#facc15", 3); } },
  // Patterns
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
  { name: "Big Dots", category: "Pattern", draw: (c, s) => {
    const r = s / 2 - 22;
    for (let i = 0; i < 30; i++) {
      const a = (i / 30) * Math.PI * 2;
      c.fillStyle = i % 2 ? "#ec4899" : "#8b5cf6";
      c.beginPath();
      c.arc(s/2 + Math.cos(a)*r, s/2 + Math.sin(a)*r, 12, 0, Math.PI*2);
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
  { name: "Dashes", category: "Pattern", draw: (c, s) => {
    c.lineWidth = 16; c.strokeStyle = "#10b981";
    c.setLineDash([20, 14]);
    c.beginPath(); c.arc(s/2, s/2, s/2 - 12, 0, Math.PI*2); c.stroke();
    c.setLineDash([]);
  }},
  { name: "Fine Dash", category: "Pattern", draw: (c, s) => {
    c.lineWidth = 6; c.strokeStyle = "#0f172a";
    c.setLineDash([6, 8]);
    c.beginPath(); c.arc(s/2, s/2, s/2 - 8, 0, Math.PI*2); c.stroke();
    c.setLineDash([]);
  }},
  { name: "Hearts", category: "Pattern", draw: (c, s) => {
    const r = s/2 - 24; c.fillStyle = "#ef4444";
    for (let i = 0; i < 20; i++) {
      const a = (i / 20) * Math.PI * 2;
      const x = s/2 + Math.cos(a)*r, y = s/2 + Math.sin(a)*r;
      c.save(); c.translate(x, y); c.scale(0.6, 0.6);
      c.beginPath();
      c.moveTo(0, 6);
      c.bezierCurveTo(0, -6, -14, -6, -14, 4);
      c.bezierCurveTo(-14, 12, 0, 18, 0, 22);
      c.bezierCurveTo(0, 18, 14, 12, 14, 4);
      c.bezierCurveTo(14, -6, 0, -6, 0, 6);
      c.fill(); c.restore();
    }
  }},
  { name: "Sparkles", category: "Pattern", draw: (c, s) => {
    const r = s/2 - 22; c.fillStyle = "#facc15";
    for (let i = 0; i < 36; i++) {
      const a = (i / 36) * Math.PI * 2;
      const x = s/2 + Math.cos(a)*r, y = s/2 + Math.sin(a)*r;
      const sz = i % 3 === 0 ? 8 : 4;
      c.beginPath();
      c.moveTo(x, y - sz); c.lineTo(x + sz/3, y - sz/3);
      c.lineTo(x + sz, y); c.lineTo(x + sz/3, y + sz/3);
      c.lineTo(x, y + sz); c.lineTo(x - sz/3, y + sz/3);
      c.lineTo(x - sz, y); c.lineTo(x - sz/3, y - sz/3);
      c.closePath(); c.fill();
    }
  }},
  { name: "Petals", category: "Pattern", draw: (c, s) => {
    const r = s/2 - 26;
    for (let i = 0; i < 18; i++) {
      const a = (i / 18) * Math.PI * 2;
      c.save();
      c.translate(s/2 + Math.cos(a)*r, s/2 + Math.sin(a)*r);
      c.rotate(a);
      c.fillStyle = i % 2 ? "#f472b6" : "#fb7185";
      c.beginPath(); c.ellipse(0, 0, 14, 6, 0, 0, Math.PI*2); c.fill();
      c.restore();
    }
  }},
  { name: "Tick Marks", category: "Pattern", draw: (c, s) => {
    c.strokeStyle = "#0f172a"; c.lineWidth = 4;
    for (let i = 0; i < 60; i++) {
      const a = (i / 60) * Math.PI * 2;
      const r1 = s/2 - 4, r2 = s/2 - (i % 5 === 0 ? 24 : 14);
      c.beginPath();
      c.moveTo(s/2 + Math.cos(a)*r1, s/2 + Math.sin(a)*r1);
      c.lineTo(s/2 + Math.cos(a)*r2, s/2 + Math.sin(a)*r2);
      c.stroke();
    }
  }},
  { name: "Bubbles", category: "Pattern", draw: (c, s) => {
    const r = s/2 - 20;
    for (let i = 0; i < 22; i++) {
      const a = (i / 22) * Math.PI * 2;
      const x = s/2 + Math.cos(a)*r, y = s/2 + Math.sin(a)*r;
      const rad = 8 + (i % 4) * 2;
      c.fillStyle = "rgba(34,211,238,0.85)";
      c.beginPath(); c.arc(x, y, rad, 0, Math.PI*2); c.fill();
    }
  }},
  { name: "Leaves", category: "Pattern", draw: (c, s) => {
    const r = s/2 - 24;
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      c.save();
      c.translate(s/2 + Math.cos(a)*r, s/2 + Math.sin(a)*r);
      c.rotate(a + Math.PI / 2);
      c.fillStyle = "#16a34a";
      c.beginPath();
      c.moveTo(0, -12); c.bezierCurveTo(10, -8, 10, 8, 0, 14);
      c.bezierCurveTo(-10, 8, -10, -8, 0, -12);
      c.fill(); c.restore();
    }
  }},
  // Glass / Shadow
  { name: "Soft Shadow", category: "Shadow", draw: (c, s) => { c.shadowBlur = 40; c.shadowColor = "rgba(0,0,0,0.3)"; ring(c, s, "#ffffff", 8); c.shadowBlur = 0; } },
  { name: "Halo", category: "Shadow", draw: (c, s) => { c.shadowBlur = 50; c.shadowColor = "rgba(16,185,129,0.7)"; ring(c, s, "#10b981", 6); c.shadowBlur = 0; } },
  { name: "Frost", category: "Shadow", draw: (c, s) => { c.shadowBlur = 30; c.shadowColor = "rgba(186,230,253,0.9)"; ring(c, s, "#e0f2fe", 14); c.shadowBlur = 0; } },
  { name: "Inner Cream", category: "Shadow", draw: (c, s) => { ring(c, s, "#fef3c7", 20); c.shadowBlur = 20; c.shadowColor = "rgba(217,119,6,0.5)"; ring(c, s, "#d97706", 2); c.shadowBlur = 0; } },
];

const CATS = ["All", "Gradient", "Conic", "Gold", "Neon", "Stripes", "Pattern", "Shadow"];
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
