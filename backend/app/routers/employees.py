from fastapi import APIRouter, Depends, HTTPException
from typing import List
from app import crud
from app.models import Employee, User, Role
from app.auth import get_current_user

router = APIRouter(prefix="/employees", tags=["employees"])


@router.post("/", response_model=Employee)
def create_employee(payload: Employee, user: User = Depends(get_current_user)):
    if user.role not in [Role.admin, Role.hr]:
        raise HTTPException(status_code=403, detail="Forbidden")
    return crud.create_employee(payload.dict(exclude_unset=True))


@router.get("/", response_model=List[Employee])
def list_employees(user: User = Depends(get_current_user)):
    return crud.list_employees()
