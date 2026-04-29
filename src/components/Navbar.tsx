import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/events", label: "Events" },
  { to: "/info", label: "Info" },
  { to: "/gallery", label: "Gallery" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-black to-white backdrop-blur [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]">
      <div className="container flex items-center justify-between py-3">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Friends of TUT logo" className="h-12 w-12 rounded-lg object-cover" />
          <span className="font-display text-2xl tracking-wider text-primary-foreground">
            FRIENDS <span className="text-secondary">OF TUT</span>
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-4 py-2 font-display text-lg tracking-wide transition-colors rounded-md ${
                location.pathname === l.to
                  ? "bg-primary text-primary-foreground"
                  : "text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary/20"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-primary-foreground p-2"
          aria-label="Toggle menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-primary-foreground/10 bg-foreground pb-4">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={`block px-6 py-3 font-display text-lg tracking-wide ${
                location.pathname === l.to
                  ? "bg-primary text-primary-foreground"
                  : "text-primary-foreground/70 hover:bg-primary/20"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
