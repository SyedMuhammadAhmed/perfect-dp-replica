import { useRef, useState, type DragEvent } from "react";
import { UploadCloud, Sparkles } from "lucide-react";

export function Dropzone({ onFile, hint }: { onFile: (f: File) => void; hint?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  const handleFiles = (files: FileList | null) => {
    const f = files?.[0];
    if (f && f.type.startsWith("image/")) onFile(f);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDrag(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={onDrop}
      onClick={() => inputRef.current?.click()}
      className={`group cursor-pointer rounded-3xl border-2 border-dashed bg-card p-10 sm:p-14 text-center transition ${drag ? "border-primary bg-primary/5" : "border-border hover:border-primary/60 hover:bg-primary/[0.03]"}`}
    >
      <div className="relative mx-auto h-20 w-20 rounded-2xl bg-primary/10 grid place-items-center">
        <UploadCloud className="h-9 w-9 text-primary" />
        <span className="absolute -top-1 -right-1 h-7 w-7 rounded-full bg-primary text-primary-foreground grid place-items-center shadow-sm">
          <Sparkles className="h-3.5 w-3.5" />
        </span>
      </div>
      <div className="mt-6 text-xl font-bold">Drop your photo here</div>
      <div className="mt-1 text-sm text-muted-foreground">
        or <span className="text-primary font-semibold underline underline-offset-4">browse files</span> to upload
      </div>
      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <span className="px-3 py-1 rounded-full bg-secondary">{hint ?? "JPG, PNG, WEBP"}</span>
        <span className="px-3 py-1 rounded-full bg-secondary">Max 20MB</span>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
