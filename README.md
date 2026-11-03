# SOLEN & FORM — Interior Architecture & Design

A polished, responsive editorial portfolio website for a **fictional interior design studio**, created as an agency pitch concept. Written as a dependency-free static site for uncomplicated Vercel hosting.

## Live preview / development

Open `index.html` directly, or start any static server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`. On Vercel, import this repository as **Other** framework with no build command; Vercel serves the root `index.html` automatically. A `vercel.json` is included to opt into the clean static output.

## What works

- Responsive layout with desktop, tablet and compact-phone treatments
- Accessible mobile navigation, keyboard Escape-to-close and focus-trapped dialogs
- Category filtering for concept studies
- Click-to-expand editorial photographs
- Design brief form with browser validation, a clipboard option, and a `mailto:` email draft (no server submission)
- Reduced-motion preferences respected
- No analytics, tracking, cookies, fabricated testimonials, awards or project statistics

## Before using it for a real client

**This is a fictional concept only.** There is no operating SOLEN & FORM studio associated with this website. Names and project descriptions are design exercises, not claims about completed commissions. The photos depict generic interiors for illustration and were **not** created by the fictional studio. Replace the brand with the client's verified identity, replace all photos with licensed, client-approved work, supply real project information and client references, and configure an approved contact address or CRM. No email recipient is set in this concept to avoid inventing contact details. Robots are set to `noindex,nofollow` until a client authorizes publication.

## Imagery

Photography is loaded from Unsplash CDN using public photo IDs. Photos remain property of their creators; verify license terms and retain source credits prior to commercial use. Example CDN photo IDs used: `1600210492486-724fe5c67fb0`, `1600607687920-4e2a09cf159d`, `1600566753190-17f0baa2a6c3`, `1600607687939-ce8a6c25118c`, `1600566753051-f0b89df2dd90`, and `1600607688969-a5bfcd646154`.

## Design direction

Derived from the [unslop](https://github.com/heydamir/unslop) framework by Damir Sokolovsky (CC BY 4.0). Character: quietly confident, material-led, warm, editorial. World: natural stone, oak, linen, and ambient daylight. Signature: architectural lines and typographic white space. Deliberately avoids neon accents, repeated cards, fake social proof, moving tickers, and decorative glows.

## Structure

- `index.html`: accessible page content and SEO
- `styles.css`: design system and responsive composition
- `script.js`: menu, portfolio filtering, lightbox and design brief
- `assets/favicon.svg`: original inline vector mark
- `vercel.json`: static hosting settings
- `scripts/check_static.py`: HTML/JS/source checks