# RH + Finance (full stack prototype)

Contient un backend FastAPI avec JWT et Postgres, et un frontend React (Vite).

Démarrage rapide (requiert Docker):

```bash
docker-compose up --build
```

API: http://localhost:8000
Frontend: http://localhost:3000

Backend: `rh_finance/backend`
Frontend: `rh_finance/frontend`

Endpoints importants:
- `POST /auth/register` : enregistre un utilisateur (body JSON `username`, `email`, `password`)
- `POST /auth/token` : obtient un token (form data `username`, `password`)
- `GET /employees/` : liste des employés (protégé)
- `GET /finance/journal` : liste du journal comptable (protégé)

Comptes par défaut générés au démarrage:
- admin / adminpass (rôle `admin`)
- hr / hrpass (rôle `hr`)

Pour tester local sans Docker (backend):

```bash
cd rh_finance/backend
python -m venv .venv
.venv\Scripts\activate  # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Le frontend Vite peut être lancé depuis `rh_finance/frontend` :

```bash
cd rh_finance/frontend
npm install
npm run dev
```
