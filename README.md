# AgentX: New Website (multi-file build)

Proper static website structure: no build step, no framework. Open it through
any static server or deploy the whole folder as-is (Vercel / Netlify / any host).

## Structure
- `index.html`: page markup only
- `css/style.css`: all styles
- `js/main.js`: all interactions (loader, menu, smooth scroll, reveals,
  services parallax, work accordion, cursor View button, achievement counters)
- `js/robot.js`: hero robot bootstrap (Spline)
- `js/vendor/`: libraries, vendored locally (GSAP 3.12.5, ScrollTrigger,
  Lenis, Spline runtime)
- `assets/scene.splinecode`: the hero robot scene

## Run locally
Double-click will NOT work (browser security blocks local modules): use a server:

    cd agentx-new-site
    python3 -m http.server 8000

then open http://localhost:8000

## Deploy
Upload the whole folder, keeping the structure. On Vercel: `vercel deploy`
from inside the folder, or drag the folder onto Netlify Drop.

Note: the hero robot is fully self-contained: the Spline runtime, its
process.js glue and the modelling WASM (assets/wasm/process.wasm) all ship
inside this project, so the robot loads from the same server as the page.
The only external loads are Google Fonts and the Work section's project
images, which load from the clients' own live sites.
