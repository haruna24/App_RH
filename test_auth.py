# Tests sur les endpoints d'authentification.
# Ils vérifient qu'un utilisateur peut s'inscrire puis se connecter.

import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_register_and_login():
    # register
    resp = client.post('/auth/register', json={"username":"testuser","email":"t@example.com","password":"testpass"})
    assert resp.status_code in (200,201)

    # login
    resp2 = client.post('/auth/token', data={"username":"testuser","password":"testpass"})
    assert resp2.status_code == 200
    data = resp2.json()
    assert 'access_token' in data
