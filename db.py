# Gestion de la connexion à la base de données SQLModel.
# Le moteur est partagé par toutes les fonctions CRUD du projet.

from sqlmodel import SQLModel, create_engine, Session
import os

# Base SQLite par défaut, configurable via la variable DATABASE_URL.
DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///./rh_finance.db')
engine = create_engine(DATABASE_URL, echo=False)


# Crée les tables définies par les modèles SQLModel.
def init_db():
    SQLModel.metadata.create_all(engine)


# Fournit une session de base de données pour les opérations CRUD.
def get_session():
    with Session(engine) as session:
        yield session
