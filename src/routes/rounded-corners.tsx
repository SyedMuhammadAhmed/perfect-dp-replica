import { createFileRoute } from "@tanstack/react-router";
import { Square, Layers, Palette } from "lucide-react";
import { RoundedCorners } from "@/components/tools/RoundedCorners";

export const Route = createFileRoute("/rounded-corners")({
  head: () => ({
    meta: [
      { title: "Rounded Corners Tool — Add Radius, Shadows & Backgrounds" },
      { name: "description", content: "Add rounded corners to any image with shadows, borders, gradients and blur backgrounds. Free browser-based tool." },
    ],
  }),
  component: Page,
});

const FEATURES = [
  { icon: Square, title: "Full Control", text: "From subtle radius to perfect circle, plus a fine-tune slider for pixel-perfect results." },
  { icon: Layers, title: "Shadows & Depth", text: "Professional drop shadows to make your image pop off the background." },
  { icon: Palette, title: "Smart Backgrounds", text: "Transparent, solid color, gradient, or a beautiful blurred version of your photo." },
];

function Page() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,oklch(0.95_0.06_160)_0%,transparent_60%)]" />
        <div className="mx-auto max-w-5xl px-4 pt-12 pb-12 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full">✦ Rounded Corners Tool</span>
          <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight">Add Rounded Corners to Any Image</h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">Aspect ratios, shadows, borders, gradients, blur backgrounds — everything you need in one tool.</p>
          <div className="mt-10 max-w-3xl mx-auto"><RoundedCorners /></div>
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
