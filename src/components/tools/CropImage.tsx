import { useEffect, useRef, useState } from "react";
import { Dropzone } from "@/components/Dropzone";
import { Download, RefreshCw } from "lucide-react";

const RATIOS = [
  { label: "1:1", v: 1 },
  { label: "4:3", v: 4 / 3 },
  { label: "16:9", v: 16 / 9 },
  { label: "3:4", v: 3 / 4 },
  { label: "9:16", v: 9 / 16 },
];

export function CropImage() {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [ratio, setRatio] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dragRef = useRef({ active: false, sx: 0, sy: 0, ox: 0, oy: 0 });

  const loadFile = (f: File) => {
    const url = URL.createObjectURL(f);
    const i = new Image();
    i.onload = () => { setImg(i); setOffset({ x: 0, y: 0 }); setZoom(1); };
    i.src = url;
  };

  const render = (c: HTMLCanvasElement, w: number) => {
    if (!img) return;
    const h = w / ratio;
    c.width = w; c.height = h;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#f1f5f9";
    ctx.fillRect(0, 0, w, h);
    const scale = (Math.max(w / img.width, h / img.height)) * zoom;
    const iw = img.width * scale, ih = img.height * scale;
    ctx.drawImage(img, (w - iw) / 2 + offset.x * (w / 480), (h - ih) / 2 + offset.y * (w / 480), iw, ih);
  };

  useEffect(() => { if (canvasRef.current && img) render(canvasRef.current, 480); }, [img, ratio, zoom, offset]);

  const download = () => {
    if (!img) return;
    const c = document.createElement("canvas");
    render(c, 1920);
    const a = document.createElement("a");
    a.href = c.toDataURL("image/png");
    a.download = `cropped-${RATIOS.find((r) => r.v === ratio)?.label.replace(":", "x")}.png`;
    a.click();
  };

  if (!img) return <Dropzone onFile={loadFile} />;

  return (
    <div className="grid md:grid-cols-[1fr_320px] gap-6">
      <div className="rounded-3xl bg-card border border-border p-6 flex items-center justify-center">
        <div
          className="overflow-hidden rounded-xl border border-border cursor-grab active:cursor-grabbing"
          style={{ width: 480, maxWidth: "100%" }}
          onPointerDown={(e) => { (e.target as Element).setPointerCapture(e.pointerId); dragRef.current = { active: true, sx: e.clientX, sy: e.clientY, ox: offset.x, oy: offset.y }; }}
          onPointerMove={(e) => { if (!dragRef.current.active) return; setOffset({ x: dragRef.current.ox + (e.clientX - dragRef.current.sx), y: dragRef.current.oy + (e.clientY - dragRef.current.sy) }); }}
          onPointerUp={() => { dragRef.current.active = false; }}
        >
          <canvas ref={canvasRef} className="block w-full" />
        </div>
      </div>
      <div className="rounded-3xl bg-card border border-border p-6 space-y-5">
        <div>
          <div className="text-sm font-semibold mb-2">Aspect Ratio</div>
          <div className="grid grid-cols-3 gap-2">
            {RATIOS.map((r) => (
              <button key={r.label} onClick={() => setRatio(r.v)} className={`px-3 py-2 rounded-lg text-sm font-medium border ${ratio === r.v ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border"}`}>{r.label}</button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold">Zoom</div>
          <input type="range" min={1} max={3} step={0.01} value={zoom} onChange={(e) => setZoom(+e.target.value)} className="w-full mt-2 accent-[oklch(0.68_0.16_160)]" />
        </div>
        <button onClick={download} className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-3 rounded-xl"><Download className="h-4 w-4" /> Download</button>
        <button onClick={() => setImg(null)} className="w-full inline-flex items-center justify-center gap-2 bg-secondary py-2.5 rounded-xl text-sm"><RefreshCw className="h-4 w-4" /> New photo</button>
      </div>
    </div>
  );
}
