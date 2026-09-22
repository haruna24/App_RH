from typing import Optional
from sqlmodel import SQLModel, Field
from datetime import date
from enum import Enum


class Role(str, Enum):
    admin = 'admin'
    hr = 'hr'
    accountant = 'accountant'
    manager = 'manager'
    employee = 'employee'


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True)
    email: Optional[str]
    hashed_password: str
    role: Role = Role.employee


class Employee(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: Optional[int]
    first_name: str
    last_name: str
    email: Optional[str]
    hire_date: Optional[date]
    salary: float = 0.0


class Payroll(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    employee_id: int
    period_start: date
    period_end: date
    gross: float
    net: float
    posted_to_finance: bool = False


class JournalEntry(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    description: str
    amount: float
    date: date
    source: Optional[str]
