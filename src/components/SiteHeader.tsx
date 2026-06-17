import { Link } from "@tanstack/react-router";
import { MessageCircle, Zap } from "lucide-react";

const navLinks = [
  { to: "/", label: "DP Maker" },
  { to: "/circle-frame", label: "Circle Frame" },
  { to: "/crop-image", label: "Crop" },
  { to: "/rounded-corners", label: "Rounded" },
  { to: "/blurred-frame", label: "Effects" },
];

export function SiteHeader() {
  return (
    <>
      <div className="bg-primary text-primary-foreground text-center text-xs sm:text-sm py-2 px-4">
        ✦ 100% Free · No Sign-up · No Watermarks · Works in Your Browser ✦
      </div>
      <header className="sticky top-0 z-40 bg-background/85 backdrop-blur border-b border-border">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="relative h-10 w-10 rounded-xl bg-primary/15 grid place-items-center">
              <MessageCircle className="h-5 w-5 text-primary" />
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-background" />
            </div>
            <div className="leading-tight">
              <div className="font-bold text-foreground">DP Studio</div>
              <div className="text-[11px] text-primary font-medium">WhatsApp Tools</div>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-3 py-2 text-sm font-medium text-muted-foreground rounded-md hover:text-foreground hover:bg-accent transition-colors"
                activeProps={{ className: "px-3 py-2 text-sm font-medium rounded-md bg-accent text-accent-foreground" }}
                activeOptions={{ exact: true }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <a
            href="#tool"
            className="hidden sm:inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-4 py-2 text-sm font-semibold shadow-sm hover:bg-primary/90 transition"
          >
            <Zap className="h-4 w-4" /> Make My DP
          </a>
        </div>
      </header>
    </>
  );
}
