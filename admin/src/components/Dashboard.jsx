import { useEffect, useState } from 'react';
import styles from '../styles/Reservations.module.css';
import ReservationTable from './ReservationTable.jsx';
import { fetchWithAuth } from '../utils/fetchWithAuth';

export default function Dashboard({ token, onLogout }) {
  const [reservations, setReservations] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formValues, setFormValues] = useState({});

  const fetchReservations = async () => {
    const response = await fetchWithAuth(
      'https://tahar.projetsmmichamps.fr/API/index.php?last5=true',
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
      onLogout
    );

    if (!response) return;

    const data = await response.json();
    setReservations(data);
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const deleteReservation = async (id) => {
    const confirmDelete = confirm('Supprimer cette réservation ?');
    if (!confirmDelete) return;

    const response = await fetchWithAuth(
      'https://tahar.projetsmmichamps.fr/API/index.php',
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      },
      onLogout
    );

    if (!response) return;

    const data = await response.json();
    if (data.success) {
      fetchReservations();
    } else {
      alert('Erreur suppression : ' + data.message);
    }
  };

  const saveReservation = async (id, updatedData) => {
    const response = await fetchWithAuth(
      'https://tahar.projetsmmichamps.fr/API/index.php',
      {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, ...updatedData }),
      },
      onLogout
    );

    if (!response) return;

    const data = await response.json();
    if (data.success) {
      fetchReservations();
    } else {
      alert('Erreur mise à jour : ' + data.message);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Tableau de bord</h2>
      <ReservationTable
        reservations={reservations}
        onDelete={deleteReservation}
        onSave={saveReservation}
        editId={editId}
        setEditId={setEditId}
        formValues={formValues}
        setFormValues={setFormValues}
      />
    </div>
  );
}
