import { Link } from "@tanstack/react-router";
import { MessageCircle, Zap, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { to: "/", label: "DP Maker" },
  { to: "/circle-frame", label: "Circle Frame" },
  { to: "/crop-image", label: "Crop" },
  { to: "/rounded-corners", label: "Rounded" },
  { to: "/blurred-frame", label: "Effects" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="relative overflow-hidden bg-gradient-to-r from-[oklch(0.58_0.17_160)] via-primary to-[oklch(0.58_0.17_165)] text-primary-foreground text-center text-xs sm:text-sm py-2 px-4">
        <div className="relative z-10 font-medium">
          ✦ 100% Free · No Sign-up · No Watermarks · Works Privately In Your Browser ✦
        </div>
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)] bg-[length:200%_100%] animate-marquee" />
      </div>
      <header className={`sticky top-0 z-40 transition-all duration-300 border-b ${scrolled ? "bg-background/90 backdrop-blur-md border-border shadow-sm" : "bg-background/70 backdrop-blur border-transparent"}`}>
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2.5 group" onClick={() => setOpen(false)}>
            <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 grid place-items-center ring-1 ring-primary/20 group-hover:ring-primary/50 transition">
              <MessageCircle className="h-5 w-5 text-primary group-hover:scale-110 transition" />
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-background" />
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-primary animate-pulse-ring" />
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
          <div className="flex items-center gap-2">
            <a
              href="#tool"
              className="hidden sm:inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-4 py-2 text-sm font-semibold shadow-sm hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all"
            >
              <Zap className="h-4 w-4" /> Make My DP
            </a>
            <button onClick={() => setOpen((v) => !v)} className="md:hidden h-10 w-10 grid place-items-center rounded-lg hover:bg-accent" aria-label="Menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur animate-rise">
            <nav className="mx-auto max-w-6xl px-4 py-3 flex flex-col">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="px-3 py-3 text-sm font-medium rounded-md hover:bg-accent"
                  activeProps={{ className: "px-3 py-3 text-sm font-medium rounded-md bg-accent text-accent-foreground" }}
                  activeOptions={{ exact: true }}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
