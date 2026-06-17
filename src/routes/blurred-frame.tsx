import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Palette, Download } from "lucide-react";
import { BlurredFrame } from "@/components/tools/BlurredFrame";

export const Route = createFileRoute("/blurred-frame")({
  head: () => ({
    meta: [
      { title: "Photo Effects Studio — Blur, Vignette, Glow, Duotone" },
      { name: "description", content: "20 professional photo effects: blur, vignette, glow, tilt-shift, duotone, polaroid, film grain. 100% free and private." },
    ],
  }),
  component: Page,
});

const FEATURES = [
  { icon: Sparkles, title: "20 Pro Effects", text: "Blur, vignette, tilt-shift, duotone, polaroid, film grain and more — categorized for easy browsing." },
  { icon: Palette, title: "Color Customization", text: "Custom duotone palettes and glow colors for personalized effects." },
  { icon: Download, title: "1080px Export", text: "Download at full 1080×1080px resolution — sharp and ready for any platform." },
];

function Page() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,oklch(0.95_0.06_160)_0%,transparent_60%)]" />
        <div className="mx-auto max-w-5xl px-4 pt-12 pb-12 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full">✦ Photo Effects Studio</span>
          <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight">Cinematic Photo Effects in One Click</h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">20 professional effects — blur, vignette, glow, tilt-shift, duotone, polaroid, film grain and more. 100% free & private.</p>
          <div className="mt-10 max-w-3xl mx-auto"><BlurredFrame /></div>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 py-16 grid md:grid-cols-3 gap-5">
        {FEATURES.map((f) => (
          <div key={f.title} className="rounded-2xl bg-card border border-border p-6">
            <div className="h-10 w-10 rounded-xl bg-primary/10 grid place-items-center mb-3"><f.icon className="h-5 w-5 text-primary" /></div>
            <div className="font-semibold">{f.title}</div>
            <div className="text-sm text-muted-foreground mt-1.5">{f.text}</div>
          </div>
        ))}
      </section>
    </div>
  );
}
