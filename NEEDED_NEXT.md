Next conversion order (one page at a time):
1) events.html (extract #page-events from original SPA)
2) info.html (extract #page-info)
3) gallery.html (extract #page-gallery + ensure lightbox markup present)
4) crew.html (extract #page-crew)
5) privacy-policy.html (extract #page-privacy-policy)
6) terms.html (extract #page-terms)
7) 404.html (extract #page-not-found)

For each page:
- Use the same Navbar + Lightbox + Footer template as on index/about.
- Replace any internal hash links with real *.html links.
- Ensure meta/canonical/OG match that page.
- Keep forms/RSVP/gallery interactions intact by ensuring relevant DOM IDs/classes exist.

