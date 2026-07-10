# Sachi Savant — Portfolio

Live site: **https://sachisavant.netlify.app**

Portfolio of Sachi Savant, architect & interior designer (Dubai). Static site — plain HTML, CSS and JavaScript. No framework, no build step: the files in `site/` are served exactly as they are.

## How publishing works

Netlify watches this repository. When a change is merged to the `main` branch, the live site updates automatically within about a minute. Nothing else needs to be run.

## Structure

```
site/
├── index.html                  Home — hero, project grid, philosophy, contact
├── projects/                   One page per project
│   ├── liv-6-edgewater.html
│   ├── emaar-valley-town-centre.html
│   ├── pagoda-house.html
│   ├── tresind-studio.html
│   ├── karix-hq.html
│   └── khaitan-and-co.html
└── assets/
    ├── css/style.css           All styling (design tokens at the top in :root)
    ├── js/main.js              Scroll reveals, parallax, lightbox, before/after sliders
    └── img/<project>/          Images as WebP, named by role (hero.webp, site-*.webp …)
```

## Conventions (for anyone — or any AI — editing)

- **Design tokens** live in `:root` at the top of `style.css` (bone/ivory background, espresso ink, bronze accent). Change colours there, not inline.
- **Fonts:** Fraunces (display serif) + Archivo (labels/body), loaded from Google Fonts in each page's `<head>`.
- **Images:** convert new photos to WebP (quality ~84, max 1800px wide) and place them in `site/assets/img/<project-slug>/` with a descriptive name. Every `<img>` needs an `alt` text.
- **Adding a project:** copy an existing page in `site/projects/` as a template, add a card to the grid in `index.html`, and update the prev/next links at the bottom of the neighbouring project pages.
- **Content policy:** project descriptions, scope details and contact info come from Sachi's real portfolio material — don't invent project facts.

## Contact shown on site

sachisavant25@gmail.com · +971 52 745 0579 · Dubai, UAE
