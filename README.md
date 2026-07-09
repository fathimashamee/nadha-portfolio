# The Life & Works of Nadha Deen

An old-book autobiography portfolio. The whole site is a leather-bound
manuscript: ribbon bookmarks navigate, pages turn with a 3D flip, and
headings write themselves in quill ink (Vara.js).

Site crafted by Fathima Shameeha · https://fathimashamee.github.io/

## Run locally

```bash
npm install
npm run dev        # opens on http://localhost:5173
npm run build      # production build into dist/
```

## Adding her works (fully automatic)

Drop ANY image — any filename, .jpg/.jpeg/.png/.webp — into the matching
folder under **src/assets/works/** and it appears in that chapter
automatically. No lists to edit, no renaming, no counts:

| Folder                        | Chapter                 |
|-------------------------------|-------------------------|
| `src/assets/works/logo/`      | I · Logos & branding    |
| `src/assets/works/posters/`   | II · Posters            |
| `src/assets/works/flyers/`    | III · Flyers            |
| `src/assets/works/social/`    | IV · Social media posts |
| `src/assets/works/carousel/`  | V · Carousels           |
| `src/assets/works/foodmenu/`  | VI · Food menus         |
| `src/assets/works/packaging/` | VII · Packaging         |
| `src/assets/works/uiux/`      | VIII · UI & UX          |

- Images show in natural filename order (1, 2, 10 sorts correctly) —
  name files in the order she wants them displayed.
- Captions live in `src/data/content.js`, applied in the same order;
  images beyond the caption list get the chapter's default caption.
- When she sends new work in future: drop the file in, rebuild, redeploy. Done.
- **Restart the dev server after adding images** (Vite scans the folders at start).
- Her **portrait**: save as `public/portrait.jpg` — use a clear headshot
  where her face is fully visible; the frame crops from the top.
- Her **CV**: save as `public/cv.pdf` — the "Download CV" buttons in the
  contact pages and footer point to it.
- Compress big exports first (https://squoosh.app) — heavy files slow the flips.

## Textures (strongly recommended)

Drop three royalty-free photos into `public/textures/` — already wired:

- `parchment.jpg` — aged paper (~1200×1600)
- `leather.jpg` — dark worn leather (~1200×1600)
- `desk.jpg` — dark wood surface (~1920×1080)

## Structure

Cover → Title → Contents → **My story** (2pp) → **About** (2pp with portrait)
→ **Skills & commissions** (2pp, Fiverr linked) → **Tools & schooling** (2pp)
→ **Works** (8 chapters, 53 plates, 4 per page) → **Contact** (2pp)
→ Back cover. Every ribbon section opens on a fresh spread; decorative
quote interleaves pad the spreads where needed.

## Deploy to Netlify (her account)

1. She creates a free netlify.com account with her email.
2. `npm run build`, then drag `dist/` onto https://app.netlify.com/drop
   while logged into her account — or connect the repo (build command
   `npm run build`, publish dir `dist`).
3. Rename the site → e.g. https://nadhadeen.netlify.app

## Notes

- Quill font JSON loads from jsDelivr; falls back to a handwriting font offline.
- `prefers-reduced-motion` respected; keyboard ← → turns pages, Esc closes lightbox.
- Mobile: single-page portrait mode, handwriting auto-scales to page width.
