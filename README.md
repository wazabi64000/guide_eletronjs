# guide_eletronjs — wazabiCode

Formation **Electron.js : Débutant à Expert**.

> Ce dépôt contient le **cours Electron.js** et la **plateforme e-learning** (HTML/CSS/JS) qui le diffuse.

## Lancer la plateforme

```bash
python3 -m http.server 8080
# ou
npx serve .
```

→ [http://localhost:8080](http://localhost:8080)

Site en ligne : https://wazabi64000.github.io/guide_eletronjs/

## Prérequis du cours

Le cours enseigne **uniquement Electron.js**. Vous devez maîtriser :
- HTML (structure d'interface)
- CSS (mise en page de l'UI renderer)
- JavaScript ES6+ (logique applicative)

## Structure

```
├── index.html              # Accueil du cursus Electron
├── assets/                 # Plateforme e-learning (HTML/CSS/JS)
├── pages/                  # 16 modules + 4 projets Electron
├── docs/cursus/            # Contenu source Markdown
└── scripts/generate-pages.js
```

## Modules

| Niveau | Contenu |
|--------|---------|
| Débutant | Intro, installation, premiers pas, fenêtres |
| Intermédiaire | Preload/IPC, sécurité, UI native, fichiers |
| Avancé | SQLite, API REST, sync offline, architecture |
| Expert | Debug, tests, packaging, déploiement |

## Générer / régénérer les pages

```bash
node scripts/generate-pages.js
```
