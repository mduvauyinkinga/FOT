import { Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const events = [
  {
    id: 1,
    title: "Campus Style Showcase",
    date: "April 12, 2026",
    time: "14:00 – 18:00",
    location: "TUT Arts Building, Pretoria Campus",
    category: "Fashion",
    description: "A fashion showcase featuring student designers and models. Come support local talent and witness the freshest campus style.",
  },
  {
    id: 2,
    title: "Creator Workshop: Content That Hits",
    date: "April 20, 2026",
    time: "10:00 – 13:00",
    location: "TUT Media Lab",
    category: "Workshop",
    description: "Learn how to create viral content, build your brand on social media, and network with other student creators.",
  },
  {
    id: 3,
    title: "Sunset Sessions Vol. 3",
    date: "May 3, 2026",
    time: "16:00 – 21:00",
    location: "TUT Amphitheatre",
    category: "Music",
    description: "An outdoor music experience featuring DJs, live performances, food vendors, and good vibes only.",
  },
  {
    id: 4,
    title: "Friends of TUT General Meeting",
    date: "May 10, 2026",
    time: "12:00 – 13:30",
    location: "Student Centre, Room 204",
    category: "General",
    description: "Monthly meeting for all members. Discuss upcoming plans, share ideas, and connect with the team.",
  },
];

const categoryColors: Record<string, string> = {
  Fashion: "bg-primary text-primary-foreground",
  Workshop: "bg-secondary text-secondary-foreground",
  Music: "bg-foreground text-primary-foreground",
  General: "bg-muted text-muted-foreground",
};

const Events = () => {
  const [rsvpd, setRsvpd] = useState<number[]>([]);

  const toggleRsvp = (id: number) => {
    setRsvpd((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  return (
    <>
      <section className="gradient-hero py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-5xl md:text-7xl text-primary-foreground mb-4">EVENTS</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Workshops, activations, and unforgettable experiences. Don't miss out.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-3xl space-y-6">
          {events.map((e) => (
            <div key={e.id} className="rounded-xl border border-border bg-card p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[e.category]}`}>
                  {e.category}
                </span>
                <h3 className="text-2xl flex-1">{e.title}</h3>
              </div>
              <p className="text-muted-foreground text-sm mb-4">{e.description}</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1"><Calendar size={14} /> {e.date}</span>
                <span className="flex items-center gap-1"><Clock size={14} /> {e.time}</span>
                <span className="flex items-center gap-1"><MapPin size={14} /> {e.location}</span>
              </div>
              <Button
                onClick={() => toggleRsvp(e.id)}
                className={rsvpd.includes(e.id)
                  ? "bg-secondary text-secondary-foreground hover:bg-secondary/90 font-display tracking-wide"
                  : "bg-primary hover:bg-primary/90 font-display tracking-wide"}
              >
                {rsvpd.includes(e.id) ? "✓ RSVP'd" : "RSVP Now"}
              </Button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Events;
