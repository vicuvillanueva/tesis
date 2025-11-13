import { tarjetas } from "./data.js";

const contenedor = document.getElementById("oracular");
const btnShuffle = document.getElementById("btnShuffle");
const btnReset = document.getElementById("btnReset");

// Crear overlay reutilizable
const overlay = document.createElement("div");
overlay.className = "overlay";
document.body.appendChild(overlay);

// Array para seguir qué cartas ya salieron
let usadas = [];

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

function shuffle() {
  // reinicia mazo si ya salieron todas
  if (usadas.length === tarjetas.length) usadas = [];

  // selecciona una carta no usada
  const disponibles = tarjetas.filter((_, i) => !usadas.includes(i));
  const randomIndex = Math.floor(Math.random() * disponibles.length);
  const carta = disponibles[randomIndex];
  const originalIndex = tarjetas.indexOf(carta);

  usadas.push(originalIndex);
  renderTarjeta(carta);
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
  const cerrar = () => {
    overlay.classList.remove("show");
    expanded.remove();
  };
  close.addEventListener("click", cerrar);
  overlay.addEventListener("click", cerrar);
}

btnShuffle.addEventListener("click", shuffle);
btnReset.addEventListener("click", () => {
  usadas = [];
  contenedor.innerHTML = "";
});

// Mostrar una tarjeta random al cargar
document.addEventListener("DOMContentLoaded", () => {
  shuffle();
});
