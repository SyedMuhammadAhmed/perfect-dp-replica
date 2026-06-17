import { useEffect, useRef, useState } from "react";
import { Dropzone } from "@/components/Dropzone";
import { Download, RefreshCw } from "lucide-react";

type Effect = { name: string; category: string; filter: string; overlay?: (ctx: CanvasRenderingContext2D, s: number) => void };

const EFFECTS: Effect[] = [
  { name: "Original", category: "Basic", filter: "none" },
  { name: "Soft Blur", category: "Blur", filter: "blur(4px)" },
  { name: "Heavy Blur", category: "Blur", filter: "blur(12px)" },
  { name: "Vignette", category: "Light", filter: "none", overlay: (c, s) => {
    const g = c.createRadialGradient(s / 2, s / 2, s / 4, s / 2, s / 2, s / 1.4);
    g.addColorStop(0, "rgba(0,0,0,0)"); g.addColorStop(1, "rgba(0,0,0,0.7)");
    c.fillStyle = g; c.fillRect(0, 0, s, s);
  }},
  { name: "Glow", category: "Light", filter: "brightness(1.1) contrast(1.1) saturate(1.2)" },
  { name: "Warm", category: "Color", filter: "sepia(0.3) saturate(1.3) hue-rotate(-10deg)" },
  { name: "Cool", category: "Color", filter: "hue-rotate(20deg) saturate(1.2)" },
  { name: "B&W", category: "Color", filter: "grayscale(1) contrast(1.1)" },
  { name: "Duotone", category: "Color", filter: "grayscale(1) contrast(1.2)", overlay: (c, s) => {
    c.globalCompositeOperation = "multiply";
    const g = c.createLinearGradient(0, 0, s, s); g.addColorStop(0, "#10b981"); g.addColorStop(1, "#3b82f6");
    c.fillStyle = g; c.fillRect(0, 0, s, s);
    c.globalCompositeOperation = "source-over";
  }},
  { name: "Polaroid", category: "Vintage", filter: "sepia(0.2) contrast(1.05) brightness(1.05)" },
  { name: "Film Grain", category: "Vintage", filter: "contrast(1.1) saturate(0.9)", overlay: (c, s) => {
    const img = c.getImageData(0, 0, s, s);
    for (let i = 0; i < img.data.length; i += 4) {
      const n = (Math.random() - 0.5) * 25;
      img.data[i] += n; img.data[i + 1] += n; img.data[i + 2] += n;
    }
    c.putImageData(img, 0, 0);
  }},
  { name: "Tilt-Shift", category: "Blur", filter: "none", overlay: (c, s) => {
    const g = c.createLinearGradient(0, 0, 0, s);
    g.addColorStop(0, "rgba(255,255,255,0.4)"); g.addColorStop(0.5, "rgba(255,255,255,0)"); g.addColorStop(1, "rgba(255,255,255,0.4)");
    c.fillStyle = g; c.fillRect(0, 0, s, s);
  }},
];

const CATS = ["All", "Basic", "Blur", "Light", "Color", "Vintage"];

export function BlurredFrame() {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [effect, setEffect] = useState(0);
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
    c.width = s; c.height = s;
    const ctx = c.getContext("2d")!;
    const e = EFFECTS[effect];
    ctx.filter = e.filter;
    const scale = Math.max(s / img.width, s / img.height);
    const w = img.width * scale, h = img.height * scale;
    ctx.drawImage(img, (s - w) / 2, (s - h) / 2, w, h);
    ctx.filter = "none";
    e.overlay?.(ctx, s);
  };

  useEffect(() => { if (canvasRef.current && img) render(canvasRef.current, 500); }, [img, effect]);

  const download = () => {
    if (!img) return;
    const c = document.createElement("canvas");
    render(c, 1080);
    const a = document.createElement("a");
    a.href = c.toDataURL("image/png");
    a.download = `effect-${EFFECTS[effect].name.toLowerCase()}.png`;
    a.click();
  };

  if (!img) return <Dropzone onFile={loadFile} />;

  const visible = EFFECTS.map((e, i) => ({ ...e, i })).filter((e) => cat === "All" || e.category === cat);

  return (
    <div className="grid md:grid-cols-[1fr_360px] gap-6">
      <div className="rounded-3xl bg-card border border-border p-6 flex items-center justify-center">
        <canvas ref={canvasRef} className="max-w-full rounded-2xl" style={{ width: 500 }} />
      </div>
      <div className="rounded-3xl bg-card border border-border p-6 space-y-4">
        <div className="flex flex-wrap gap-1.5">
          {CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`px-3 py-1.5 text-xs font-medium rounded-full border ${cat === c ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border"}`}>{c}</button>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 max-h-[340px] overflow-y-auto">
          {visible.map((e) => (
            <button key={e.name} onClick={() => setEffect(e.i)} className={`p-2 rounded-xl border-2 text-xs font-medium transition ${effect === e.i ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}>
              {e.name}
            </button>
          ))}
        </div>
        <button onClick={download} className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-3 rounded-xl"><Download className="h-4 w-4" /> Download HD</button>
        <button onClick={() => setImg(null)} className="w-full inline-flex items-center justify-center gap-2 bg-secondary py-2.5 rounded-xl text-sm"><RefreshCw className="h-4 w-4" /> New photo</button>
      </div>
    </div>
  );
}
