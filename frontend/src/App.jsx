import React, {useState, useEffect} from 'react'

// Composant principal de l'application.
// Il permet de se connecter et d'afficher les employés et le journal comptable.
function App(){
  // Données de l'utilisateur et des listes récupérées depuis le backend.
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [token,setToken] = useState(null)
  const [employees,setEmployees] = useState([])
  const [journal,setJournal] = useState([])

  // Vérifie s'il existe déjà un token enregistré dans le navigateur.
  useEffect(()=>{
    const t = localStorage.getItem('token')
    if(t){
      setToken(t)
      loadData(t)
    }
  }, [])

  // Envoie les informations de connexion au backend pour obtenir un token JWT.
  async function login(e){
    e.preventDefault()
    const fd = new URLSearchParams()
    fd.append('username', username)
    fd.append('password', password)
    const resp = await fetch('http://localhost:8000/auth/token', {method:'POST', body: fd})
    const data = await resp.json()
    if(data.access_token){
      setToken(data.access_token)
      localStorage.setItem('token', data.access_token)
      await loadData(data.access_token)
    }
  }

  // Récupère les données de l'API après authentification.
  async function loadData(tok){
    try{
      const h = { 'Authorization': `Bearer ${tok}` }
      const resp = await fetch('http://localhost:8000/employees/', {headers: h})
      const emps = await resp.json()
      const r2 = await fetch('http://localhost:8000/finance/journal', {headers: h})
      const journal = await r2.json()
      setEmployees(emps)
      setJournal(journal)
    }catch(e){
      console.error(e)
    }
  }

  return (
    <div style={{padding:20}}>
      <h1>RH + Finance (prototype)</h1>
      {!token ? (
        <form onSubmit={login}>
          <div>
            <label>Username</label>
            <input value={username} onChange={e=>setUsername(e.target.value)} />
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
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
