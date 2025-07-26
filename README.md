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

<table>
  <tr>
    <th>Desktop View</th>
  </tr>
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/5e936599-2a5f-41a3-8c5b-12141784b610" width=825 height="1000" alt="Desktop View" width="400" />
    </td>
  </tr>
</table>

<table>
  <tr>
    <th>Mobile View (1)</th>
    <th>Mobile View (2)</th>
  </tr>
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/0f6643f7-5af5-411b-af9b-e61c1af547a8" width=400 height="700" alt="Mobile View 1" width="200" />
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/93b60e81-ffb8-477e-873a-8e2ec284f8d6" width=400 height="700" alt="Mobile View 2" width="200" />
    </td>
  </tr>
</table>

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
#### 4. Open **http://localhost:3000** in your browser.

### Project Structure
```
latency-topology-visualizer/
├── app/                # Next.js: layout.tsx, page.tsx             
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
- Tailwind CSS v4
- React Three Fiber & Drei
- TypeScript (strict)
- Recharts (historical charts)
- Styled with global CSS & glassmorphism
- Data: Local (JSON)/mockData

### How to Use
- Filter regions, cloud, and exchanges in the sidebar
- Toggle markers, latency lines, and region overlays
- Click latency lines to see historical latency trends
- On desktop, enjoy full rotation, zoom, and interactive tooltips

### Assumptions
- Latency data is mocked due to the unavailability of a free real-time latency API with timestamps.
- Time filters (1hr, 24hr, 7d) were removed from the UI for accuracy and clarity.
- The design focuses on responsiveness and usability across devices.
