import { Link } from "react-router-dom";
import { Instagram, Mail, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-gradient-to-r from-black to-white text-primary-foreground/80 py-12 [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]">
    <div className="container grid gap-8 md:grid-cols-3">
      <div>
        <h3 className="text-2xl text-primary-foreground mb-3">FRIENDS OF TUT</h3>
        <p className="text-sm leading-relaxed">
          A student-led creative movement at TUT — uniting Fashion, Media, Music & Content Creation.
        </p>
      </div>
      <div>
        <h4 className="font-display text-xl text-primary-foreground mb-3">QUICK LINKS</h4>
        <div className="flex flex-col gap-2 text-sm">
          <Link to="/about" className="hover:text-secondary transition-colors">About Us</Link>
          <Link to="/events" className="hover:text-secondary transition-colors">Events</Link>
          <Link to="/gallery" className="hover:text-secondary transition-colors">Gallery</Link>
          <Link to="/info" className="hover:text-secondary transition-colors">Get Involved</Link>
        </div>
      </div>
      <div>
        <h4 className="font-display text-xl text-primary-foreground mb-3">CONNECT</h4>
        <div className="flex flex-col gap-2 text-sm">
          <a href="#" className="flex items-center gap-2 hover:text-secondary transition-colors">
            <Instagram size={16} /> @friendsoftut
          </a>
          <a href="#" className="flex items-center gap-2 hover:text-secondary transition-colors">
            <Mail size={16} /> hello@friendsoftut.co.za
          </a>
          <span className="flex items-center gap-2">
            <MapPin size={16} /> Tshwane University of Technology
          </span>
        </div>
      </div>
    </div>
    <div className="container mt-8 pt-6 border-t border-primary-foreground/10 text-center text-xs text-primary-foreground/50">
      © {new Date().getFullYear()} Friends of TUT. All rights reserved.
    </div>
  </footer>
);

export default Footer;
