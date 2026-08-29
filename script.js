/* =========================================================================
   FURCSA SÓ VIDEÓ TÁR — script.js
   -------------------------------------------------------------------------
   IDE ÍRD BE A SAJÁT EPIZÓDJAIDAT!
   Minden évadnak (season) van egy tömbje az "episodes" listával.
   Egy epizódnál:
     title     -> a rész címe (pl. "1. rész")
     videoUrl  -> YouTube beágyazó link (embed URL), pl.
                  "https://www.youtube.com/embed/VIDEO_ID"
                  Ha üresen hagyod (""), egy "hamarosan" üzenet jelenik meg.
   Ha egy évadhoz nincs epizód, hagyd az episodes tömböt üresen: []
   ========================================================================= */

const SEASONS = {
  s1: {
    title: "★ 1. évad – Epizódok",
    episodes: [
      { title: "1. rész", videoUrl: "" },
      { title: "2. rész", videoUrl: "" },
      { title: "3. rész", videoUrl: "" },
    ],
  },
  s2: {
    title: "2. évad – Epizódok",
    episodes: [
      { title: "1. rész", videoUrl: "" },
      { title: "2. rész", videoUrl: "" },
    ],
  },
  reborn: {
    title: "Reborn – Epizódok",
    episodes: [
      { title: "1. rész", videoUrl: "" },
    ],
  },
  egyeb: {
    title: "Egyéb videók",
    episodes: [
      { title: "Bloopers", videoUrl: "" },
      { title: "Making of", videoUrl: "" },
    ],
  },
};

/* ------------------------- SPARKLE BACKGROUND ------------------------- */
function spawnSparkles(count = 26) {
  const layer = document.getElementById("sparkles");
  for (let i = 0; i < count; i++) {
    const s = document.createElement("div");
    s.className = "sparkle";
    s.style.left = Math.random() * 100 + "vw";
    s.style.top = Math.random() * 100 + "vh";
    s.style.animationDelay = (Math.random() * 2.4).toFixed(2) + "s";
    s.style.transform = `scale(${(0.5 + Math.random() * 0.9).toFixed(2)})`;
    layer.appendChild(s);
  }
}

/* ------------------------------ TABS ----------------------------------- */
function renderSeason(key) {
  const season = SEASONS[key];
  if (!season) return;

  document.getElementById("seasonTitle").textContent = season.title;

  const grid = document.getElementById("episodeGrid");
  grid.innerHTML = "";

  if (season.episodes.length === 0) {
    grid.innerHTML = `<p style="font-family:'Baloo 2';font-weight:700;">
      Erre az évadra még nincs feltöltve semmi — gyere vissza hamarosan! 👀</p>`;
    return;
  }

  season.episodes.forEach((ep) => {
    const card = document.createElement("div");
    card.className = "ep-card";
    card.innerHTML = `
      <div class="ep-title">${ep.title}</div>
      <div class="tv" data-title="${ep.title}" data-video="${ep.videoUrl}">
        <div class="tv-screen"><div class="play-glyph"></div></div>
      </div>
      <button class="megnezem">▶ MEGNÉZEM!</button>
    `;
    grid.appendChild(card);
  });
}

function setActiveTab(btn) {
  document
    .querySelectorAll(".tab-btn[data-season]")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
}

document.querySelectorAll(".tab-btn[data-season]").forEach((btn) => {
  btn.addEventListener("click", () => {
    setActiveTab(btn);
    renderSeason(btn.dataset.season);
  });
});

/* --------------------------- INFO DROPDOWN ------------------------------ */
document.getElementById("infoTabBtn").addEventListener("click", () => {
  document.getElementById("infoDrop").classList.toggle("open");
});

/* ------------------------------ ARROWS ---------------------------------- */
document.getElementById("scrollLeft").addEventListener("click", () => {
  document.getElementById("episodeGrid").scrollBy({ left: -320, behavior: "smooth" });
});
document.getElementById("scrollRight").addEventListener("click", () => {
  document.getElementById("episodeGrid").scrollBy({ left: 320, behavior: "smooth" });
});

/* ------------------------------ LIGHTBOX --------------------------------- */
const lightbox = document.getElementById("lightbox");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxMedia = document.getElementById("lightboxMedia");

function openLightbox(title, videoUrl) {
  lightboxTitle.textContent = title;
  if (videoUrl) {
    lightboxMedia.innerHTML = `<iframe src="${videoUrl}" allowfullscreen></iframe>`;
  } else {
    lightboxMedia.innerHTML = `<p style="font-family:'Baloo 2';">
      Ehhez a részhez még nincs videó beállítva.<br>
      Add hozzá a linket a <code>script.js</code> fájlban! 🎬</p>`;
  }
  lightbox.classList.add("open");
}

document.getElementById("episodeGrid").addEventListener("click", (e) => {
  const tv = e.target.closest(".tv");
  const btn = e.target.closest(".megnezem");
  if (tv || btn) {
    const card = (tv || btn).closest(".ep-card").querySelector(".tv");
    openLightbox(card.dataset.title, card.dataset.video);
  }
});

document.getElementById("lightboxClose").addEventListener("click", () => {
  lightbox.classList.remove("open");
  lightboxMedia.innerHTML = "";
});
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove("open");
    lightboxMedia.innerHTML = "";
  }
});

/* ---------------------------- HIT COUNTER -------------------------------- */
function tickCounter() {
  const el = document.getElementById("hitCounter");
  const base = 1337 + Math.floor(Math.random() * 40);
  el.textContent = String(base).padStart(7, "0");
}

/* ----------------------------- CRT BLINK --------------------------------- */
setInterval(() => {
  const b = document.getElementById("crtBlink");
  if (b) b.style.visibility = b.style.visibility === "hidden" ? "visible" : "hidden";
}, 500);

/* ------------------------------- INIT ------------------------------------ */
document.getElementById("year").textContent = new Date().getFullYear();
spawnSparkles();
renderSeason("s1");
tickCounter();
