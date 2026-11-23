# Grain Mother — Website

A production-ready React + Vite store for grainmother.in.

## Stack
- **React 18** + TypeScript
- **Vite 6** (fast builds, optimized for Vercel)
- Pure CSS (no Tailwind — zero runtime overhead)
- WhatsApp-based checkout

## Local development

```bash
npm install
npm run dev
```

## Deploy to Vercel

1. Push this project folder to GitHub
2. Import the repo in [vercel.com/new](https://vercel.com/new)
3. Framework preset: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`
6. Click **Deploy**

No environment variables needed — everything is static.

## Add your images

Place any additional photos in `public/assets/`. Current images used:
- `hero-sourdough.png` — hero & Mother Sourdough product
- `croissants.jpg` — Butter Croissants & Pain au Chocolat
- `sliced-loaf.jpg` — Milk Bread & Rye Loaf
- `bread-basket.jpg` — Seeded Loaf, Granola, Story section

## Customise

All product data, prices, reviews and FAQ live in `src/App.tsx` near the top. Update the `PRODUCTS`, `REVIEWS` and `FAQS` arrays to match your live catalogue.

## Contact info
- Phone: +91 98200 46786
- Email: hello@grainmother.in
- Instagram: @grainmother.in
