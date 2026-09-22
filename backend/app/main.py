# Fichier principal de l'API FastAPI pour l'application RH + Finance.
# Il initialise l'application, active le CORS et enregistre les différents routeurs.

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, employees, payroll, finance
from app.db import init_db
from app.seed import ensure_default_admin, ensure_sample_data

# Instance FastAPI principale du backend.
app = FastAPI(title="RH+Finance API")

# Autorise les appels provenant du frontend local pendant le développement.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclusion des routes selon les domaines fonctionnels.
app.include_router(auth.router)
app.include_router(employees.router)
app.include_router(payroll.router)
app.include_router(finance.router)


# Au démarrage du service, on initialise la base et les données d'exemple.
@app.on_event("startup")
async def on_startup():
    init_db()
    ensure_default_admin()
    ensure_sample_data()
