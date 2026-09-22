from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from app import crud
from app.auth import create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES, get_password_hash

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post('/register')
def register(payload: dict):
    username = payload.get('username')
    email = payload.get('email')
    password = payload.get('password')
    if not username or not password:
        raise HTTPException(status_code=400, detail='username and password required')
    hashed = get_password_hash(password)
    user = crud.create_user(username, email, hashed)
    return {"username": user.username, "role": user.role}


@router.post('/token')
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = crud.authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=400, detail='Incorrect username or password')
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}
