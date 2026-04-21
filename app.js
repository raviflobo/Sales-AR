// Car AR Viewer — UI glue around <model-viewer>.
// In AR, model-viewer already handles move (1-finger drag),
// rotate (2-finger twist) and scale (pinch) when ar-placement="floor".
// The controls below drive the non-AR preview.

const viewer = document.getElementById("viewer");
const fileInput = document.getElementById("file-input");
const resetBtn = document.getElementById("reset-btn");
const arHint = document.getElementById("ar-hint");

const controls = {
  rotY: document.getElementById("rot-y"),
  rotX: document.getElementById("rot-x"),
  scale: document.getElementById("scale"),
  posX: document.getElementById("x-pos"),
  posZ: document.getElementById("z-pos"),
};

const values = {
  rotY: document.getElementById("rot-y-val"),
  rotX: document.getElementById("rot-x-val"),
  scale: document.getElementById("scale-val"),
  posX: document.getElementById("x-pos-val"),
  posZ: document.getElementById("z-pos-val"),
};

// Apply rotation (pitch/yaw) as an orientation string on model-viewer.
// Syntax: "<yaw> <pitch> <roll>" e.g. "45deg 10deg 0deg".
function applyOrientation() {
  const y = Number(controls.rotY.value);
  const x = Number(controls.rotX.value);
  viewer.setAttribute("orientation", `${y}deg ${x}deg 0deg`);
  values.rotY.textContent = `${y}°`;
  values.rotX.textContent = `${x}°`;
}

// Apply scale (uniform).
function applyScale() {
  const s = Number(controls.scale.value).toFixed(2);
  viewer.setAttribute("scale", `${s} ${s} ${s}`);
  values.scale.textContent = `${s}×`;
}

// "Move" in preview: shift the camera target in world space so the model
// visually translates within the stage.
function applyPosition() {
  const x = Number(controls.posX.value).toFixed(2);
  const z = Number(controls.posZ.value).toFixed(2);
  viewer.cameraTarget = `${-x}m 0m ${-z}m`;
  values.posX.textContent = `${x} m`;
  values.posZ.textContent = `${z} m`;
}

controls.rotY.addEventListener("input", applyOrientation);
controls.rotX.addEventListener("input", applyOrientation);
controls.scale.addEventListener("input", applyScale);
controls.posX.addEventListener("input", applyPosition);
controls.posZ.addEventListener("input", applyPosition);

// Reset all transforms.
resetBtn.addEventListener("click", () => {
  controls.rotY.value = 0;
  controls.rotX.value = 0;
  controls.scale.value = 1;
  controls.posX.value = 0;
  controls.posZ.value = 0;
  applyOrientation();
  applyScale();
  applyPosition();
  viewer.cameraOrbit = "0deg 75deg auto";
  viewer.fieldOfView = "auto";
});

// Load a user-supplied .glb / .gltf file.
fileInput.addEventListener("change", (e) => {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  viewer.src = url;
  // Clear iOS USDZ fallback for uploaded models (we don't have one).
  viewer.removeAttribute("ios-src");
});

// Progress bar.
const progressFill = document.querySelector(".progress-fill");
viewer.addEventListener("progress", (event) => {
  const p = event.detail.totalProgress || 0;
  if (progressFill) progressFill.style.width = `${p * 100}%`;
  if (p >= 1) {
    setTimeout(() => {
      const bar = document.querySelector(".progress-bar");
      if (bar) bar.style.opacity = "0";
    }, 300);
  }
});

// Hide hint while AR session is active (native UI takes over).
viewer.addEventListener("ar-status", (e) => {
  const status = e.detail.status;
  const btn = document.getElementById("ar-button");
  if (status === "session-started") {
    arHint.style.display = "none";
    if (btn) btn.classList.remove("is-loading");
  } else if (status === "not-presenting" || status === "failed") {
    arHint.style.display = "";
    if (btn) btn.classList.remove("is-loading");
  }
});

// Prevent double-activation of the AR button on touch devices.
// Some browsers fire both `touchend` and `click`, and on iOS a rapid retap
// while Quick Look is still launching can queue a second AR session.
const arBtn = document.getElementById("ar-button");
if (arBtn) {
  let lastTap = 0;
  arBtn.addEventListener(
    "click",
    (e) => {
      const now = Date.now();
      if (now - lastTap < 1500 || arBtn.classList.contains("is-loading")) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      }
      lastTap = now;
      arBtn.classList.add("is-loading");
      arBtn.setAttribute("aria-busy", "true");
      setTimeout(() => {
        arBtn.classList.remove("is-loading");
        arBtn.removeAttribute("aria-busy");
      }, 3000);
    },
    true
  );
}

// Initial sync.
applyOrientation();
applyScale();
applyPosition();
