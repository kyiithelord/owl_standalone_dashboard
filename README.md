# OWL Dashboard

A lightweight dashboard starter built with Odoo OWL v2, Vite, Tailwind CSS, and Chart.js.

## Tech Stack
- **Build**: Vite
- **UI**: Tailwind CSS (dark mode via `class`)
- **Framework**: @odoo/owl v2
- **Charts**: Chart.js v4

## Getting Started
- **Prerequisites**: Node.js 18+ and npm
- **Install deps**:
```bash
npm install
```
- **Start dev server** (default: http://localhost:5173):
```bash
npm run dev
```
- **Build for production**:
```bash
npm run build
```
- **Preview production build**:
```bash
npm run preview
```

## Project Structure
```
owl_dashbard/
├─ index.html                 # App entry (mounts to #app)
├─ vite.config.js             # Vite config (dev server port)
├─ tailwind.config.js         # Tailwind content scan + darkMode
├─ postcss.config.js          # Tailwind + Autoprefixer
├─ public/
│  └─ favicon.svg
├─ src/
│  ├─ main.js                 # OWL mount + global styles
│  ├─ app.js                  # Root component
│  ├─ styles.css              # Tailwind directives + globals
│  ├─ components/             # UI components (Layout, Sidebar, KpiCard, ChartCard, ...)
│  ├─ pages/
│  │  └─ Dashboard.js         # Main dashboard page
│  ├─ store/
│  │  └─ filters.js           # Simple state for filters
│  └─ services/
│     └─ charts/              # Chart data helpers
└─ package.json               # Scripts and dependencies
```

## Key Files
- **`index.html`**: Preloads dark mode class based on `localStorage`/prefers-color-scheme and loads `src/main.js`.
- **`src/main.js`**: Imports Tailwind styles and mounts `App` to `#app`.
- **`src/app.js`**: Renders `Layout` with `Dashboard` inside using OWL templates.

## Dark Mode
- Tailwind is configured with `darkMode: 'class'` in `tailwind.config.js`.
- `index.html` sets `documentElement.classList.add('dark')` based on saved theme or system preference.

## Development Notes
- Component examples live in `src/components/` (e.g., `KpiCard`, `ChartCard`, `TimeSeriesCard`).
- Charts are implemented with Chart.js v4. See `src/components/ChartCard.js` and `src/pages/Dashboard.js`.
- Filters/state are managed in `src/store/filters.js`.

## Scripts (from package.json)
- **`npm run dev`**: Start dev server
- **`npm run build`**: Production build
- **`npm run preview`**: Preview dist build

## License
Released under the MIT License 2025 Akyii. See `LICENSE` for details.
