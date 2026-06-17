import { useEffect, useRef, useState } from "react";
import { Dropzone } from "@/components/Dropzone";
import { Download, RefreshCw, ZoomIn } from "lucide-react";

const SIZES = [500, 720, 1080] as const;
const FORMATS = ["png", "jpeg", "webp"] as const;

export function DpMaker() {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState<number>(720);
  const [format, setFormat] = useState<(typeof FORMATS)[number]>("png");
  const previewRef = useRef<HTMLCanvasElement>(null);
  const dragRef = useRef<{ active: boolean; sx: number; sy: number; ox: number; oy: number }>({
    active: false, sx: 0, sy: 0, ox: 0, oy: 0,
  });

  const loadFile = (f: File) => {
    const url = URL.createObjectURL(f);
    const i = new Image();
    i.onload = () => { setImg(i); setOffset({ x: 0, y: 0 }); setZoom(1); };
    i.src = url;
  };

  const draw = (canvas: HTMLCanvasElement, outSize: number) => {
    const ctx = canvas.getContext("2d");
    if (!ctx || !img) return;
    canvas.width = outSize;
    canvas.height = outSize;
    ctx.clearRect(0, 0, outSize, outSize);
    const scale = (outSize / Math.min(img.width, img.height)) * zoom;
    const w = img.width * scale;
    const h = img.height * scale;
    const cx = (outSize - w) / 2 + offset.x * (outSize / 400);
    const cy = (outSize - h) / 2 + offset.y * (outSize / 400);
    ctx.drawImage(img, cx, cy, w, h);
  };

  useEffect(() => {
    if (previewRef.current && img) draw(previewRef.current, 400);
  }, [img, zoom, offset]);

  const download = () => {
    if (!img) return;
    const c = document.createElement("canvas");
    draw(c, size);
    const mime = `image/${format}`;
    const url = c.toDataURL(mime, 0.95);
    const a = document.createElement("a");
    a.href = url;
    a.download = `whatsapp-dp-${size}.${format}`;
    a.click();
  };

  if (!img) return <Dropzone onFile={loadFile} />;

  return (
    <div className="grid md:grid-cols-[1fr_320px] gap-6 items-start">
      <div className="rounded-3xl bg-card border border-border p-6">
        <div
          className="relative mx-auto aspect-square w-full max-w-[400px] overflow-hidden rounded-full bg-secondary cursor-grab active:cursor-grabbing"
          onPointerDown={(e) => {
            (e.target as Element).setPointerCapture(e.pointerId);
            dragRef.current = { active: true, sx: e.clientX, sy: e.clientY, ox: offset.x, oy: offset.y };
          }}
          onPointerMove={(e) => {
            if (!dragRef.current.active) return;
            setOffset({ x: dragRef.current.ox + (e.clientX - dragRef.current.sx), y: dragRef.current.oy + (e.clientY - dragRef.current.sy) });
          }}
          onPointerUp={() => { dragRef.current.active = false; }}
        >
          <canvas ref={previewRef} className="block h-full w-full" />
        </div>
        <p className="text-xs text-muted-foreground text-center mt-3">Drag to reposition · This is the circular crop WhatsApp will show</p>
      </div>
      <div className="space-y-5 rounded-3xl bg-card border border-border p-6">
        <div>
          <label className="text-sm font-semibold flex items-center gap-2"><ZoomIn className="h-4 w-4 text-primary" /> Zoom</label>
          <input type="range" min={1} max={3} step={0.01} value={zoom} onChange={(e) => setZoom(+e.target.value)} className="w-full accent-[oklch(0.68_0.16_160)] mt-2" />
        </div>
        <div>
          <div className="text-sm font-semibold mb-2">Resolution</div>
          <div className="grid grid-cols-3 gap-2">
            {SIZES.map((s) => (
              <button key={s} onClick={() => setSize(s)} className={`px-3 py-2 rounded-lg text-sm font-medium border transition ${size === s ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:border-primary/60"}`}>{s}px</button>
            ))}
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold mb-2">Format</div>
          <div className="grid grid-cols-3 gap-2">
            {FORMATS.map((f) => (
              <button key={f} onClick={() => setFormat(f)} className={`px-3 py-2 rounded-lg text-sm font-medium uppercase border transition ${format === f ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:border-primary/60"}`}>{f}</button>
            ))}
          </div>
        </div>
        <button onClick={download} className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-3 rounded-xl hover:bg-primary/90">
          <Download className="h-4 w-4" /> Download DP
        </button>
        <button onClick={() => setImg(null)} className="w-full inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground py-2.5 rounded-xl text-sm hover:bg-secondary/80">
          <RefreshCw className="h-4 w-4" /> Upload different photo
        </button>
      </div>
    </div>
  );
}
