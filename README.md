# DevOps Wordle

## Exécuter l'application en local avec Docker Compose

1. Assurez-vous que Docker Desktop est lancé.
2. Depuis la racine du projet, exécutez :

```bash
docker compose up --build
```

3. Ouvrez l'application sur `http://localhost:3000`.
4. L'API backend est disponible sur `http://localhost:3001`.

Pour arrêter l'application :

```bash
docker compose down
```

## Déploiement en ligne

Ce projet est aussi déployé sur Fly :

https://devops-wordle.fly.dev/

## Vue d'ensemble du backend

Le backend est une API Node.js + Express qui gère les sessions de jeu Wordle en mémoire.
Il démarre de nouvelles parties, valide les propositions, calcule le feedback des lettres (`correct`, `present`, `absent`) et renvoie l'état du jeu au frontend.
Les mots sont chargés depuis `backend/words.json` et les routes de jeu sont exposées via `/api/game/*`.

## Vue d'ensemble du frontend

Le frontend est une application Next.js (TypeScript + React + Tailwind CSS).
Il gère l'interface du jeu (grille, clavier, modal), l'état local via un hook personnalisé, et les appels à l'API backend pour les actions de jeu.
En production, il est servi sur le port `3000`.

## Configuration Docker

Ce dépôt contient deux Dockerfiles de service :

- `backend/Dockerfile` pour le service API
- `frontend/Dockerfile` pour le service Next.js

Pour le développement local, `docker-compose.yml` exécute ces services dans deux conteneurs.

Pour le déploiement Fly, le `Dockerfile` à la racine construit les deux parties et exécute backend + frontend dans une seule image :

- backend sur `3001`
- frontend sur `3000` (point d'entrée public)

## Configuration du déploiement Fly

Fly est configuré avec `fly.toml`.
Le nom de l'application est `devops-wordle`, et Fly redirige le trafic HTTP vers le port interne `3000`.
Le déploiement peut être lancé manuellement avec :

```bash
flyctl deploy --remote-only --config fly.toml
```

## Déploiement automatique avec GitHub Actions

Le déploiement automatique est configuré dans :

- `.github/workflows/fly-deploy.yml`

À chaque push sur `main` (ou déclenchement manuel), GitHub Actions :

1. récupère le dépôt,
2. installe `flyctl`,
3. lance le déploiement Fly.

