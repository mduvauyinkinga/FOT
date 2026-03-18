import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Users, Camera, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpeg";

const departments = [
  { icon: <Users size={32} />, name: "Fashion", desc: "Setting trends and redefining campus style." },
  { icon: <Camera size={32} />, name: "Media & Content", desc: "Capturing moments and telling our story." },
  { icon: <Mic size={32} />, name: "Music", desc: "Curating the sound of the movement." },
  { icon: <Calendar size={32} />, name: "Events", desc: "Activations, workshops & unforgettable experiences." },
];

const Index = () => (
  <>
    {/* Hero */}
    <section className="gradient-hero relative overflow-hidden">
      <div className="container py-20 md:py-32 flex flex-col items-center text-center relative z-10">
        <img src={logo} alt="Friends of TUT" className="w-40 h-40 md:w-56 md:h-56 rounded-2xl shadow-2xl mb-8 animate-fade-in" />
        <h1 className="text-5xl md:text-7xl lg:text-8xl text-primary-foreground leading-none mb-4">
          FRIENDS OF TUT
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/80 max-w-xl mb-8 font-body">
          A student-led creative movement — Fashion, Media, Music & Culture at Tshwane University of Technology.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-display text-lg tracking-wide">
            <Link to="/events">Upcoming Events <ArrowRight className="ml-2" size={18} /></Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-display text-lg tracking-wide">
            <Link to="/info">Get Involved</Link>
          </Button>
        </div>
      </div>
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-secondary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-foreground/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
    </section>

    {/* Departments */}
    <section className="py-20 bg-background">
      <div className="container">
        <h2 className="text-4xl md:text-5xl text-center mb-12">OUR DEPARTMENTS</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {departments.map((d) => (
            <div key={d.name} className="group p-6 rounded-xl border border-border bg-card hover:border-primary transition-colors">
              <div className="w-14 h-14 rounded-lg gradient-hero flex items-center justify-center text-primary-foreground mb-4 group-hover:gradient-lime transition-all">
                {d.icon}
              </div>
              <h3 className="text-2xl mb-2">{d.name}</h3>
              <p className="text-muted-foreground text-sm">{d.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="bg-foreground py-16">
      <div className="container text-center">
        <h2 className="text-4xl md:text-5xl text-primary-foreground mb-4">JOIN THE MOVEMENT</h2>
        <p className="text-primary-foreground/70 max-w-lg mx-auto mb-8">
          Be part of a creative community that's shaping campus culture. Whether you're into fashion, music, media, or events — there's a place for you.
        </p>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 font-display text-lg tracking-wide">
          <Link to="/info">Get Involved <ArrowRight className="ml-2" size={18} /></Link>
        </Button>
      </div>
    </section>
  </>
);

export default Index;
