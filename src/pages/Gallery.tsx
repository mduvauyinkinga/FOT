import { useState } from "react";
import { X } from "lucide-react";

const galleryItems = [
  { id: 1, title: "Campus Style Showcase 2025", category: "Fashion" },
  { id: 2, title: "Sunset Sessions Vol. 2", category: "Music" },
  { id: 3, title: "Behind the Scenes — Content Day", category: "Media" },
  { id: 4, title: "Freshers Welcome Event", category: "Events" },
  { id: 5, title: "Street Style Lookbook", category: "Fashion" },
  { id: 6, title: "Studio Recording Session", category: "Music" },
  { id: 7, title: "Team Building Day", category: "Events" },
  { id: 8, title: "Brand Photoshoot", category: "Media" },
];

const categories = ["All", "Fashion", "Music", "Media", "Events"];

// Generate placeholder colors based on category
const categoryGradients: Record<string, string> = {
  Fashion: "from-primary to-primary/70",
  Music: "from-foreground to-foreground/70",
  Media: "from-secondary to-secondary/70",
  Events: "from-primary to-secondary",
};

const Gallery = () => {
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = filter === "All" ? galleryItems : galleryItems.filter((i) => i.category === filter);

  return (
    <>
      <section className="gradient-hero py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-5xl md:text-7xl text-primary-foreground mb-4">GALLERY</h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Moments captured from our events, shoots, and creative sessions.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-5 py-2 rounded-full font-display text-sm tracking-wide transition-colors ${
                  filter === c
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-primary/10"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => setLightbox(item.id)}
                className={`aspect-square rounded-xl bg-gradient-to-br ${categoryGradients[item.category]} flex items-end p-4 hover:scale-[1.02] transition-transform cursor-pointer`}
              >
                <div className="text-left">
                  <span className="text-xs font-semibold bg-background/20 backdrop-blur px-2 py-1 rounded-full text-primary-foreground">
                    {item.category}
                  </span>
                  <h3 className="text-primary-foreground font-display text-lg mt-2 leading-tight">{item.title}</h3>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-foreground/90 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 text-primary-foreground" onClick={() => setLightbox(null)}>
            <X size={32} />
          </button>
          <div className="max-w-2xl w-full text-center" onClick={(e) => e.stopPropagation()}>
            {(() => {
              const item = galleryItems.find((i) => i.id === lightbox);
              if (!item) return null;
              return (
                <div className={`aspect-video rounded-2xl bg-gradient-to-br ${categoryGradients[item.category]} flex items-center justify-center`}>
                  <div>
                    <span className="text-xs font-semibold bg-background/20 backdrop-blur px-3 py-1 rounded-full text-primary-foreground">{item.category}</span>
                    <h2 className="text-primary-foreground font-display text-3xl mt-4">{item.title}</h2>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;
