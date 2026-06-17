import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, Shield, Download } from "lucide-react";
import { CircleFrame } from "@/components/tools/CircleFrame";

export const Route = createFileRoute("/circle-frame")({
  head: () => ({
    meta: [
      { title: "Circle Frame Maker — Beautiful WhatsApp DP Frames" },
      { name: "description", content: "60+ stunning circle frames in gradient, neon, gold and artistic styles for your WhatsApp profile picture. Free, private, browser-based." },
    ],
  }),
  component: Page,
});

const FEATURES = [
  { icon: Sparkles, title: "60+ Unique Frames", text: "Gradients, neons, dots, stars, sparkles and more — organized into categories for easy discovery." },
  { icon: Shield, title: "100% Private", text: "Every frame is rendered in your browser using HTML5 Canvas. Your photo never touches a server." },
  { icon: Download, title: "Full HD Export", text: "Download your framed DP at 800×800px — crisp and clear on every device." },
];

function Page() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,oklch(0.95_0.06_160)_0%,transparent_60%)]" />
        <div className="mx-auto max-w-5xl px-4 pt-12 pb-12 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full">✦ Circle Photo Frame Maker</span>
          <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight">Beautiful Circle Frames for Your DP</h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">60+ stunning gradient, neon, gold, and artistic frames. 100% browser-based — private & instant.</p>
          <div className="mt-10 max-w-3xl mx-auto"><CircleFrame /></div>
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
