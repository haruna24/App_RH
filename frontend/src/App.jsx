import React from 'react'

const sidebarSections = [
  {
    title: 'Membres',
    items: ['Liste des membres', 'Ajouter membre', 'Catégories'],
  },
  {
    title: 'Département',
    items: ['Direction', 'Qhse', 'Ingénieur', 'Ajouter un département'],
  },
  {
    title: 'Secrétariat',
    items: ['Secrétariat général', 'Secrétariat Drh', 'Ajouter un secrétariat'],
  },
  {
    title: 'Brigade',
    items: ['Nouvelle brigade', 'liste des brigades', 'Chef de brigade'],
  },
  {
    title: 'Finances',
    items: ['Trésorerie', 'Dépenses', 'Comptabilité'],
  },
  {
    title: 'Entreprises',
    items: ['Nouvelles entreprises'],
  },
  {
    title: 'Contacts',
    items: ['Drh', 'Secrétariats', 'Réseau sociaux'],
  },
  { title: 'Événements', items: [] },
  { title: 'Rapports', items: [] },
  { title: 'Paramètres', items: [] },
]

const stats = [
  { label: 'Employés', value: '248', detail: '+12 % ce mois', tone: 'blue' },
  { label: 'Départements', value: '14', detail: '3 nouveaux', tone: 'green' },
  { label: 'Paie', value: '45.6K', detail: 'à jour', tone: 'orange' },
  { label: 'Dépenses', value: '18.2K', detail: 'budget maîtrisé', tone: 'purple' },
]

const members = [
  { name: 'Moussa Diop', role: 'Directeur RH', status: 'Présent' },
  { name: 'Awa Niane', role: 'Chef QHSE', status: 'En mission' },
  { name: 'Ibrahima Fall', role: 'Ingénieur', status: 'Présent' },
  { name: 'Sophie Martin', role: 'Secrétaire', status: 'En pause' },
]

const financeRows = [
  { ref: 'TR-1024', type: 'Trésorerie', amount: '+15 400 €', date: '24 Sept' },
  { ref: 'DP-430', type: 'Dépense', amount: '-3 280 €', date: '23 Sept' },
  { ref: 'CP-910', type: 'Comptabilité', amount: '+8 920 €', date: '22 Sept' },
  { ref: 'TR-1010', type: 'Trésorerie', amount: '+2 150 €', date: '21 Sept' },
]

const tasks = [
  'Validation des contrats de travail',
  'Mise à jour des fiches de paie',
  'Vérification des dossiers QHSE',
  'Suivi des demandes de congés',
]

const events = [
  { title: 'Réunion RH', time: '09:30', tag: 'Interne' },
  { title: 'Audit sécurité', time: '11:00', tag: 'QHSE' },
  { title: 'Session de recrutement', time: '14:00', tag: 'Recrutement' },
]

const styles = `
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: Inter, 'Segoe UI', sans-serif;
    background: #f3f6fb;
    color: #1f2937;
  }
  button, input { font: inherit; }
  .dashboard-shell {
    display: flex;
    min-height: 100vh;
    background: linear-gradient(135deg, #eef4ff 0%, #f7f9fc 100%);
  }
  .sidebar {
    width: 280px;
    background: #0f172a;
    color: #e2e8f0;
    padding: 28px 20px;
    border-right: 1px solid rgba(148, 163, 184, 0.2);
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 28px;
    padding: 8px 10px;
  }
  .brand-mark {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    background: linear-gradient(135deg, #4f46e5, #22c55e);
    display: grid;
    place-items: center;
    font-weight: 800;
    color: white;
  }
  .brand h2 {
    margin: 0;
    font-size: 1.1rem;
  }
  .nav-group {
    margin-bottom: 20px;
  }
  .nav-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.82rem;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin: 0 0 8px;
    padding: 0 10px;
  }
  .nav-items {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .nav-item {
    color: #dbeafe;
    background: transparent;
    border: none;
    text-align: left;
    padding: 10px 12px;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.2s ease;
    font-size: 0.95rem;
  }
  .nav-item:hover {
    background: rgba(255, 255, 255, 0.08);
  }
  .nav-item.active {
    background: linear-gradient(90deg, rgba(79,70,229,0.25), rgba(59,130,246,0.12));
    border: 1px solid rgba(96, 165, 250, 0.3);
  }
  .main {
    flex: 1;
    padding: 28px;
  }
  .topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }
  .topbar h1 {
    margin: 0;
    font-size: 2rem;
  }
  .toolbar {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .search-box {
    width: 260px;
    padding: 11px 14px;
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    color: #475569;
  }
  .primary-btn, .secondary-btn {
    border: none;
    border-radius: 12px;
    padding: 10px 16px;
    font-weight: 600;
    cursor: pointer;
  }
  .primary-btn {
    background: linear-gradient(135deg, #2563eb, #4f46e5);
    color: white;
    box-shadow: 0 10px 22px rgba(37, 99, 235, 0.25);
  }
  .secondary-btn {
    background: white;
    color: #1f2937;
    border: 1px solid #e2e8f0;
  }
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(170px, 1fr));
    gap: 18px;
    margin-bottom: 24px;
  }
  .stat-card {
    background: white;
    border: 1px solid #edf2f7;
    border-radius: 18px;
    padding: 18px 18px 16px;
    box-shadow: 0 10px 25px rgba(15, 23, 42, 0.04);
  }
  .stat-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
  }
  .stat-icon {
    width: 38px;
    height: 38px;
    border-radius: 12px;
    display: grid;
    place-items: center;
    font-weight: 700;
    color: white;
  }
  .stat-icon.blue { background: linear-gradient(135deg, #3b82f6, #2563eb); }
  .stat-icon.green { background: linear-gradient(135deg, #22c55e, #16a34a); }
  .stat-icon.orange { background: linear-gradient(135deg, #f59e0b, #f97316); }
  .stat-icon.purple { background: linear-gradient(135deg, #a855f7, #7c3aed); }
  .stat-label {
    color: #64748b;
    font-size: 0.8rem;
  }
  .stat-value {
    font-size: 1.9rem;
    font-weight: 800;
    margin: 0 0 6px;
  }
  .stat-detail {
    font-size: 0.78rem;
    color: #475569;
  }
  .content-grid {
    display: grid;
    grid-template-columns: 1.7fr 1fr;
    gap: 24px;
  }
  .panel {
    background: white;
    border: 1px solid #edf2f7;
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0 10px 25px rgba(15, 23, 42, 0.04);
  }
  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;
  }
  .panel-header h3 {
    margin: 0;
    font-size: 1.2rem;
  }
  .chip {
    background: #eff6ff;
    color: #1d4ed8;
    font-size: 0.8rem;
    border-radius: 999px;
    padding: 6px 10px;
    font-weight: 600;
  }
  .member-list, .finance-table, .task-list, .event-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .member-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 0;
    border-bottom: 1px solid #eef2f7;
  }
  .member-item:last-child { border-bottom: none; }
  .member-meta {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }
  .member-meta strong { font-size: 0.98rem; }
  .member-meta span { color: #64748b; font-size: 0.82rem; }
  .status {
    font-size: 0.75rem;
    border-radius: 999px;
    padding: 6px 10px;
    background: #ecfdf5;
    color: #166534;
    font-weight: 700;
  }
  .finance-table {
    width: 100%;
    border-collapse: collapse;
  }
  .finance-table th, .finance-table td {
    text-align: left;
    padding: 12px 8px;
    border-bottom: 1px solid #edf2f7;
    font-size: 0.88rem;
  }
  .finance-table th {
    color: #64748b;
    font-weight: 700;
  }
  .amount.positive { color: #15803d; font-weight: 700; }
  .amount.negative { color: #dc2626; font-weight: 700; }
  .task-list, .event-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .task-item, .event-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #f8fafc;
    border: 1px solid #edf2f7;
    border-radius: 12px;
    padding: 12px 14px;
  }
  .task-item span, .event-item strong { color: #1f2937; }
  .task-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: linear-gradient(135deg, #4f46e5, #22c55e);
    display: inline-block;
    margin-right: 10px;
  }
  .tag {
    font-size: 0.72rem;
    color: #1d4ed8;
    background: #dbeafe;
    border-radius: 999px;
    padding: 5px 9px;
    font-weight: 700;
  }
  .bottom-grid {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    gap: 24px;
    margin-top: 24px;
  }
  @media (max-width: 1100px) {
    .content-grid, .bottom-grid { grid-template-columns: 1fr; }
    .stats-grid { grid-template-columns: repeat(2, minmax(160px, 1fr)); }
  }
  @media (max-width: 820px) {
    .dashboard-shell { display: block; }
    .sidebar { width: 100%; }
    .main { padding: 20px; }
    .topbar { flex-direction: column; align-items: flex-start; gap: 14px; }
    .toolbar { width: 100%; flex-wrap: wrap; }
    .search-box { width: 100%; }
    .stats-grid { grid-template-columns: 1fr; }
  }
`

function App() {
  return (
    <>
      <style>{styles}</style>
      <div className="dashboard-shell">
        <aside className="sidebar">
          <div className="brand">
            <div className="brand-mark">RH</div>
            <div>
              <h2>RH + Finance</h2>
            </div>
          </div>

          {sidebarSections.map((section, index) => (
            <div className="nav-group" key={section.title || index}>
              <div className="nav-title">{section.title}</div>
              {section.items.length > 0 && (
                <div className="nav-items">
                  {section.items.map((item, idx) => (
                    <button
                      key={`${section.title}-${item}`}
                      className={`nav-item ${idx === 0 ? 'active' : ''}`}
                      type="button"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </aside>

        <main className="main">
          <header className="topbar">
            <h1>Tableau de bord</h1>
            <div className="toolbar">
              <input className="search-box" placeholder="Rechercher..." />
              <button className="secondary-btn" type="button">Exporter</button>
              <button className="primary-btn" type="button">+ Nouveau</button>
            </div>
          </header>

          <section className="stats-grid">
            {stats.map((stat) => (
              <div className="stat-card" key={stat.label}>
                <div className="stat-header">
                  <span className="stat-label">{stat.label}</span>
                  <span className={`stat-icon ${stat.tone}`}>{stat.label[0]}</span>
                </div>
                <p className="stat-value">{stat.value}</p>
                <div className="stat-detail">{stat.detail}</div>
              </div>
            ))}
          </section>

          <section className="content-grid">
            <div className="panel">
              <div className="panel-header">
                <h3>Membres récents</h3>
                <span className="chip">5 actifs</span>
              </div>
              <ul className="member-list">
                {members.map((member) => (
                  <li className="member-item" key={member.name}>
                    <div className="member-meta">
                      <strong>{member.name}</strong>
                      <span>{member.role}</span>
                    </div>
                    <span className="status">{member.status}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="panel">
              <div className="panel-header">
                <h3>À faire</h3>
                <span className="chip">4 tâches</span>
              </div>
              <ul className="task-list">
                {tasks.map((task) => (
                  <li className="task-item" key={task}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span className="task-dot" />
                      <span>{task}</span>
                    </div>
                    <span className="tag">Today</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="bottom-grid">
            <div className="panel">
              <div className="panel-header">
                <h3>Finances</h3>
                <span className="chip">Derniers mouvements</span>
              </div>
              <table className="finance-table">
                <thead>
                  <tr>
                    <th>Réf.</th>
                    <th>Type</th>
                    <th>Montant</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {financeRows.map((row) => (
                    <tr key={row.ref}>
                      <td>{row.ref}</td>
                      <td>{row.type}</td>
                      <td className={`amount ${row.amount.startsWith('+') ? 'positive' : 'negative'}`}>
                        {row.amount}
                      </td>
                      <td>{row.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="panel">
              <div className="panel-header">
                <h3>Événements</h3>
                <span className="chip">Cette semaine</span>
              </div>
              <ul className="event-list">
                {events.map((event) => (
                  <li className="event-item" key={event.title}>
                    <div>
                      <strong>{event.title}</strong>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="tag">{event.tag}</span>
                      <span style={{ color: '#64748b', fontSize: '0.82rem' }}>{event.time}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}

export default App
