import { useState } from 'react'
import styles from '../styles/LoginForm.module.css'

export default function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch('https://tahar.projetsmmichamps.fr/API/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })

    const data = await response.json()

    if (data.success) {
      onLoginSuccess(data.token)
    } else {
      alert('Échec de la connexion : ' + data.message)
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.title}>Connexion</h1>
        <label className={styles.label}>
          Nom d'utilisateur :
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} required className={styles.input}/>
        </label>
        <br />
        <label className={styles.label}>
          Mot de passe :
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className={styles.input} />
        </label>
        <br />
        <button type="submit" className={styles.button}>Se connecter</button>
      </form>
    </div>
  )
}
