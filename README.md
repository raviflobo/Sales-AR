# Car AR Viewer

A tiny web-AR app built with Google's [`<model-viewer>`](https://modelviewer.dev)
that places a car GLB on the floor and lets you **move**, **rotate** and
**scale** it.

## Features

- Ground-plane AR placement (`ar-placement="floor"`).
- On-device AR:
  - **Android (Chrome)** → WebXR immersive AR.
  - **iOS (Safari)** → AR Quick Look (USDZ) — add an `ios-src` for best quality.
- Built-in AR gestures from `<model-viewer>`:
  - One-finger drag → move along the floor.
  - Two-finger twist → rotate around the vertical axis.
  - Pinch → scale.
- Desktop/non-AR preview with manual sliders for rotation, scale and move.
- Upload your own `.glb` / `.gltf` car model.
- Custom "View in your space" AR button and progress indicator.

## Run it

AR requires **HTTPS** (or `localhost`) and a camera-capable device. The
simplest path:

```bash
cd car-ar
# pick any static server, e.g.:
python3 -m http.server 8080
```

Then on your phone, open `http://<your-computer-ip>:8080` on the same Wi-Fi.
For real device AR you almost always need HTTPS — easiest options:

- **ngrok**: `ngrok http 8080` and use the `https://…ngrok.app` URL.
- **Deploy** to Netlify / Vercel / GitHub Pages (all serve HTTPS).

## Swap in your own car

- Click **Upload model** in the top-right, or
- Edit `index.html` and change the `<model-viewer src="…">` URL to your `.glb`.
- For iOS AR quality, also provide a `.usdz`:

```html
<model-viewer
  src="models/my-car.glb"
  ios-src="models/my-car.usdz"
  ar
  ar-modes="webxr scene-viewer quick-look"
  ar-placement="floor"
  ar-scale="auto"
  camera-controls
></model-viewer>
```

## Files

- `index.html` – markup + `<model-viewer>` configuration.
- `styles.css` – dark UI theme.
- `app.js` – slider → model-viewer wiring, file upload, AR session hooks.

## Notes / gotchas

- WebXR AR is **Android + Chromium** only. iOS uses Quick Look, which has its
  own native AR UI (move/rotate/scale) and ignores custom HTML.
- If the default ToyCar model doesn't load, your network may be blocking the
  Khronos sample asset; upload any other `.glb` instead.
- `ar-scale="auto"` lets users scale in AR. Set it to `"fixed"` if you want
  real-world 1:1 scale locked.
