let progress = 0;
const bar = document.getElementById("progress");
const bootPhase = document.getElementById("boot-phase");
const accessPanel = document.getElementById("access-panel");

const interval = setInterval(() => {
  progress += Math.random() * 18;
  if (progress >= 100) {
    progress = 100;
    clearInterval(interval);

    setTimeout(() => {
      bootPhase.style.display = "none";
      accessPanel.style.display = "block";
    }, 600);
  }
  bar.style.width = progress + "%";
}, 350);

function checkAccess() {
  const input = document.getElementById("password").value.trim();
  const error = document.getElementById("access-error");

  if (input === "1945") {
    document.getElementById("boot-screen").style.opacity = 0;
    setTimeout(() => {
      document.getElementById("boot-screen").style.display = "none";
    }, 400);
  } else {
    error.textContent = "ACCESO DENEGADO — INTENTE NUEVAMENTE";
  }
}
