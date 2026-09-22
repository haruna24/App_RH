from fastapi import APIRouter, Depends, HTTPException
from app.models import Payroll, User, Role
from app import crud
from app.auth import get_current_user

router = APIRouter(prefix="/payroll", tags=["payroll"])


@router.post("/", response_model=Payroll)
def create_payroll(payload: Payroll, user: User = Depends(get_current_user)):
    if user.role not in [Role.admin, Role.hr, Role.accountant]:
        raise HTTPException(status_code=403, detail="Forbidden")
    return crud.create_payroll(payload.dict(exclude_unset=True))


@router.post("/{payroll_id}/post", response_model=Payroll)
def post_payroll(payroll_id: int, user: User = Depends(get_current_user)):
    if user.role not in [Role.admin, Role.accountant]:
        raise HTTPException(status_code=403, detail="Forbidden")
    p = crud.post_payroll_to_finance(payroll_id)
    if not p:
        raise HTTPException(status_code=404, detail="Payroll not found")
    return p
