# guide_eletronjs — wazabiCode

Formation **HTML, CSS, JavaScript & Electron.js** : Débutant à Expert.

## Lancer le site

Ouvrez `index.html` dans votre navigateur, ou servez le dossier avec un serveur local :

```bash
npx serve .
# ou
python3 -m http.server 8080
```

Puis ouvrez [http://localhost:8080](http://localhost:8080).

## Structure

```
├── index.html              # Accueil
├── assets/
│   ├── css/main.css        # Styles (navbar, sidebar, footer)
│   └── js/
│       ├── navigation.js   # Menu du cursus
│       ├── layout.js       # Layout partagé
│       └── app.js          # Interactions UI
├── pages/                  # Chapitres du cours
└── docs/cursus/            # Contenu source Markdown
```

## Layout

Toutes les pages incluent :
- **Navbar fixe** en haut (marque wazabiCode)
- **Sidebar** de navigation du cursus
- **Footer fixe** wazabiCode

## Générer les pages manquantes

```bash
node scripts/generate-pages.js
```
https://wazabi64000.github.io/guide_eletronjs/