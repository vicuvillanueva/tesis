import { tarjetas } from "./data.js";

const contenedor = document.getElementById("oracular");
const btnShuffle = document.getElementById("btnShuffle");
const btnReset = document.getElementById("btnReset");
const fTipo = document.getElementById("fTipo");
const fTag = document.getElementById("fTag");

// Crear overlay reutilizable
const overlay = document.createElement("div");
overlay.className = "overlay";
document.body.appendChild(overlay);

function renderTarjeta(t) {
  contenedor.innerHTML = `
    <article class="card ${t.tipo}">
      <h3>${t.titulo}</h3>
      <p class="fecha">${t.fecha}</p>
      ${
        t.tipo === "video"
          ? `<iframe width="100%" height="240" src="${t.media}" allowfullscreen></iframe>`
          : t.tipo === "pdf"
          ? `<iframe class="pdf" src="${t.media}" width="100%" height="360"></iframe>`
          : `<img src="${t.media}" alt="${t.titulo}">`
      }
      <p>${t.descripcion}</p>
    </article>
  `;

  const card = contenedor.querySelector(".card");
  card.addEventListener("click", () => expandCard(t));
}

function filtrar() {
  let f = tarjetas;
  const tipo = fTipo.value;
  const tag = fTag.value.toLowerCase();
  if (tipo) f = f.filter((t) => t.tipo === tipo);
  if (tag) f = f.filter((t) =>
    t.etiquetas?.some((e) => e.toLowerCase().includes(tag))
  );
  return f;
}

function shuffle() {
  const filtradas = filtrar();
  if (!filtradas.length) return;
  const random = filtradas[Math.floor(Math.random() * filtradas.length)];
  renderTarjeta(random);
}

function expandCard(t) {
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

btnShuffle.addEventListener("click", shuffle);
btnReset.addEventListener("click", () => {
  contenedor.innerHTML = "";
});

// 🪄 Mostrar una tarjeta random al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  shuffle();
});
