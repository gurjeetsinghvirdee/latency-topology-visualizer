## 3D Latency Topology Visualizer
A next-generation, interactive 3D visualization dashboard for exploring latency and connectivity between major cryptocurrency exchanges and cloud provider regions. Built with Next.js, React Three Fiber, and TypeScript, it combines real-time data, advanced filtering, and a modern, desk-ready user interface.

### Features
- Interactive 3D Globe:
  Rotate, zoom, and pan across a real-time map of global cloud regions and exchanges.
- Dynamic Exchange & Region Markers:
  Neon-coded, glut-resistant markers distinguish AWS, GCP, and Azure regions.
  Detailed tooltips reveal exchange/location, provider, and codes on hover.
- Animated Latency Visualization:
  Latency connections appear as pulsing, color-coded lines (green/yellow/red) mapping real-time delays between exchanges and cloud regions.
  Filter connections by latency range instantly.
- Historical Latency Trends:
 Select any exchange-region pair to view charts of latency over time (min/avg/max, with range selectors).
- Cloud Region __Clusters__:
  Distinct translucent overlays show provider coverage on the globe. Toggle visibility of each cloud’s regional presence.
- Advanced Filtering & Search:
  Sidebar lets you filter by provider, exchange, region, latency tier, and search by name/code.

### Demo
> Note: For local development and code review only. This project works best on desktop screens.

### Setup & Local Development

#### 1. Clone the Repository
```bash
git clone https://github.com/gurjeetsinghvirdee/latency-topology-visualizer
cd latency-topology-visualizer
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Start the Development Server
```bash
npm run dev
```
Run the PORT at **3000**

### Project Structure
```
latency-topology-visualizer/
├── app/                # Next.js: layout.tsx, page.tsx
├── public/             # Static Assets
├── src/
│   ├── components/     # All UI components
│   │   └── ToolTip/    # Subfolder for widgets
│   ├── data/           # Static/mock data
│   ├── hooks/          # Custom hooks
│   ├── types/          # TS type/interface files
│   └── utils/          # Utility/helper functions
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

### Tech Stack
- Next.js 15+ (App Router)
- React Three Fiber & Drei
- TypeScript (strict)
- Recharts (historical charts)
- Styled with global CSS & glassmorphism
- Data: Local (JSON) / mock, extensible to API sources

### How to Use
- Filter regions, cloud, and exchanges in the sidebar
- Toggle markers, latency lines, and region overlays
- Click latency lines to see historical latency trends
- On desktop, enjoy full rotation, zoom, and interactive tooltips