## Multi-page refactor (SPA hash → real pages)

### Step 1 — Extract & create pages
- [x] Create/Update: `index.html` (Home)
- [x] Already present: `about.html` (About)
- [x] Create: `events.html`
- [x] Create: `gallery.html`
- [x] Create: `info.html`
- [x] Create: `crew.html`
- [x] Create: `privacy-policy.html`
- [x] Create: `terms.html`
- [x] Create: `404.html`


### Step 2 — Update navigation links
- [x] Updated: Home/brand/nav + mobile nav + hero CTA links inside `index.html`
- [ ] Ensure footer quick links on each page point to `*.html`
- [ ] Ensure cookie banner links/“Cookie Settings” reopening work with new pages

### Step 3 — Remove SPA routing logic
- [x] Converted `index.html` to only include Home content (removed other `#page-*` sections from index)
- [ ] Ensure `js/app.min.js` does not rely on SPA page-switching (only keep functional handlers: mobile menu, RSVP, form validation, gallery filter/lightbox)

### Step 4 — Verification checklist
- [ ] Manual navigation test on `index.html` (desktop + mobile)
  - [ ] Navbar + mobile menu links go to real pages
- [ ] Verify animations + layout are unchanged on home
- [ ] Verify gallery/lightbox/buttons still work once their pages exist

### Notes
- New pages will reuse the same Navbar/Footer/Lightbox markup and scripts.

