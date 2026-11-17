# NextJS_Cinematic_Portfolio

![GitHub last commit](https://img.shields.io/github/last-commit/MrShadowRIFAT/NextJS_Cinematic_Portfolio?style=flat-square&color=1f6feb) ![GitHub repo size](https://img.shields.io/github/repo-size/MrShadowRIFAT/NextJS_Cinematic_Portfolio?style=flat-square&color=238636)

Cinematic developer portfolio for **MrShadowRIFAT** — Full-Stack Web Developer & Digital Systems Specialist.

- **Author**: MrShadowRIFAT
- **Primary Website**: [rifatweb.link](https://rifatweb.link)

## Tech Stack

- **React 19**
- **Framer Motion 12**
- **Lucide React**
- **esbuild**
- **CSS3 / Vanilla modern CSS**

## Project Structure

```text
NextJS_Cinematic_Portfolio/
├── .gitattributes
├── .gitignore
├── vercel.json
├── index.html
├── live_preview.js
├── package.json
├── package-lock.json
├── README.md
├── scripts/
│   ├── build.mjs
│   ├── check.mjs
│   └── dev.mjs
├── src/
│   ├── app.jsx
│   ├── styles.css
│   └── data/
│       ├── brands.json
│       └── projects.json
└── Asset/
    ├── cv/
    ├── dist/
    ├── img/
    └── svg/
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/MrShadowRIFAT/NextJS_Cinematic_Portfolio.git
cd NextJS_Cinematic_Portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build for Production

```bash
npm run build
```

Compiles the production static bundle into `Asset/dist/app.js` and `Asset/dist/app.css`.

### 4. Development & Live Preview

```bash
npm start
```
Starts the local preview server at `http://localhost:4173/`.

## Deployment

Configured for one-click deployment on **Vercel** via `vercel.json` and static hosts (GitHub Pages, Netlify, Cloudflare Pages).
