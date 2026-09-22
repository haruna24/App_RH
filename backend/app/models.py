# Définition des modèles de données utilisés par l'application RH.
# Ces classes correspondent aux tables SQL générées automatiquement.

from typing import Optional
from sqlmodel import SQLModel, Field
from datetime import date
from enum import Enum


# Rôles utilisables dans le système d'authentification.
class Role(str, Enum):
    admin = 'admin'
    hr = 'hr'
    accountant = 'accountant'
    manager = 'manager'
    employee = 'employee'


# Représente un utilisateur inscrit dans l'application.
class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True)
    email: Optional[str]
    hashed_password: str
    role: Role = Role.employee


# Représente un employé de l'entreprise.
class Employee(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: Optional[int]
    first_name: str
    last_name: str
    email: Optional[str]
    hire_date: Optional[date]
    salary: float = 0.0


# Représente un bulletin de paie calculé pour un employé.
class Payroll(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    employee_id: int
    period_start: date
    period_end: date
    gross: float
    net: float
    posted_to_finance: bool = False


# Représente une ligne dans le journal comptable.
class JournalEntry(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    description: str
    amount: float
    date: date
    source: Optional[str]
