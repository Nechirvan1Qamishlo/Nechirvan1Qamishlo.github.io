# nechirvan.github.io

Personal academic website for **Nechirvan A. Othman** — PhD Researcher in Business Economics and Management, University of Sopron.

🌐 Live at: [nechirvanothman.me](https://nechirvanothman.me)

## Structure

```
/
├── index.html          # Main one-page site (Home, About, Research, Experience, Publications, Blog, Contact)
├── blog/
│   └── index.html      # Blog landing page + subscribe form (add individual posts here)
├── files/
│   ├── papers/         # Paper PDFs → "PDF ↓" link appears on the matching publication
│   └── README.md       # File names for each publication
├── assets/
│   ├── css/style.css   # All styles
│   ├── js/main.js      # Navigation, animations, publication filter, forms, PDF links
│   ├── favicon.svg     # Browser tab icon
│   └── photo.jpg       # Profile photo
├── 404.html            # "Page not found" page
├── sitemap.xml         # For Google indexing (update lastmod when you add pages)
├── robots.txt
└── _config.yml         # GitHub Pages config
```

## Adding Blog Posts

1. Create a new folder: `blog/post-slug/index.html`
2. Copy the blog post template from `blog/index.html`
3. Add your content
4. Link from `blog/index.html` and `index.html#blog`

## Contact & Subscribe Forms

Both the contact form (homepage) and the blog subscribe form use the same
[Formspree](https://formspree.io) form (`maqzwqjb`). Messages are sent in the background
and the visitor sees a confirmation without leaving the page. Subscriptions arrive with the
subject "New blog subscriber". A hidden `_gotcha` field blocks simple spam bots.

## Paper PDFs

See [`files/README.md`](files/README.md). Upload a PDF with the expected name and its button
appears on the site automatically — no HTML editing needed.

## Deployment

Push to the `main` branch. GitHub Pages will auto-deploy.
Custom domain: set `nechirvanothman.me` as the custom domain in GitHub Pages settings.
