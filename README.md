# guide_eletronjs — wazabiCode

Formation **Electron.js : de zéro à l'exécutable** — basée sur la [documentation officielle](https://www.electronjs.org/fr/docs/latest/tutorial/installation).

## Lancer la plateforme

```bash
python3 -m http.server 8080
```

→ http://localhost:8080 · https://wazabi64000.github.io/guide_eletronjs/

## Parcours

1. **Installation** — `npm install electron --save-dev`
2. **Première page** — `index.html` + `main.js`
3. **IPC & multi-pages** — application complète
4. **Tests** — Jest + Playwright
5. **Compilation** — `.exe` / `.dmg` / `.AppImage`

## Structure

```
├── index.html
├── assets/          # Plateforme e-learning (HTML/CSS/JS)
├── pages/           # 15 chapitres + 3 projets Electron
└── scripts/generate-pages.js
```

```bash
node scripts/generate-pages.js --force
```
