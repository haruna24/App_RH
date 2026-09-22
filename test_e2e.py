# Test de bout en bout pour valider le parcours principal : inscription, connexion, consultation.

from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_e2e_register_login_and_fetch():
    # ensure register
    resp = client.post('/auth/register', json={"username":"e2euser","email":"e2e@example.com","password":"e2epass"})
    assert resp.status_code in (200,201)

    # login
    resp2 = client.post('/auth/token', data={"username":"e2euser","password":"e2epass"})
    assert resp2.status_code == 200
    token = resp2.json().get('access_token')
    assert token

    headers = { 'Authorization': f'Bearer {token}' }

    # fetch employees (may be empty but should be 200)
    r3 = client.get('/employees/', headers=headers)
    assert r3.status_code == 200

    # fetch journal
    r4 = client.get('/finance/journal', headers=headers)
    assert r4.status_code == 200
