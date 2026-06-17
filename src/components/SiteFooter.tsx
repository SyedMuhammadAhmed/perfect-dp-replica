import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40 mt-24">
      <div className="mx-auto max-w-6xl px-4 py-12 grid gap-8 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-bold text-lg">DP Studio</div>
          <p className="text-sm text-muted-foreground mt-2 max-w-sm">
            Free browser-based tools to perfect your WhatsApp profile picture. Nothing uploaded, nothing tracked.
          </p>
        </div>
        <div>
          <div className="font-semibold text-sm mb-3">Tools</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">DP Maker</Link></li>
            <li><Link to="/circle-frame" className="hover:text-foreground">Circle Frame</Link></li>
            <li><Link to="/crop-image" className="hover:text-foreground">Crop Image</Link></li>
            <li><Link to="/rounded-corners" className="hover:text-foreground">Rounded Corners</Link></li>
            <li><Link to="/blurred-frame" className="hover:text-foreground">Photo Effects</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-sm mb-3">Why us</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>100% Private</li>
            <li>No Sign-up</li>
            <li>No Watermarks</li>
            <li>HD Quality</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} DP Studio. All processing happens in your browser.
      </div>
    </footer>
  );
}
