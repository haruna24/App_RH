from sqlmodel import select
from .models import User, Employee, Payroll, JournalEntry
from .db import engine
from sqlmodel import Session
from datetime import date


def create_user(username: str, email: str, hashed_password: str, role: str = 'employee'):
    with Session(engine) as session:
        user = User(username=username, email=email, hashed_password=hashed_password, role=role)
        session.add(user)
        session.commit()
        session.refresh(user)
        return user


def get_user_by_username(username: str):
    with Session(engine) as session:
        return session.exec(select(User).where(User.username == username)).first()


def authenticate_user(username: str, password: str):
    user = get_user_by_username(username)
    if not user:
        return False
    from .auth import verify_password
    if not verify_password(password, user.hashed_password):
        return False
    return user


def create_employee(data: dict):
    with Session(engine) as session:
        emp = Employee(**data)
        session.add(emp)
        session.commit()
        session.refresh(emp)
        return emp


def list_employees():
    with Session(engine) as session:
        return session.exec(select(Employee)).all()


def create_payroll(data: dict):
    with Session(engine) as session:
        p = Payroll(**data)
        session.add(p)
        session.commit()
        session.refresh(p)
        return p


def post_payroll_to_finance(payroll_id: int):
    with Session(engine) as session:
        p = session.get(Payroll, payroll_id)
        if not p:
            return None
        if p.posted_to_finance:
            return p
        je = JournalEntry(description=f"Payroll {p.employee_id} {p.period_start}", amount=p.net, date=date.today(), source="payroll")
        session.add(je)
        p.posted_to_finance = True
        session.add(p)
        session.commit()
        session.refresh(p)
        return p


def list_journal():
    with Session(engine) as session:
        return session.exec(select(JournalEntry)).all()
