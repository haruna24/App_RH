from fastapi import APIRouter, Depends
from typing import List
from app.models import JournalEntry, User
from app import crud
from app.auth import get_current_user

router = APIRouter(prefix="/finance", tags=["finance"])

@router.get('/journal', response_model=List[JournalEntry])
def list_journal(user: User = Depends(get_current_user)):
    return crud.list_journal()
