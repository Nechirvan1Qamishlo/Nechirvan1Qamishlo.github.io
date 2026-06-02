# nechirvan.github.io

Personal academic website for **Nechirvan A. Othman** — PhD Researcher in Business Economics and Management, University of Sopron.

🌐 Live at: [nechirvanothman.me](https://nechirvanothman.me)

## Structure

```
/
├── index.html          # Main one-page site (Home, About, Research, Experience, Publications, Blog, Contact)
├── blog/
│   └── index.html      # Blog landing page (add individual posts here)
├── assets/
│   ├── css/style.css   # All styles
│   ├── js/main.js      # Navigation, animations, publication filter
│   └── photo.jpg       # Profile photo
└── _config.yml         # GitHub Pages config
```

## Adding Blog Posts

1. Create a new folder: `blog/post-slug/index.html`
2. Copy the blog post template from `blog/index.html`
3. Add your content
4. Link from `blog/index.html` and `index.html#blog`

## Contact Form

The contact form uses [Formspree](https://formspree.io). To activate:
1. Sign up at formspree.io
2. Create a new form
3. Replace `YOUR_FORM_ID` in `index.html` with your form ID

## Deployment

Push to the `main` branch. GitHub Pages will auto-deploy.
Custom domain: set `nechirvanothman.me` as the custom domain in GitHub Pages settings.
