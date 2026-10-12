# JMP Glass Designs — Website Draft

**Status: DRAFT. Not published anywhere.** The page carries `<meta name="robots" content="noindex, nofollow">` and a "Draft preview" tag in the footer. Remove both when it's approved to go live.

Static HTML/CSS with a small amount of plain JavaScript. There's no build step and nothing to install. Open `index.html` in a browser to view it.

## Files

```
website/
├── favicon.ico           Favicon (16/32/48), "JMP" mark on logo navy
├── index.html            Single-page site (Home, Services, Gallery, Process, For Contractors, About, Contact)
├── styles.css            All styling (palette, type, layout, responsive rules)
├── main.js               Mobile menu, gallery and lightbox, mailto form handler
├── gallery.js            ← THE LIST YOU EDIT to add project photos
├── images/
│   ├── logo.jpg          Original logo from Juliet (untouched)
│   ├── logo-400.jpg/.png Web-optimized logo, 400px wide, drop shadow trimmed (footer, 2x header)
│   ├── logo-160.jpg      Small logo (header/nav)
│   ├── favicon-32.png, apple-touch-icon.png  Icons
│   ├── hero-glass.jpg    Generated abstract glass texture, navy/silver (hero background)
│   ├── texture-gold.jpg  Generated abstract texture, gold (placeholders and About panel)
│   ├── texture-mist.jpg  Generated abstract texture, navy mist (placeholders)
│   └── gallery/          ← DROP PROJECT PHOTOS HERE
├── preview_desktop.png   Full-page screenshot at 1280px wide
└── preview_mobile.png    Full-page screenshot at 390px wide
```

Apart from Juliet's own logo, all the imagery is generated abstract texture. There are no stock photos and no third-party brand imagery.

## Domain & contact

- **Domain:** **jmpdesignsco.com**. The page already has `<link rel="canonical" href="https://jmpdesignsco.com/">`.
- **Contact email:** **jmpdesignsco@gmail.com**. The quote form, contact section and footer all use it.

## Brand palette (sampled from the logo)

| Role | Hex |
|---|---|
| Primary dark (logo navy) | `#14244a` |
| Deep navy (footer, overlays) | `#0b1733` |
| Gold accent (logo "GLASS DESIGNS") | `#b39d64` (highlight `#d9c497`; darker `#7a673a` for small text on light backgrounds) |
| Brushed silver (logo "JMP") | `#bbbab6` (highlight `#e6e5e1`) |
| Warm white / cream backgrounds | `#faf7f2` / `#f2ede4` |
| Body text / secondary text | `#1f2a40` / `#5d6475` |

These are CSS variables at the top of `styles.css` (`--navy`, `--gold`, `--silver`, and so on), along with `--gold-grad` and `--silver-grad` for the brushed-metal effects.

## Adding gallery photos (about 2 minutes)

1. Put your photos in `images/gallery/`. JPG or WebP at roughly 1600px on the long side works well. Short file names without spaces are easiest, e.g. `steam-shower-01.jpg`.
2. Open `gallery.js` and add one line for each photo inside the list:

   ```js
   window.GALLERY = [
     { src: "steam-shower-01.jpg", caption: "Floor-to-ceiling steam enclosure" },
     { src: "inline-shower-brass.jpg", caption: "Inline frameless shower, brushed brass" },
     { src: "wine-room.jpg", caption: "Wine room glass wall and door" },
   ];
   ```
3. Save the file and refresh the page. Photos appear in the order you list them, and each one opens in the lightbox (arrow keys, swipe and Esc all work).

While the list is empty, the site shows 9 tiles marked **"Your project photo here."** Once you add at least one photo, the placeholders disappear.

Tips: shoot in good light with the glass clean. Portrait (4:5) photos fill the tiles best. Get the homeowner's permission before posting photos of their home.

## Contact form

The form is set up as a **mailto: placeholder** for now. Pressing "Send Request" opens the visitor's own email app with a message to **jmpdesignsco@gmail.com**, already filled in with their details. It works without a server, but some visitors don't have an email app set up.

**TODO before launch (recommended): switch to Formspree** or a similar service so requests go straight to your inbox:
1. Create a free form at https://formspree.io and copy its endpoint (`https://formspree.io/f/XXXXXXX`).
2. In `index.html`, on the `<form id="quote-form">` tag: set `action="https://formspree.io/f/XXXXXXX"` and `method="post"`, **delete** `enctype="text/plain"`, and **delete** `data-mailto="true"`.
3. Optionally change the small note under the button.
(If you host on Netlify, Netlify Forms is another option: add `data-netlify="true"` to the form.)

## ⚠️ Before going live: license number (Cal. Bus. & Prof. Code §7030.5)

California requires a licensed contractor to show their **CSLB license number in all advertising**, and a website counts as advertising. The footer currently says **`CSLB License #[PENDING]`** as a placeholder.

- **Don't publish the site** until the real license number replaces `[PENDING]` in `index.html`. Search for `PENDING`.
- Until a license is issued, don't advertise or bid on work that requires a license. Under B&P §7027.1, unlicensed advertising is restricted, and ads for small jobs (under the $500 threshold) have to say the business is not licensed. Check the current rules with CSLB (https://www.cslb.ca.gov) or an advisor.
- The **"Insured [PLACEHOLDER]"** badge works the same way. Only show it once coverage is actually in place, and offer COIs only when you can actually provide them.
- The copy makes no claims about years in business, reviews, awards or numbers. Keep it that way unless you can back them up.

## Hosting options (when ready)

- **Netlify Drop (fastest):** go to https://app.netlify.com/drop and drag the whole `website` folder onto the page. You get a live URL in seconds, and you can connect a custom domain later in Site settings → Domains.
- **GitHub Pages (free):** create a repo, upload the contents of this folder (with `index.html` at the root), then go to Settings → Pages → Deploy from branch → `main` / root. Add a custom domain under the same settings page.
- **Cloudflare Pages / Vercel:** both take a static folder upload or a Git repo, with no build command.
- **Squarespace (import notes):** Squarespace can't import a raw HTML site. You have two options:
  1. Rebuild the page in Squarespace's editor, using this draft as the design reference: same section order, the copy from `index.html`, and fonts *Cormorant Garamond* (headings) and *Inter* (body). Colors: navy `#14244a`, gold `#b39d64`, silver `#bbbab6`, warm white `#faf7f2`. Upload `images/logo-400.png` as the site logo and `images/apple-touch-icon.png` as the browser icon.
  2. On a Business plan or higher, paste individual sections into **Code Blocks** and add the CSS under Design → Custom CSS. This is fragile and not recommended for the whole site.
- **Custom domain (jmpdesignsco.com):** whichever host you choose, add `jmpdesignsco.com` (and `www.jmpdesignsco.com`) as a custom domain in that host's settings, then update the domain's DNS at your registrar as the host instructs. HTTPS is free on all of the options above.

When you go live: replace `[PENDING]`, remove the `noindex` meta tag and the footer "Draft preview" line, switch the form to Formspree, and add real photos.

## Notes

- Fonts load from Google Fonts. If they're offline, the page falls back to Garamond/Times and the system sans-serif.
- The footer links to the **JMP Trade Docs** store ("Templates for contractors"): https://jmptradedocs.gumroad.com/
- Colors and fonts are CSS variables at the top of `styles.css`.
