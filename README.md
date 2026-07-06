# Smart Street Security - Dashboard de Supervision

Systeme intelligent de surveillance et de securite pour la Rue Professeur Kone Tiemoman, commune d'Abobo, Abidjan.

Projet Collectif Tutore (PCT) - Licence 3 Reseaux et Securite Informatique, 2026.

## Technologies

- **Frontend** : React 19, Vite, Tailwind CSS 4, Recharts, Socket.io-client, Lucide React
- **Backend** : Node.js, Express 5, Socket.io
- **Deploiement** : Docker (multi-stage build)

## Deploiement avec Docker

### Prerequis

- Docker et Docker Compose installes sur la machine

### Lancement

```bash
git clone https://github.com/Leyaxx/smart-street-security.git
cd smart-street-security
docker compose up -d --build
```

Le dashboard est accessible sur : **http://localhost:4002**

### Arret

```bash
docker compose down
```

## Deploiement sans Docker

### Backend

```bash
cd backend
npm install
node src/index.js
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Structure du projet

```
smart-street-security/
├── frontend/          # Application React (Vite)
│   ├── src/
│   │   ├── pages/     # Pages du dashboard
│   │   ├── components/# Composants reutilisables
│   │   ├── data/      # Donnees mock
│   │   └── services/  # API et WebSocket
│   └── package.json
├── backend/           # Serveur Node.js
│   ├── src/
│   │   ├── index.js   # Point d'entree Express + Socket.io
│   │   └── data.js    # Donnees des cameras et incidents
│   └── package.json
├── Dockerfile         # Build multi-stage
└── docker-compose.yml # Orchestration Docker
```

## Fonctionnalites

- Supervision en temps reel de 6 cameras IP PTZ
- Gestion des incidents et alertes
- Reconnaissance de plaques d'immatriculation
- Statistiques et graphiques interactifs
- Communication temps reel via WebSocket
