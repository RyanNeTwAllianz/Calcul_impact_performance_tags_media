# GetHars

## Démarrer le projet

Clonez le projet et accédez au dossier :

```bash
cd gethars
```

Installez les dépendances :

```bash
npm i
```

Lancez le script :

```bash
npm run dev
```

## Guide

Ce projet permet de récupérer les fichiers .har pour différents formulaires Allianz configurés.

### 📁 Fichier Urls.js

Ce fichier contient un tableau d'objets représentant les différentes configurations à tester.

| Paramètre       | Type       | Description                                                            |
| --------------- | ---------- | ---------------------------------------------------------------------- |
| `url`           | `string`   | URL de départ à charger                                                |
| `acceptCookies` | `boolean`  | Détermine s'il faut accepter (`true`) ou refuser (`false`) les cookies |
| `fileName`      | `string`   | Nom du fichier `.har` à générer                                        |
| `isHar`         | `boolean`  | Active l’enregistrement du `.har` au lancement                         |
| `function`      | `function` | Fonction à exécuter pour parcourir le formulaire                       |

### ⚙️ Fichier index.js

Le fichier principal qui exécute tout le projet :

1. Crée un dossier exports_YYYYMMDD_HHMMSS à l’instant t

2. Boucle sur les objets définis dans Urls.js

3. Pour chaque configuration, effectue 3 itérations (3 exécutions du parcours)

4. À la fin de chaque itération, génère un fichier .har dans le dossier ./exports/exports_YYYYMMDD_HHMMSS

### Structure du projet

gethars/

├── const/             # Constantes importantes

├── exports/           # Contient les fichiers .har générés

├── utils/             # Fonctions réutilisables

│   ├── forms/         # Fonctions liées aux formulaires

│   ├── hubs/          # Fonctions liées aux hubs

│   └── triggers/      # Fonctions liées à Puppeteer

├── Urls.js            # Configurations à exécuter

├── index.js           # Point d'entrée principal du script


### Fonctionnalités principales

#### 🧭 Init.js

Cette fonction s'occupe de :

1. Lancer le navigateur

2. Démarrer l'enregistrement du .har

3. Charger la page souhaitée

4. Accepter ou refuser les cookies selon la configuration

#### ✅ End.js

Cette fonction permet de :

1. Arrêter l’enregistrement du fichier .har

2. Fermer le navigateur proprement
