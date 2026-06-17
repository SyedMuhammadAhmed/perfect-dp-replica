import { createFileRoute } from "@tanstack/react-router";
import { Crop, Lock, Download } from "lucide-react";
import { CropImage } from "@/components/tools/CropImage";

export const Route = createFileRoute("/crop-image")({
  head: () => ({
    meta: [
      { title: "Image Crop Tool — Any Aspect Ratio, HD Output" },
      { name: "description", content: "Precisely crop photos for WhatsApp, Instagram, LinkedIn or any platform. 1:1, 4:3, 16:9, portrait and story ratios." },
    ],
  }),
  component: Page,
});

const FEATURES = [
  { icon: Crop, title: "Precision Cropping", text: "Drag your image to perfectly position what appears in the crop window." },
  { icon: Lock, title: "Lock Aspect Ratios", text: "Choose from 1:1, 4:3, 16:9, portrait and story ratios — or go free-form." },
  { icon: Download, title: "HD Output", text: "Export at full 1920px resolution. Sharp on any device or platform." },
];

const RATIOS = [
  { label: "1:1 Square", use: "WhatsApp DP, Instagram Profile, Twitter Avatar", tip: "Keep your subject centered for circle-cropped platforms." },
  { label: "4:3 Standard", use: "Facebook Posts, Blog Thumbnails, General Photos", tip: "The classic photo ratio — works universally well." },
  { label: "16:9 Widescreen", use: "YouTube Thumbnails, Twitter Cards, LinkedIn Banner", tip: "Ideal for banners and cover images." },
  { label: "9:16 Story", use: "Instagram Stories, WhatsApp Status, TikTok", tip: "Vertical full-screen format for mobile-first content." },
];

function Page() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,oklch(0.95_0.06_160)_0%,transparent_60%)]" />
        <div className="mx-auto max-w-5xl px-4 pt-12 pb-12 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full">✦ Image Crop Tool</span>
          <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight">Crop Images to Any Ratio</h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">Precisely crop for WhatsApp, Instagram, LinkedIn or any platform. Choose your ratio, drag to position, download instantly.</p>
          <div className="mt-10 max-w-3xl mx-auto"><CropImage /></div>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-12 grid md:grid-cols-3 gap-5">
        {FEATURES.map((f) => (
          <div key={f.title} className="rounded-2xl bg-card border border-border p-6">
            <div className="h-10 w-10 rounded-xl bg-primary/10 grid place-items-center mb-3"><f.icon className="h-5 w-5 text-primary" /></div>
            <div className="font-semibold">{f.title}</div>
            <div className="text-sm text-muted-foreground mt-1.5">{f.text}</div>
          </div>
        ))}
      </section>
      <section className="mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-3xl font-extrabold text-center mb-10">Crop Ratios Explained</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {RATIOS.map((r) => (
            <div key={r.label} className="rounded-2xl bg-card border border-border p-6">
              <div className="font-bold text-lg text-primary">{r.label}</div>
              <div className="text-sm mt-3"><span className="font-semibold">Use for:</span> <span className="text-muted-foreground">{r.use}</span></div>
              <div className="text-sm mt-2 text-muted-foreground italic">💡 {r.tip}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
