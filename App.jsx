import React, { useState, useEffect } from 'react'

// Interface principale de l'application RH + Finance.
// Elle gère la connexion, la récupération des employés et du journal comptable.
function App() {
  // États locaux pour l'authentification et les données affichées.
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(null)
  const [employees, setEmployees] = useState([])
  const [journal, setJournal] = useState([])

  // Au chargement, on vérifie s'il existe déjà un token enregistré.
  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      setToken(savedToken)
      loadData(savedToken)
    }
  }, [])

  // Connexion utilisateur : envoi des identifiants au backend pour obtenir un JWT.
  async function login(e) {
    e.preventDefault()
    const fd = new URLSearchParams()
    fd.append('username', username)
    fd.append('password', password)

    const resp = await fetch('http://localhost:8000/auth/token', { method: 'POST', body: fd })
    const data = await resp.json()

    if (data.access_token) {
      setToken(data.access_token)
      localStorage.setItem('token', data.access_token)
      await loadData(data.access_token)
    }
  }

  // Charge les employés et le journal comptable après authentification.
  async function loadData(tok) {
    try {
      const headers = { Authorization: `Bearer ${tok}` }
      const employeesResp = await fetch('http://localhost:8000/employees/', { headers })
      const employeesData = await employeesResp.json()
      const journalResp = await fetch('http://localhost:8000/finance/journal', { headers })
      const journalData = await journalResp.json()
      setEmployees(employeesData)
      setJournal(journalData)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>RH + Finance (prototype)</h1>
      {!token ? (
        <form onSubmit={login}>
          <div>
            <label>Username</label>
            <input value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit">Login</button>
        </form>
      ) : (
        <div>
          <p>Connected</p>
          <h3>Employees</h3>
          <ul>
            {employees.map(emp => (
              <li key={emp.id}>{emp.first_name} {emp.last_name} — {emp.email}</li>
            ))}
          </ul>

          <h3>Journal</h3>
          <ul>
            {journal.map(j => (
              <li key={j.id}>{j.date}: {j.description} — {j.amount}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App
