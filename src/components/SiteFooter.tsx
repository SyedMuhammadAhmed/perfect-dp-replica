import { Link } from "@tanstack/react-router";
import { MessageCircle, Shield, Heart } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative mt-24 border-t border-border bg-gradient-to-b from-secondary/30 to-secondary/60 overflow-hidden">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-[600px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-4 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <div className="h-10 w-10 rounded-xl bg-primary/15 grid place-items-center">
              <MessageCircle className="h-5 w-5 text-primary" />
            </div>
            <div className="font-bold text-lg">DP Studio</div>
          </div>
          <p className="text-sm text-muted-foreground mt-4 max-w-sm leading-relaxed">
            Free browser-based tools to perfect your WhatsApp profile picture. Nothing uploaded, nothing tracked — every pixel stays on your device.
          </p>
          <div className="flex gap-2 mt-5">
            <span className="inline-flex items-center gap-1.5 text-xs bg-card border border-border rounded-full px-3 py-1.5">
              <Shield className="h-3.5 w-3.5 text-primary" /> Private by design
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs bg-card border border-border rounded-full px-3 py-1.5">
              <Heart className="h-3.5 w-3.5 text-primary" /> Made with care
            </span>
          </div>
        </div>
        <div>
          <div className="font-semibold text-sm mb-3">Tools</div>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-primary transition">DP Maker</Link></li>
            <li><Link to="/circle-frame" className="hover:text-primary transition">Circle Frame</Link></li>
            <li><Link to="/crop-image" className="hover:text-primary transition">Crop Image</Link></li>
            <li><Link to="/rounded-corners" className="hover:text-primary transition">Rounded Corners</Link></li>
            <li><Link to="/blurred-frame" className="hover:text-primary transition">Photo Effects</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-sm mb-3">Why us</div>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li>100% Private — no uploads</li>
            <li>No sign-up required</li>
            <li>No watermarks ever</li>
            <li>HD quality up to 1080px</li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} DP Studio · All processing happens in your browser.
      </div>
    </footer>
  );
}
