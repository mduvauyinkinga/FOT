import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Users, Palette, Camera, Mic, BookOpen } from "lucide-react";

const roles = [
  { icon: <Palette size={28} />, title: "Fashion Team", desc: "Styling, design direction, and fashion show coordination.", contact: "fashion@friendsoftut.co.za" },
  { icon: <Camera size={28} />, title: "Media Team", desc: "Photography, videography, editing, and visual storytelling.", contact: "media@friendsoftut.co.za" },
  { icon: <BookOpen size={28} />, title: "Content Creation", desc: "Social media management, copywriting, and brand voice.", contact: "content@friendsoftut.co.za" },
  { icon: <Mic size={28} />, title: "Music Team", desc: "DJ sets, live performances, playlists, and sound curation.", contact: "music@friendsoftut.co.za" },
];

const Info = () => {
  const [form, setForm] = useState({ name: "", email: "", department: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Application submitted! We'll be in touch 🎉");
    setForm({ name: "", email: "", department: "", message: "" });
  };

  return (
    <>
      <section className="gradient-hero py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-5xl md:text-7xl text-primary-foreground mb-4">GET INVOLVED</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Join the movement. Find your department. Make an impact.
          </p>
        </div>
      </section>

      {/* Roles */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-4xl text-center mb-10">DEPARTMENTS & ROLES</h2>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {roles.map((r) => (
              <div key={r.title} className="p-6 rounded-xl border border-border bg-card hover:border-secondary transition-colors">
                <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-primary-foreground mb-4">
                  {r.icon}
                </div>
                <h3 className="text-2xl mb-2">{r.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{r.desc}</p>
                <a href={`mailto:${r.contact}`} className="text-primary text-sm font-medium hover:underline">{r.contact}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Form */}
      <section className="py-16 bg-muted">
        <div className="container max-w-lg">
          <h2 className="text-4xl text-center mb-2">JOIN US</h2>
          <p className="text-center text-muted-foreground mb-8">Fill out the form below and we'll get back to you.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Your Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <Input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <select
              value={form.department}
              onChange={(e) => setForm({ ...form, department: e.target.value })}
              required
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Select Department</option>
              <option>Fashion</option>
              <option>Media</option>
              <option>Content Creation</option>
              <option>Music</option>
            </select>
            <Textarea
              placeholder="Tell us why you want to join..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={4}
            />
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 font-display text-lg tracking-wide">
              Submit Application
            </Button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Info;
