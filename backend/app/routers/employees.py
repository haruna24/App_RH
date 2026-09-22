# Fichier des routes liées aux employés.
# Il applique les règles d'accès selon le rôle de l'utilisateur.

from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app import crud
from app.models import Employee, User, Role
from app.auth import get_current_user

router = APIRouter(prefix="/employees", tags=["employees"])


# Crée un employé uniquement pour les rôles autorisés.
@router.post("/", response_model=Employee)
def create_employee(payload: Employee, user: User = Depends(get_current_user)):
    if user.role not in [Role.admin, Role.hr]:
        raise HTTPException(status_code=403, detail="Forbidden")
    return crud.create_employee(payload.dict(exclude_unset=True))


# Retourne la liste de tous les employés après authentification.
@router.get("/", response_model=List[Employee])
def list_employees(user: User = Depends(get_current_user)):
    return crud.list_employees()
