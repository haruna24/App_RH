# Initialisation automatique des comptes et données de démonstration.
# Cela permet d'avoir un admin et un employeur RH prêts à l'emploi au démarrage.

from .crud import get_user_by_username, create_user
from .auth import get_password_hash


# Crée un compte administrateur par défaut s'il n'existe pas.
def ensure_default_admin():
    if not get_user_by_username('admin'):
        hashed = get_password_hash('adminpass')
        create_user('admin', 'admin@example.com', hashed, role='admin')
        print('Created default admin user: admin / adminpass')


# Crée un utilisateur RH et un exemplaire d'employé et de paie pour la démo.
def ensure_sample_data():
    # create an HR user and a sample employee, payroll and post it to finance
    if not get_user_by_username('hr'):
        hashed = get_password_hash('hrpass')
        create_user('hr', 'hr@example.com', hashed, role='hr')
        print('Created HR user: hr / hrpass')

    # create a sample employee and payroll if missing
    from .crud import list_employees, create_employee, create_payroll, post_payroll_to_finance
    from datetime import date, timedelta

    emps = list_employees()
    if not emps:
        emp = create_employee({
            'first_name': 'Jean', 'last_name': 'Martin', 'email': 'jean.martin@example.com', 'hire_date': date.today(), 'salary': 2500
        })
        print('Created sample employee', emp.id)
        # create a payroll for last month
        start = date.today().replace(day=1) - timedelta(days=1)
        period_start = start.replace(day=1)
        period_end = start
        p = create_payroll({
            'employee_id': emp.id,
            'period_start': period_start,
            'period_end': period_end,
            'gross': 2500.0,
            'net': 2000.0
        })
        print('Created sample payroll', p.id)
        post_payroll_to_finance(p.id)
        print('Posted payroll to finance journal')
