// Car AR Viewer — UI glue around <model-viewer>.
// In AR, model-viewer already handles move (1-finger drag),
// rotate (2-finger twist) and scale (pinch) when ar-placement="floor".

const viewer = document.getElementById("viewer");
const fileInput = document.getElementById("file-input");
const resetBtn = document.getElementById("reset-btn");
const arHint = document.getElementById("ar-hint");

resetBtn.addEventListener("click", () => {
  viewer.cameraOrbit = "0deg 75deg auto";
  viewer.fieldOfView = "auto";
  viewer.cameraTarget = "auto auto auto";
});

fileInput.addEventListener("change", (e) => {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  viewer.src = url;
  // Uploaded models don't have a matching USDZ, so drop the iOS fallback.
  viewer.removeAttribute("ios-src");
});

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
