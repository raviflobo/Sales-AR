# Car AR Viewer – Client Guide

View the car in full 3D in your browser, or drop a life-sized version into
your real environment using your phone's camera.

**Open link:** https://raviflobo.github.io/Sales-AR/

---

## What you'll see

When the page opens you'll see the car in an interactive 3D viewer.

- Drag with your mouse or finger to orbit around the car.
- Scroll wheel or pinch to zoom.
- The car slowly auto-rotates so you can see it from every angle.

On a phone, you'll also see a blue **"View in your space"** button in the
lower-right corner. That's the one that puts the car into the real world
using your camera.

---

## On iPhone / iPad

Recommended: **Safari** on iOS 12 or newer.

1. Open https://raviflobo.github.io/Sales-AR/ in Safari.
2. Wait for the car to finish loading (a loading bar appears in the middle
   of the screen for a few seconds).
3. Tap **View in your space**.
4. iOS will launch **AR Quick Look**. Point your camera at the floor and
   slowly move side-to-side. A dotted circle appears once a surface is
   found.
5. The car drops onto that spot at its real-world size.

### AR gestures on iPhone

- **Move** – drag the car with one finger to slide it across the floor.
- **Rotate** – place two fingers on the car and twist.
- **Resize** – pinch in or out with two fingers.
- **Exit** – tap the **✕** in the top corner to return to the webpage.

> Tip: iPhone shows a small **"Object / Full screen"** toggle at the top.
> Keep it on **Full screen** for the immersive camera view.

---

## On Android

Recommended: **Chrome** (or any Chromium browser) on Android 8+ with Google
Play Services for AR installed (most phones already have it).

1. Open https://raviflobo.github.io/Sales-AR/ in Chrome.
2. Wait for the car to load.
3. Tap **View in your space**.
4. Chrome launches **Google Scene Viewer / WebXR**. Point at the floor and
   slowly pan. A placement reticle appears.
5. Tap once to drop the car at full scale.

### AR gestures on Android

- **Move** – drag the car with one finger.
- **Rotate** – two-finger twist.
- **Resize** – pinch.
- **Exit** – tap **✕** / back button to return to the website.

> Tip: If prompted to "Install Google Play Services for AR", accept – it's a
> free one-time install from the Play Store.

---

## On Desktop (Mac / Windows)

Desktop browsers can't launch phone AR, but they do give you a full 3D
preview.

1. Open https://raviflobo.github.io/Sales-AR/ in Chrome / Edge / Safari.
2. **Click and drag** to orbit the car.
3. **Scroll** to zoom in / out.
4. To show a client live AR, switch to a phone (see sections above).

---

## Tips for the best AR experience

- **Good light.** AR tracking needs visible features on the floor. Dim rooms
  or plain white floors confuse the tracker – carpet, tile, and wood floors
  work best.
- **Clear a space.** Give yourself ~3 metres (10 ft) in each direction so
  you can walk around the car.
- **Move the phone slowly** when placing the car – fast sweeping motions
  cause drift.
- **Keep the phone held vertical** for best tracking.
- **First load is slow** (~5–20 seconds) because the model is ~80 MB. Once
  loaded, AR launches instantly.

---

## Troubleshooting

**"View in your space" button isn't appearing.**
The model is still loading. Wait until the loading bar disappears.

**Tapping "View in your space" does nothing on desktop.**
Expected – AR only runs on a phone or tablet. Open the link on your phone.

**iPhone says "Error occurred while loading URL".**
Usually a bad connection during the 92 MB USDZ download. Close Quick Look,
make sure you have good Wi-Fi / 4G, wait for the loading bar on the web
page to finish, then tap **View in your space** again.

**Car appears tiny or sunk into the floor.**
Tap the car once in AR to re-center it, or exit AR and re-enter. On iOS,
two-finger-pinch to resize if needed (it starts at real 1:1 scale by
default).

**"Your device doesn't support AR" message.**
Your Android phone is missing Google Play Services for AR, or your iPhone
is older than iPhone 6s. Update to the latest OS and the AR module.

**Nothing happens when I drop the car.**
The tracker hasn't found a flat surface yet. Keep panning the floor slowly
until the placement reticle appears, then tap again.

---

## Showing this to a customer in person

A clean walkthrough that works 95% of the time:

1. Tell the customer "Open this link in your phone's browser" and send
   them: https://raviflobo.github.io/Sales-AR/
2. While it loads, say "Point your camera at the floor in front of you".
3. Once the **View in your space** button is tappable, guide them to tap
   it.
4. Ask them to slowly pan until the reticle appears, then tap to drop.
5. Have them walk around the car – sell from the details.

That's it – the whole demo takes under a minute on first load.

---

## Supported devices

| Platform | Browser | AR?          |
| -------- | ------- | ------------ |
| iPhone 6s or newer, iOS 12+ | Safari | Yes (Quick Look) |
| iPad (any with A9 chip +), iPadOS 12+ | Safari | Yes (Quick Look) |
| Android 8+ with ARCore | Chrome / Edge | Yes (WebXR) |
| Mac / Windows / Linux | Any modern browser | 3D preview only |

---

## Questions / feedback

Contact your project team.
