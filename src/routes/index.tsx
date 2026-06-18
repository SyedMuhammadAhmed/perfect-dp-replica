import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Crop, Sparkles, Shield, Zap, ChevronDown, Check, Star, Quote, ArrowRight } from "lucide-react";
import { DpMaker } from "@/components/tools/DpMaker";
import { useReveal, useCountUp } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WhatsApp DP Maker — Resize to Perfect Profile Picture" },
      { name: "description", content: "Upload any photo and instantly resize it to the ideal WhatsApp profile picture (500/720/1080px) with HD quality and perfect circle cropping. 100% free, no sign-up." },
    ],
  }),
  component: Home,
});

const FEATURES = [
  { icon: Crop, title: "Perfect Crop", text: "Auto-fits your image to the ideal WhatsApp DP square format with full drag control." },
  { icon: Sparkles, title: "HD Quality", text: "Choose from multiple resolutions up to 1080×1080 pixels for razor-sharp clarity." },
  { icon: Shield, title: "100% Private", text: "Everything happens in your browser — your photo never leaves your device." },
  { icon: Zap, title: "Instant", text: "No waiting, no sign-ups — upload, adjust, and download in under 10 seconds." },
];

const STATS = [
  { n: 560000, suffix: "+", l: "Photos Processed" },
  { n: 33000, suffix: "+", l: "Happy Users" },
  { n: 16, suffix: "+", l: "Countries" },
  { n: 98, suffix: "%", l: "5-Star Reviews" },
];

const STEPS = [
  { n: "01", t: "Upload Your Photo", d: "Drag & drop or browse any JPEG, PNG, or WebP image. Max 20MB." },
  { n: "02", t: "Adjust & Position", d: "Drag the image to perfectly position it. Use zoom to get the crop you want." },
  { n: "03", t: "Choose Quality", d: "Pick your resolution (500, 720, or 1080px) and output format." },
  { n: "04", t: "Download & Set", d: "Hit Download and set it as your WhatsApp profile photo. Done!" },
];

const TIPS = [
  { t: "Use a high-resolution source photo", d: "Start with the best quality you have on hand." },
  { t: "Good lighting makes a huge difference", d: "Natural daylight = professional look without filters." },
  { t: "Center your face in the circle", d: "WhatsApp crops to a circle, so centered subjects win." },
  { t: "Choose a contrasting background", d: "Stand out from the crowd in busy group chats." },
  { t: "Expression matters", d: "A genuine smile builds trust at first glance." },
  { t: "Avoid group photos as your DP", d: "People should instantly know which one is you." },
];

const FAQS = [
  { q: "What is the ideal size for a WhatsApp profile picture?", a: "WhatsApp displays profile pictures at 500×500px, but uploading at 720×720 or 1080×1080 ensures sharpness across all devices including retina screens." },
  { q: "Does WhatsApp crop my photo to a circle?", a: "Yes. The app applies a circular mask on display, so make sure your face or subject is well-centered in the square upload." },
  { q: "Is my photo uploaded to a server?", a: "No. All resizing, cropping, and conversion happen entirely in your browser using HTML5 Canvas. Your photo never leaves your device." },
  { q: "Which format should I choose for WhatsApp?", a: "JPEG is the safe default and smallest. PNG keeps the highest quality. WebP is the most modern with great compression." },
  { q: "Why does WhatsApp compress my DP after uploading?", a: "WhatsApp re-encodes profile pictures to save bandwidth. Starting with a clean, well-cropped image at 720–1080px gives the best final result." },
  { q: "Can I use this on my phone?", a: "Absolutely. The tool is fully responsive and works in any modern mobile browser." },
];

const TESTIMONIALS = [
  { name: "Priya S.", role: "Content Creator", text: "Finally, my profile pic looks crisp on every device. The circle preview saved me from re-uploading three times.", rating: 5 },
  { name: "Marco D.", role: "Freelance Designer", text: "Love that it stays in the browser. I can recommend this to clients without privacy concerns.", rating: 5 },
  { name: "Aisha K.", role: "Small Business Owner", text: "Used it for my whole team's WhatsApp Business accounts. Consistent, sharp, took five minutes total.", rating: 5 },
];

const TRUST_BADGES = [
  "100% Private", "No Sign-up", "No Watermarks", "HD Up to 1080p", "Free Forever", "Works Offline", "Mobile Friendly", "Lightning Fast",
];

function Home() {
  useReveal();
  return (
    <div>
      <Hero />
      <Marquee />
      <Stats />
      <HowItWorks />
      <PhonePreview />
      <FormatCompare />
      <Tips />
      <Testimonials />
      <Faq />
      <FinalCta />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 grid-bg" />
      <div className="absolute -top-32 -left-20 -z-10 h-[420px] w-[420px] rounded-full bg-primary/20 blur-3xl animate-float-slow" />
      <div className="absolute top-20 -right-24 -z-10 h-[380px] w-[380px] rounded-full bg-[oklch(0.78_0.12_175)]/30 blur-3xl animate-float-slower" />

      <div className="mx-auto max-w-5xl px-4 pt-14 pb-16 text-center">
        <span className="inline-flex items-center gap-2 text-xs font-medium text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full animate-rise">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Free · No Sign-up · Instant Download
        </span>
        <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight animate-rise" style={{ animationDelay: "0.1s" }}>
          Perfect WhatsApp{" "}
          <span className="text-gradient-primary">DP</span>{" "}
          in Seconds
        </h1>
        <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto animate-rise" style={{ animationDelay: "0.2s" }}>
          Upload any photo and instantly resize it to the ideal WhatsApp profile picture size with HD quality, perfect cropping and zero compression loss.
        </p>

        <div id="tool" className="mt-12 max-w-3xl mx-auto animate-rise" style={{ animationDelay: "0.3s" }}>
          <DpMaker />
        </div>

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {FEATURES.map((f, i) => (
            <div key={f.title} className="reveal card-lift rounded-2xl bg-card border border-border p-5 text-left" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 grid place-items-center mb-3 ring-1 ring-primary/10">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="font-semibold">{f.title}</div>
              <div className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{f.text}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [...TRUST_BADGES, ...TRUST_BADGES];
  return (
    <section className="border-y border-border bg-card/50 overflow-hidden py-5">
      <div className="flex gap-8 animate-marquee whitespace-nowrap w-max">
        {items.map((t, i) => (
          <div key={i} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Check className="h-4 w-4 text-primary" /> {t}
            <span className="text-border ml-8">•</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Stat({ n, suffix, l }: { n: number; suffix: string; l: string }) {
  const { n: count, ref } = useCountUp(n);
  const display = n >= 1000 ? `${(count / 1000).toFixed(0)}K` : count.toString();
  return (
    <div className="reveal card-lift rounded-2xl bg-card border border-border p-6 text-center">
      <div ref={ref} className="text-3xl sm:text-4xl font-extrabold text-gradient-primary">{display}{suffix}</div>
      <div className="text-xs text-muted-foreground mt-1 font-medium">{l}</div>
    </div>
  );
}

function Stats() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((s) => <Stat key={s.l} {...s} />)}
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="text-center mb-12 reveal">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Simple Process</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">How It Works</h2>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Four simple steps to the perfect WhatsApp DP — no account needed, no waiting.</p>
      </div>
      <div className="grid md:grid-cols-4 gap-5">
        {STEPS.map((s, i) => (
          <div key={s.n} className="reveal card-lift relative rounded-2xl bg-card border border-border p-6 overflow-hidden group" style={{ transitionDelay: `${i * 80}ms` }}>
            <div className="absolute -top-2 -right-2 h-24 w-24 rounded-full bg-primary/5 group-hover:bg-primary/15 transition" />
            <div className="relative text-5xl font-extrabold text-primary/20 group-hover:text-primary/40 transition">{s.n}</div>
            <div className="relative font-bold mt-2">{s.t}</div>
            <div className="relative text-sm text-muted-foreground mt-2 leading-relaxed">{s.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function PhonePreview() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="text-center mb-12 reveal">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Live Preview</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">See How It Looks</h2>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Exactly how your DP appears in the chat list — a small circular thumbnail next to messages.</p>
      </div>
      <div className="mx-auto max-w-[340px] reveal">
        <div className="relative">
          <div className="absolute -inset-8 bg-gradient-to-br from-primary/20 via-transparent to-[oklch(0.78_0.12_175)]/30 blur-2xl rounded-full" />
          <div className="relative rounded-[2.5rem] bg-foreground p-3 shadow-2xl">
            <div className="rounded-[2rem] bg-background overflow-hidden">
              <div className="bg-primary text-primary-foreground px-5 py-4 flex justify-between items-center">
                <span className="font-bold">Chats</span>
                <span className="text-xs">9:41</span>
              </div>
              <div className="divide-y divide-border">
                {[
                  { i: "A", n: "Alex M.", m: "Hey, are you coming tonight?", t: "9:41", b: "bg-amber-500", u: 2 },
                  { i: "W", n: "Work Group", m: "Meeting at 3pm confirmed", t: "9:30", b: "bg-blue-500", u: 5 },
                  { i: "P", n: "Priya K.", m: "Thanks for sending that over 👍", t: "9:12", b: "bg-pink-500" },
                  { i: "Y", n: "Your DP", m: "Looks great! ✨", t: "now", b: "bg-primary", highlight: true },
                  { i: "D", n: "David R.", m: "Saw your new DP – looking good!", t: "Yest", b: "bg-purple-500" },
                ].map((c, k) => (
                  <div key={k} className={`flex items-center gap-3 px-4 py-3 transition ${c.highlight ? "bg-primary/5" : ""}`}>
                    <div className={`h-12 w-12 rounded-full ${c.b} grid place-items-center text-white font-bold ${c.highlight ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""}`}>{c.i}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between"><span className="font-semibold text-sm truncate">{c.n}</span><span className="text-xs text-muted-foreground">{c.t}</span></div>
                      <div className="text-xs text-muted-foreground truncate">{c.m}</div>
                    </div>
                    {c.u && <span className="h-5 min-w-5 px-1.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold grid place-items-center">{c.u}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormatCompare() {
  const [active, setActive] = useState(0);
  const formats = [
    { name: "PNG", ext: ".png", quality: 100, compat: 82, compression: 40, size: "200–600 KB", transparency: true, pros: ["Lossless quality", "Supports transparency", "No compression artifacts"], cons: ["Larger file size"], best: "When you want the absolute highest quality, especially for artwork or text." },
    { name: "JPEG", ext: ".jpg", quality: 85, compat: 100, compression: 85, size: "50–200 KB", transparency: false, pros: ["Universal support", "Tiny file sizes", "Great for photos"], cons: ["Lossy compression", "No transparency"], best: "The safe default — perfect for photographic DPs on any device.", star: true },
    { name: "WebP", ext: ".webp", quality: 90, compat: 75, compression: 95, size: "30–120 KB", transparency: true, pros: ["Smallest file size", "Transparency support", "Modern compression"], cons: ["Older devices may struggle"], best: "Best for modern devices when bandwidth matters." },
  ];
  const f = formats[active];
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="text-center mb-12 reveal">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Choose Wisely</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">PNG vs JPEG vs WebP</h2>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Each format has trade-offs. Pick the right one for the look you want.</p>
      </div>
      <div className="reveal rounded-3xl bg-card border border-border p-6 sm:p-8 shadow-sm">
        <div className="flex gap-2 mb-6">
          {formats.map((fm, i) => (
            <button key={fm.name} onClick={() => setActive(i)} className={`flex-1 px-4 py-3 rounded-xl font-semibold border-2 transition-all relative ${active === i ? "border-primary bg-primary/5 text-primary scale-[1.02]" : "border-border bg-background hover:border-primary/40"}`}>
              {fm.name}{fm.star && <Star className="inline h-3.5 w-3.5 ml-1.5 fill-primary text-primary" />}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-8 animate-rise" key={active}>
          <div>
            <div className="text-xs uppercase text-muted-foreground tracking-wider">{f.ext} format</div>
            <div className="text-2xl font-bold mt-1">{f.name}</div>
            <div className="space-y-4 mt-6">
              {[
                ["Quality", f.quality],
                ["Compatibility", f.compat],
                ["Compression", f.compression],
              ].map(([l, v]) => (
                <div key={l as string}>
                  <div className="flex justify-between text-sm mb-1"><span className="text-muted-foreground">{l}</span><span className="font-semibold">{v}%</span></div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-primary to-[oklch(0.78_0.14_165)] rounded-full transition-all duration-700" style={{ width: `${v}%` }} /></div>
                </div>
              ))}
              <div className="flex justify-between text-sm pt-2 border-t border-border"><span className="text-muted-foreground">Avg Size</span><span className="font-semibold">{f.size}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Transparency</span><span className="font-semibold">{f.transparency ? "Yes" : "No"}</span></div>
            </div>
          </div>
          <div className="space-y-5">
            <div>
              <div className="font-semibold text-sm mb-2 text-primary">Pros</div>
              <ul className="space-y-2">{f.pros.map((p) => <li key={p} className="flex items-start gap-2 text-sm"><Check className="h-4 w-4 text-primary mt-0.5" />{p}</li>)}</ul>
            </div>
            <div>
              <div className="font-semibold text-sm mb-2 text-destructive">Cons</div>
              <ul className="space-y-2">{f.cons.map((c) => <li key={c} className="flex items-start gap-2 text-sm text-muted-foreground">• {c}</li>)}</ul>
            </div>
            <div className="rounded-xl bg-primary/8 border border-primary/20 p-4">
              <div className="text-xs font-semibold text-primary uppercase tracking-wider">Best for WhatsApp</div>
              <div className="text-sm mt-1">{f.best}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Tips() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="text-center mb-12 reveal">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Pro Tips</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">Get the Perfect DP</h2>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Expert advice to make your profile picture look stunning every time.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TIPS.map((tip, i) => (
          <div key={tip.t} className="reveal card-lift rounded-2xl bg-card border border-border p-6" style={{ transitionDelay: `${i * 60}ms` }}>
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-primary to-[oklch(0.55_0.16_160)] grid place-items-center text-primary-foreground font-bold text-sm shadow-md shadow-primary/20">{i + 1}</div>
            <div className="font-semibold mt-4">{tip.t}</div>
            <div className="text-sm text-muted-foreground mt-1.5">{tip.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="text-center mb-12 reveal">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Loved by Users</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">What People Say</h2>
        <p className="text-muted-foreground mt-3 max-w-xl mx-auto">Real feedback from real people who upgraded their profile pictures.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {TESTIMONIALS.map((t, i) => (
          <div key={t.name} className="reveal card-lift relative rounded-2xl bg-card border border-border p-7" style={{ transitionDelay: `${i * 80}ms` }}>
            <Quote className="absolute top-5 right-5 h-8 w-8 text-primary/15" />
            <div className="flex gap-0.5 mb-3">
              {Array.from({ length: t.rating }).map((_, k) => <Star key={k} className="h-4 w-4 fill-primary text-primary" />)}
            </div>
            <p className="text-sm leading-relaxed">{t.text}</p>
            <div className="mt-5 pt-5 border-t border-border flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-[oklch(0.55_0.16_160)] grid place-items-center text-primary-foreground font-bold">{t.name[0]}</div>
              <div>
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="mx-auto max-w-3xl px-4 py-20">
      <div className="text-center mb-12 reveal">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">FAQ</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold mt-2">Common Questions</h2>
        <p className="text-muted-foreground mt-3">Everything you need to know about profile picture sizes.</p>
      </div>
      <div className="space-y-3">
        {FAQS.map((f, i) => (
          <div key={f.q} className={`reveal rounded-2xl bg-card border overflow-hidden transition ${open === i ? "border-primary/40 shadow-md shadow-primary/5" : "border-border"}`}>
            <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full px-6 py-5 flex justify-between items-center text-left gap-4">
              <span className="font-semibold flex gap-3"><span className="text-primary">Q{i + 1}</span>{f.q}</span>
              <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform shrink-0 ${open === i ? "rotate-180" : ""}`} />
            </button>
            {open === i && <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed animate-rise">{f.a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-20">
      <div className="reveal relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-[oklch(0.55_0.16_160)] p-10 sm:p-16 text-center text-primary-foreground shadow-2xl shadow-primary/30">
        <div className="absolute -top-20 -left-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="relative">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Ready to update your profile picture?</h2>
          <p className="mt-3 opacity-90 max-w-xl mx-auto">It takes less than 30 seconds. No account. No watermarks. Completely free.</p>
          <a href="#tool" className="mt-8 inline-flex items-center gap-2 bg-background text-foreground font-semibold px-6 py-3 rounded-full hover:scale-105 hover:shadow-xl transition-all">
            Get Started — It's Free <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
