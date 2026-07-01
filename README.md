# Dejla Estates — Cinematic 3D Luxury Real Estate

A high-end, scroll-driven WebGL landing page for a luxury real estate agency. The experience presents a premium villa like an architectural launch film: fixed fullscreen 3D canvas, smooth GSAP ScrollTrigger camera choreography, atmospheric particles, macro material reveals, and elegant editorial text overlays.

## Install and run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
npm run start
```

## Optional GLB villa model

Place an optimized villa/property GLB at:

```txt
public/models/main.glb
```

If the file is missing, the site automatically renders a procedural luxury estate fallback with villa volumes, reflective windows, pool, palms, roof slabs, and animated atmosphere.

Recommended asset optimization:

```bash
npx gltf-transform optimize public/models/main.glb public/models/main.glb --compress draco --texture-compress webp
```

## File structure

```txt
app/
  globals.css                 # Global cinematic theme and performance-safe base styles
  layout.tsx                  # SEO metadata and typography shell
  page.tsx                    # Landing page entry
components/
  experience/
    Model.jsx                 # GLB loader + procedural fallback luxury villa model
    Scene.jsx                 # Fixed fullscreen R3F canvas and scroll-driven camera/model/particles
    ScrollTimeline.jsx        # GSAP ScrollTrigger timeline and 5-section storytelling layout
    Section.jsx               # Reusable overlay text section
public/
  models/
    main.glb                  # Optional optimized villa GLB placeholder path
  textures/                   # Optional compressed textures
package.json                  # Next.js, R3F, Drei, GSAP, Tailwind dependencies
```

## Scroll animation system

- `Scene.jsx` creates a fixed fullscreen WebGL canvas.
- `GSAP ScrollTrigger` uses `scrub: true` against `#scroll-stage`.
- Scroll progress is damped in `useFrame` for video-smooth camera motion.
- Progress controls:
  - `camera.position`
  - `camera.lookAt`
  - villa `model.position`
  - villa `model.rotation`
  - villa `model.scale`
  - particle swirl and golden atmosphere intensity
  - architectural hotspot rings
  - warm cinematic key-light movement
- `ScrollTimeline.jsx` animates text overlays with fade, blur reveal, scale, and vertical motion.

## Story sections

1. Private arrival — fullscreen villa hero and slow architectural rotation.
2. Architectural detail — camera pushes close to glazing, massing, pool, and materials.
3. Atmosphere — golden dust/city-light particles swirl around the estate.
4. Lifestyle story — villa moves aside for a premium editorial value proposition.
5. Private viewing CTA — camera pulls back to a final poster-like composition.

## Performance notes

- Canvas is dynamically imported with `ssr: false` for lazy client loading.
- Mobile/low-tier GPUs reduce particles, DPR, antialiasing, environment resolution, and shadows.
- Missing GLB assets gracefully fall back to procedural Three.js geometry.
- Use compressed GLB textures and Draco/Meshopt for final production assets.
"# dejla" 
