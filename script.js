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
      { title: "1. rész", videoUrl: "https://youtu.be/QjfZe6POnHw" },
      { title: "2. rész", videoUrl: "https://youtu.be/vpa2Bnuat6o" },
      { title: "3. rész", videoUrl: "https://youtu.be/ijUR5ZruQhY" },
      { title: "4. rész", videoUrl: "https://youtu.be/Ekz4gJYH3IM" },
      { title: "5. rész", videoUrl: "https://youtu.be/OUuA1_e5tJM" },
    ],
  },
  s2: {
    title: "2. évad – Epizódok",
    episodes: [
      { title: "1. rész", videoUrl: "https://youtu.be/JbEPuYqJn6U" },
      { title: "2. rész", videoUrl: "https://youtu.be/R0MoglheiCU" },
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
      { title: " ", videoUrl: "https://youtube.com/shorts/7lL3KFPihco?feature=share" },
      { title: " ", videoUrl: "https://youtube.com/shorts/_W_8SklUyRs?feature=share" },
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
    const thumbId = getYouTubeId(ep.videoUrl);
    const thumbStyle = thumbId
      ? ` style="background-image:url('https://img.youtube.com/vi/${thumbId}/hqdefault.jpg')"`
      : "";
    const glyphBg = thumbId ? `<div class="play-glyph-bg"></div>` : "";
    card.innerHTML = `
      <div class="ep-title">${ep.title}</div>
      <div class="tv" data-title="${ep.title}" data-video="${ep.videoUrl}">
        <div class="tv-screen${thumbId ? " has-thumb" : ""}"${thumbStyle}>
          ${glyphBg}<div class="play-glyph"></div>
        </div>
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

/* A YouTube csak a "/embed/VIDEO_ID" formátumú linkeket engedi iframe-be
   ágyazni — a sima "youtube.com/watch?v=..." vagy "youtu.be/..." linkeket
   letiltja ("refused to connect"). Ez a két függvény kinyeri a videó
   azonosítóját bármelyik szokásos linkformátumból (watch / youtu.be /
   shorts / már kész embed), amit aztán a lejátszáshoz ÉS a borítókép
   megjelenítéséhez is felhasználunk. */
function getYouTubeId(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.slice(1);
    }
    if (u.hostname.includes("youtube.com")) {
      if (u.pathname === "/watch") return u.searchParams.get("v");
      if (u.pathname.startsWith("/embed/")) return u.pathname.split("/")[2];
      if (u.pathname.startsWith("/shorts/")) return u.pathname.split("/")[2];
    }
  } catch (e) {
    /* nem érvényes vagy nem YouTube link */
  }
  return null;
}

function toEmbedUrl(url) {
  const videoId = getYouTubeId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
}

function openLightbox(title, videoUrl) {
  lightboxTitle.textContent = title;
  if (videoUrl) {
    lightboxMedia.innerHTML = `<iframe src="${toEmbedUrl(videoUrl)}" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
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

/* ---------------------------- HIT COUNTER --------------------------------
   Valódi, minden látogatónál növekvő számláló, az ingyenes CountAPI
   szolgáltatással (nincs szükség saját szerverre / adatbázisra).
   A NAMESPACE-t érdemes egyedire cserélni (pl. a saját domained neve),
   hogy ne ütközzön mások azonos nevű számlálójával.
   Doksi: https://countapi.xyz
---------------------------------------------------------------------------- */
const COUNTAPI_NAMESPACE = "furcsa-so-videotar-2026";
const COUNTAPI_KEY = "latogatok";

async function tickCounter() {
  const el = document.getElementById("hitCounter");
  try {
    const res = await fetch(
      `https://api.countapi.xyz/hit/${COUNTAPI_NAMESPACE}/${COUNTAPI_KEY}`
    );
    if (!res.ok) throw new Error("countapi hiba");
    const data = await res.json();
    el.textContent = String(data.value).padStart(7, "0");
  } catch (err) {
    // ha nem elérhető a szolgáltatás (pl. nincs net, vagy le van tiltva),
    // ne törjön el az oldal — mutasson egy semleges placeholdert.
    el.textContent = "???????";
  }
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
