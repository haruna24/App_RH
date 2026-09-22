from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth, employees, payroll, finance
from app.db import init_db
from app.seed import ensure_default_admin, ensure_sample_data

app = FastAPI(title="RH+Finance API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(employees.router)
app.include_router(payroll.router)
app.include_router(finance.router)


@app.on_event("startup")
async def on_startup():
    init_db()
    ensure_default_admin()
    ensure_sample_data()
