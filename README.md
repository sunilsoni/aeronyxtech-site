# AeronyxTech Portal

Modern job and interview prep portal built with **Next.js + TailwindCSS**.  
Hosted on **GitHub Pages** (via static export).
 

## ✨ Features
- ✅ Daily Job Board (C2C, H1B, GC, OPT, CPT)
- ✅ Interview Questions by category (Java, AWS, React, etc.)
- ✅ Company Profiles (visa sponsoring companies)
- ✅ Hotlist 2025 – curated staffing C2C jobs
- ✅ Preparation Guides (resume, visa tips, interview prep)
- ✅ Dark Mode Toggle
- ✅ Sticky filter/search bar with tag chips
- ✅ Responsive modern UI with Tailwind + Framer Motion
- ✅ Static export ready for GitHub Pages

## 📂 Project Structure
- `src/components/` → UI components (Navbar, Layouts, Sidebar, JobCard, etc.)
- `src/pages/` → Next.js pages (Home, Job Board, Guides, etc.)
- `src/data/` → JSON data for jobs and companies
- `src/content/guides/` → MDX guides (resume, visa, interview)
- `src/styles/` → Global Tailwind styles

## 🚀 Local Development
```bash
npm install
npm run dev
```

## 📦 Static Export (GitHub Pages)
```bash
npm run build
# Deploy the `out/` folder to GitHub Pages
```

## 🖼️ Assets
- `public/logo-light.svg`
- `public/logo-dark.svg`
- `public/favicon.ico`

## 🔮 Roadmap
- [ ] Global search across jobs + guides
- [ ] Email subscription for daily job alerts
- [ ] Resume upload portal (external backend)
- [ ] Admin script to auto-add jobs from CSV/API
