const About = () => (
  <>
    <section className="gradient-hero py-16 md:py-24">
      <div className="container text-center">
        <h1 className="text-5xl md:text-7xl text-primary-foreground mb-4">ABOUT US</h1>
        <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
          Discover what Friends of TUT is all about and why we do what we do.
        </p>
      </div>
    </section>

    <section className="py-16">
      <div className="container max-w-3xl space-y-10">
        <div>
          <h2 className="text-3xl mb-4">WHO WE ARE</h2>
          <p className="text-muted-foreground leading-relaxed">
            Friends of TUT is a student-led creative movement based at Tshwane University of Technology. We are a collective of passionate individuals who believe in the power of creativity, culture, and community. Our movement brings together students from all walks of life who share a common love for fashion, media, music, and content creation.
          </p>
        </div>

        <div>
          <h2 className="text-3xl mb-4">OUR MISSION</h2>
          <p className="text-muted-foreground leading-relaxed">
            To create a vibrant platform where students can express their creativity, build meaningful connections, and develop skills that extend beyond the classroom. We aim to foster a culture of innovation, collaboration, and excellence within the TUT community.
          </p>
        </div>

        <div>
          <h2 className="text-3xl mb-4">OUR VISION</h2>
          <p className="text-muted-foreground leading-relaxed">
            To be the leading student creative movement in South Africa — inspiring, empowering, and elevating young creatives through events, content, and community-driven initiatives.
          </p>
        </div>

        <div>
          <h2 className="text-3xl mb-4">WHAT WE DO</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Fashion", text: "Pop-up shows, styling workshops, and trend-setting on campus." },
              { title: "Media & Content", text: "Photography, videography, and digital storytelling." },
              { title: "Music", text: "Live sessions, DJ sets, and music curation for events." },
              { title: "Events & Activations", text: "Campus activations, networking events, and creative workshops." },
            ].map((item) => (
              <div key={item.title} className="p-5 rounded-xl border border-border bg-card">
                <h3 className="text-xl mb-2 text-primary">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  </>
);

export default About;
