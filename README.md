# Furcsa Só videó tár

Retro, 2006-stílusú videótár weboldal a sorozatodhoz — a feltöltött koncepció alapján.

## Hogyan tedd fel GitHub Pages-re

1. Hozz létre egy új GitHub repót (pl. `furcsa-so`).
2. Töltsd fel ezt a 3 fájlt a repó gyökerébe: `index.html`, `script.js`, `README.md`.
3. A repóban: **Settings → Pages → Branch: main → Save**.
4. Pár perc múlva elérhető lesz itt: `https://FELHASZNALONEVED.github.io/furcsa-so/`

## Hogyan add hozzá a saját epizódjaidat

Nyisd meg a `script.js` fájlt, és a tetején lévő `SEASONS` objektumban:
- írd át az epizódok címét (`title`),
- illeszd be a YouTube (vagy más) beágyazó linket (`videoUrl`), pl.
  `https://www.youtube.com/embed/VIDEO_ID`
- ha üresen hagyod a `videoUrl`-t, egy "hamarosan" üzenet jelenik meg a lejátszó helyén.

Új évadot vagy kategóriát (pl. "3. évad") is könnyen felvehetsz: másolj egy meglévő
`SEASONS` bejegyzést, majd a HTML-ben a `<nav class="tabs">` részhez adj hozzá egy
új `<button class="tab-btn" data-season="ujevad">` gombot.

## Testreszabás

- A "Design by TE" és a látogatószámláló szöveg az `index.html`/`script.js`
  fájlokban szabadon átírható.
- A színek a `:root { ... }` CSS változóiban módosíthatók az `index.html` tetején.
