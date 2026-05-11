# TODO (Friends of TUT) — Legal/Compliance/Security Audit

## Step 1 — Cookie policy page
- [ ] Create `cookies.html` (if not present)
- [ ] Update footer links on all pages to include **Cookie Policy** (and keep existing Privacy/Terms)

## Step 2 — Privacy Policy (POPIA)
- [ ] Update `privacy-policy.html` to include stronger POPIA-required disclosures:
  - [ ] Responsible party + Information Officer details
  - [ ] Lawful processing basis / purposes aligned to this site
  - [ ] Cookies & local storage disclosure aligned to actual behavior
  - [ ] Explicit Firebase disclosure (or removal if not used)
  - [ ] Clear data retention durations (make defensible)
  - [ ] User rights and POPIA contact workflow

## Step 3 — Terms & Conditions
- [ ] Update `terms.html` with required disclaimers:
  - [ ] Media/photo/event participation consent notices
  - [ ] External links disclaimer specificity
  - [ ] Availability disclaimer

## Step 4 — Cookie consent system UX + wording
- [ ] Update `js/cookie-consent.js` to ensure:
  - [ ] “Cookie Policy” link points to the correct page
  - [ ] Keyboard/focus behavior (focus first action; close on ESC)
  - [ ] Consent can be changed/reopened (verify wire-up)

## Step 5 — Add POPIA consent checkbox to contact form
- [ ] Update `info.html` feedback form:
  - [ ] Add consent checkbox + label + helper text
  - [ ] Ensure validation includes consent requirement
  - [ ] Keep honeypot and existing UI logic intact

## Step 6 — Security hardening (lightweight for GitHub Pages)
- [ ] Add CSP `<meta http-equiv="Content-Security-Policy" ...>` to all HTML pages
  - [ ] Ensure CSP does not break inline scripts already used

## Step 7 — Accessibility & external link hygiene
- [ ] Ensure all `target="_blank"` links include `rel="noopener noreferrer"`
- [ ] Verify cookie modal is accessible (role/dialog + labels already present)

## Step 8 — Verification
- [ ] Manual smoke tests (cookie banner; cookie settings reopen; form submit to Formspree)
- [ ] Re-run regex scan for missing rel/unsafe patterns

## Step 9 — Final deliverable
- [ ] Produce complete audit output per issue:
  - [ ] File name
  - [ ] Line number
  - [ ] Problem explanation
  - [ ] LegalAction (risk level)
  - [ ] Exact corrected code
  - [ ] Why fix is required

