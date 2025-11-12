import { tarjetas } from "./data.js";

const timeline = document.getElementById("timeline");
const overlay = document.createElement("div");
overlay.className = "overlay";
document.body.appendChild(overlay);

function renderTarjetas(lista) {
  timeline.innerHTML = "";
  lista.forEach(t => {
    const card = document.createElement("div");
    card.className = "tarjeta";
    card.innerHTML = `
      <div>
        <time>${t.fecha}</time>
        <h3>${t.titulo}</h3>
        ${
          t.tipo === "img"
            ? `<img src="${t.media}" alt="${t.titulo}">`
            : t.tipo === "pdf"
            ? `<iframe src="${t.media}" width="100%" height="200"></iframe>`
            : t.tipo === "video"
            ? `<iframe src="${t.media}" width="100%" height="180" allowfullscreen></iframe>`
            : ""
        }
        <p>${t.descripcion}</p>
      </div>
    `;
    timeline.appendChild(card);

    // Expandir al click
    card.addEventListener("click", () => expandCard(card, t));
  });
}

function expandCard(card, t) {
  const expanded = document.createElement("div");
  expanded.className = "tarjeta expanded";
  expanded.innerHTML = `
    <button class="close-btn">✕</button>
    <time>${t.fecha}</time>
    <h3>${t.titulo}</h3>
    ${
      t.tipo === "img"
        ? `<img src="${t.media}" alt="${t.titulo}">`
        : t.tipo === "pdf"
        ? `<iframe src="${t.media}" width="100%" height="500"></iframe>`
        : t.tipo === "video"
        ? `<iframe src="${t.media}" width="100%" height="350" allowfullscreen></iframe>`
        : ""
    }
    <p>${t.descripcion}</p>
  `;

  overlay.classList.add("show");
  document.body.appendChild(expanded);

  const close = expanded.querySelector(".close-btn");
  close.addEventListener("click", () => {
    overlay.classList.remove("show");
    expanded.remove();
  });

  overlay.addEventListener("click", () => {
    overlay.classList.remove("show");
    expanded.remove();
  });
}

const ordenadas = [...tarjetas].sort((a, b) => a.fecha.localeCompare(b.fecha));
renderTarjetas(ordenadas);
