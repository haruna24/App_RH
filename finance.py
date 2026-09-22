# Routes pour la gestion du journal financier et des écrans de finance.
# Les informations sont accessibles uniquement aux utilisateurs authentifiés.

from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app.models import JournalEntry, User
from app import crud
from app.auth import get_current_user

router = APIRouter(prefix="/finance", tags=["finance"])


# Renvoie l'historique complet du journal comptable.
@router.get('/journal', response_model=List[JournalEntry])
def list_journal(user: User = Depends(get_current_user)):
    return crud.list_journal()
